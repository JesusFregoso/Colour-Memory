<?php
/**
  * @package Core
  */
  
 /**
  * get the conection to db with pdo object you can use Database::getInstance()->pdo
  */
class Database{
	private static $instance;
	private $DB_SERVER = '127.0.0.1';
    private $DB_USER = 'root';
    private $DB_PASS = '';
    private $DB_NAME = 'colour_memory';
	/**
	 * The function is private to prevent the creation of multiples instances,you can use Database::getInstance()
	 */
	function connect(){
		   
		   
		try {
			 $stringConection='mysql:host='.$this->DB_SERVER.';dbname='.$this->DB_NAME.';charset=UTF8;';
			
			 if ( !empty($DB_CONFIG['DB_PORT']) ){
				$stringConection.='port=3306;';
			 }		 
			$db = @new PDO($stringConection, $this->DB_USER, $this->DB_PASS,array(
				PDO::ATTR_PERSISTENT => false
			));				
			$this->pdo=$db;
			$db->exec('USE '.$this->DB_NAME);			
			$msg='connected to db';
		} catch (PDOException $e) {			
			
			
			$msg1=$e->getMessage();
			$msg='Database Connection error: ';
			$resp=array(
				'success'=>false,
				'msg'=>$msg
			);			
			$msg='Database Connection error: ';
			throw new Exception($msg);			
		}
		$resp=array(
			'success'=>true,
			'msg'=>$msg
		);	
			return $resp;
	}
	 
	function reconnect(){
		return $this->connect();		
	}
    private function __construct(){		
		$this->connect();
    }
   
	/**
	 * Return an object that represent the database conection.
	 */
	public static function getInstance(){
      if (  !self::$instance instanceof self){
         self::$instance = new self;
      }
      return self::$instance;
   }
}
?>