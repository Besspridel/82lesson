// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.15;

contract ERC20 {

    uint256 public _totalSupply = 0;
    string public _name;
    string public _symbol;
    uint8  public _decimals;
    address public _owner;


    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    constructor(string memory name_, string memory symbol_, uint8 decimals_) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _owner = msg.sender;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);



    function name() public view returns(string memory) {
        return _name;
    }

    function symbol() public view returns(string memory) {
        return _symbol;
    }

    function decimals() public view returns(uint8) {
        return _decimals;
    }

    function totalSupply() public view returns(uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns(uint256) {
        return balances[account];
    }

    function mint(address to, uint256 amount) public returns(bool) {
        require(_owner == msg.sender, "ERC20: You are not owner");
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
        return true;
    }

    function burn( uint256 amount) public returns(bool) {
        require(balances[msg.sender] >= amount, "ERC20: not enough tokens");
        balances[address(0)] += amount;
        balances[msg.sender] -= amount;
        emit Transfer(msg.sender, address(0), amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addValue) public returns(bool) {
        allowed[msg.sender][spender] += addValue;
        emit Approval(msg.sender, spender, allowed[msg.sender][spender]);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subValue) public returns(bool) {
        require(allowed[msg.sender][spender] >= subValue, "ERC20: decreased allowance below zero");
        allowed[msg.sender][spender] -= subValue;
        emit Approval(msg.sender, spender, allowed[msg.sender][spender]);
        return true;
    }

    function transfer(address to, uint256 amount) public returns(bool) {
        require(amount < balances[msg.sender], "ERC20: not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns(bool) {
        allowed[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function allowance(address owner, address spender) public view returns(uint256) {
        return allowed[owner][spender];
    }

    function transferFrom(address from, address to, uint256 amount) public returns(bool) {
        require(allowed[from][msg.sender] >= amount, "ERC20: no permission to spend");
        require(balances[from] >= amount, "ERC20: not enough tokens");
        balances[from] -= amount;
        balances[to] += amount;
        allowed[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        emit Approval(from, msg.sender, allowed[from][msg.sender]);
        return true;
    }
}

