export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20 mb-4">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-2 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-md"></div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🎫</span>
        </div>
      </div>
      
      <p className="text-purple-300 font-medium animate-pulse">{text}</p>
    </div>
  );
}

// Usage examples:
// <Loader />
// <Loader text="Fetching tickets..." />
// <Loader text="Submitting comment..." />