interface Data {
    accepted: number;
    rejected: number;
}

export default function ThinDonutChart({ accepted, rejected }: Data) {
    const total = accepted + rejected;
    const acceptedPercentage = (accepted / total) * 100;
    const rejectedPercentage = (rejected / total) * 100;
  
    return (
      <div className="flex justify-center mt-5 bg-white">
        <div className="relative w-48 h-48">
          <svg width="100%" height="100%" viewBox="0 0 36 36" className="absolute mx-auto -rotate-90">
            {/* Grey (Accepted) */}
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="transparent"
              stroke="#B0B0B0"
              strokeWidth="2"
              strokeDasharray={`${acceptedPercentage} ${100 - acceptedPercentage}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Yellow (Rejected) */}
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="transparent"
              stroke="#FFD700"
              strokeWidth="2"
              strokeDasharray={`${rejectedPercentage} ${100 - rejectedPercentage}`}
              strokeDashoffset={`-${acceptedPercentage}`}
              strokeLinecap="round"
            />
          </svg>
          
        </div>
      </div>
    );
  }
  