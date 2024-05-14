async function main() {
  // Grab the contract factory 
  const TechnoTrove = await ethers.getContractFactory("TechnoTrove");

  // Start deployment, returning a promise that resolves to a contract object
  const technoTrove = await TechnoTrove.deploy(); // Instance of the contract 
  console.log("Contract deployed to address:", technoTrove.target);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });