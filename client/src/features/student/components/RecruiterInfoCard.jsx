import { Building2, Globe, Phone, BriefcaseBusiness } from "lucide-react";

const RecruiterInfoCard = ({ recruiter }) => {
  const companyName = recruiter?.companyName || "Unknown Company";

  const companyLogo =
    recruiter?.companyLogo?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}`;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
      "
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={companyLogo}
          alt={companyName}
          className="
            w-24
            h-24
            rounded-3xl
            border
            object-cover
            bg-white
          "
        />

        <h3
          className="
            text-xl
            font-bold
            mt-4
          "
        >
          {companyName}
        </h3>

        <p className="text-slate-500 mt-1">{recruiter?.designation}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-indigo-600" />

          <span className="text-slate-700">{companyName}</span>
        </div>

        {recruiter?.companyWebsite && (
          <a
            href={recruiter.companyWebsite}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-3
              text-indigo-600
              hover:underline
            "
          >
            <Globe size={18} />
            Visit Website
          </a>
        )}

        {recruiter?.contactNumber && (
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-indigo-600" />

            <span>{recruiter.contactNumber}</span>
          </div>
        )}

        {recruiter?.designation && (
          <div className="flex items-center gap-3">
            <BriefcaseBusiness size={18} className="text-indigo-600" />

            <span>{recruiter.designation}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterInfoCard;
