class AppConfig{

    public vecationUrl = "http://localhost:3001/api/vecation/";
    public followersUrl = "http://localhost:3001/api/followers/";
    public ImageVecationUrl="http://localhost:3001/api/vecation/images/";
    public loginUrl="http://localhost:3001/api/auth/login/";
    public registerUrl="http://localhost:3001/api/auth/register/";
    public conditionsUrl="http://localhost:3001/api/vecation/conditions/";
   
}

const appConfig = new AppConfig()
export default appConfig