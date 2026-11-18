// Chuvor Client control panel: a subscription's state is computed from dates, never stored (excerpt of server/lib/core.mjs)
export function serviceState(t, at = now()) {
  if (t.status === 'suspended') return { live: false, state: 'suspended', message: 'This account is suspended.' };
  if (t.status === 'pending') return { live: false, state: 'pending', message: 'This account is waiting for its first payment.' };
  const graceEnd = t.paid_until + t.grace_days * DAY;
  if (at > graceEnd) return { live: false, state: 'expired', message: 'The subscription has ended. Renew it to restore access.', daysLeft: 0 };
  if (at > t.paid_until) return { live: true, state: 'grace', daysLeft: Math.max(1, Math.ceil((graceEnd - at) / DAY)), message: 'The subscription has ended. Access stops soon unless it is renewed.' };
  const daysLeft = Math.max(0, Math.ceil((t.paid_until - at) / DAY));
  return { live: true, state: daysLeft <= 7 ? 'expiring' : 'ok', daysLeft, message: daysLeft <= 7 ? `The subscription ends in ${daysLeft} day${daysLeft === 1 ? '' : 's'}.` : '' };
}
