import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {attemptCacheKey,emptyDeviceAttempt,emptyQuestionAttempt,decodeDeviceAttempt,loadDeviceAttempt,saveDeviceAttempt,scoreQuestionOnce} from '../lib/deviceAttempt.ts';
const questions=[{id:'mcq1',kind:'mcq',optionCount:4,answerIndex:1,hintCount:2},{id:'mcq2',kind:'mcq',optionCount:4,answerIndex:2,hintCount:1},{id:'qa1',kind:'qa',hintCount:3}];
const signature='paper-v1';
const paper='["equations","Practice"]';
function storage(){const values=new Map();return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),values};}
function score(attempt,id,patch,correct){return scoreQuestionOnce(attempt,id,{...emptyQuestionAttempt(),...patch},correct).attempt;}
function completed(){let a=emptyDeviceAttempt(signature);a=score(a,'mcq1',{picked:1},true);a=score(a,'mcq2',{picked:0},false);a=score(a,'qa1',{answer:'3x = 15, x = 5',revealed:true,selfMark:true,hintsShown:1},true);return {...a,index:2};}

test('reload restores index, correct/wrong MCQ choices, written answer, reveal, self-mark, hints and score',()=>{
 const db=storage(),key=attemptCacheKey(null,'guest',paper),a=completed();assert.equal(saveDeviceAttempt(db,key,a),true);
 const restored=loadDeviceAttempt(db,key,signature,questions);assert.deepEqual(restored,a);
 assert.equal(Object.values(restored.questions).filter(q=>q.scored).length,3);assert.equal(Object.values(restored.questions).filter(q=>q.correct).length,2);
});
test('unsubmitted written draft survives leaving and reloading',()=>{
 const a={...emptyDeviceAttempt(signature),index:2,questions:{qa1:{...emptyQuestionAttempt(),answer:'I think x is 5',hintsShown:2}}};
 assert.deepEqual(decodeDeviceAttempt(JSON.stringify(a),signature,questions),a);
});
test('revealed but not self-marked answer remains unscored after reload',()=>{
 const a={...emptyDeviceAttempt(signature),index:2,questions:{qa1:{...emptyQuestionAttempt(),answer:'x = 5',revealed:true}}};
 const restored=decodeDeviceAttempt(JSON.stringify(a),signature,questions);assert.equal(restored.questions.qa1.revealed,true);assert.equal(restored.questions.qa1.scored,false);assert.equal(restored.questions.qa1.selfMark,null);
});
test('same attempt records each question only once including after reload and navigation',()=>{
 let a=emptyDeviceAttempt(signature),count=0;const submit=()=>{const next=scoreQuestionOnce(a,'mcq1',{...emptyQuestionAttempt(),picked:1},true);a=next.attempt;if(next.shouldRecord)count++;};submit();submit();a={...a,index:1};a={...a,index:0};submit();a=decodeDeviceAttempt(JSON.stringify(a),signature,questions);submit();assert.equal(count,1);
});
test('explicit new attempt unlocks scoring without changing cumulative progress',()=>{
 const history={stars:4,attempts:{mcq1:{attempts:1,correct:1}}};const original=structuredClone(history);let a=completed();a=emptyDeviceAttempt(signature);const result=scoreQuestionOnce(a,'mcq1',{...emptyQuestionAttempt(),picked:1},true);assert.equal(result.shouldRecord,true);assert.equal(a.index,0);assert.deepEqual(history,original);
});
test('guest, two learner profiles and two accounts have isolated attempts',()=>{
 const db=storage(),keys=[attemptCacheKey(null,'guest',paper),attemptCacheKey('familyA','child1',paper),attemptCacheKey('familyA','child2',paper),attemptCacheKey('familyB','child1',paper)];assert.equal(new Set(keys).size,4);
 saveDeviceAttempt(db,keys[0],completed());for(const key of keys.slice(1))assert.deepEqual(loadDeviceAttempt(db,key,signature,questions),emptyDeviceAttempt(signature));saveDeviceAttempt(db,keys[1],{...emptyDeviceAttempt(signature),index:1});assert.equal(loadDeviceAttempt(db,keys[0],signature,questions).index,2);assert.equal(loadDeviceAttempt(db,keys[1],signature,questions).index,1);
});
test('practice, challenge and exam keys cannot collide',()=>{
 assert.notEqual(attemptCacheKey('family','child',paper),attemptCacheKey('family','child','["equations","Challenge"]'));
 assert.notEqual(attemptCacheKey('family','child',paper),attemptCacheKey('family','child','["","Big Exam"]'));
 assert.notEqual(attemptCacheKey('a:b','c','d'),attemptCacheKey('a','b:c','d'));
});
test('changed question content invalidates previous verdicts',()=>{
 assert.deepEqual(decodeDeviceAttempt(JSON.stringify(completed()),'new-content',questions),emptyDeviceAttempt('new-content'));
});
test('malformed JSON, wrong versions and invalid document shapes fail safely',()=>{
 for(const raw of ['{','null','[]','42','{"version":2}','{"version":1,"signature":"paper-v1","questions":[]}'])assert.deepEqual(decodeDeviceAttempt(raw,signature,questions),emptyDeviceAttempt(signature));
});
test('out-of-range selection, invalid self-mark and oversize answer do not restore corrupt questions',()=>{
 const a=completed();a.questions.mcq1.picked=99;a.questions.qa1.selfMark='yes';let restored=decodeDeviceAttempt(JSON.stringify(a),signature,questions);assert.equal(restored.questions.mcq1,undefined);assert.equal(restored.questions.qa1,undefined);
 a.questions.qa1={...emptyQuestionAttempt(),answer:'x'.repeat(100001)};restored=decodeDeviceAttempt(JSON.stringify(a),signature,questions);assert.equal(restored.questions.qa1,undefined);
});
test('unrecognised question IDs are ignored and saved indices/hints are bounded',()=>{
 const a=completed();a.index=999;a.questions.old=emptyQuestionAttempt();a.questions.qa1.hintsShown=999;const restored=decodeDeviceAttempt(JSON.stringify(a),signature,questions);assert.equal(restored.index,2);assert.equal(restored.questions.old,undefined);assert.equal(restored.questions.qa1.hintsShown,3);
});
test('MCQ correctness is recomputed from the real answer rather than trusted from cache',()=>{
 const a=completed();a.questions.mcq2.correct=true;assert.equal(decodeDeviceAttempt(JSON.stringify(a),signature,questions).questions.mcq2.correct,false);
});
test('storage exceptions do not crash loading or saving',()=>{
 const broken={getItem:()=>{throw Error('blocked')},setItem:()=>{throw Error('quota')}};assert.deepEqual(loadDeviceAttempt(broken,'key',signature,questions),emptyDeviceAttempt(signature));assert.equal(saveDeviceAttempt(broken,'key',completed()),false);
});
test('review is kept in memory, uses its due-session snapshot, and new-attempt does not reset total progress',()=>{
 const source=readFileSync(new URL('../components/PaperRunner.tsx',import.meta.url),'utf8');assert.match(source,/cacheKey=\{review \? null : scopeKey\}/);assert.match(source,/const \[items\] = useState\(initialItems\)/);assert.match(source,/if \(review\) reviewResult\(item.q.id, correct\)/);assert.doesNotMatch(source,/resetAll|\/api\//);assert.match(source,/if \(!result.shouldRecord\) return/);
 const commit=source.indexOf('commit(result.attempt)');assert.ok(commit<source.indexOf('recordResult(item.q.id',commit));
});
test('new attempt is explicit and profile changes remount the runner',()=>{
 const source=readFileSync(new URL('../components/PaperRunner.tsx',import.meta.url),'utf8');assert.match(source,/key=\{review \? `\$\{scopeKey\}:review`/);assert.match(source,/confirmRestart && !review/);assert.match(source,/onClick=\{startNewAttempt\}/);assert.match(source,/Your total stars and learning history will stay/);
});
