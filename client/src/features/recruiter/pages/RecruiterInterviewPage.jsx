import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/layout/EmptyState";

import InterviewStats from "../components/InterviewStats";
import InterviewFilters from "../components/InterviewFilters";
import InterviewCard from "../components/InterviewCard";

import { recruiterSidebarMenu } from "../constants/SidebarMenu";

import { getAllInterviews } from "../recruiterThunks";

const RecruiterInterviewPage = () => {
  const dispatch = useDispatch();

  const { interviews, interviewLoading, profile } = useSelector(
    (state) => state.recruiter,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("upcoming");

  useEffect(() => {
    dispatch(getAllInterviews());
  }, [dispatch]);

  const filteredInterviews = useMemo(() => {
    let data = [...interviews];

    if (modeFilter !== "all") {
      data = data.filter((item) => item?.interview?.mode === modeFilter);
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (item) =>
          item?.student?.name?.toLowerCase().includes(keyword) ||
          item?.student?.email?.toLowerCase().includes(keyword) ||
          item?.job?.title?.toLowerCase().includes(keyword),
      );
    }

    switch (sortBy) {
      case "upcoming":
        data.sort(
          (a, b) => new Date(a.interview.date) - new Date(b.interview.date),
        );
        break;

      case "latest":
        data.sort(
          (a, b) => new Date(b.interview.date) - new Date(a.interview.date),
        );
        break;

      default:
        break;
    }

    return data;
  }, [interviews, searchTerm, modeFilter, sortBy]);

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Interviews"
      navbarSubtitle="Manage scheduled interviews"
      userName={profile?.user?.name}
      department={profile?.companyName}
      profilePicture={profile?.companyLogo?.url}
    >
      <div className="space-y-8">
        <InterviewStats interviews={interviews} />

        <InterviewFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          modeFilter={modeFilter}
          setModeFilter={setModeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {interviewLoading ? (
          <Loader text="Loading Interviews..." />
        ) : filteredInterviews.length === 0 ? (
          <EmptyState
            title="No Interviews Scheduled"
            description="There are no scheduled interviews yet."
          />
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredInterviews.map((interview) => (
              <InterviewCard key={interview._id} interview={interview} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecruiterInterviewPage;
