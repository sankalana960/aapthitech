"use client"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const API_URL = `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`
    const userFirst = localStorage.getItem('firstName');
    const userimage = localStorage.getItem('imagePath');
    
    const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("isLoggedIn");
    router.push('/login');
    };

    return (
        <>
        <nav className='nav-bar'>
        <Link href="dashboard"><button className="btn nav-menu">Home</button></Link>
          <button onClick={handleLogout} className="btn btn-danger">
              Logout
          </button>
          <div className="profile-container" style={{ display: 'flex', alignItems: 'center', marginLeft: '900px' }}>
              <img
              src={`${API_URL}/public/uploads/${userimage}`}
              alt="User Profile"
              style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginRight: '2px',
              }}
              />
              <p className="mt-2 ml-3">{userFirst}</p>
          </div>
        </nav>
      {children}
        </>
    );
  }