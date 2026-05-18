import T from '../utils/theme';
import { Btn, Inp, Card } from '../components/ui';

export default function VehicleLookup({ vehicle, setVehicle, onSearch }) {
  return (
    <div style={{ maxWidth:480, margin:'40px auto' }}>
      <Card style={{ padding:32, textAlign:'center' }}>
        <div style={{ fontSize:40, marginBottom:16 }}>🚗</div>
        <div style={{ fontWeight:800, fontSize:22, color:T.txt, marginBottom:6 }}>Find Your Challans</div>
        <div style={{ color:T.txt2, fontSize:14, marginBottom:28 }}>
          Enter your vehicle registration number to view all active challans
        </div>
        <Inp label="Vehicle Registration Number" value={vehicle}
          onChange={e=>setVehicle(e.target.value.toUpperCase())}
          placeholder="e.g. MH12AB1234" required />
        <Btn variant="primary" full onClick={onSearch} disabled={!vehicle.trim()}>
          Search Challans →
        </Btn>
      </Card>
    </div>
  );
}
