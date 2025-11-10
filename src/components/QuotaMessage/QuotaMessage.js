import React from "react";
import "./QuotaMessage.css";

function QuotaMessage() {
  return (
    <div className="quota-message">
      <p>
        🚨 API quota exceeded — showing mock data for demo. Real data resumes once quota resets. Thank you for understanding! ❤️
      </p>
    </div>
  );
}

export default QuotaMessage;
