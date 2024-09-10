import React from "react";

export function StatsForm() {
  const [user, setUser] = React.useState("");
  const [period, setPeriod] = React.useState("1month");
  const [limit, setLimit] = React.useState("25");

  const generateUrl = () => {
    const url = `/stats/${user}/albums/${period}/${limit}`;
    location.href = url;
  };

  return (
    <form className="stats-form">
      <label>
        <span>Enter your user name:</span>
        <input
          value={user}
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
      </label>
      <label>
        <span>Time period:</span>
        <select
          value={period}
          onChange={(event) => {
            setPeriod(event.target.value);
          }}
        >
          <option value="overall">Overall</option>
          <option value="7day">7 days</option>
          <option value="1month">1 month</option>
          <option value="3month">3 months</option>
          <option value="6month">6 months</option>
          <option value="12month">1 year</option>
        </select>
      </label>
      <label>
        <span>Size:</span>
        <select
          value={limit}
          onChange={(event) => {
            setLimit(event.target.value);
          }}
        >
          <option value="9">3x3</option>
          <option value="16">4x4</option>
          <option value="25">5x5</option>
          <option value="100">10x10</option>
        </select>
      </label>

      <button
        disabled={!user}
        onClick={(event) => {
          event.preventDefault();
          generateUrl();
        }}
      >
        Generate
      </button>
    </form>
  );
}
