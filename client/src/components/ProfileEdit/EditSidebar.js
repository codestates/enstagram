import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./EditSidebar.css";


const EditSidebar = ({ url }) => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <section className="edit-sidebar-container">
      <ul>
        <Link
          to={`${url}`}
          className={`profile-edit-button ${currentTab === 0 ? 'profile-edit-button-focused' : null}`}
          onClick={() => setCurrentTab(0)}
        >
          프로필 편집
        </Link>
        <Link
          to={`${url}/password`}
          className={`profile-edit-button ${currentTab === 1 ? 'profile-edit-button-focused' : null}`}
          onClick={() => setCurrentTab(1)}
        >
          비밀번호 변경
        </Link>
      </ul>
    </section>
  );
};

export default EditSidebar;
