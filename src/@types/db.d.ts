declare module "../../repositories/db" {
  const connectToDatabase: () => Promise<any>;
  export default connectToDatabase;
}
