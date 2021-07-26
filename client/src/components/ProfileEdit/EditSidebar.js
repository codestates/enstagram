import { Link } from "react-router-dom";
import "../../App.css"
import "./EditSidebar.css";

const EditSidebar = ({ url }) => {
  return (
    <section className="edit-sidebar-container">
      <ul>
        <Link to={`${url}`} className="profile-edit-button">
          프로필 편집
        </Link>
        <Link to={`${url}/password`} className="profile-edit-button">
          비밀번호 변경
        </Link>
      </ul>
    </section>
  );
};

export default EditSidebar;
