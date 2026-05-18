import { sCol, sLbl } from '../../utils/helpers';
export default function Badge({ status, verdict }) {
  const c = sCol(status, verdict);
  return (
    <span style={{ background:c+'22', color:c, padding:'4px 10px',
      borderRadius:99, fontSize:11, fontWeight:700,
      border:`1px solid ${c}44`, whiteSpace:'nowrap' }}>
      {sLbl(status, verdict)}
    </span>
  );
}
