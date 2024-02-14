// Breadcrumbs.js
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const crumbs = [
    { pathname: isAuth ? "/card" : "/", breadcrumbName: "Home" },
    ...pathnames.map((crumb, index) => ({
      pathname: `${pathnames.slice(0, index + 1)}`,
      breadcrumbName: crumb,
    })),
  ];

  return (
    <div className="breadcrumbs mt-20 mx-5">
      <ul>
        {crumbs.map((crumb, _) => (
          <li key={crumb.pathname}>
            <Link to={crumb.pathname}>{crumb.breadcrumbName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
