function Navbar({ setSigningIn }) {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <a>Recap</a>
      <nav>
        <button className="cursor-pointer" onClick={() => setSigningIn(true)}>
          Sign In
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
