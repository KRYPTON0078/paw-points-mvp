export type VerificationStatus = 'verified' | 'pending' | 'not-provided';
export interface User { id: string; name: string; birthday: string }
export interface Cafe { id: string; name: string; location: string; address: string; description: string; image: string; mapPosition: [number, number]; sample: true; streamUrl: string | null; mapUrl?: string; coordinates?: {lat: number; lng: number} }
export interface VaccinationRecord { label: string; status: VerificationStatus; lastVerified: string | null; sample: true }
export interface CatIdentity { passportId: string; breed: string; birthDate: string; gender: string | null; origin: string; vaccination: VaccinationRecord; care: string }
export interface Cat { id: string; name: string; age: number; image: string; trait: string; bio: string; cafeId: string; fans: number; seedVotes: number; identity: CatIdentity }
export interface CatRelationship { catId: string; xp: number; active: boolean; since: string }
export interface PointsTransaction { id: string; label: string; amount: number; date: string; simulated: boolean; reference: string }
export interface BondTransaction { id: string; catId: string; label: string; amount: number; date: string }
export interface CompetitionSeason { id: string; name: string; startsAt: string; endsAt: string; sponsor: string | null }
export interface Vote { id: string; catId: string; seasonId: string; day: string }
export interface VoteAllocation { catId: string; total: number; rank: number }
export interface FanBadge { id: string; name: string; catId?: string }
export interface EventPackage { id: string; name: string; price: number; maxGuests: number; benefits: string[] }
export interface BirthdayBooking { id: string; packageId: string; date: string; guests: number; cafeId: string; theme: string; status: 'requested' | 'demo-confirmed'; amount: number }
export interface MerchandiseProduct { id: string; catId: string; name: string; description: string; price: number; kind: 'photo' | 'sticker' | 'tote' | 'poster' | 'digital' | 'seasonal' | 'magnet' | 'accessory'; category: string; colorName: string; productType: 'Physical' | 'Digital'; availability: 'Demo available' | 'Coming soon'; color: string; inventoryId?: string; revenueShareCafeId: string }
export interface CartItem { productId: string; quantity: number }
export interface MerchandiseOrder { id: string; items: (CartItem & { unitPrice: number; name: string })[]; amount: number; date: string; status: 'simulated'; paymentReference?: string; shippingStatus: 'not-applicable' }
export interface Reward { id: string; name: string; cost: number; level: number; description: string }
export interface Redemption { id: string; rewardId: string; catId: string; date: string; voucherId: string }
export interface CareOrder { id: string; catId: string; packageId: string; amount: number; status: 'awaiting-staff'; points: number; xp: number; date: string }
export interface Voucher { id: string; rewardId: string; catId: string; status: 'demo-only' }
export interface CheckIn { day: string; catId: string }
export interface DemoState {
  user: User; points: number; primary: string; cats: Record<string, CatRelationship>;
  pointsLedger: PointsTransaction[]; bondLedger: BondTransaction[]; votes: Vote[];
  bookings: BirthdayBooking[]; orders: MerchandiseOrder[]; careOrders: CareOrder[];
  redemptions: Redemption[]; wallet: Voucher[]; visits: CheckIn[];
  cart: Record<string, number>; done: string[]; firstFollowAwarded: boolean;
  weeklyBonuses: string[]; badges: FanBadge[];
}
