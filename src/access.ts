export default function access(initialState: { user?: any }) {
  const { user } = initialState;
  return {
    isAuthenticated: !!user,
  };
}
