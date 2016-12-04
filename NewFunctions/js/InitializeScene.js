/**
 * Created by Robert on 1-12-2016.
 */

// After loading JSON from our file, we add it to the scene
function addModelToScene(geometry, materials) {
    var material = new THREE.MeshFaceMaterial(materials);
    model = new THREE.Mesh(geometry, material);
    model.scale.set(30, 30, 30);
    model.position.set(0, 14, 0);
    model.rotation.y = Math.PI / 2;
    model.castShadow = true;
    model.receiveShadow = true;
    scene.add(model);
}

function Ball(name, texture, position) // Constructor
{
    this.ball = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20));
    this.ball.material = texture;
    this.ball.position.x = position.x;
    this.ball.position.y = position.y;
    this.ball.position.z = position.z;
    this.direction = new THREE.Vector3(0, 0, 0);
    this.name = name;
    this.ball.speed = 0;
    this.ball.rotation.y = -1.5;
    this.ball.castShadow = true;
    scene.add(this.ball);
    return this;
}

function Init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: gameCanvas });
    renderer.setSize(1200, 800);
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //BackgroundColor
    var backgroundMaterial = new THREE.MeshPhongMaterial({ color: 0x21aadf });
    //BackgroundSize
    var background = new THREE.Mesh(new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight, 2, 2), backgroundMaterial);
    background.position.y = -24;
    background.rotation.x = -Math.PI / 2;
    background.receiveShadow = true;
    scene.add(background);

    // Load the JSON files and provide callback functions (modelToScene
    var modelloader = new THREE.JSONLoader();
    modelloader.load("models/pooltable.json", addModelToScene);

    //Load Textures
    var loader = new THREE.TextureLoader();

    var textureball1 = loader.load('textures/1.jpg');
    var textureball2 = loader.load('textures/2.jpg');
    var textureball3 = loader.load('textures/3.jpg');
    var textureball4 = loader.load('textures/4.jpg');
    var textureball5 = loader.load('textures/5.jpg');
    var textureball6 = loader.load('textures/6.jpg');
    var textureball7 = loader.load('textures/7.jpg');
    var textureball8 = loader.load('textures/8.jpg');
    var textureball9 = loader.load('textures/9.jpg');
    var textureball10 = loader.load('textures/10.jpg');
    var textureball11 = loader.load('textures/11.jpg');
    var textureball12 = loader.load('textures/12.jpg');
    var textureball13 = loader.load('textures/13.jpg');
    var textureball14 = loader.load('textures/14.jpg');
    var textureball15 = loader.load('textures/15.jpg');

    //cue
    var cueGeometry = new THREE.CylinderGeometry(0.1, 0.4, 30);
    var cueColor = new THREE.MeshPhongMaterial({ color: 0xb88b45 });
    cue = new THREE.Mesh(cueGeometry, cueColor);
    cue.castShadow = true;
    cue.receiveShadow = true;

    //Balls
    //White ball
    whiteball = new Ball("whiteball", new THREE.MeshPhongMaterial({ color: 0xffffee }), new THREE.Vector3(0, 2, 20));

    //Colored Balls
    //First row
    ball1 = new Ball("ball1", new THREE.MeshPhongMaterial({ map: textureball1 }), new THREE.Vector3(0, 2, -18));

    //Second row
    ball13 = new Ball("ball13", new THREE.MeshPhongMaterial({ map: textureball13 }), new THREE.Vector3(-1.1, 2, -20));
    ball7 = new Ball("ball7", new THREE.MeshPhongMaterial({ map: textureball7 }), new THREE.Vector3(1.1, 2, -20));

    //Third row
    ball2 = new Ball("ball2", new THREE.MeshPhongMaterial({ map: textureball2 }), new THREE.Vector3(-2.1, 2, -22));
    ball8 = new Ball("blackball", new THREE.MeshPhongMaterial({ map: textureball8 }), new THREE.Vector3(0, 2, -22));
    ball14 = new Ball("ball14", new THREE.MeshPhongMaterial({ map: textureball14 }), new THREE.Vector3(2.1, 2, -22));

    //Fourth row
    ball15 = new Ball("ball15", new THREE.MeshPhongMaterial({ map: textureball15 }), new THREE.Vector3(-3.2, 2, -24));
    ball4 = new Ball("ball4", new THREE.MeshPhongMaterial({ map: textureball4 }), new THREE.Vector3(-1, 2, -24));
    ball9 = new Ball("ball9", new THREE.MeshPhongMaterial({ map: textureball9 }), new THREE.Vector3(1, 2, -24));
    ball6 = new Ball("ball6", new THREE.MeshPhongMaterial({ map: textureball6 }), new THREE.Vector3(3.2, 2, -24));

    //Fifth row
    ball11 = new Ball("ball11", new THREE.MeshPhongMaterial({ map: textureball11 }), new THREE.Vector3(-4.3, 2, -26));
    ball3 = new Ball("ball3", new THREE.MeshPhongMaterial({ map: textureball3 }), new THREE.Vector3(-2.1, 2, -26));
    ball12 = new Ball("ball12", new THREE.MeshPhongMaterial({ map: textureball12 }), new THREE.Vector3(0, 2, -26));
    ball5 = new Ball("ball5", new THREE.MeshPhongMaterial({ map: textureball5 }), new THREE.Vector3(2.1, 2, -26));
    ball10 = new Ball("ball10", new THREE.MeshPhongMaterial({ map: textureball10 }), new THREE.Vector3(4.3, 2, -26));

    //Add balls to ballsArray;
    balls.push(whiteball);
    balls.push(ball1);
    balls.push(ball2);
    balls.push(ball3);
    balls.push(ball4);
    balls.push(ball5);
    balls.push(ball6);
    balls.push(ball7);
    balls.push(ball8);
    balls.push(ball9);
    balls.push(ball10);
    balls.push(ball11);
    balls.push(ball12);
    balls.push(ball13);
    balls.push(ball14);
    balls.push(ball15);


    camera.add(cue);
    cue.position.set(1.7, -0.4, -20);
    cue.rotation.x = -1.55;
    cue.rotation.y = 0;
    cue.rotation.z = 0.1;
    cue.position.applyMatrix4(camera.matrixWorld);

    //Elements need for movement and collision.
    speed = new THREE.Vector3();
    clock = new THREE.Clock();
    speedVariable = 0;

    //Lightning
    scene.add(new THREE.AmbientLight(0x111111, 1));
    var sphere = new THREE.SphereGeometry(0.5, 16, 8);

    //Spotlight 1
    var light1 = new THREE.SpotLight(0xf0f0f0, 0.7, 100, Math.PI * 0.8);
    light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })));
    light1.position.set(8, 48, -16);
    light1.castShadow = true;
    light1.shadow.camera.near = 0.1;
    light1.shadow.camera.far = 1000;
    light1.shadow.mapSize.width = 1024;
    light1.shadow.mapSize.height = 1024;
    lightTarget1 = new THREE.Object3D();
    lightTarget1.position.set(8, -20, -16);
    light1.target = lightTarget1;
    scene.add(lightTarget1);
    scene.add(light1);

    //Spotlight 2
    var light2 = new THREE.SpotLight(0xf0f0f0, 0.7, 100, Math.PI * 0.8);
    light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })));
    light2.position.set(8, 48, 16);
    light2.castShadow = true;
    light2.shadow.camera.near = 0.1;
    light2.shadow.camera.far = 1000;
    light2.shadow.mapSize.width = 1024;
    light2.shadow.mapSize.height = 1024;
    lightTarget2 = new THREE.Object3D();
    lightTarget2.position.set(8, -20, 16);
    light2.target = lightTarget2;
    scene.add(lightTarget2);
    scene.add(light2);

    //Spotlight 3
    var light3 = new THREE.SpotLight(0xf0f0f0, 0.7, 100, Math.PI * 0.8);
    light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })));
    light3.position.set(-8, 48, -16);
    light3.castShadow = true;
    light3.shadow.camera.near = 0.1;
    light3.shadow.camera.far = 1000;
    light3.shadow.mapSize.width = 1024;
    light3.shadow.mapSize.height = 1024;
    lightTarget3 = new THREE.Object3D();
    lightTarget3.position.set(-8, -20, -16);
    light3.target = lightTarget3;
    scene.add(lightTarget3);
    scene.add(light3);

    //Spotlight 4
    var light4 = new THREE.SpotLight(0xf0f0f0, 0.7, 100, Math.PI * 0.8);
    light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })));
    light4.position.set(-8, 48, 16);
    light4.castShadow = true;
    light4.shadow.camera.near = 0.1;
    light4.shadow.camera.far = 1000;
    light4.shadow.mapSize.width = 1024;
    light4.shadow.mapSize.height = 1024;
    lightTarget4 = new THREE.Object3D();
    lightTarget4.position.set(-8, -20, 16);
    light4.target = lightTarget4;
    scene.add(light4);
    scene.add(lightTarget4);

    //Camera positioning
    camera.position.y = 20;
    camera.position.x = 0;
    camera.position.z = 70;
    //camera.lookAt(whiteball.position);
    scene.add(camera);

    //Camera controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.target = new THREE.Vector3(0,whiteball.ball.position.y,0);

    /* Uncomment to show the collision borders
     //Table Borders
     var basicColor = new THREE.MeshPhongMaterial({ color: 0x21aadf });
     //Left border
     var borderLeftBottomHalf = new THREE.Mesh(new THREE.PlaneGeometry(38, 2, 2), basicColor);
     borderLeftBottomHalf.position.set(-23.1,2,20.5);
     borderLeftBottomHalf.rotation.y = Math.PI / 2;
     scene.add(borderLeftBottomHalf);

     var borderLeftTopHalf = new THREE.Mesh(new THREE.PlaneGeometry(37.6, 2, 2), basicColor);
     borderLeftTopHalf.position.set(-23.1,2,-21.2);
     borderLeftTopHalf.rotation.y = Math.PI / 2;
     scene.add(borderLeftTopHalf);

     //Right border
     var borderRightBottomHalf = new THREE.Mesh(new THREE.PlaneGeometry(38, 2, 2), basicColor);
     borderRightBottomHalf.position.set(23.1,2,20.5);
     borderRightBottomHalf.rotation.y = Math.PI / -2;
     scene.add(borderRightBottomHalf);

     var borderRightTopHalf = new THREE.Mesh(new THREE.PlaneGeometry(37.6, 2, 2), basicColor);
     borderRightTopHalf.position.set(23.1,2,-21.2);
     borderRightTopHalf.rotation.y = Math.PI / -2;
     scene.add(borderRightTopHalf);

     //Top border
     var borderTop = new THREE.Mesh(new THREE.PlaneGeometry(41.1, 2, 2), basicColor);
     borderTop.position.set(-0.2,2,-42.2);
     scene.add(borderTop);

     //Bottom border
     var borderBottom = new THREE.Mesh(new THREE.PlaneGeometry(41.1, 2, 2), basicColor);
     borderBottom.position.set(-0.2,2,41.7);
     borderBottom.rotation.y = Math.PI;
     scene.add(borderBottom);*/
}
