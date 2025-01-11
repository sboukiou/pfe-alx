const { createApp, ref ,computed , watch , onMounted} = Vue
createApp({
    setup() {
    const id = ref(1)
    let myChart = null;
    const isSigned = ref(false)
    var tasksDate = []
    const liste = ref([])
    const statu = ref('')
    const idInput = ref('')
    const desInput = ref('')
    const displayArray = ref(true)  
    const displayChart = ref(false)
    const displayStatic = ref(false)
    const isnavSearch = ref(false)
    const displaySpans = ref(true)
    const signInAlert = ref(false)
    const isLoading = ref(true)
    const loginBTN = ref(false)
    const removeMissionsAlert = ref (false)
    const loginFormSwitch = ref(true)
    const signupFormSwitch = ref(false)
    const item = ref({'id':id.value,'statu': statu.value,'description':'','date':''})
    // first list
    const listeTest = [
        {'id':'1','statu': '2','description':'Test 0','date':'2025-01-19'},
        {'id':'2','statu':'0','description':'Test 1','date':'2025-01-19'},
        {'id':'3','statu': '1','description':'Test 2','date':'025-01-19'},
        
     ]
    const status = ref([
        {'key':0, 'text': 'Waiting'},
        {'key':1, 'text': 'InProgress'},
        {'key':2, 'text': 'Done'},
        {'key':3, 'text': 'Canceled'},
    ])
    const signInUser = ref('')
    const signInPass = ref('')
    const signingInfo = {'username':'admin','password':'admin'}
    const histortyList = ref([])
    const rememberBtn = ref(false)
    const placeHolderUsr = ref('Enter a valid username')
    const placeHolderPass = ref('Enter a valid password')
    function toLoginForm() {
        loginFormSwitch.value = true
        signupFormSwitch.value = false
    }
    function toSignupForm() {
        loginFormSwitch.value = false
        signupFormSwitch.value = true
    }
    function rememberMe() {
        if(rememberBtn.value == false){
            signInUser.value = signingInfo.username
            signInPass.value = signingInfo.password
            placeHolderUsr.value = ""
            placeHolderPass.value = ""
        }
        else {
            signInUser.value = ''
            signInPass.value = ''
            placeHolderUsr.value = "Enter a valid username"
            placeHolderPass.value = "Enter a valid password"
        }
    }
    function singinFunc(){
        if (signInUser.value == signingInfo.username){
        if(signInPass.value == signingInfo.password) {
            loginBTN.value = true
            setTimeout(()=>{
                isSigned.value = true
            },"2000");
        }
        else {
            signInAlert.value = true
            isSigned.value = false
        }
        }
        else{
        signInAlert.value = true
        isSigned.value = false
        }

    }
    function logout(){
        isSigned.value = !isSigned.value
        signInUser.value = ''
        signInPass.value = ''
        loginBTN.value = false
    }
    function uploadListe(){
        liste.value = listeTest
        emptyItem()
        id.value = 4
        idInput.value = id.value
        updateCalendar()
        uploadHistory()
        graph()
    }
    // add function
    function additem(){
        ++id.value
        const existinId = liste.value.filter((oneItem) => oneItem.id === item.value.id)
        if(existinId.length != item.value.id){
            if (item.value.description === '') {
                Swal.fire({
                    title: 'Warning',
                    text: 'There is no description please try again !',
                    icon: 'warning',
                })
                id.value = 1
            }
            // if (statu.value == null) {
            //     Swal.fire({
            //         title: 'Warning',
            //         text: 'The statu is empty please try again !',
            //         icon: 'warning',
            //     })
            //     emptyItem()
            // }
            else{
                 liste.value.push(item.value)
                // histortyList.value.push(item.value)
                updateCalendar()
                Swal.fire({
                    title: 'Added',
                    text: 'Task Added with success',
                    icon: 'success',
                })
            }
        }
        else{
        emptyItem()
        Swal.fire({
            title: 'Error',
            text: 'Please change the ID of task',
            icon: 'error',
        })
        }
        emptyItem()
        graph()
    }
    function emptyItem(){
        item.value = {'id':id.value,'description':'','status': '','date':''}
    }
    function emptyId(){
        item.value.id = ''
    }
    function emptyDescription(){
        item.value.description = ''
    }
    function Delete(){
        liste.value = []
        updateCalendar()
        id.value = 1
        setTimeout(()=>{
            removeMissionsAlert.value = true
        },"2000");
    }
    function preDelete(id) {
        item.value = id
    }
    function deleteItem(){
        liste.value = liste.value.filter((row)=> row.id != item.value) 
        updateCalendar() 
    }
    function editTodo(edit) {
        item.value = edit
        updateCalendar()
    }
    function showItem(i){
        item.value = i
    }
    const total = computed(()=> {
        return liste.value.length
    })
    const waiting = computed(()=> {
        return liste.value.filter((item)=> item.statu == 0).length
    })
    const inProgress = computed(()=> {
        return liste.value.filter((item)=> item.statu ==1).length
    })
    const done = computed(()=> {
        return liste.value.filter((item)=> item.statu == 2).length
    })
    const canceled = computed(()=> {
        return liste.value.filter((item)=> item.statu == 3).length
    })
    function searchId(id){
        liste.value = liste.value.filter((item)=> item.id == id)
    }
    function searchDes(description){
        liste.value = liste.value.filter((item)=> item.description.toLowerCase().includes(description.toLowerCase()))
    }
    function searchStatu(statuu){
        liste.value = liste.value.filter((item)=> item.statu == statuu)
    }
    function getStatus(key){
        return status.value.filter((st)=> st.key == key)[0].text
    }
    function displayArraay(){
        displayArray.value = true
        displayChart.value = false
        displayStatic.value = false
        displaySpans.value = true
    }
    function displayGraphic(){
        displayChart.value = true
        displayArray.value = false
        displayStatic.value = false
        displaySpans.value = false
        graph()
    }
    function graph() {
        // Create a new chart if displayChart is true
        if (displayChart.value) {
            const labels = [];
            status.value.forEach((i,index)=> labels.push(i.text));
            const data = [waiting.value, inProgress.value, done.value, canceled.value];
            const ctx = document.getElementById('charts').getContext('2d');
            
            // If myChart already exists, update its data and options
            if (myChart) {
                myChart.data.labels = labels;
                myChart.data.datasets[0].data = data;
                myChart.update();
            } else {
                // Otherwise, create a new chart
                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Tasks status',
                            backgroundColor: [
                                'rgb(59, 113, 202)',
                                'rgb(25, 183, 165)',
                                'rgb(20, 164, 77)',
                                'rgb(180, 70, 88)',
                            ],
                            borderColor: [
                                'rgb(59, 113, 202)',
                                'rgb(25, 183, 165)',
                                'rgb(20, 164, 77)',
                                'rgb(180, 70, 88)',
                            ],
                            borderWidth: 1,
                            data: data,
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
    }
    watch([waiting, inProgress, done, canceled, displayChart], ([newWaiting, newInProgress, newDone, newCanceled, newDisplayChart]) => {
        if (newDisplayChart) {
            const labels = [];
            status.value.forEach((i,index)=> labels.push(i.text));
            const data = [newWaiting, newInProgress, newDone, newCanceled];
            const ctx = document.getElementById('charts').getContext('2d');
            
            if (myChart) {
                myChart.data.labels = labels;
                myChart.data.datasets[0].data = data;
                myChart.update();
            } else {
                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Tasks status',
                            backgroundColor: [
                                'rgb(59, 113, 202)',
                                'rgb(25, 183, 165)',
                                'rgb(20, 164, 77)',
                                'rgb(180, 70, 88)',
                            ],
                            borderColor: [
                                'rgb(59, 113, 202)',
                                'rgb(25, 183, 165)',
                                'rgb(20, 164, 77)',
                                'rgb(180, 70, 88)',
                            ],
                            borderWidth: 1,
                            data: data,
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        } else {
            // Hide or remove the chart here if needed
            // For simplicity, we'll remove the chart element
            if (myChart) {
                myChart.destroy();
                myChart = null;
            }
        }
    });    
    function displayCalendar(){
        displayArray.value = false
        displayChart.value = false
        displaySpans.value = true
        displayStatic.value = true
        tasksDate = []
                    liste.value.forEach(item =>{
                    tasksDate.push({
                        id : item.id, // Event's ID (required)
                        name : item.description, // Event name (required)
                        date: item.date, // Event date (required)
                        type : "event", // Event type (required)
                    })
    })
        $("#calendar").evoCalendar({
        calendarEvents: tasksDate ,
        'language':'en',
        'eventHeaderFormat':'yyyy MM dd'
        });
    }
    function updateCalendar() {
        tasksDate = [];
        liste.value.forEach(item => {
            tasksDate.push({
                id: item.id, // Event's ID (required)
                name: item.description, // Event name (required)
                date: item.date, // Event date (required)
                type: "event", // Event type (required)
            });
        });
    
        // Destroy and reinitialize the calendar with updated events
        $("#calendar").evoCalendar('destroy');
        $("#calendar").evoCalendar({
            calendarEvents: tasksDate,
            language: 'en',
            eventHeaderFormat: 'yyyy MM dd',
        });
    }
    
    
    function searchButton(){
        isnavSearch.value = !isnavSearch.value
    }

    function uploadHistory() {
        histortyList.value = listeTest
    }
    return {
        liste,item,additem,emptyItem,status,Delete,emptyId,emptyDescription,total,deleteItem,showItem,statu,listeTest,uploadListe,waiting,
        inProgress,done,canceled,searchId,idInput,searchDes,getStatus,desInput,isSigned,signingInfo,signInUser,signInPass,singinFunc,logout,
        searchStatu,displayChart,displayArray,displayGraphic,displayArraay,displayStatic,displayCalendar,tasksDate,id,isnavSearch,searchButton,
        editTodo,displaySpans,signInAlert,graph,histortyList,uploadHistory,myChart,isLoading, rememberBtn,rememberMe,loginBTN,placeHolderPass,placeHolderUsr,loginFormSwitch,signupFormSwitch,toLoginForm,toSignupForm,preDelete,updateCalendar
    }
    }
}).mount('#app')