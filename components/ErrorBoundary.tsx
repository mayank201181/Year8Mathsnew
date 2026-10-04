"use client";
import { Component, type ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";

/** Catches render errors in client subtrees (layout errors bypass error.tsx). */
export class ErrorBoundary extends Component<{ children: ReactNode; silent?: boolean }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error("UI error", error);
  }
  render() {
    if (this.state.error) {
      if (this.props.silent) return null;
      return <ErrorFallback error={this.state.error} onRetry={() => this.setState({ error: null })} />;
    }
    return this.props.children;
  }
}
