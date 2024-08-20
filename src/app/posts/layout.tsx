import Profile from "../components/profile";
import NavBar from "../Navbar";

export default function PostLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Profile />
      <NavBar />

      {children}
    </section>
  );
}
