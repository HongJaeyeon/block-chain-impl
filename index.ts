import * as CryptoJS from "crypto-js";

class Block{
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (index: number, previousHash: string, data: string, timestamp: number): string =>
        CryptoJS.SHA256(index+ previousHash + data + timestamp).toString(); 

    static validateStructure = (aBlock : Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.timestamp === "number";

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp =  timestamp;
    }
}

const genesisBlock = new Block(0, "2020202020202", "", "first block", 123456);
let blockchain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockchain;

const getLastestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock : Block = getLastestBlock();
    const newIndex : number = previousBlock.index + 1;
    const NewTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        data,
        NewTimeStamp
    );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        NewTimeStamp
    )
    addBlock(newBlock);
    return newBlock;
}
const getHashForBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.data,
        aBlock.timestamp
    );

const isBlockValied = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    }else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    }else if(candidateBlock.hash !== getHashForBlock(candidateBlock)){
        return false;
    }else{
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValied(candidateBlock, getLastestBlock())){
        blockchain.push(candidateBlock);
    }
};

// console.log("a");
// console.log(blockchain);
// blockchain.push(genesisBlock);
// console.log("b");
// console.log(blockchain);
// console.log("c");
// console.log(genesisBlock);
// console.log(createNewBlock("Hello"));
// console.log(createNewBlock("hihihi"));
// console.log(blockchain);

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);