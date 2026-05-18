import T from './theme';

export const ADMIN_PW = 'admin@123';

export const OFFENSES = [
  'Signal Jump','Over Speeding','No Helmet','Wrong Parking',
  'Mobile Phone Usage While Driving','Driving Without License',
  'Wrong Lane','Red Light Violation','Triple Riding',
  'No Seatbelt','Drunk Driving','Modified Exhaust',
];

export const fmtDate = (d) => {
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch { return d; }
};

export const genCase = () =>
  'CASE-' + Math.random().toString(36).substr(2, 5).toUpperCase();

export const genId = () => 'CH-' + Date.now();

export const today = () => new Date().toISOString().split('T')[0];

export const sCol = (status, verdict) => {
  if (status === 'resolved') return verdict === 'approved' ? T.green : T.red;
  if (status === 'disputed') return T.amber;
  return T.txt3;
};

export const sLbl = (status, verdict) => {
  if (status === 'resolved')
    return verdict === 'approved' ? '\u2713 Approved' : '\u2717 Rejected';
  if (status === 'disputed') return '\u23f3 Under Review';
  return '\u25cf Pending';
};
