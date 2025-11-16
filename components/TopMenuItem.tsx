import Link from "next/link";
import styles from "./topmenu.module.css";
import {
  FaHome,
  FaUsers,
  FaCar,
  FaGamepad,
  FaTools,
  FaBook,
} from "react-icons/fa";
export default function TopMenuItem({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  //let icon;

  /*switch (title) {
    case "Home":
      icon = <FaHome className="mr-2" />;
      break;
    case "Provider":
      icon = <FaUsers className="mr-2" />;
      break;
    case "Select Car":
      icon = <FaCar className="mr-2" />;
      break;
    case "Car Jumper":
      icon = <FaGamepad className="mr-2" />;
      break;
    case "Manage":
      icon = <FaTools className="mr-2" />;
      break;
    case "Audit Logs":
      icon = <FaBook className="mr-2" />;
      break;
    default:
      icon = null;
  }*/

  return (
    <Link
      href={pageRef}
      className="w-[7vw] text-center my-auto text-[#1f2937] text-sm
transition-all duration-100 ease-in-out transform hover:scale-105 hover:text-gray-500 flex items-center justify-center"
    >
      {title}
    </Link>
  );
}
