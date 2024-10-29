<?php
    class Connect{
        public $connect_success;
        public $server_name = '127.0.0.1:3306';
        public $username = 'root';
        public $password = '12345678';
        public $dbname = 'project';
        function sql_setup(){
            $this->connect_success = mysqli_connect($this->server_name, $this->username, $this->password, $this->dbname);
        }
        function connect_success(){
            $this->sql_setup();
            return $this->connect_success;
        } 
        function sql_command($command){
            return mysqli_query($this->connect_success, $command);
        }
        function sql_search($command, $pose){
            return mysqli_fetch_assoc(mysqli_query($this->connect_success, $command))[$pose];
        }
    }
?>