export class PlaceOrderDto {
  userId: number;
  items: { productId: number; quantity: number }[];
}
