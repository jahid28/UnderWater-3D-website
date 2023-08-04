

    // var body = document.body,
    //     html = document.documentElement;

    // var height = Math.max(body.scrollHeight, body.offsetHeight,
        // html.clientHeight, html.scrollHeight, html.offsetHeight);

    // document.getElementById("body").style.height = `${height}px`
    // document.getElementById("html").style.overflow = "hidden"

    document.addEventListener('mousemove', function (e) {
        document.getElementById("cursor").style.left = e.clientX + "px"
        document.getElementById("cursor").style.top = e.clientY + "px"

    })

 

    window.addEventListener("scroll", function (e) {
        y = window.pageYOffset
        // console.log((y / 7 - 100) )
        if ((y / 7 - 100) <= 0) {

            document.querySelector('.text').style.left = (y / 7 - 100) + 'vw'
            document.querySelector('.text').style.position = 'fixed'
            document.getElementById('empty').style.display = 'block'
            document.getElementById('header').style.position = 'fixed'

        }
        else {
            document.querySelector('.text').style.position = 'relative'
            document.querySelector('.text').style.left = '0vw'
            document.querySelector('.text').style.top = '0vh'
            document.getElementById('empty').style.display = 'none'
            document.getElementById('header').style.position = 'relative'

        }
    })



    document.querySelectorAll(".hoverEffect").forEach((e) => {
        e.addEventListener("mouseover", function () {

            document.getElementById('body').style.cursor = 'none'
            document.getElementById("cursor").style.backgroundColor = 'black'
            document.getElementById("cursor").innerText = 'Click'
            // document.getElementById("cursor").style.mixBlendMode = 'difference'
            document.getElementById("cursor").style.transform = 'translate(-50%, -50%) scale(4)'
            document.getElementById("cursor").style.border = 'none'


        })
    })
    document.querySelectorAll(".hoverEffect").forEach((e) => {
        e.addEventListener("mouseleave", function () {

            document.getElementById('body').style.cursor = 'auto'
            document.getElementById("cursor").style.backgroundColor = 'transparent'
            document.getElementById("cursor").innerText = ''
            // document.getElementById("cursor").style.mixBlendMode = 'normal'
            document.getElementById("cursor").style.transform = 'translate(-50%, -50%) scale(1)'
            document.getElementById("cursor").style.border = '1px solid white'

        })
    })
    document.querySelectorAll(".closeBtn").forEach((e) => {
        e.addEventListener("mouseover", function () {

            document.getElementById('body').style.cursor = 'none'
            document.getElementById("cursor").style.backgroundColor = 'black'
            document.getElementById("cursor").innerText = 'Close'
            // document.getElementById("cursor").style.mixBlendMode = 'difference'
            document.getElementById("cursor").style.transform = 'translate(-50%, -50%) scale(4)'
            document.getElementById("cursor").style.border = 'none'


        })
    })
    document.querySelectorAll(".closeBtn").forEach((e) => {
        e.addEventListener("mouseleave", function () {

            document.getElementById('body').style.cursor = 'auto'
            document.getElementById("cursor").style.backgroundColor = 'transparent'
            document.getElementById("cursor").innerText = ''
            // document.getElementById("cursor").style.mixBlendMode = 'normal'
            document.getElementById("cursor").style.transform = 'translate(-50%, -50%) scale(1)'
            document.getElementById("cursor").style.border = '1px solid white'

        })
    })


    document.querySelectorAll(".difference").forEach((e) => {
        e.addEventListener("mouseover", function () {

            document.getElementById('body').style.cursor = 'none'
            document.getElementById("cursor").style.background = 'white'
            document.getElementById("cursor").style.mixBlendMode = 'difference'
            document.getElementById("cursor").style.transform = 'translate(-50%, -50%) scale(4)'


        })
    })
    document.querySelectorAll(".difference").forEach((e) => {
        e.addEventListener("mouseleave", function () {

            document.getElementById('body').style.cursor = 'auto'
            document.getElementById("cursor").style.background = 'transparent'
            document.getElementById("cursor").style.mixBlendMode = 'normal'
            document.getElementById("cursor").style.transform = 'translate(-50%, -50%) scale(1)'

        })
    })

    document.querySelectorAll(".parts").forEach((e) => {

        e.addEventListener("click", function () {
            document.getElementById("html").style.overflow = "hidden"
            document.getElementById(`${e.id}Fact`).style.animation = "fact 1 ease-in-out 2s"
            document.getElementById("plant1").style.transform = 'rotate(30deg)'
            document.getElementById("plant2").style.transform = 'rotate(-30deg)'

            setTimeout(() => {
                document.getElementById(`${e.id}Fact`).style.top = '0vh'
            }, 2000)

        })
    })
    document.querySelectorAll(".closeBtn").forEach((e) => {
        e.addEventListener("click", function () {

            document.getElementById("plant1").style.transform = 'rotate(-90deg)'
            document.getElementById("plant2").style.transform = 'rotate(90deg)'
            document.getElementById("html").style.overflowY = "scroll"

            document.querySelectorAll(".facts").forEach((e) => {
                e.style.animation = "none"
                e.style.top = '-100vh'

            })
        })
    })

    document.getElementById('close').addEventListener("click",function(){
        document.getElementById('info').style.display='none'
    })




    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas").appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000000);
    camera.position.set(0, 0, 0)
    camera.lookAt(0, 0, 0)




    const orbit = new THREE.OrbitControls(camera, renderer.domElement)
    // orbit.update()
    orbit.enabled = false;


    const ambientLight = new THREE.AmbientLight(0x333333)
    scene.add(ambientLight)


    const spotLight = new THREE.SpotLight('white')
    scene.add(spotLight)
    spotLight.position.set(30, 40, 0)
    // const spotLightHelper = new THREE.SpotLightHelper(spotLight)
    // scene.add(spotLightHelper)

    // const axisHelper = new THREE.AxisHelper(5000)
    // scene.add(axisHelper)

    const spotLight2 = new THREE.SpotLight('white')
    scene.add(spotLight2)
    spotLight2.position.set(-20, 20, 0)
    // const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2)
    // scene.add(spotLightHelper2)










    const loadingManager = new THREE.LoadingManager()



    const vehicle = new YUKA.Vehicle();

    function sync(entity, renderComponent) {
        renderComponent.matrix.copy(entity.worldMatrix);
    }

    const path = new YUKA.Path();
    path.add(new YUKA.Vector3(50, -50, 0));
    path.add(new YUKA.Vector3(-50, -50, 0));
    path.loop = true;


    vehicle.position.copy(path.current());

    vehicle.maxSpeed = 20;

    const followPathBehavior = new YUKA.FollowPathBehavior(path, 0.5);
    vehicle.steering.add(followPathBehavior);

    const entityManager = new YUKA.EntityManager();
    entityManager.add(vehicle);


    // const vehicle2 = new YUKA.Vehicle();


    // const path2 = new YUKA.Path();
    // path2.add(new YUKA.Vector3(500, -500, 0));
    // path2.add(new YUKA.Vector3(-500, -500, 0));
    // path2.loop = true;


    // vehicle2.position.copy(path2.current());

    // vehicle2.maxSpeed = 20;

    // const followPathBehavior2 = new YUKA.FollowPathBehavior(path2, 0.5);
    // vehicle2.steering.add(followPathBehavior2);

    // const entityManager2 = new YUKA.EntityManager();
    // entityManager2.add(vehicle2);


    const loader = new THREE.GLTFLoader(loadingManager);

    // let toySubmarine
    // loader.load('./ToySubmarine/scene.gltf', function (gltf) {
    //     // const toySubmarine = gltf.scene
    //     toySubmarine = gltf.scene
    //     // models[1]=model
    //     scene.add(toySubmarine);
    //     toySubmarine.scale.set(1, 1, 1);
    //     toySubmarine.position.set(0, -1, 0)
    //     toySubmarine.visible = true


    //     // animate();

    // })



    let mixer
    // mixer[0]=9
    let swimmer
    loader.load('./swimmer/scene.gltf', function (gltf) {
        const model = gltf.scene
        swimmer = gltf.scene
        // models[0] = model
        scene.add(model);

        // swimmer.visible = false

        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations
        const clip = THREE.AnimationClip.findByName(clips, 'Take 01')
        const action = mixer.clipAction(clip)
        action.play()

        model.matrixAutoUpdate = false;
        vehicle.scale = new YUKA.Vector3(1, 1, 1);
        vehicle.position = new YUKA.Vector3(0, -100, 0);
        vehicle.setRenderComponent(model, sync);


    });

    const tl = gsap.timeline()

    let mixer2
    let whale
    loader.load('./Whale/scene.gltf', function (gltf) {
        const model = gltf.scene
        whale = gltf.scene
        // models[1]=model
        scene.add(model);
        model.scale.set(.1, .1, .1);
        model.position.set(0, -200, 0)

        mixer2 = new THREE.AnimationMixer(model);
        const clips = gltf.animations
        const clip = THREE.AnimationClip.findByName(clips, 'Swimming')
        const action = mixer2.clipAction(clip)
        action.play()

    });


    let sub
    loader.load('./Submarine/scene.gltf', function (gltf) {
        const model = gltf.scene
        sub = gltf.scene
        // models[1]=model
        scene.add(model);
        model.scale.set(.03, .03, .03);
        model.position.set(0, -400, 0)

        // model.matrixAutoUpdate = false;
        // vehicle2.scale = new YUKA.Vector3(.03, .03, .03);
        // vehicle2.position = new YUKA.Vector3(0, -400, 0);
        // vehicle2.setRenderComponent(model, sync);
    });

    let titanic
    loader.load('./Titanic/scene.gltf', function (gltf) {
        const model = gltf.scene
        titanic = gltf.scene
        // models[1]=model
        scene.add(model);
        model.scale.set(.01, .01, .01);
        model.position.set(0, -600, 0)
    });

    let sub4
    loader.load('./Submarine4/scene.gltf', function (gltf) {
        const model = gltf.scene
        sub4 = gltf.scene
        // models[1]=model
        scene.add(model);
        model.scale.set(10, 10, 10);
        model.position.set(0, -800, 0)



    });


    loadingManager.onProgress = function (url, loaded, total) {
        x = Math.ceil((loaded / total) * 100)

        document.getElementById('loadingCont').style.display = 'grid'
        document.getElementById('loading').innerText = `${x}%`
        // document.getElementById("html").style.overflowY = "hidden"
    }


    loadingManager.onLoad = function () {
        setTimeout(() => {
            document.getElementById('loadingCont').style.display = 'none'
            // document.getElementById("html").style.overflowY = "scroll"

        }, 1000)
    }



    const time = new YUKA.Time();

    const clock = new THREE.Clock()
    const clock2 = new THREE.Clock()

    anime0 = document.getElementById('under')
    anime1 = document.getElementById('swimmer')
    anime2 = document.getElementById('whale')
    anime3 = document.getElementById('sub')
    anime4 = document.getElementById('mz')
    anime5 = document.getElementById('titanic')
    anime6 = document.getElementById('hz')
    anime7 = document.getElementById('dh')
    anime8 = document.getElementById('cd')

    const observer = new IntersectionObserver(
        (enteries) => {
            if (enteries[0].target.id == 'under' && enteries[0].isIntersecting) {

                // tl.to(camera.position, {
                //     x: 0,
                //     y: 0,
                //     z: 0,
                //     duration: 1,
                //     onUpdate: function () {
                //         camera.lookAt(0, 0, 0)
                //     }
                // })
                // camera.position.set(6, 2, 6)
                // camera.lookAt(0, 0, 0)
                camera.position.set(0, -1000, 0)
                camera.lookAt(0, -1000, 0)
                // swimmer.visible = false

            }
            if (enteries[0].target.id == 'swimmer' && enteries[0].isIntersecting) {

                // swimmer.visible = true
                document.getElementById("swimmer").style.opacity = 1
                camera.position.set(0, -40, -20)
                camera.lookAt(0, -40, 0)
            }
            if (enteries[0].target.id == 'whale' && enteries[0].isIntersecting) {

                document.getElementById("whale").style.opacity = 1

                camera.position.set(90, -200, 30)
                camera.lookAt(0, -200, 0)

            }
            if (enteries[0].target.id == 'sub' && enteries[0].isIntersecting) {

                document.getElementById("sub").style.opacity = 1

                camera.position.set(100, -400, 0)
                camera.lookAt(0, -400, 0)
                // camera.position.set(80, -400, -120)
                // camera.lookAt(0, -400, 0)

            }
            if (enteries[0].target.id == 'mz' && enteries[0].isIntersecting) {

                document.getElementById("mz").style.opacity = 1

                camera.position.set(0, -1000, 0)
                camera.lookAt(0, -1000, 0)

            }
            if (enteries[0].target.id == 'titanic' && enteries[0].isIntersecting) {


                document.getElementById("titanic").style.opacity = 1

                camera.position.set(-25, -580, 15)
                camera.lookAt(-25, -580, 0)

            }
            if (enteries[0].target.id == 'hz' && enteries[0].isIntersecting) {


                document.getElementById("hz").style.opacity = 1

                camera.position.set(0, -1000, 0)
                camera.lookAt(0, -1000, 0)

            }
            if (enteries[0].target.id == 'dh' && enteries[0].isIntersecting) {


                document.getElementById("dh").style.opacity = 1

                camera.position.set(-40, -790, 20)
                camera.lookAt(0, -790, 0)

            }
            if (enteries[0].target.id == 'cd' && enteries[0].isIntersecting) {


                document.getElementById("cd").style.opacity = 1

                camera.position.set(0, -1000, 0)
                camera.lookAt(0, -1000, 0)

            }



        },

        {
            root: null,
            threshold: 0,
        }
    );
    observer.observe(anime0);
    observer.observe(anime1);
    observer.observe(anime2);
    observer.observe(anime3);
    observer.observe(anime4);
    observer.observe(anime5);
    observer.observe(anime6);
    observer.observe(anime7);
    observer.observe(anime8);


    function animate() {

        if (mixer) {
            mixer.update(clock.getDelta())

        }
        if (mixer2) {
            mixer2.update(clock2.getDelta())

        }
        // if (toySubmarine) {

        //     toySubmarine.rotation.y += .02
        // }
        if (whale) {

            whale.rotation.y += .005
        }
        if (sub) {

            sub.rotation.y += .005
        }
        
        if (sub4) {

            sub4.rotation.y += .01
        }

        const delta = time.update().getDelta();
        entityManager.update(delta);
        // entityManager2.update(delta);
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }
    setTimeout(() => {
        animate()
    }, 1000)


    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });


    // $('.ripple').ripples({
    //     resolution: 1000,
    //     dropRadius: 10,
    //     perturbance: .01,
    // })