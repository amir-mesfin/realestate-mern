export default function InfoCard({ title, number, color }) {
  return (
    <div
      className={`p-6 sm:p-10 rounded-xl shadow-lg text-white w-40 sm:w-70 h-28 sm:h-50 flex flex-col justify-center items-center transition-all mb-14`}
      style={{ backgroundColor: color }}
    >
      <h2 className="text-lg  font-semibold text-center">{title}</h2>
      <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-5">{number}</p>
    </div>
  );
}
