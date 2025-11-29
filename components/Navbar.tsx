export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4
                    bg-white/95 backdrop-blur shadow">
      <div className="flex items-center gap-3">
        <img
          src="/2.jpeg"
          alt="Aqua Shield Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="font-semibold text-lg">AQUA SHIELD</span>
          <span className="text-xs text-gray-500">
            Automated Irrigation &amp; Sun Control
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
        <a href="#">Home</a>
        <a href="#">Control</a>
        <a href="#">Charts</a>
        <a href="#" className="text-red-600">Log Out</a>
      </div>
    </nav>
  );
}