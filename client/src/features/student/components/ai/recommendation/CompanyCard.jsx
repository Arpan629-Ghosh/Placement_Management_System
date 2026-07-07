import { Building2 } from "lucide-react";

const CompanyCard = ({ recruiter }) => {
  return (
    <div className="flex items-center gap-4">
      {recruiter?.companyLogo ? (
        <img
          src={recruiter.companyLogo.url}
          className="w-14 h-14 rounded-xl object-cover border"
        />
      ) : (
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
          <Building2 />
        </div>
      )}

      <div>
        <h3 className="font-bold text-lg">{recruiter?.companyName}</h3>

        <p className="text-slate-500 text-sm">{recruiter?.designation}</p>
      </div>
    </div>
  );
};

export default CompanyCard;
