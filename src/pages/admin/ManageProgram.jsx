import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./layout/Layout";
import AddProgram from "./AddProgram";
import AllProgram from "./AllProgram";

const ManageProgram = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Manage Program</h1>
        <div className="grid gap-6 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] items-start">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              to="#"
              className={selectedComponent === "AllProgram" ? "font-semibold text-primary" : ""}
              onClick={() => setSelectedComponent("AllProgram")}
            >
              Programs
            </Link>
            <Link
              to="#"
              className={selectedComponent === "Add Program" ? "font-semibold text-primary" : ""}
              onClick={() => setSelectedComponent("Add Program")}
            >
              Add Program
            </Link>
          </nav>

          <div className="grid gap-6">
            {(() => {
              switch (selectedComponent) {
                case "AllProgram":
                  return <AllProgram />;
                case "Add Program":
                  return <AddProgram />;
                default:
                  return <AllProgram />;
              }
            })()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProgram;
