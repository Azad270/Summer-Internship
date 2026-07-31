import { useSearchParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

function Habits() {
    // This catches the ?search= keyword from your Topbar
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    return (
        <MainLayout>
            <main className="dashboard-content">
                
                {/* Page Header */}
                <section className="command-center">
                    <h1 className="command-title">
                        Habit <span style={{ color: "var(--primary)" }}>Repository</span>
                    </h1>
                    <p className="command-description">
                        Manage your active habits, track long-term progress, and build new routines.
                    </p>
                </section>

                {/* Content Area */}
                <div className="bento-grid">
                    <div className="grid-left" style={{ width: "100%" }}>
                        
                        {/* If a search exists, show what we are filtering by */}
                        {searchQuery && (
                            <div style={{ marginBottom: "20px", color: "var(--text-secondary)" }}>
                                <span>Displaying search results for: </span>
                                <strong style={{ color: "var(--primary)" }}>"{searchQuery}"</strong>
                            </div>
                        )}

                        <div className="panel" style={{ padding: "30px", textAlign: "center", border: "1px dashed rgba(0, 217, 255, 0.2)" }}>
                            <h3 style={{ color: "var(--text-secondary)" }}>
                                {searchQuery 
                                    ? `No habits found matching "${searchQuery}".` 
                                    : "No habits established yet."}
                            </h3>
                            <button className="btn-primary" style={{ marginTop: "15px" }}>
                                + Initialize New Habit
                            </button>
                        </div>

                    </div>
                </div>

            </main>
        </MainLayout>
    );
}

export default Habits;