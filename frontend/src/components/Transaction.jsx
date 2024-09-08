export default function Transation({ tr }) {
  return (
    <div>
      <div>Transferred INR {tr.amount}</div>
      <div>Transferred to {tr.to}</div>
      <div>{tr.date}</div>
    </div>
  );
}
