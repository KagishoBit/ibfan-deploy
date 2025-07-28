import { getViolations, addViolation, updateViolation, deleteViolation } from '@/app/lib/actions';
import { ViolationsClient } from './ViolationsClient';

export default async function ViolationsPage() {
  const violations = await getViolations();

  return (
    <ViolationsClient
      initialViolations={violations}
      addViolationAction={addViolation}
      updateViolationAction={updateViolation}
      deleteViolationAction={deleteViolation}
    />
  );
}