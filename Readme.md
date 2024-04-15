#### To run this project locally using docker 
---
 ``` cd VivaCityTechAssessment```
``` docker compose up``` 
- this starts postgressql server and express server in an isolated environment but within same network

- To manually test APIs check the postman_collection.json file, import it in postman after running docker you can test all APIS

#### To run tests on all API end points  
---
``` npm run test```