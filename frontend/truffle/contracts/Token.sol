contract Token {
    string public name = "DApp Token";
    string public symbol = "DApp";
    string public standard = "ERC-20";
    string public version = "v1.0";
    uint256 public decimals = 18; // you need to divide by 10^decimals to get the actual GLD amount.

    uint256 public totalSupply = 1000 * (10**(decimals));
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    /* 
        (ADMIN) 0x1A122eCdfc79382cc7Fff781407Aea63CDfe1E23 :- balance = 696954, allowance = 0
        (FROM) 0xf363B09faFCFd2A8B69EEf9f74Df48fC42d2887e :- balance = 15 , allowance = 0
        (SPENDING) 0x221FD9C47fc99E9A12C89F6cEc56d56A21D33793 :- balance = 0 allowance = 5 from ‘7e’
        (TO) 0xB206992804A05C7775CD4784Cb8Da8e3471F2a04 :- balance = 0 , allowance = 0

        _from = parent's account, _to = store's account, msg.sender/spender's account = my account
    */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
