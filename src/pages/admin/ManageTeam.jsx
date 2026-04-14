import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./layout/Layout";
import AllTeam from "./AllTeam";
import AddTeam from "./AddTeam";

const ManageTeam = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Manage Teams</h1>
        <div className="grid gap-6 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] items-start">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              to="#"
              className={selectedComponent === "AllTeam" ? "font-semibold text-primary" : ""}
              onClick={() => setSelectedComponent("AllTeam")}
            >
              Teams
            </Link>
            <Link
              to="#"
              className={selectedComponent === "Add Team" ? "font-semibold text-primary" : ""}
              onClick={() => setSelectedComponent("Add Team")}
            >
              Add Team
            </Link>
          </nav>
          <div className="grid gap-6">
            {(() => {
              switch (selectedComponent) {
                case "AllTeam":
                  return <AllTeam />;
                case "Add Team":
                  return <AddTeam />;
                default:
                  return <AllTeam />;
              }
            })()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageTeam;
