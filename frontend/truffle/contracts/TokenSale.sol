import './Token.sol';

contract TokenSale{
    address admin;
    Token public tokenContract; 
    uint256 public tokenPrice;
    uint256 public tokensSold; 

    event Sell(address _buyer, uint256 _amount);
     
    constructor(Token _tokenContract, uint256 _tokenPrice) public{
        admin = msg.sender;
        tokenContract = _tokenContract; 
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z){
        require( y == 0 ||  (z = x*y)/y == x );
    }
    
    function buyTokens(uint256 _numberOfTokens) public payable{
        require(msg.value == multiply(_numberOfTokens,tokenPrice)); //eth sent with call to contract shoud be equal to cost of tokens 
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens); // tokenContract must have sufficient number of tokens 
        
        tokensSold += _numberOfTokens; 

        emit Sell(msg.sender,_numberOfTokens);

        require(tokenContract.transfer(msg.sender,_numberOfTokens)); //send over number of tokens requested
    } 

    function endSale() public{
        require(msg.sender == admin); // only admin should be able to end sale 
        require(tokenContract.transfer(admin,tokenContract.balanceOf(address(this)))); //transfer remaining tokens to admin 
        //selfdestruct(payable(admin)); //self destruct implements above two lines in addition to returning gas fees and disabling the contract 
    }
}