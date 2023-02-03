console.log("Welcome to Spomtify!");
//initialise variables
let songIndex = 0;
let audioElement = new Audio('songs/lovestory.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Love Story - Taylor Swift", filePath: "songs/lovestory.mp3", coverPath: "covers/lovestoryc.jpg", ticker: "lovestory"},
    {songName: "Mine - Taylor Swift", filePath: "songs/mine.mp3", coverPath: "covers/minec.jpg", ticker: "mine"},
    {songName: "Bala Nacho Toh Dekhi - BengaliFolk", filePath: "songs/bala.mp3", coverPath: "covers/balac.jpg", ticker:"bala"},
    {songName: "Shree Raghuveer ki Vanar Sena", filePath: "songs/ramayan.mp3", coverPath: "covers/ramayanc.jpg", ticker: "ramayan"},
    {songName: "Bones (The Boys) - Imagine Dragons", filePath: "songs/bones.mp3", coverPath: "covers/bonesc.jpg", ticker: "bones"},
    {songName: "Tere Liye - Veer Zaara", filePath: "songs/tereliye.mp3", coverPath: "covers/tereliyec.jpg", ticker:"tereliye"},
    {songName: "Aarambh Hai Prachand - Hindutva", filePath: "songs/aarambh.mp3", coverPath: "covers/aarambhc.jpg", ticker:"aarambh"},
    {songName: "Khalibali - Padmaavat", filePath: "songs/khalibali.mp3", coverPath: "covers/khalibalic.jpg", ticker:"khalibali"},
]
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();
//Handle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})
progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = songs.map(x => x.ticker).indexOf(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 7){songIndex = 0;}
    else {songIndex += 1;} 
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){songIndex = 7;}
    else{ songIndex -= 1;}
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-circle-pause');
})