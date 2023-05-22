const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt=require("prompt-sync")({sigint:true})

const serverUrl = 'http://localhost:1225';

async function main() {

  const name = prompt("Which name do you want to check on the list? ");

  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree = new MerkleTree(niceList)
  const idx = niceList.findIndex(n => n === name)
  const proof = merkleTree.getProof(idx)
   

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof
  });

  console.log({ gift });
}

main();