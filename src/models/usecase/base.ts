export interface IBaseUseCase<Payload, Response> {
  execute(data: Payload): Promise<Response>;
}
