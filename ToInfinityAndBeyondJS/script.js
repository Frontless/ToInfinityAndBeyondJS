const textCount = document.querySelector(".textCount");

let scene, camera, renderer, starGeo,stars;

let Property = {
    count: 6000,
    velocity: 0,
    acceleration: 0.02
}


function init(){
    scene = new THREE.Scene();
    starGeo = new THREE.Geometry();
    // PerspectiveCamera(fov(시야각): Number, aspect(비율): Number, near(근): Number, far(원): Number)
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/ window.innerHeight,1, 1000);
    camera.position.z = 1;
    camera.rotation.x  =Math.PI/2;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize, false);
    textCount.addEventListener("input", InputCount);

    GetProperty();
    
}


function CreateStars(){    
    starGeo = new THREE.Geometry();
    for(let i=0;i<Property.count;i++){
        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        star.velocity = Property.velocity;
        star.acceleration = Property.acceleration;
        starGeo.vertices.push(star);
    }
}
function SetStarsProperty(){
    let sprite = new THREE.TextureLoader().load('./star.png');
    let starMaterial = new THREE.PointsMaterial({
        color:0xaaaaaa,
        size:0.7,
        map:sprite
    });
    stars = new THREE.Points(starGeo,starMaterial);
}
function AddScene(ObjectToScene){
    scene.add(ObjectToScene);
}
function animate(){
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration;
        p.y -= p.velocity;
        if(p.y < -200){
            p.y = 200;
            p.velocity = 0;
        }

    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += 0.002;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function InputCount(event){
    Property.count = event.target.value;
    RerenderingGeo();

}

function RerenderingGeo(){
    starGeo.dispose();
    stars = null;
    CreateStars();    
    SetStarsProperty();
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
    AddScene(stars);
}
function removeZero(value){
    let newValue = value;
    let index = 0;
    if(!value.includes('.')){
        for(const v of value){
            if(parseInt(v) !== 0){
                break;
            }
            else{       
                index++;         
            }
            
        }
    }
    console.log(parseInt(value));
    newValue = value.substring(index,value.length);
    return newValue;
}
function GetProperty(){
    textCount.value = Property.count;

}

function Excution(){
    init();
    CreateStars();
    SetStarsProperty();
    AddScene(stars);
    animate();
}

Excution();