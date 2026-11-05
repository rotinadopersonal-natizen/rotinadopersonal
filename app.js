
/* ---------- Dados fixos ---------- */
const MUSCLES = {
  peit:{n:"Peitoral",c:"G",r:"MMSS"}, cost:{n:"Dorsal",c:"G",r:"MMSS"}, delt:{n:"Ombro (deltoide)",c:"G",r:"MMSS"},
  trap:{n:"Trapézio",c:"P",r:"MMSS"}, tri:{n:"Tríceps",c:"P",r:"MMSS"}, bic:{n:"Bíceps",c:"P",r:"MMSS"}, antb:{n:"Antebraço (braquiorradial)",c:"P",r:"MMSS"},
  core:{n:"Reto do abdômen",c:"C",r:"Core"}, obliq:{n:"Oblíquos",c:"C",r:"Core"}, lomb:{n:"Lombar (eretores e quadrado lombar)",c:"C",r:"Core"},
  quad:{n:"Quadríceps",c:"G",r:"MMII"}, glut:{n:"Glúteos",c:"G",r:"MMII"}, isq:{n:"Isquiotibiais",c:"G",r:"MMII"},
  adu:{n:"Adutores",c:"P",r:"MMII"}, pant:{n:"Gastrocnêmio",c:"P",r:"MMII"}, soleo:{n:"Sóleo",c:"P",r:"MMII"}
};
const CAT = {G:"Grandes",M:"Médios",P:"Pequenos",C:"Core"};
const PHASES = {
 0:{k:"0",t:"Semana 0",n:"Avaliação",dur:"1 semana",sets:[1,2],reps:[12,15],rir:"4+",
    method:"1 a 2 séries por exercício, sobrando 4 ou mais repetições.",
    goal:"Registrar a carga para 15 repetições sobrando 3 a 4, a execução, a mobilidade e a consciência corporal."},
 1:{k:"1",t:"Fase 1",n:"Adaptação",dur:"4 a 6 semanas · avance quando a técnica estiver estável",sets:[2,3],reps:[12,15],rir:"3–4",
    method:"Cadência 3\" na excêntrica e isometria.",
    goal:"",
    adv:"Avança quando: 2 semanas seguidas com técnica estável e topo das repetições batido."},
 2:{k:"2",t:"Fase 2",n:"Construção",dur:"4 a 6 semanas · avance quando o aluno progredir bem nas cargas · pode repetir",sets:[3,4],reps:[8,15],rir:"1–3",
    method:"Progressão dupla. Bi-set e tri-set.",
    goal:"",
    adv:"Progressão dupla: bateu o topo em todas as séries, sobe a carga (até 5%)."},
 3:{k:"3",t:"Fase 3",n:"Intensificação",dur:"opcional · 4 semanas costumam ser ótimas, dependendo do nível do aluno",sets:[3,4],reps:[8,10],rir:"0–2",
    method:"Mais métodos avançados, incluindo bi-set do mesmo músculo.",
    goal:"Só para intermediários e avançados. Mesmo número de exercícios da Fase 2."},
 4:{k:"4",t:"Fase 4",n:"Recuperação",dur:"1 semana, quando o aluno precisar",sets:[1,2],reps:[10,15],rir:"3–4",
    method:"Menos peso e menos séries, descanso de 90\" a 2'.",
    goal:"Sinais: queda de desempenho em 2 sessões seguidas, dor articular persistente, doença ou viagem. Opcional a cada 8 a 12 semanas."}
};
const OB_ADJ=["A Fase 1 costuma durar mais: avance só quando a técnica estiver estável, sem dor articular e com boa recuperação entre os treinos","Manter 3 a 4 repetições sobrando por mais tempo","Priorizar máquinas e exercícios apoiados ou sentados","Evitar impacto e muito tempo em pé","Circuito alternando MMSS e MMII, com 30 a 60\" de descanso","Dropset e rest-pause só depois da Fase 2 bem tolerada","Progredir o número de séries antes da intensidade"];
const EXR={G:[2,4],P:[1,3]}; const EXM=[EXR.G[0]+EXR.P[0],EXR.G[1]+EXR.P[1]];
const memSes=p=>[EXM[0]*p.sets[0],EXM[1]*p.sets[1]];
const phT=st=> (PHASES[st.phase]||PHASES[1]).t;
const phK=st=> (PHASES[st.phase]||PHASES[1]).k;
const LIB = [
 {id:"agach",n:"Agachamento livre",t:"multi",m:{quad:1,glut:1,adu:.5}},
 {id:"legpress",n:"Leg press 45°",t:"multi",m:{quad:1,glut:.5,adu:.5}},
 {id:"hack",n:"Hack squat",t:"multi",m:{quad:1,glut:.5}},
 {id:"bulgaro",n:"Agachamento búlgaro",t:"multi",m:{quad:1,glut:1},u:1},
 {id:"afundo",n:"Afundo / passada",t:"multi",m:{quad:1,glut:1},u:1},
 {id:"extensora",n:"Cadeira extensora",t:"mono",m:{quad:1}},
 {id:"hipthrust",n:"Elevação pélvica (hip thrust)",t:"mono",m:{glut:1,isq:.5}},
 {id:"abdutora",n:"Cadeira abdutora",t:"mono",m:{glut:1}},
 {id:"stiff",n:"Stiff / RDL",t:"mono",m:{isq:1,glut:1}},
 {id:"flexsent",n:"Cadeira flexora sentada",t:"mono",m:{isq:1}},
 {id:"flexdeit",n:"Mesa flexora deitada",t:"mono",m:{isq:1}},
 {id:"adutora",n:"Cadeira adutora",t:"mono",m:{adu:1}},
 {id:"pantpe",n:"Panturrilha em pé",t:"mono",m:{pant:1}},
 {id:"pantsent",n:"Panturrilha sentado (sóleo)",t:"mono",m:{soleo:1}},
 {id:"supreto",n:"Supino reto",t:"multi",m:{peit:1,tri:.5,delt:.5}},
 {id:"supincl",n:"Supino inclinado com halteres",t:"multi",m:{peit:1,tri:.5,delt:.5}},
 {id:"supuni",n:"Supino unilateral no cabo",t:"multi",m:{peit:1,tri:.5,delt:.5},u:1},
 {id:"crucifixo",n:"Crucifixo / peck deck",t:"mono",m:{peit:1}},
 {id:"cross",n:"Crossover",t:"mono",m:{peit:1}},
 {id:"puxada",n:"Puxada frente",t:"multi",m:{cost:1,bic:.5}},
 {id:"remadab",n:"Remada baixa",t:"multi",m:{cost:1,bic:.5,trap:.5}},
 {id:"remadauni",n:"Remada unilateral com halter",t:"multi",m:{cost:1,bic:.5},u:1},
 {id:"pulldown",n:"Pulldown braço estendido",t:"mono",m:{cost:1}},
 {id:"desenv",n:"Desenvolvimento",t:"multi",m:{delt:1,tri:.5}},
 {id:"elevlat",n:"Elevação lateral",t:"mono",m:{delt:1}},
 {id:"crucinv",n:"Crucifixo inverso",t:"mono",m:{delt:1,trap:.5}},
 {id:"encolh",n:"Encolhimento",t:"mono",m:{trap:1}},
 {id:"roscad",n:"Rosca direta",t:"mono",m:{bic:1}},
 {id:"roscam",n:"Rosca martelo",t:"mono",m:{bic:1,antb:1}},
 {id:"roscainv",n:"Rosca inversa (pegada pronada)",t:"mono",m:{antb:1,bic:.5}},
 {id:"tricorda",n:"Tríceps na polia (corda)",t:"mono",m:{tri:1}},
 {id:"trifrances",n:"Tríceps francês (acima da cabeça)",t:"mono",m:{tri:1}},
 {id:"prancha",n:"Prancha ventral (anti-extensão)",t:"core",m:{core:1,obliq:.5}},
 {id:"abdsupra",n:"Abdominal supra",t:"core",m:{core:1}},
 {id:"abdinfra",n:"Abdominal infra",t:"core",m:{core:1,obliq:.3}},
 {id:"exttronco",n:"Extensão de tronco (lombar)",t:"core",m:{lomb:1,glut:.3}},
 {id:"pallof",n:"Pallof press (anti-rotação)",t:"core",m:{obliq:1}},
 {id:"pranchalat",n:"Prancha lateral (anti-flexão lateral)",t:"core",m:{obliq:1,lomb:.5}},
 {id:"deadbug",n:"Dead bug",t:"core",m:{core:1}},
 {id:"abdcabo",n:"Abdominal no cabo",t:"mono",m:{core:1}},
 {id:"abdobl",n:"Abdominal oblíquo (bicicleta)",t:"core",m:{obliq:1,core:.5}},
 {id:"extlomb",n:"Extensão lombar (banco romano)",t:"core",m:{lomb:1,glut:.5}},
 {id:"agfront",n:"Agachamento frontal",t:"multi",m:{quad:1,glut:0.5}},
 {id:"agsumo",n:"Agachamento sumô",t:"multi",m:{quad:1,glut:1,adu:1}},
 {id:"agcalice",n:"Agachamento cálice (goblet)",t:"multi",m:{quad:1,glut:0.5}},
 {id:"agsmith",n:"Agachamento no smith",t:"multi",m:{quad:1,glut:0.5}},
 {id:"agbox",n:"Agachamento no banco (box squat)",t:"multi",m:{quad:1,glut:1}},
 {id:"agpend",n:"Agachamento pêndulo",t:"multi",m:{quad:1,glut:0.5}},
 {id:"belt",n:"Belt squat",t:"multi",m:{quad:1,glut:0.5}},
 {id:"lphoriz",n:"Leg press horizontal",t:"multi",m:{quad:1,glut:0.5}},
 {id:"lpuni",n:"Leg press unilateral",t:"multi",m:{quad:1,glut:0.5},u:1},
 {id:"sissy",n:"Agachamento sissy",t:"mono",m:{quad:1}},
 {id:"extuni",n:"Cadeira extensora unilateral",t:"mono",m:{quad:1},u:1},
 {id:"afrev",n:"Afundo reverso",t:"multi",m:{quad:1,glut:1},u:1},
 {id:"afcam",n:"Passada andando (walking lunge)",t:"multi",m:{quad:1,glut:1},u:1},
 {id:"afsmith",n:"Afundo no smith",t:"multi",m:{quad:1,glut:1},u:1},
 {id:"stepup",n:"Subida no banco (step-up)",t:"multi",m:{quad:1,glut:1},u:1},
 {id:"aglat",n:"Afundo lateral",t:"multi",m:{quad:1,glut:0.5,adu:1},u:1},
 {id:"hipuni",n:"Elevação pélvica unilateral",t:"mono",m:{glut:1,isq:0.5},u:1},
 {id:"hipmaq",n:"Elevação pélvica na máquina",t:"mono",m:{glut:1,isq:0.5}},
 {id:"ponte",n:"Ponte de glúteo no solo",t:"mono",m:{glut:1,isq:0.3}},
 {id:"coice",n:"Glúteo no cabo (coice)",t:"mono",m:{glut:1},u:1},
 {id:"glutmaq",n:"Glúteo na máquina (4 apoios)",t:"mono",m:{glut:1},u:1},
 {id:"abdcabo2",n:"Abdução de quadril no cabo",t:"mono",m:{glut:1},u:1},
 {id:"abdelast",n:"Abdução com elástico (passada lateral)",t:"mono",m:{glut:1}},
 {id:"ostra",n:"Ostra (clam) com elástico",t:"mono",m:{glut:1},u:1},
 {id:"puxgc",n:"Pull-through no cabo",t:"mono",m:{glut:1,isq:0.5}},
 {id:"terra",n:"Levantamento terra",t:"multi",m:{isq:1,glut:1,lomb:1,trap:0.5}},
 {id:"terrasumo",n:"Terra sumô",t:"multi",m:{glut:1,isq:1,adu:1,quad:0.5}},
 {id:"trapbar",n:"Terra com barra hexagonal (trap bar)",t:"multi",m:{quad:1,glut:1,isq:0.5}},
 {id:"rdluni",n:"Stiff unilateral (RDL unilateral)",t:"mono",m:{isq:1,glut:1},u:1},
 {id:"goodm",n:"Bom-dia (good morning)",t:"mono",m:{isq:1,lomb:0.5,glut:0.5}},
 {id:"flexpe",n:"Flexora em pé unilateral",t:"mono",m:{isq:1},u:1},
 {id:"nordico",n:"Flexão nórdica",t:"mono",m:{isq:1}},
 {id:"flexbola",n:"Flexão de joelho na bola suíça",t:"mono",m:{isq:1,glut:0.3}},
 {id:"hiperext",n:"Hiperextensão 45° (ênfase glúteo/posterior)",t:"mono",m:{glut:1,isq:1,lomb:0.5}},
 {id:"adutcabo",n:"Adução no cabo",t:"mono",m:{adu:1},u:1},
 {id:"copenh",n:"Prancha de Copenhague",t:"core",m:{adu:1,obliq:0.5}},
 {id:"pantlp",n:"Panturrilha no leg press",t:"mono",m:{pant:1}},
 {id:"pantsmith",n:"Panturrilha no smith",t:"mono",m:{pant:1}},
 {id:"pantuni",n:"Panturrilha unilateral em pé",t:"mono",m:{pant:1},u:1},
 {id:"pantburro",n:"Panturrilha burrinho",t:"mono",m:{pant:1}},
 {id:"tibial",n:"Tibial anterior (dorsiflexão)",t:"mono",m:{pant:0.3}},
 {id:"supdecl",n:"Supino declinado",t:"multi",m:{peit:1,tri:0.5}},
 {id:"supinclb",n:"Supino inclinado com barra",t:"multi",m:{peit:1,tri:0.5,delt:0.5}},
 {id:"supretoh",n:"Supino reto com halteres",t:"multi",m:{peit:1,tri:0.5,delt:0.5}},
 {id:"supmaq",n:"Supino na máquina (articulado)",t:"multi",m:{peit:1,tri:0.5,delt:0.5}},
 {id:"supsmith",n:"Supino no smith",t:"multi",m:{peit:1,tri:0.5,delt:0.5}},
 {id:"flexao",n:"Flexão de braço",t:"multi",m:{peit:1,tri:0.5,delt:0.5}},
 {id:"crucinc",n:"Crucifixo inclinado com halteres",t:"mono",m:{peit:1}},
 {id:"crossbx",n:"Crossover de baixo para cima",t:"mono",m:{peit:1,delt:0.3}},
 {id:"paralelap",n:"Paralelas (ênfase peitoral)",t:"multi",m:{peit:1,tri:1}},
 {id:"pullover",n:"Pullover com halter",t:"mono",m:{peit:0.5,cost:1}},
 {id:"barrafixa",n:"Barra fixa (pronada)",t:"multi",m:{cost:1,bic:0.5}},
 {id:"barrasup",n:"Barra fixa supinada",t:"multi",m:{cost:1,bic:1}},
 {id:"barraassist",n:"Barra fixa assistida (graviton)",t:"multi",m:{cost:1,bic:0.5}},
 {id:"puxneutra",n:"Puxada com triângulo (pegada neutra)",t:"multi",m:{cost:1,bic:0.5}},
 {id:"puxsup",n:"Puxada supinada",t:"multi",m:{cost:1,bic:1}},
 {id:"puxuni",n:"Puxada unilateral no cabo",t:"multi",m:{cost:1,bic:0.5},u:1},
 {id:"remcurv",n:"Remada curvada com barra",t:"multi",m:{cost:1,trap:0.5,bic:0.5,lomb:0.3}},
 {id:"remcav",n:"Remada cavalinho (barra T)",t:"multi",m:{cost:1,trap:0.5,bic:0.5}},
 {id:"remmaq",n:"Remada na máquina (articulada)",t:"multi",m:{cost:1,trap:0.5,bic:0.5}},
 {id:"remapoio",n:"Remada apoiada no banco inclinado",t:"multi",m:{cost:1,trap:0.5,bic:0.5}},
 {id:"remalta",n:"Remada alta",t:"multi",m:{delt:1,trap:1}},
 {id:"remcabou",n:"Remada unilateral no cabo",t:"multi",m:{cost:1,bic:0.5},u:1},
 {id:"remserrote",n:"Remada serrote",t:"multi",m:{cost:1,bic:0.5},u:1},
 {id:"remelast",n:"Remada com elástico",t:"multi",m:{cost:1,bic:0.5}},
 {id:"desenvh",n:"Desenvolvimento com halteres",t:"multi",m:{delt:1,tri:0.5}},
 {id:"desenvmaq",n:"Desenvolvimento na máquina",t:"multi",m:{delt:1,tri:0.5}},
 {id:"arnold",n:"Desenvolvimento Arnold",t:"multi",m:{delt:1,tri:0.5}},
 {id:"landmine",n:"Desenvolvimento landmine (unilateral)",t:"multi",m:{delt:1,peit:0.5,tri:0.5},u:1},
 {id:"elevlatcabo",n:"Elevação lateral no cabo",t:"mono",m:{delt:1},u:1},
 {id:"elevlatmaq",n:"Elevação lateral na máquina",t:"mono",m:{delt:1}},
 {id:"elevfront",n:"Elevação frontal",t:"mono",m:{delt:1}},
 {id:"crucinvmaq",n:"Crucifixo inverso na máquina (voador inverso)",t:"mono",m:{delt:1,trap:0.5}},
 {id:"facepull",n:"Face pull",t:"mono",m:{delt:1,trap:0.5}},
 {id:"rotext",n:"Rotação externa no cabo",t:"mono",m:{delt:0.5}},
 {id:"ytw",n:"Y-T-W no banco inclinado",t:"mono",m:{delt:0.5,trap:1}},
 {id:"encolhh",n:"Encolhimento com halteres",t:"mono",m:{trap:1}},
 {id:"farmer",n:"Caminhada do fazendeiro",t:"multi",m:{trap:1,antb:1,obliq:0.5}},
 {id:"roscaalt",n:"Rosca alternada com halteres",t:"mono",m:{bic:1}},
 {id:"roscascott",n:"Rosca Scott",t:"mono",m:{bic:1}},
 {id:"roscaconc",n:"Rosca concentrada",t:"mono",m:{bic:1},u:1},
 {id:"roscacabo",n:"Rosca no cabo",t:"mono",m:{bic:1}},
 {id:"roscainc",n:"Rosca inclinada (banco 45°)",t:"mono",m:{bic:1}},
 {id:"roscaw",n:"Rosca com barra W",t:"mono",m:{bic:1}},
 {id:"roscaspider",n:"Rosca spider",t:"mono",m:{bic:1}},
 {id:"roscamcorda",n:"Rosca martelo na corda",t:"mono",m:{bic:1,antb:1}},
 {id:"tribarra",n:"Tríceps na polia (barra)",t:"mono",m:{tri:1}},
 {id:"trites",n:"Tríceps testa",t:"mono",m:{tri:1}},
 {id:"tricoice",n:"Tríceps coice",t:"mono",m:{tri:1},u:1},
 {id:"tripolia1",n:"Tríceps unilateral na polia",t:"mono",m:{tri:1},u:1},
 {id:"trifrcorda",n:"Tríceps francês na corda (polia)",t:"mono",m:{tri:1}},
 {id:"supfech",n:"Supino fechado",t:"multi",m:{tri:1,peit:0.5}},
 {id:"mergbanco",n:"Mergulho no banco",t:"multi",m:{tri:1,peit:0.3}},
 {id:"paralelat",n:"Paralelas (ênfase tríceps)",t:"multi",m:{tri:1,peit:0.5}},
 {id:"triflex",n:"Flexão de braço fechada (diamante)",t:"multi",m:{tri:1,peit:0.5}},
 {id:"roscapunho",n:"Rosca de punho (flexão)",t:"mono",m:{antb:1}},
 {id:"roscapunhoinv",n:"Rosca de punho inversa (extensão)",t:"mono",m:{antb:1}},
 {id:"pegada",n:"Suspensão na barra (pegada)",t:"mono",m:{antb:1,cost:0.3}},
 {id:"abdremador",n:"Abdominal remador",t:"core",m:{core:1}},
 {id:"abdcanivete",n:"Abdominal canivete (V-up)",t:"core",m:{core:1}},
 {id:"abdmaq",n:"Abdominal na máquina",t:"core",m:{core:1}},
 {id:"hollow",n:"Hollow hold (canoa)",t:"core",m:{core:1}},
 {id:"elevpernas",n:"Elevação de pernas no solo",t:"core",m:{core:1,obliq:0.3}},
 {id:"elevsusp",n:"Elevação de pernas na barra (suspenso)",t:"core",m:{core:1,obliq:0.5}},
 {id:"elevparalela",n:"Elevação de joelhos no apoio de paralelas",t:"core",m:{core:1}},
 {id:"rodinha",n:"Rodinha abdominal (ab wheel)",t:"core",m:{core:1,obliq:0.3}},
 {id:"pranchadin",n:"Prancha com toque no ombro",t:"core",m:{core:1,obliq:0.5}},
 {id:"pranchabola",n:"Prancha na bola suíça (stir the pot)",t:"core",m:{core:1,obliq:0.5}},
 {id:"mountain",n:"Escalador (mountain climber)",t:"core",m:{core:1}},
 {id:"birddog",n:"Perdigueiro (bird dog)",t:"core",m:{lomb:1,core:0.5,glut:0.5}},
 {id:"superman",n:"Superman (extensão no solo)",t:"core",m:{lomb:1,glut:0.5}},
 {id:"woodchop",n:"Lenhador no cabo (woodchop)",t:"core",m:{obliq:1,core:0.5}},
 {id:"russian",n:"Rotação russa (russian twist)",t:"core",m:{obliq:1}},
 {id:"pranchalatelev",n:"Prancha lateral com elevação de quadril",t:"core",m:{obliq:1,lomb:0.5}},
 {id:"abdlat",n:"Abdominal lateral no solo",t:"core",m:{obliq:1}},
 {id:"suitcase",n:"Caminhada com carga unilateral (suitcase carry)",t:"core",m:{obliq:1,trap:0.5,antb:0.5},u:1},
 {id:"flutter",n:"Flutter kick (tesoura)",t:"core",m:{core:1}},
 {id:"toetouch",n:"Abdominal toque nos pés (toe touch)",t:"core",m:{core:1}}
];
const DAYS=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];

/* ---------- Estado ---------- */
const nid=()=> "i"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const KEY="sf_state_v2";
function mkSession(day,name,items){ return {id:nid(),day,name,items:items.map(([ex,sets,reps])=>({id:nid(),ex,sets,reps}))}; }
function sample(){
  const dupla={id:nid(),sessions:[
    mkSession("Seg","MMII A",[["agach",4,12],["extensora",4,12],["hipthrust",4,12],["flexsent",4,12]]),
    mkSession("Ter","MMSS A",[["supincl",4,12],["supreto",4,12],["elevlat",4,12],["puxada",4,12],["remadab",4,12]]),
    mkSession("Qua","Braços + complementos",[["roscad",2,12],["roscam",2,12],["trifrances",2,12],["tricorda",2,12],["adutora",3,12],["pantpe",3,12],["pantsent",2,12],["prancha",3,12]]),
    mkSession("Qui","MMII B (unilateral)",[["bulgaro",4,12],["afundo",3,12],["stiff",4,12],["abdutora",3,12]]),
    mkSession("Sex","MMSS B (unilateral)",[["supuni",4,12],["crucifixo",3,12],["remadauni",4,12],["pulldown",3,12],["elevlat",3,12]])
  ]};
  const indiv={id:nid(),sessions:[
    mkSession("Seg","Treino A",[["legpress",2,12],["supincl",2,12],["puxada",2,12],["flexsent",2,12],["elevlat",2,12],["prancha",2,12]]),
    mkSession("Qua","Treino B",[["hack",2,12],["supreto",2,12],["remadab",2,12],["hipthrust",2,12],["tricorda",2,12],["roscad",2,12]]),
    mkSession("Sex","Treino C",[["bulgaro",2,12],["crucifixo",2,12],["remadauni",2,12],["stiff",2,12],["pantpe",2,12],["pallof",2,12]])
  ]};
  const carlos={id:nid(),name:"Carlos (exemplo)",phase:5,coreExtra:false,planId:dupla.id,ov:{},log:[]};
  const marina={id:nid(),name:"Marina (exemplo)",phase:4,coreExtra:false,planId:dupla.id,ov:{},log:[]};
  dupla.sessions.forEach(se=>se.items.forEach(it=>{ if(it.sets>3) marina.ov[it.id]={sets:3}; }));
  const ag=dupla.sessions[0].items[0]; marina.ov[ag.id]={sets:3,ex:"legpress"};
  dupla.sessions[2].items.push({id:nid(),ex:"pallof",sets:3,reps:12,only:marina.id});
  const pedro={id:nid(),name:"Pedro (exemplo)",phase:1,coreExtra:true,planId:indiv.id,ov:{},log:[]};
  return {students:[carlos,marina,pedro],plans:[dupla,indiv],custom:[],active:carlos.id,scope:"me",seed:true};
}
function migrateV1(o){
  const pl={id:nid(),sessions:(o.sessions||[]).map(se=>({id:se.id||nid(),day:se.day,name:se.name,items:(se.items||[]).map(it=>({id:it.id||nid(),ex:it.ex,sets:it.sets,reps:it.reps}))}))};
  const st={id:nid(),name:o.aluno||"Aluno",phase:o.phase||1,coreExtra:!!o.coreExtra,planId:pl.id,ov:{},log:o.log||[]};
  return {students:[st],plans:[pl],custom:o.custom||[],active:st.id,scope:"me"};
}
let S=null, hadLocal=false;
try{
  const raw=localStorage.getItem(KEY);
  if(raw){ S=JSON.parse(raw); hadLocal=true; }
  else{ const v1=localStorage.getItem("sf_state_v1"); if(v1){ S=migrateV1(JSON.parse(v1)); hadLocal=true; } }
}catch(e){ S=null; }
if(!S||!Array.isArray(S.students)||!S.students.length){ S=sample(); hadLocal=false; }
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} queueCloud(); }
/* Quem abre pelo link de fora da conta não consegue gravar na nuvem: testamos uma vez e, se não der, tudo fica salvo neste aparelho. */
const DBW=(async()=>{ try{ if(!window.claude||!claude.use) return null; const db=await claude.use("db"); const u=await claude.use("user"); const uid=u? await u.id() : null;
  if(!db||!uid) return null; try{ await Promise.race([db.doc("data/users/"+uid+"/pres/cfg/probe").set({ok:1}), new Promise(r=>setTimeout(r,navigator.onLine===false?0:5000))]); }catch(e){ return null; } return {db,uid}; }catch(e){ return null; } })();
function localDB(key){ let store={}; try{ store=JSON.parse(localStorage.getItem(key)||"{}")||{}; }catch(e){ store={}; } const subs=[];
  const persist=()=>{ try{ localStorage.setItem(key,JSON.stringify(store)); }catch(e){} };
  const snapOf=path=>({docs:Object.keys(store).filter(k=>k.startsWith(path+"/")&&!k.slice(path.length+1).includes("/")).map(k=>({id:k.slice(path.length+1),data:()=>clean(store[k])})),metadata:{hasPendingWrites:false}});
  const fire=()=>subs.forEach(x=>{ try{ x.cb(snapOf(x.path)); }catch(e){} });
  return { doc:p=>({ set:d=>{ store[p]=clean(d); persist(); setTimeout(fire,0); return Promise.resolve(); },
      get:()=>Promise.resolve({exists:p in store,data:()=>store[p]?clean(store[p]):undefined}),
      delete:()=>{ delete store[p]; persist(); setTimeout(fire,0); return Promise.resolve(); } }),
    collection:p=>({ onSnapshot:cb=>{ const x={path:p,cb}; subs.push(x); setTimeout(()=>cb(snapOf(p)),0); return ()=>{}; } }),
    dump:()=>clean(store), load:o=>{ store=o||{}; persist(); fire(); } }; }

/* ---------- Nuvem: cada usuário tem uma área privada ---------- */
const cloud={col:null,ready:false,last:{},timer:null,writing:false,again:false,remote:null,status:"connecting"};
function stable(o){ if(Array.isArray(o)) return "["+o.map(stable).join(",")+"]"; if(o&&typeof o==="object") return "{"+Object.keys(o).sort().map(k=>JSON.stringify(k)+":"+stable(o[k])).join(",")+"}"; return JSON.stringify(o===undefined?null:o); }
function clean(o){ return JSON.parse(JSON.stringify(o)); }
function docsOf(st){
  const out={meta:clean({v:2,students:st.students.map(({log,...r})=>r),custom:st.custom||[],active:st.active,scope:st.scope||"me",weeks:st.weeks||[],week:st.week||null,day:st.day||null,grade:st.grade||null,gradeV1:st.gradeV1||0,slot:st.slot||null,exClean:st.exClean||0,exReg:st.exReg||null,exHide:st.exHide||null,brand:st.brand||null,myProg:st.myProg||null,repMus:!!st.repMus,agenda:st.agenda||null,wkCfg:st.wkCfg||null,tmMine:st.tmMine||null,tecMine:st.tecMine||null,tmr:st.tmr||null,phV2:st.phV2||null,ui:st.ui||null,exMedia:st.exMedia||null})};
  if(st.envio&&Object.keys(st.envio).length) out.envio={c:clean(st.envio)};
  Object.keys(st.days||{}).forEach(wid=>Object.keys(st.days[wid]).forEach(sid=>{ const P=st.days[wid][sid]; const keep={}; Object.keys(P).forEach(dy=>{ if(dayHasData(P[dy])||(P[dy]&&P[dy].ini)) keep[dy]=P[dy]; }); if(Object.keys(keep).length) out["ses-"+wid+"-"+sid]={days:clean(keep)}; }));
  st.plans.forEach(p=>out["plan-"+p.id]=clean(p));
  st.students.forEach(x=>out["log-"+x.id]={items:clean(x.log||[])});
  try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k&&k.startsWith("rp_aud_")){ const v=localStorage.getItem(k); if(v) out["aud-"+k.slice(7)]={v}; } } }catch(_){}
  return out;
}
function fromDocs(map){
  const m=map.meta; if(!m||!Array.isArray(m.students)||!m.students.length) return null;
  const plans=Object.keys(map).filter(k=>k.startsWith("plan-")).map(k=>clean(map[k]));
  const students=m.students.map(x=>({...clean(x),ov:clean(x.ov||{}),log:clean((map["log-"+x.id]||{}).items||[])}));
  const days={}; Object.keys(map).filter(k=>k.startsWith("ses-")).forEach(k=>{ const [,wid,sid]=k.split("-"); (days[wid]=days[wid]||{})[sid]=clean(map[k].days||{}); });
  return {students,plans,custom:clean(m.custom||[]),active:m.active,scope:m.scope||"me",weeks:clean(m.weeks||[]),week:m.week||null,day:m.day||null,days,grade:m.grade?clean(m.grade):null,gradeV1:m.gradeV1||0,slot:m.slot||null,exClean:m.exClean||0,exReg:m.exReg?clean(m.exReg):(S&&S.exReg)||null,exHide:m.exHide?clean(m.exHide):(S&&S.exHide)||null,brand:m.brand?clean(m.brand):(S&&S.brand)||null,myProg:m.myProg?clean(m.myProg):(S&&S.myProg)||null,repMus:m.repMus!=null?!!m.repMus:!!(S&&S.repMus),
    ...Object.fromEntries(["agenda","wkCfg","tmMine","tecMine","tmr","phV2","ui","exMedia"].map(k=>[k, m[k]!=null? clean(m[k]) : (S&&S[k]!=null? S[k] : undefined)]).filter(x=>x[1]!==undefined)),
    ...(map.envio&&map.envio.c? {envio:clean(map.envio.c)} : (S&&S.envio? {envio:S.envio} : {}))};
}
function setCloud(st){
  cloud.status=st;
  const el=document.getElementById("cloudPill"); if(!el) return;
  const t={connecting:["Conectando…",""],saving:["Salvando…","info"],saved:["Salvo na nuvem","ok"],local:["Só neste aparelho","warn"],error:["Erro ao salvar","bad"],offline:["📴 Sem internet · salvo no aparelho","warn"]}[st];
  el.textContent=t[0]; el.className="pill "+t[1];
}
function queueCloud(){ if(!cloud.ready) return; setCloud(navigator.onLine===false?"offline":"saving"); clearTimeout(cloud.timer); cloud.timer=setTimeout(flush,700); }
async function flush(){
  if(!cloud.ready) return;
  /* Cada mudança entra na fila do aparelho na hora (mesmo sem internet) e sobe sozinha quando a conexão volta. */
  const docs=docsOf(S), ps=[];
  for(const k of Object.keys(docs)){
    const j=stable(docs[k]); if(cloud.last[k]===j) continue;
    const prev=cloud.last[k]; cloud.last[k]=j;
    ps.push(cloud.col.doc(k).set(docs[k]).catch(e=>{ if(cloud.last[k]===j) cloud.last[k]=prev; throw e; }));
  }
  for(const k of Object.keys(cloud.last)){ if(!(k in docs)){ delete cloud.last[k]; ps.push(cloud.col.doc(k).delete()); } }
  if(!ps.length){ if(!cloud.writing) setCloud(navigator.onLine===false?"offline":"saved"); else if(navigator.onLine!==false) setCloud("saving"); return; }
  const gen=cloud.gen=(cloud.gen||0)+1;
  if(navigator.onLine===false) setCloud("offline");
  cloud.writing=true;
  try{ await Promise.all(ps); if(gen===cloud.gen) setCloud("saved"); }
  catch(e){
    setCloud(navigator.onLine===false?"offline":"error");
    if(e&&e.code==="quota_exceeded") toast("Espaço da nuvem cheio. Baixe um backup e exclua alunos antigos.");
    else setTimeout(flush,4000);
  }finally{ if(gen===cloud.gen) cloud.writing=false; }
}
window.addEventListener("offline",()=>{ if(cloud.ready) setCloud("offline"); });
window.addEventListener("online",()=>{ if(cloud.ready){ setCloud("saving"); flush(); } });
function busyTyping(){ const a=document.activeElement; return a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || !document.getElementById("modal").hidden; }
function applyRemote(map){
  const next=fromDocs(map); if(!next) return;
  if(!next.students.some(x=>x.id===next.active)) next.active=next.students[0].id;
  if(S && S.active && next.students.some(x=>x.id===S.active)) next.active=S.active;
  S=next; Object.keys(map).forEach(k=>cloud.last[k]=stable(map[k]));
  try{ const has=new Set(Object.keys(map).filter(k=>k.startsWith("aud-"))); has.forEach(k=>{ const v=map[k]&&map[k].v; if(v) localStorage.setItem("rp_aud_"+k.slice(4),v); });
    for(let i=localStorage.length-1;i>=0;i--){ const k=localStorage.key(i); if(k&&k.startsWith("rp_aud_")&&!has.has("aud-"+k.slice(7))&&map.meta) localStorage.removeItem(k); } }catch(_){}
  try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){}
  renderAll(); if(!document.getElementById("people").hidden) renderPeople();
}
document.addEventListener("focusout",()=>setTimeout(()=>{ if(cloud.remote && !busyTyping() && !cloud.writing){ const m=cloud.remote; cloud.remote=null; applyRemote(m); } },150));
async function startCloud(){
  const w=await DBW; if(!w){ setCloud("local"); renderAll(); return; }
  const db=w.db, uid=w.uid;
  cloud.col=db.collection("data/users/"+uid);
  let snap;
  try{ snap=await cloud.col.get(); }catch(e){ setCloud("local"); return; }
  if(snap.empty){
    cloud.ready=true;
    if(hadLocal){ await flush(); toast("Seus alunos foram enviados para a nuvem"); }
    else setCloud(navigator.onLine===false?"offline":"saved");
  } else {
    const map={}; snap.docs.forEach(d=>map[d.id]=d.data());
    cloud.ready=true; applyRemote(map); setCloud(navigator.onLine===false?"offline":"saved");
  }
  cloud.col.onSnapshot(qs=>{
    if(qs.metadata.hasPendingWrites || cloud.writing) return;
    const map={}; let changed=false;
    qs.docs.forEach(d=>{ map[d.id]=d.data(); if(cloud.last[d.id]!==stable(map[d.id])) changed=true; });
    Object.keys(cloud.last).forEach(k=>{ if(!(k in map)) changed=true; });
    if(!changed || !map.meta) return;
    if(busyTyping()) cloud.remote=map; else applyRemote(map);
  },()=>setCloud("error"));
}

/* Backup em arquivo */
async function downloadBackup(){
  const data=JSON.stringify({app:"sistema-de-fases",v:2,exportedAt:new Date().toISOString(),state:S,pres:(typeof PRES!=="undefined"&&PRES.dump)?PRES.dump():null},null,2);
  const name="backup-fases-"+new Date().toISOString().slice(0,10)+".json";
  const r=await offerFile(new Blob([data],{type:"application/json"}),name,{text:"Backup do sistema de treino",silent:true});
  if(r==="saved"||r==="shared"||r==="aborted"||r==="declined"||r==="busy") return;
  copyText(data); bkModal("save",data);
}
function bkModal(mode,data){ let o=document.getElementById("bkm"); if(!o){ o=document.createElement("div"); o.id="bkm"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",e=>{ if(e.target===o||e.target.closest("[data-bkx]")) o.hidden=true; }); }
  o.innerHTML= mode==="save"? `<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-head"><h3>💾 Salvar backup</h3><button class="btn small" data-bkx>Fechar</button></div>
      <p>Neste acesso o arquivo não pode ser baixado direto. <b>O backup já foi copiado.</b> Abra o WhatsApp, entre na conversa com você mesmo (ou em notas/e-mail) e <b>cole</b>. Para restaurar depois, use "Restaurar colando o texto".</p>
      <textarea class="inp bkta" readonly rows="6">${esc(data)}</textarea><button class="btn primary" data-bkcopy>Copiar de novo</button></div>`
    : `<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-head"><h3>♻️ Restaurar backup</h3><button class="btn small" data-bkx>Fechar</button></div>
      <p>Cole aqui o texto do backup que você guardou. <b>Atenção:</b> isso substitui os dados atuais do app.</p>
      <textarea class="inp bkta" rows="6" id="bkTxt" placeholder='Cole aqui o texto que começa com {"app":"sistema-de-fases"...'></textarea><button class="btn primary" data-bkdo>Restaurar agora</button></div>`;
  o.hidden=false;
  const c=o.querySelector("[data-bkcopy]"); if(c) c.onclick=()=>{ copyText(data); toast("Backup copiado"); };
  const d=o.querySelector("[data-bkdo]"); if(d) d.onclick=()=>{ const t=o.querySelector("#bkTxt").value.trim(); if(!t){ toast("Cole o texto do backup"); return; } if(importText(t)) o.hidden=true; };
}
function importText(txt){ try{
    const o=JSON.parse(txt); const st=o.state||o;
    if(!Array.isArray(st.students)||!Array.isArray(st.plans)||!st.students.length) throw 0;
    S=st; if(o.pres&&PRES.load) PRES.load(o.pres); save(); renderAll(); toast("Backup restaurado: "+st.students.length+" alunos"); return true;
  }catch(e){ toast("Esse texto não é um backup do sistema"); return false; } }
function importBackup(file){
  const r=new FileReader();
  r.onload=()=>{ importText(String(r.result||"")); };
  r.readAsText(file);
}

/* ---------- Acesso ---------- */
const A=()=> S.students.find(s=>s.id===S.active) || S.students[0];
const planOf=st=> S.plans.find(p=>p.id===st.planId);
const membersOf=st=> S.students.filter(s=>s.planId===st.planId);
const isGroup=st=> membersOf(st).length>1;
const groupLabel=n=> n===1?"Individual":n===2?"Dupla":"Trio";
const exById=id=> LIB.find(e=>e.id===id) || (S.custom||[]).find(e=>e.id===id) || {id, n:"Exercício", t:"mono", m:{}};
const phaseOf=st=> PHASES[st.phase]||PHASES[1];
const first=n=>{ if(String(n||"").trim()==="Meu treino") return "Meu treino"; const w=String(n||"").replace(/\s*\(.*\)\s*$/,"").trim().split(/\s+/); return (/^(dona|seu|sr|sra|padre|pe\.?|dr|dra|tia|tio|irmã|irma|pastor|pastora)$/i.test(w[0]||"") && w[1]? w[0]+" "+w[1] : w[0]) || "aluno"; };
function catOf(st,k){ return (k==="core" && st.coreExtra)? "M" : MUSCLES[k].c; }

function hasOv(o){ return o && (o.sets!=null || o.reps!=null || o.ex!=null); }

function viewOf(st){
  const pl=planOf(st); if(!pl) return [];
  return pl.sessions.map(se=>({se, rows:se.items.filter(it=>!it.only || it.only===st.id).map(it=>{
    const o=(st.ov||{})[it.id]||{};
    return {it, o, ex:o.ex||it.ex, sets:o.sets??it.sets, reps:o.reps??it.reps, skip:!!o.skip};
  })}));
}
function weekly(st){
  const v={}; Object.keys(MUSCLES).forEach(k=>v[k]=0);
  viewOf(st).forEach(({rows})=>rows.forEach(r=>{ if(r.skip) return;
    Object.entries(exById(r.ex).m).forEach(([k,w])=>{ if(k in v) v[k]+=(Number(r.sets)||0)*w; });
  }));
  return v;
}
function statusOf(val,[a,b]){ if(val>b) return "bad"; if(val<a) return "warn"; return "ok"; }
const MEM=["MMII","MMSS"]; const MEM_N={MMII:"Membros inferiores",MMSS:"Membros superiores"};
const LOWER_M=new Set(["quad","glut","isq","adu","pant","soleo"]);
function weeklyMem(st){ const v=weekly(st); const o={MMII:0,MMSS:0}; Object.entries(v).forEach(([k,x])=>{ if(MUSCLES[k]&&MUSCLES[k].r==="Core") return; o[LOWER_M.has(k)?"MMII":"MMSS"]+=x; }); return o; }
function memSessions(st,mk){ let n=0; viewOf(st).forEach(({rows})=>{ if(rows.some(r=>!r.skip && Object.keys(exById(r.ex).m).some(k=>MUSCLES[k]&&MUSCLES[k].r!=="Core" && (LOWER_M.has(k)?"MMII":"MMSS")===mk))) n++; }); return Math.max(1,n); }
function memRange(st,mk){ const s=memSes(phaseOf(st)), n=memSessions(st,mk); return [s[0]*n,s[1]*n]; }
const fmt=n=> (Math.round(n*10)/10).toString().replace(".",",");
function esc(s){ return String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
const rng=a=> a[0]===a[1]? String(a[0]) : a[0]+"–"+a[1];

/* ---------- Cabeçalho ---------- */
function activate(id){ S.active=id; save(); renderAll(); toast(first(A().name)+" · Fase "+A().phase); }

/* ---------- Agenda da semana (duas tabelas, como a planilha) ---------- */
let AG_NEW=null, AG_PICK=null, AG_EDH=null, AG_WH=false; let AG_OPEN=false, agEdit=false, agMkOn=false, agClr=""; const agMk={ti:1,h:"08:00",st:"g",txt:"",days:["Seg"],from:"Seg",to:[]};
/* Agenda ligada ao cadastro: horários fixos dos alunos entram sozinhos (linhas automáticas) */
function agTok(t){ return String(t||"").split(/\s+e\s+|,|\s*\+\s*|\s*\/\s*/).map(x=>x.trim()).filter(Boolean); }
function agNorm(v){ const d=String(v||"").replace(/\D/g,"").slice(0,4); if(!d) return String(v||"").trim(); let h,m; if(d.length<=2){ h=+d; m=0; } else if(d.length===3){ h=+d[0]; m=+d.slice(1); } else { h=+d.slice(0,2); m=+d.slice(2); } if(h>23||m>59) return String(v||"").trim(); return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0"); }
/* Tabela de novos alunos espelha a Minha agenda: com nome = OCUPADO, vazio = livre */
function agMirror(){ const A2=agData(); const [M,P]=A2.tabs; let ch=false;
  A2.days.forEach(k=>{ const L=M.d[k]||[], PL=(P.d[k]=P.d[k]||[]); const occ={}; L.forEach(r=>{ const h=agNorm(r.h); if(/^\d{2}:\d{2}$/.test(h)) occ[h]=occ[h]||r.c==="r"||!!(r.an&&r.an.length)||(r.c!=="g"&&!!String(r.t||"").trim()); });
    Object.entries(occ).forEach(([h,o])=>{ let r=PL.find(x=>agNorm(x.h)===h);
      if(!r){ PL.push({h,t:o?"OCUPADO":"",c:"",auto:1}); ch=true; return; }
      if(o){ if(r.auto||(!String(r.t||"").trim())||r.c==="g"){ if(r.t!=="OCUPADO"||r.c){ r.t="OCUPADO"; r.c=""; ch=true; } if(!r.auto){ r.auto=1; ch=true; } } }
      else if(r.auto&&r.t){ r.t=""; ch=true; } });
    for(let j=PL.length-1;j>=0;j--){ const r=PL[j]; if(r.auto&&!(agNorm(r.h) in occ)){ PL.splice(j,1); ch=true; } }
    if(ch) PL.sort((a,b)=>(a.h||"99").localeCompare(b.h||"99")); });
  return ch; }
/* Agenda ligada ao cadastro: horários fixos dos alunos entram sozinhos e mudam junto quando o cadastro muda */
function agSync(){ const A2=agData(); let ch=false;
  A2.tabs.forEach(T=>A2.days.forEach(k=>{ const L=T.d[k]||[]; for(let j=L.length-1;j>=0;j--){ if(!String(L[j].h||"").trim()&&!String(L[j].t||"").trim()){ L.splice(j,1); ch=true; } } }));
  if(presOn()){ const WD={1:"Seg",2:"Ter",3:"Qua",4:"Qui",5:"Sex",6:"Sáb",0:"Dom"}; const g={}, dayOf2={}; const all=new Set();
  PRES.alunos().forEach(a=>{ const n=first(a.nome); if(n) all.add(n); });
  const atv=new Set(PRES.alunos().filter(a=>a.ativo!==false).map(a=>first(a.nome)).filter(Boolean)); const inat=new Set([...all].filter(n=>!atv.has(n)));
  PRES.alunos().filter(a=>a.ativo!==false).forEach(a=>(a.slots||[]).forEach(sl=>{ const k=WD[sl.d]; const h=agNorm(sl.h); if(!k||!h) return; const n=first(a.nome); (g[k]=g[k]||{}); (g[k][h]=g[k][h]||[]); if(!g[k][h].includes(n)) g[k][h].push(n); (dayOf2[k]=dayOf2[k]||new Set()).add(n); }));
  const M=A2.tabs[0];
  Object.keys(g).forEach(k=>{ if(!A2.days.includes(k)&&(k==="Sáb"||k==="Dom")){ agAddDay(k); ch=true; } });
  A2.days.forEach(k=>{ const G=g[k]||{}, onDay=dayOf2[k]||new Set(); M.d[k]=M.d[k]||[];
    M.d[k].forEach(r=>{ const h=agNorm(r.h); const want=G[h]||[]; const prevAuto=r.an||(r.auto?agTok(r.t):[]);
      const before=r.c==="o"? [] : agTok(r.t);
      const toks=agTok(r.t).filter(n=>{ if(want.includes(n)) return true; if(r.c!=="o"&&inat.has(n)) return false; if(prevAuto.includes(n)) return false; if(all.has(n)&&!onDay.has(n)) return true; return !(all.has(n)&&onDay.has(n)); });
      want.forEach(n=>{ if(!toks.includes(n)) toks.push(n); });
      const txt=toks.join(" e "); if(txt!==String(r.t||"").trim()){ r.t=txt; ch=true; } if(want.length&&r.c==="g"){ delete r.c; ch=true; } if(!txt&&before.length&&r.c==="r"){ delete r.c; ch=true; }
      const an=want.slice(); if(JSON.stringify(an)!==JSON.stringify(r.an||[])){ if(an.length) r.an=an; else delete r.an; ch=true; }
      if(r.auto&&!txt){ delete r.auto; ch=true; } });
    Object.entries(G).forEach(([h,ns])=>{ if(!M.d[k].some(x=>agNorm(x.h)===h)){ M.d[k].push({h,t:ns.join(" e "),c:"",auto:1,an:ns.slice()}); ch=true; } });
    M.d[k].sort((a,b)=>(a.h||"99").localeCompare(b.h||"99")); }); }
  if(window.RP_LIMPO_DONO&&!A2.fixR1){ const lib=[]; A2.days.forEach(k=>(A2.tabs[0].d[k]||[]).forEach(r=>{ if(r.c==="r"&&!String(r.t||"").trim()&&!(r.an&&r.an.length)){ delete r.c; lib.push(k+" "+agNorm(r.h)); } })); A2.fixR1=1; ch=true; if(lib.length) setTimeout(()=>toast(`Liberei ${lib.join(", ")}: estava${lib.length>1?"m":""} ocupado sem nome. Se era de propósito, marque Ocupado de novo.`),400); }
  if(agMirror()) ch=true;
  if(ch) save(); return ch; }
let agWa=false, agWaD=null, agWaF="both";
const agWaDays=()=>{ const all=agData().days; return agWaD? all.filter(k=>agWaD.includes(k)) : all; };
const agOcc=r=> r.c==="r" || (r.c!=="g" && !!String(r.t||"").trim() && !/^livre$/i.test(String(r.t).trim()));
function agFree(){ const A2=agData(), P=A2.tabs[1]; const out=[]; agWaDays().forEach(k=>{ const hs=(P.d[k]||[]).filter(r=>String(r.h||"").trim()&&!agOcc(r)).map(r=>r.h); if(hs.length) out.push([k,hs]); }); return out; }
function agWaText(){ const F=agFree(); const nm=(BR().nome&&BR().nome!=="Seu nome")? BR().nome : ""; const D=agWaDays(), all=agData().days.length===D.length;
  const ttl= all? "nesta semana" : D.length===1? "na "+AG_DN[D[0]].toLowerCase() : "nestes dias";
  return `Olá! Seguem meus horários disponíveis ${ttl}:\n\n${F.map(([k,hs])=>`*${AG_DN[k]}*: ${hs.join(", ")}`).join("\n")||"(sem horários livres no momento)"}\n\nMe avise qual fica melhor para você. 😊${nm?`\n${nm}`:""}`; }
/* Imagem da tabela de novos alunos: só LIVRE / OCUPADO (sem nomes de alunos) */
function agWaCanvas(prv){ const A2=agData(), P=A2.tabs[1], D=agWaDays(), C=agCores();
  /* cada dia é uma coluna com os próprios horários, um embaixo do outro (sem buracos entre aulas) */
  const M0=A2.tabs[0]; const nmOf=(k,h)=>{ if(!prv) return ""; const r=(M0.d[k]||[]).find(x=>agNorm(x.h)===h); if(!r) return ""; const t=String(r.t||"").trim(); return /^ocupado$/i.test(t)? "" : t; };
  const cols=D.map(k=>(P.d[k]||[]).filter(r=>/^\d{2}:\d{2}$/.test(agNorm(r.h))).map(r=>({h:agNorm(r.h),oc:agOcc(r),nm:nmOf(k,agNorm(r.h))})).sort((a,b)=>a.h.localeCompare(b.h)));
  const n=Math.max(1,...cols.map(c=>c.length))+(prv?1:0), W=1080, x0=20, gap=8, cw=Math.floor((W-40-gap*(D.length-1))/Math.max(1,D.length)), rh=72, top=190, H=top+64+(rh+gap)*n+64;
  const cv=document.createElement("canvas"); cv.width=W; cv.height=H; const g=cv.getContext("2d");
  g.fillStyle="#FFFFFF"; g.fillRect(0,0,W,H); g.textAlign="center"; g.textBaseline="middle";
  const nm=(BR().nome&&BR().nome!=="Seu nome")? BR().nome : "";
  g.fillStyle="#111"; g.font="800 46px system-ui,Arial,sans-serif"; g.fillText("Horários disponíveis",W/2,62);
  g.fillStyle="#555"; g.font="600 28px system-ui,Arial,sans-serif"; g.fillText(nm? nm+" · Personal Trainer" : "Personal Trainer",W/2,112);
  let lx=W/2-170; [[C.livre,"Livre"],[C.ocup,"Ocupado"]].forEach(([c,t])=>{ g.fillStyle=c; g.fillRect(lx,140,34,26); g.strokeStyle="#999"; g.lineWidth=1; g.strokeRect(lx,140,34,26); g.fillStyle="#333"; g.textAlign="left"; g.font="600 26px system-ui,Arial,sans-serif"; g.fillText(t,lx+44,154); lx+=200; }); g.textAlign="center";
  const small=cw<170;
  D.forEach((k,i)=>{ const x=x0+(cw+gap)*i; g.fillStyle=C.cab; g.fillRect(x,top,cw,56); g.strokeStyle="#C9CED3"; g.lineWidth=2; g.strokeRect(x,top,cw,56);
    g.fillStyle=agInk(C.cab); g.font=`800 ${small?24:28}px system-ui,Arial,sans-serif`; g.fillText(small? k : AG_DN[k],x+cw/2,top+28);
    cols[i].forEach((c,ri)=>{ const y=top+64+(rh+gap)*ri, bg=c.oc? C.ocup : C.livre; g.fillStyle=bg; g.fillRect(x,y,cw,rh);
      g.fillStyle=agInk(bg); g.font=`800 ${small?26:30}px system-ui,Arial,sans-serif`; g.fillText(c.h,x+cw/2,y+25);
      if(c.oc&&c.nm){ let t=c.nm, fs=small?18:21; g.font=`800 ${fs}px system-ui,Arial,sans-serif`; while(g.measureText(t).width>cw-10&&fs>12){ fs--; g.font=`800 ${fs}px system-ui,Arial,sans-serif`; } if(g.measureText(t).width>cw-10){ while(t.length>3&&g.measureText(t+"…").width>cw-10) t=t.slice(0,-1); t+="…"; } g.fillText(t,x+cw/2,y+54); }
      else { g.font=`700 ${small?16:19}px system-ui,Arial,sans-serif`; g.fillText(c.oc?"OCUPADO":"LIVRE",x+cw/2,y+54); } });
    if(!cols[i].length){ g.fillStyle="#9AA0A6"; g.font="600 22px system-ui,Arial,sans-serif"; g.fillText("sem horários",x+cw/2,top+64+rh/2); } });
  if(prv) D.forEach((k,i)=>{ const x=x0+(cw+gap)*i, y=top+64+(rh+gap)*cols[i].length; g.fillStyle="#F4F6F5"; g.fillRect(x,y,cw,rh); g.setLineDash([8,6]); g.strokeStyle="#9AA0A6"; g.lineWidth=2; g.strokeRect(x+1,y+1,cw-2,rh-2); g.setLineDash([]); g.fillStyle="#555"; g.font="800 44px system-ui,Arial,sans-serif"; g.fillText("+",x+cw/2,y+rh/2+2); });
  g.fillStyle="#555"; g.font="600 26px system-ui,Arial,sans-serif"; g.fillText("Me avise qual fica melhor para você!",W/2,H-34);
  return cv; }
function agWaHit(x,y){ const A2=agData(), P=A2.tabs[1], D=agWaDays(); const cols=D.map(k=>(P.d[k]||[]).filter(r=>/^\d{2}:\d{2}$/.test(agNorm(r.h))).map(r=>agNorm(r.h)).sort());
  const W=1080, x0=20, gap=8, cw=Math.floor((W-40-gap*(D.length-1))/Math.max(1,D.length)), rh=72, top=190; const ci=Math.floor((x-x0)/(cw+gap)), ri=Math.floor((y-top-64)/(rh+gap));
  if(ci<0||ci>=D.length||x-x0-ci*(cw+gap)>cw||ri<0) return null; if(y-top-64-ri*(rh+gap)>rh) return null; if(ri===cols[ci].length) return {k:D[ci],add:true}; const h=cols[ci][ri]; if(!h) return null; return {k:D[ci],h}; }
document.addEventListener("click",e=>{ const im=e.target.closest&&e.target.closest("#agview img[data-agwaimg]"); if(!im) return; const rc=im.getBoundingClientRect(), sc=im.naturalWidth/rc.width;
  const hit=agWaHit((e.clientX-rc.left)*sc,(e.clientY-rc.top)*sc); if(!hit){ toast("Toque em cima de um horário"); return; }
  if(hit.add){ AG_LDAY=hit.k; AG_PICK=null; AG_EDH=null; AG_NEW="0|"+hit.k; agRender(); setTimeout(()=>{ const el=document.getElementById("agNewH"); if(el){ el.scrollIntoView({behavior:"smooth",block:"center"}); el.focus(); } },60); return; }
  const A2=agData(); let ti=0, i=(A2.tabs[0].d[hit.k]||[]).findIndex(r=>agNorm(r.h)===hit.h); if(i<0){ ti=1; i=(A2.tabs[1].d[hit.k]||[]).findIndex(r=>agNorm(r.h)===hit.h); if(i<0) return; if(window.RP_LIMPO) AG_LFULL=true; }
  if(window.RP_LIMPO) AG_LDAY=hit.k; AG_NEW=null; AG_EDH=null; AG_PICK=ti+"|"+hit.k+"|"+i; agRender(); setTimeout(()=>{ const p=document.querySelector("#agview .agpop"); if(p) p.scrollIntoView({behavior:"smooth",block:"center"}); },60); });
function agWaHTML(){ const L=presOn()? PRES.alunos().filter(a=>a.ativo!==false).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")) : []; const all=agData().days, D=agWaDays(), F=agWaF;
  let prev=""; if(F!=="txt"){ try{ prev=agWaCanvas(true).toDataURL("image/png"); }catch(e){} }
  return `<div class="agwa"><b>📲 Enviar horários livres no WhatsApp</b>
    <label>Quais dias</label><div class="agwach"><button class="agwc ${!agWaD?"on":""}" data-agwad="all">Semana inteira</button>${all.map(k=>`<button class="agwc ${agWaD&&agWaD.includes(k)?"on":""}" data-agwad="${k}">${k}</button>`).join("")}</div>
    <label>O que enviar</label><div class="agwach"><button class="agwc ${F==="both"?"on":""}" data-agwaf="both">🖼️ + ✍️ Imagem e texto</button><button class="agwc ${F==="img"?"on":""}" data-agwaf="img">🖼️ Só imagem</button><button class="agwc ${F==="txt"?"on":""}" data-agwaf="txt">✍️ Só texto</button></div>
    ${F==="txt"?`<label>Para quem<select class="inp" id="agWaTo"><option value="">Escolher o contato no WhatsApp</option>${L.map(a=>`<option value="${a.id}" ${String(a.tel||"").replace(/\D/g,"")?"":"disabled"}>${esc(a.nome)}${String(a.tel||"").replace(/\D/g,"")?"":" (sem telefone)"}</option>`).join("")}</select></label>`:`<small class="muted">Com imagem, o celular abre a lista para você escolher o <b>WhatsApp</b> e o contato.</small>`}
    ${F!=="img"?`<label>Mensagem (pode editar)<textarea class="inp" id="agWaTxt" rows="8">${esc(agWaText())}</textarea></label>`:""}
    ${prev?`<img class="agwaimg" data-agwaimg src="${prev}" alt="Imagem da agenda que será enviada. Toque num horário para mudar." style="cursor:pointer"><small class="muted agwahint">👆 Toque num horário da imagem para mudar livre ou ocupado.</small>`:""}
    <small class="muted">Aqui você vê o nome dos alunos (vem do cadastro e muda junto). Na imagem que o aluno recebe aparece só <b>LIVRE</b> ou <b>OCUPADO</b>, sem nomes.</small>
    <div class="row"><button class="btn primary" data-agwago>${F==="txt"?"Abrir WhatsApp":"Enviar"}</button><button class="btn ghost" data-agwa>Fechar</button></div></div>`; }

const AG_COL={r:"#E53935",g:"#2EBD4E",b:"#26D0E6",y:"#FFEB3B",w:"#FFFFFF",k:"#9E9E9E"};
const AG_PAL=[["#FFFFFF","Branco"],["#2EBD4E","Verde"],["#E53935","Vermelho"],["#26D0E6","Azul"],["#FFEB3B","Amarelo"],["#FF9800","Laranja"],["#9E9E9E","Cinza"],["#111111","Preto"]];
const agCores=()=>{ const A2=S.agenda||{}; A2.cores=Object.assign({cab:"#FFFFFF",livre:"#2EBD4E",ocup:"#E53935"},A2.cores||{}); return A2.cores; };
const agInk=hex=>{ const h=String(hex||"#fff").replace("#",""); const f=h.length===3? h.split("").map(x=>x+x).join("") : h; const r=parseInt(f.slice(0,2),16),g=parseInt(f.slice(2,4),16),b=parseInt(f.slice(4,6),16); return (0.299*r+0.587*g+0.114*b)>150? "#111" : "#fff"; };
let agCorOn=false;
function agCorHTML(){ const C=agCores(); const row=(k,lb)=>`<div class="agcr"><span>${lb}</span><div class="agpal">${AG_PAL.map(([c,n])=>`<button class="agpc" style="--c:${c}" data-agcor="${k}|${c}" aria-label="${n}" aria-pressed="${C[k].toUpperCase()===c}"></button>`).join("")}<button class="agpo" data-cp="ag_${k}" title="Outra cor e opacidade"><span>🎨 Outra</span></button></div></div>`;
  return `<div class="agcor">${row("cab","Cabeçalho")}${row("livre","Livre")}${row("ocup","Ocupado")}<button class="lk" data-agcorrst>Voltar às cores padrão</button></div>`; } const AG_CYC=["","r","g","b","y","w","k"];
const AG_DIAS=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"], AG_DN={Seg:"Segunda",Ter:"Terça",Qua:"Quarta",Qui:"Quinta",Sex:"Sexta","Sáb":"Sábado",Dom:"Domingo"};
function agData(){ if(!S.agenda){
    const mk=()=>{ const d={}; AG_DIAS.slice(0,5).forEach(k=>d[k]=[]); return d; };
    S.agenda={days:AG_DIAS.slice(0,5),tabs:[{title:"Minha agenda",d:mk()},{title:"Para visualização de novos alunos",d:mk(),bg:"#FFEB3B"}]}; }
  if(S.agenda.tabs[1]&&S.agenda.tabs[1].title==="Para os alunos") S.agenda.tabs[1].title="Para visualização de novos alunos";
  const A2=S.agenda; A2.tabs.forEach(t=>A2.days.forEach(k=>{ t.d[k]=t.d[k]||[]; })); return A2; }
function agAddDay(k){ const A2=S.agenda; if(!A2.days.includes(k)){ A2.days.push(k); A2.days.sort((a,b)=>AG_DIAS.indexOf(a)-AG_DIAS.indexOf(b)); } A2.tabs.forEach(t=>{ t.d[k]=t.d[k]||[]; }); }
function agMkHTML(){ const A2=agData(); const dy=(k,sel,attr)=>`<button class="dy" ${attr}="${k}" aria-pressed="${sel.includes(k)}">${k}</button>`;
  return `<div class="agmk"><b>Marcar o mesmo horário em vários dias</b>
    <div class="r"><span class="lb">Em qual tabela</span><select class="inp" id="agMkTi" style="max-width:220px">${A2.tabs.map((t,i)=>`<option value="${i}" ${agMk.ti===i?"selected":""}>${esc(t.title)}</option>`).join("")}</select></div>
    <div class="r"><span class="lb">Horário</span><input type="time" id="agMkH" value="${esc(agMk.h)}"><button class="st g" data-agmkst="g" aria-pressed="${agMk.st==="g"}">Livre</button><button class="st r" data-agmkst="r" aria-pressed="${agMk.st==="r"}">Ocupado</button></div>
    ${agMk.st==="r"?`<div class="r"><span class="lb">Aluno do cadastro (opcional)</span><select class="inp" id="agMkAl" style="max-width:260px"><option value="">— escolher aluno —</option>${(presOn()? PRES.alunos().filter(a=>a.ativo!==false).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")) : []).map(a=>`<option value="${esc(first(a.nome))}" ${agMk.txt===first(a.nome)?"selected":""}>${esc(a.nome)}</option>`).join("")}</select></div>
    <div class="r"><span class="lb">Ou escreva (ex.: almoço, outro aluno)</span><input class="inp" id="agMkTxt" value="${esc(agMk.txt)}" placeholder="OCUPADO"></div>`:""}
    <div class="r"><span class="lb">Em quais dias (toque para marcar)</span>${AG_DIAS.map(k=>dy(k,agMk.days,"data-agmkd")).join("")}</div>
    <div class="r"><button class="lk" data-agmkall="seg-sex">Seg a Sex</button><button class="lk" data-agmkall="todos">Todos os dias</button><button class="lk" data-agmkall="nenhum">Limpar</button></div>
    <button class="btn primary" data-agmkgo>Aplicar</button>
    <hr><b>📋 Copiar um dia inteiro</b>
    <div class="r"><span class="lb">Copiar de</span><select class="inp" id="agMkFrom" style="max-width:160px">${A2.days.map(k=>`<option ${agMk.from===k?"selected":""}>${k}</option>`).join("")}</select></div>
    <div class="r"><span class="lb">Para</span>${AG_DIAS.filter(k=>k!==agMk.from).map(k=>dy(k,agMk.to,"data-agmkto")).join("")}</div>
    <button class="btn" data-agmkcopy>Copiar horários</button>
    <small class="muted">A cópia vale para a tabela escolhida acima e substitui os horários dos dias de destino.</small></div>`; }
function agMkApply(){ const A2=agData(); const T=A2.tabs[agMk.ti]; const h=agMk.h; if(!/^\d{2}:\d{2}$/.test(h)){ toast("Escolha o horário"); return; } if(!agMk.days.length){ toast("Escolha pelo menos um dia"); return; }
  agMk.days.forEach(k=>{ agAddDay(k); const L=T.d[k]; let r=L.find(x=>x.h===h); if(!r){ r={h,t:"",c:""}; L.push(r); }
    if(agMk.st==="g"){ r.t=""; r.c="g"; } else { r.t=agMk.txt.trim()||"OCUPADO"; r.c="r"; } delete r.auto; L.sort((a,b)=>(a.h||"99").localeCompare(b.h||"99")); });
  save(); agRender(); toast(`${h} ${agMk.st==="g"?"livre":"ocupado"} em ${agMk.days.join(", ")}`); }
function agMkCopy(){ const A2=agData(); const T=A2.tabs[agMk.ti]; const src=T.d[agMk.from]||[]; if(!agMk.to.length){ toast("Escolha para quais dias copiar"); return; }
  agMk.to.forEach(k=>{ agAddDay(k); T.d[k]=src.map(r=>({h:r.h,t:r.t,c:r.c})); }); save(); agRender(); toast(`${agMk.from} copiado para ${agMk.to.join(", ")}`); }
/* Marcação sua (Treino, Almoço…): cor automática pelo texto; para o aluno aparece OCUPADO */
const AG_LBL=["#7B3FC4","#1B6FB8","#0E8C7A","#C2611B","#B83280","#6D4C41","#3949AB","#2E7D32"];
const agLblCol=t=>{ let h=0; for(const ch of String(t||"").toLowerCase().trim()) h=(h*31+ch.charCodeAt(0))>>>0; return AG_LBL[h%AG_LBL.length]; };
const agCol=r=>{ const C=agCores(); if(r.an&&r.an.length&&r.c!=="o") return C.ocup; if(r.c==="o") return agLblCol(r.t); if(r.c==="r") return C.ocup; if(r.c==="g") return C.livre; return AG_COL[r.c]|| (String(r.t||"").trim()? C.ocup : C.livre); };
function agHTML(){ const A2=agData();
  const C=agCores();
  const tab=agTabHTML;
  if(window.RP_LIMPO) return AG_LFULL? `<button class="btn ghost agl-back" data-agmore>← Voltar para o dia</button>`+agTop(A2) : agLimpo(A2);
  return agTop(A2);
}
/* Visual limpo (só a conta liberada): mostra só o dia + 1 botão; o resto fica em "Mais opções" */
let AG_LDAY=null, AG_LFULL=false, AG_WA0=true;
function agLimpo(A2){ const hojeK=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][new Date().getDay()];
  if(!AG_LDAY||!A2.days.includes(AG_LDAY)) AG_LDAY= A2.days.includes(hojeK)? hojeK : (A2.days.find(k=>AG_DIAS.indexOf(k)>AG_DIAS.indexOf(hojeK))||A2.days[0]);
  const k=AG_LDAY, T=A2.tabs[0]; const sv=A2.days; let col=""; try{ A2.days=[k]; col=agTabHTML(T,0); } finally { A2.days=sv; }
  const L=(T.d[k]||[]).filter(r=>String(r.h||"").trim()); const oc=L.filter(agOcc).length, fr=L.length-oc;
  if(AG_WA0){ agWa=true; AG_WA0=false; }
  return `${agWa? agWaHTML() : `<button class="agwab agl-main" data-agwa>📲 Enviar horários livres no WhatsApp</button>`}
    ${(()=>{ if(AG_NEW==="0|"+k) return `<div class="agl-col agl-one"><style>.agl-one .agrow,.agl-one .agadd,.agl-one .agempty{display:none}</style>${col}</div>`; const one=AG_PICK||AG_EDH; if(!one||!one.startsWith("0|"+k+"|")) return ""; return `<div class="agl-col agl-one"><style>.agl-one .agrow:not([data-agk="${one}"]){display:none}.agl-one .agadd{display:none}</style>${col}</div>`; })()}`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("#agview button[data-agld],#agview button[data-agmore]"); if(!b) return;
  if(b.dataset.agld){ AG_LDAY=b.dataset.agld; } else { AG_LFULL=!AG_LFULL; window.scrollTo(0,0); } AG_PICK=null; AG_NEW=null; agRender(); });
function agTabHTML(T,ti){ const A2=agData(), C=agCores(); return `<div class="agtab" data-agtab="${ti}"><div class="agtitle" ${T.bg?`style="background:${T.bg}"`:""}><input class="agtt" data-agtitle="${ti}" value="${esc(T.title)}" aria-label="Título da tabela"></div>
    <div class="aggrid" style="--n:${A2.days.length};--cab:${C.cab};--cabi:${agInk(C.cab)}">${A2.days.map(k=>`<div class="agday"><div class="agdh"><span>${k}</span>${T.d[k].length?`<button class="agclrd" data-agclrd="${ti}|${k}">${agClr===ti+"|"+k?"ok?":"limpar"}</button>`:""}</div>${T.d[k].length?"":`<div class="agempty">vazio</div>`}
      ${T.d[k].map((r,i)=>{ const key=ti+"|"+k+"|"+i, okH=/^\d{2}:\d{2}$/.test(r.h||"")&&AG_EDH!==key; return `<div data-agk="${key}" class="agrow ${agEdit?"agdelon":""} ${AG_PICK===key?"agsel":""}" style="--ac:${agCol(r)};--ai:${agInk(agCol(r))}">${okH?`<button class="agcellb" data-agpick="${key}" aria-label="${AG_DN[k]} ${esc(r.h)}${r.t?" "+esc(r.t):""}: ${agEdit?"apagar":"livre ou ocupado"}"><b>${esc(r.h)}</b>${String(r.t||"").trim()?`<span>${esc(r.t)}</span>`: ti===1&&r.c!=="r"? `<span>LIVRE</span>` : ""}${agEdit?`<i class="agx">✕</i>`:""}</button>`:`<div class="agcell"><input class="agh" data-agf="${key}|h" value="${esc(r.h)}" inputmode="numeric" placeholder="0800" aria-label="Horário"></div>`}</div>${AG_PICK===key?`<div class="agpop" role="dialog" aria-label="${AG_DN[k]} ${esc(r.h)}"><b>${AG_DN[k]} · ${esc(r.h)}</b>
        <button class="g" data-agset="g">✅ Livre</button>
        <label class="agpl" for="agPopTxt">Nome do aluno (opcional)</label><div class="agpok"><input class="inp" id="agPopTxt" value="${esc(String(r.t||"")==="OCUPADO"?"":r.t||"")}" placeholder="ex.: Carol" enterkeyhint="done"><button class="ok" data-agset="r" data-agok>OK</button></div>
        <button class="r" data-agset="r">⛔ Ocupado</button>
        <label class="agpl" for="agPopLbl">✏️ Outra coisa (só você vê; para o aluno fica ocupado)</label><div class="agpok"><input class="inp" id="agPopLbl" value="${esc(r.c==="o"?r.t||"":"")}" placeholder="ex.: Treino, Almoço" enterkeyhint="done"><button class="ok agok-o" data-agset="o">OK</button></div>
        <div class="agpr"><button data-agedh>✏️ Mudar horário</button><button data-agdelrow>🗑 Apagar</button></div><button class="x" data-agpickx>Fechar</button></div>`:""}`; }).join("")}
      <button class="agadd" data-agadd="${ti}|${k}" aria-label="Novo horário em ${AG_DN[k]}">+</button>${AG_NEW===ti+"|"+k?`<div class="agpop" role="dialog" aria-label="Novo horário"><b>Novo horário · ${AG_DN[k]}</b>
        <label class="agpl" for="agNewH">Horário (só os números, ex.: 0800)</label><input class="inp agwhi agnh" id="agNewH" inputmode="numeric" placeholder="08:00">
        <label class="agpl" for="agNewT">Nome do aluno (opcional)</label><div class="agpok"><input class="inp" id="agNewT" placeholder="ex.: Carol" enterkeyhint="done"><button class="ok" data-agnew="r" data-agnewok>OK</button></div>
        <div class="agpr"><button class="g" data-agnew="g">✅ Livre</button><button class="r" data-agnew="r">⛔ Ocupado</button></div><button class="x" data-agnewx>Cancelar</button></div>`:""}</div>`).join("")}</div></div>`; }
let AG_WHD=null;
function agWH(){ if(!AG_WHD){ const w=(S.agenda&&S.agenda.wh)||{}; AG_WHD={de:w.de||"05:00",ate:w.ate||"20:00",st:w.st||60,days:w.days||["Seg","Ter","Qua","Qui","Sex"]}; } return AG_WHD; }
function agWHHTML(){ const W=agWH(); return `<div class="agmk agwh"><b>🕐 Meu horário de trabalho</b>
    <div class="r"><span class="lb">Das</span><input class="inp agwhi" id="agWhDe" inputmode="numeric" value="${esc(W.de)}"><span class="lb">até</span><input class="inp agwhi" id="agWhAte" inputmode="numeric" value="${esc(W.ate)}"></div>
    <div class="r"><span class="lb">A cada</span><select class="inp" id="agWhSt" style="max-width:130px"><option value="60" ${W.st==60?"selected":""}>1 hora</option><option value="30" ${W.st==30?"selected":""}>30 minutos</option><option value="15" ${W.st==15?"selected":""}>15 minutos</option></select></div>
    <div class="r"><span class="lb">Dias</span>${AG_DIAS.map(k=>`<button class="dy" data-agwhd="${k}" aria-pressed="${W.days.includes(k)}">${k}</button>`).join("")}</div>
    <button class="btn primary" data-agwhgo>Criar os horários</button>
    <small class="muted">Aparecem todos os horários nas duas tabelas. Depois é só tocar no horário e escolher livre ou ocupado, ou escrever o nome do aluno. Os horários que já existem ficam como estão.</small></div>`; }
function agDelRow(A2,ti,k,i){ const L=A2.tabs[ti].d[k], r=L[i]; if(!r) return; if(r.an&&r.an.length){ toast(`${r.an.join(" e ")} treina neste horário (Cadastro). Para tirar, mude o horário no Cadastro.`); return; }
  L.splice(i,1); if(ti===0){ const P=A2.tabs[1].d[k]||[]; const j=P.findIndex(x=>agNorm(x.h)===agNorm(r.h)&&(x.auto||!String(x.t||"").trim()||x.t==="OCUPADO")); if(j>=0) P.splice(j,1); }
  agMirror(); save(); agRender(); toast(`${k} ${r.h} apagado`); }
function agTop(A2){ const tab=agTabHTML;
  const tools=`<div class="agtoolsbox"><button class="btn ${AG_WH?"primary":""}" data-agwh style="width:100%">🕐 Meu horário de trabalho (ex.: das 05:00 às 20:00)</button>${AG_WH? agWHHTML() : ""}
    <button class="agwab" data-agwa>📲 Enviar horários livres no WhatsApp</button>${agWa? agWaHTML() : ""}
    <button class="btn agmkb ${agMkOn?"primary":""}" data-agmk style="width:100%"><span class="agdot g"></span><span class="agdot r"></span> Marcar vários horários de uma vez (livre ou ocupado)</button>${agMkOn? agMkHTML() : ""}
    <div class="agtools"><button class="btn small ${agEdit?"danger":""}" data-agedit>${agEdit?"✓ Pronto, parar de apagar":"🗑 Apagar horários que não uso"}</button><button class="btn small" data-agfill>↻ Atualizar com o cadastro</button><button class="btn small ghost" data-agsab>${A2.days.includes("Sáb")?"− Sábado":"+ Sábado"}</button><button class="btn small ${agClr==="all"?"danger":"ghost"}" data-agclrall>${agClr==="all"?"Toque de novo para limpar tudo":"🧹 Limpar tudo"}</button><button class="btn small ghost" data-agdom>${A2.days.includes("Dom")?"− Domingo":"+ Domingo"}</button></div>
    <button class="btn small ${agCorOn?"primary":""}" data-agcoron style="justify-self:start">🎨 Cores da agenda</button>${agCorOn? agCorHTML() : ""}
    </div>`;
  return `<div class="aghead"><b>📅 Agenda da semana</b></div>${boxW("agtools","🧰 Ferramentas da agenda",tools)}
    <p class="muted agtip"><b>Toque no horário</b> para marcar ✅ livre ou ⛔ ocupado e escrever o nome. A tabela de novos alunos copia sozinha. Alunos do Cadastro entram sozinhos.</p>${agEdit?`<p class="agdelmsg">🗑 Toque nos horários que você quer tirar. Depois toque em “Pronto”.</p>`:""}
    ${A2.tabs.map(tab).join("")}`; }
/* Agenda -> Cadastro: mudou o horário de um aluno do cadastro aqui, muda lá também (Presença, Financeiro e Sessão juntos) */
function agCadHora(r,k,novo){ try{ const old=agNorm(r.h); if(!r.an||!r.an.length||!presOn()||!/^\d{2}:\d{2}$/.test(novo)||novo===old) return;
  const WDN={Dom:0,Seg:1,Ter:2,Qua:3,Qui:4,Sex:5,"Sáb":6}, wd=WDN[k]; const feitos=[];
  PRES.alunos().filter(a=>a.ativo!==false&&r.an.includes(first(a.nome))).forEach(a0=>{ const a=PRES.aluno(a0.id); if(!a) return; let mud=false;
    (a.slots||[]).forEach(s=>{ if(s.d===wd&&agNorm(s.h)===old){ s.h=novo; mud=true; } }); if(!mud) return;
    PRES.upsert(a); const m=S.students.find(x=>x.pid===a.id); if(m){ try{ setSlots(m,(a.slots||[]).map(s=>({d:s.d,h:s.h}))); }catch(_){} } feitos.push(first(a.nome)); });
  if(feitos.length){ save(); setTimeout(()=>toast(`${feitos.join(" e ")}: ${AG_DN[k]} ${old} → ${novo}. Mudou também no Cadastro.`),300); } }catch(e){ toast("Mudou na agenda, mas não consegui mudar no Cadastro. Mude lá também."); } }
function agFit(t){ if(CSS.supports&&CSS.supports("field-sizing","content")) return; t.style.height="auto"; t.style.height=t.scrollHeight+"px"; }
function agRender(){ const v=document.getElementById("agview"); if(!v||v.hidden) return; agSync(); v.innerHTML=agHTML(); v.querySelectorAll("textarea.agt").forEach(agFit); }
document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.matches&&e.target.matches("textarea.agt")){ e.preventDefault(); e.target.blur(); } if(e.key==="Enter"&&(e.target.id==="agNewT"||e.target.id==="agNewH")){ e.preventDefault(); if(e.target.id==="agNewH"){ const t2=document.getElementById("agNewT"); if(t2) t2.focus(); } else { const bt=document.querySelector("#agview [data-agnewok]"); if(bt) bt.click(); } } if(e.key==="Enter"&&e.target.id==="agPopTxt"){ e.preventDefault(); const bt=document.querySelector('#agview [data-agok]'); if(bt) bt.click(); } });
function agSet(on){ AG_OPEN=on; const v=document.getElementById("agview"), pm=document.getElementById("pmain"), pn=document.getElementById("pnav"), ab=document.getElementById("agOpen");
  if(!v) return; v.hidden=!on; if(pm) pm.hidden=on; if(pn) pn.style.display=on?"none":""; if(ab) ab.hidden=true; if(on) agRender(); }
document.addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return;
  if(b.id==="agOpen"){ agSet(true); window.scrollTo(0,0); return; }
  if(b.id==="agBack"){ agSet(false); return; }
  if(!b.closest("#agview")) return; const A2=agData();
  if(b.dataset.agpick&&agEdit){ const [ti,k,i]=b.dataset.agpick.split("|"); agDelRow(A2,+ti,k,+i); return; }
  if(b.dataset.agpick){ AG_PICK= AG_PICK===b.dataset.agpick? null : b.dataset.agpick; AG_EDH=null; agRender(); return; }
  if(b.hasAttribute("data-agpickx")){ AG_PICK=null; agRender(); return; }
  if(b.dataset.agset||b.hasAttribute("data-agedh")||b.hasAttribute("data-agdelrow")){ const [ti,k,i]=(AG_PICK||"").split("|"); const r=A2.tabs[+ti]&&A2.tabs[+ti].d[k]&&A2.tabs[+ti].d[k][+i]; if(!r){ AG_PICK=null; agRender(); return; }
    if(b.hasAttribute("data-agedh")){ AG_EDH=AG_PICK; AG_PICK=null; agRender(); const el=document.querySelector(`[data-agf="${AG_EDH}|h"]`); if(el){ el.focus(); el.select&&el.select(); } return; }
    if(b.hasAttribute("data-agdelrow")){ AG_PICK=null; agDelRow(A2,+ti,k,+i); return; }
    if(b.dataset.agset==="o"){ const pl=document.getElementById("agPopLbl"); const lv=pl? pl.value.trim().slice(0,20) : ""; if(!lv){ toast("Escreva o que é (ex.: Treino)"); if(pl) pl.focus(); return; } if(r.an&&r.an.length){ toast(`${r.an.join(" e ")} treina neste horário (Cadastro).`); return; } r.c="o"; r.t=lv; delete r.auto; delete r.an; AG_PICK=null; agMirror(); save(); agRender(); toast(`✓ Salvo: ${k} ${r.h} · ${lv}`); return; }
    if(b.dataset.agset==="g"){ if(r.an&&r.an.length){ toast(`${r.an.join(" e ")} treina neste horário (Cadastro). Para liberar, mude o horário no Cadastro.`); return; } r.c="g"; r.t=""; delete r.auto; }
    else { const pt=document.getElementById("agPopTxt"); const nv=pt? pt.value.trim() : ""; r.c="r"; if(nv) r.t=nv; else if(String(r.t||"")!=="OCUPADO"&&!(r.an&&r.an.length)) r.t= +ti===1? "OCUPADO" : ""; if(+ti===1&&!String(r.t||"").trim()) r.t="OCUPADO"; delete r.auto; delete r.an; }
    AG_PICK=null; agMirror(); save(); agRender(); toast(b.dataset.agset==="g"? `✓ Salvo: ${k} ${r.h} livre` : `✓ Salvo: ${k} ${r.h} ocupado${r.t&&r.t!=="OCUPADO"?" · "+r.t:""}`); return; }
  if(b.hasAttribute("data-agwh")){ AG_WH=!AG_WH; agRender(); return; }
  if(b.dataset.agwhd){ const W=agWH(); const k=b.dataset.agwhd; W.days=W.days.includes(k)? W.days.filter(x=>x!==k) : [...W.days,k]; agRender(); return; }
  if(b.hasAttribute("data-agwhgo")){ const W=agWH(); const de=agNorm(document.getElementById("agWhDe").value), ate=agNorm(document.getElementById("agWhAte").value), st=+document.getElementById("agWhSt").value||60;
    if(!/^\d{2}:\d{2}$/.test(de)||!/^\d{2}:\d{2}$/.test(ate)){ toast("Coloque o horário de início e de fim"); return; } if(!W.days.length){ toast("Escolha os dias"); return; }
    const toM=h=>+h.slice(0,2)*60+ +h.slice(3); const a0=toM(de), a1=toM(ate); if(a1<a0){ toast("O fim tem que ser depois do início"); return; }
    W.de=de; W.ate=ate; W.st=st; S.agenda.wh=W; let n=0;
    W.days.forEach(k=>{ agAddDay(k); A2.tabs.forEach(T=>{ const L=T.d[k]; for(let m=a0;m<=a1;m+=st){ const h=String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0"); if(!L.some(x=>agNorm(x.h)===h)){ L.push({h,t:"",c:""}); n++; } } L.sort((x,y)=>(x.h||"99").localeCompare(y.h||"99")); }); });
    agSync(); agMirror(); save(); AG_WH=false; agRender(); toast(n? `Horários criados de ${de} a ${ate}. Toque no horário para marcar livre ou ocupado.` : "Esses horários já estavam na agenda"); return; }
  if(b.hasAttribute("data-agedit")){ agEdit=!agEdit; agRender(); return; }
  if(b.hasAttribute("data-agwa")){ agWa=!agWa; agRender(); return; }
  if(b.dataset.agwad){ const k=b.dataset.agwad; if(k==="all") agWaD=null; else { const cur=agWaD? agWaD.slice() : []; agWaD= cur.includes(k)? cur.filter(x=>x!==k) : cur.concat(k); if(!agWaD.length||agWaD.length===agData().days.length) agWaD=null; } agRender(); return; }
  if(b.dataset.agwaf){ agWaF=b.dataset.agwaf; agRender(); return; }
  if(b.hasAttribute("data-agwago")&&agWaF!=="txt"){ const te=document.getElementById("agWaTxt"), txt=agWaF==="both"&&te? te.value : "";
    agWaCanvas().toBlob(async blob=>{ const f=new File([blob],"horarios-disponiveis.png",{type:"image/png"});
      try{ if(navigator.canShare&&navigator.canShare({files:[f]})){ await navigator.share(txt? {files:[f],text:txt} : {files:[f]}); return; } }catch(e){ if(e&&e.name==="AbortError") return; }
      if(txt){ copyText(txt); toast("Texto copiado: cole no WhatsApp junto com a imagem"); }
      offerFile(blob,"horarios-disponiveis.png",{share:false}); },"image/png"); return; }
  if(b.hasAttribute("data-agwago")){ const id=document.getElementById("agWaTo").value, txt=document.getElementById("agWaTxt").value; const a=id&&PRES.alunos().find(x=>x.id===id);
    let tel=String((a&&a.tel)||"").replace(/\D/g,""); if(tel&&tel.length<=11) tel="55"+tel.replace(/^0+/,""); const url="https://wa.me/"+tel+"?text="+encodeURIComponent(txt);
    let w=null; try{ w=window.open(url,"_blank"); }catch(err){} if(!w){ const l=document.createElement("a"); l.href=url; l.target="_blank"; l.rel="noopener"; document.body.appendChild(l); l.click(); l.remove(); } return; }
  if(b.dataset.agc){ const [ti,k,i]=b.dataset.agc.split("|"); const r=A2.tabs[+ti].d[k][+i]; r.c=AG_CYC[(AG_CYC.indexOf(r.c||"")+1)%AG_CYC.length]; save(); b.parentNode.style.setProperty("--ac",agCol(r)); return; }
  if(b.dataset.agadd){ AG_NEW=b.dataset.agadd; AG_PICK=null; agRender(); setTimeout(()=>{ const el=document.getElementById("agNewH"); if(el) el.focus(); },60); return; }
  if(b.hasAttribute("data-agnewx")){ AG_NEW=null; agRender(); return; }
  if(b.dataset.agnew){ const [ti,k]=(AG_NEW||"").split("|"); const T=A2.tabs[+ti]; if(!T) return; const h=agNorm(document.getElementById("agNewH").value); const nm=document.getElementById("agNewT").value.trim();
    if(!/^\d{2}:\d{2}$/.test(h)){ toast("Coloque o horário, ex.: 0800"); document.getElementById("agNewH").focus(); return; }
    agAddDay(k); const L=T.d[k]; let r=L.find(x=>agNorm(x.h)===h); const ex=!!r; if(!r){ r={h,t:"",c:""}; L.push(r); }
    if(b.dataset.agnew==="g"){ if(r.an&&r.an.length){ toast(`${r.an.join(" e ")} treina neste horário (Cadastro).`); return; } r.c="g"; r.t=""; } else { r.c="r"; if(nm) r.t=nm; else if(!String(r.t||"").trim()) r.t= +ti===1? "OCUPADO" : ""; }
    delete r.auto; L.sort((a,b)=>(a.h||"99").localeCompare(b.h||"99")); AG_NEW=null; agMirror(); save(); agRender();
    toast(`✓ ${ex?"Atualizado":"Salvo"}: ${k} ${h} ${b.dataset.agnew==="g"?"livre":"ocupado"}${nm?" · "+nm:""}`); return; }
  if(b.dataset.agdel){ const [ti,k,i]=b.dataset.agdel.split("|"); A2.tabs[+ti].d[k].splice(+i,1); save(); agRender(); return; }
  if(b.hasAttribute("data-agclrall")){ if(agClr!=="all"){ agClr="all"; agRender(); return; } agClr=""; A2.tabs.forEach(T=>A2.days.forEach(k=>{ T.d[k]=[]; })); save(); agRender(); toast("Agenda limpa. Os horários fixos dos alunos voltam sozinhos."); return; }
  if(b.dataset.agclrd){ const key=b.dataset.agclrd; if(agClr!==key){ agClr=key; agRender(); return; } agClr=""; const [ti,k]=key.split("|"); A2.tabs[+ti].d[k]=[]; save(); agRender(); toast(`${AG_DN[k]} limpa`); return; }
  if(agClr){ agClr=""; }
  if(b.hasAttribute("data-agmk")){ agMkOn=!agMkOn; agRender(); return; }
  if(b.hasAttribute("data-agcoron")){ agCorOn=!agCorOn; agRender(); return; }
  if(b.dataset.agcor){ const [k,c]=b.dataset.agcor.split("|"); agCores()[k]=c; save(); agRender(); return; }
  if(b.hasAttribute("data-agcorrst")){ delete S.agenda.cores; save(); agRender(); toast("Cores padrão: cabeçalho branco, livre verde, ocupado vermelho"); return; }
  if(b.dataset.agmkst){ agMk.st=b.dataset.agmkst; agRender(); return; }
  if(b.dataset.agmkd){ const k=b.dataset.agmkd; agMk.days=agMk.days.includes(k)? agMk.days.filter(x=>x!==k) : agMk.days.concat(k); agRender(); return; }
  if(b.dataset.agmkto){ const k=b.dataset.agmkto; agMk.to=agMk.to.includes(k)? agMk.to.filter(x=>x!==k) : agMk.to.concat(k); agRender(); return; }
  if(b.dataset.agmkall){ const v=b.dataset.agmkall; agMk.days= v==="todos"? AG_DIAS.slice() : v==="seg-sex"? AG_DIAS.slice(0,5) : []; agRender(); return; }
  if(b.hasAttribute("data-agmkgo")){ agMkApply(); return; }
  if(b.hasAttribute("data-agmkcopy")){ agMkCopy(); return; }
  if(b.hasAttribute("data-agdom")){ if(A2.days.includes("Dom")) A2.days=A2.days.filter(x=>x!=="Dom"); else agAddDay("Dom"); save(); agRender(); return; }
  if(b.hasAttribute("data-agsab")){ if(A2.days.includes("Sáb")) A2.days=A2.days.filter(x=>x!=="Sáb"); else agAddDay("Sáb"); save(); agRender(); return; }
  if(b.hasAttribute("data-agfill")){ if(!presOn()){ toast("Cadastre os alunos primeiro"); return; } const ch0=agSync(); if(ch0||true){ agRender(); toast(ch0? "Agenda atualizada com os horários do cadastro" : "Tudo certo: a agenda já está igual ao cadastro"); return; } const WD={1:"Seg",2:"Ter",3:"Qua",4:"Qui",5:"Sex",6:"Sáb",0:"Dom"}; const g={};
    PRES.alunos().filter(a=>a.ativo!==false).forEach(a=>(a.slots||[]).forEach(sl=>{ const k=WD[sl.d]; if(!k) return; (g[k]=g[k]||{}); (g[k][sl.h]=g[k][sl.h]||[]).push(first(a.nome)); }));
    const T=A2.tabs[0]; let n=0; Object.entries(g).forEach(([k,hs])=>{ if(!A2.days.includes(k)) return; T.d[k]=T.d[k]||[]; Object.entries(hs).forEach(([h,ns])=>{ const txt=ns.join(" e "); let r=T.d[k].find(x=>x.h===h); if(!r){ r={h,t:"",c:""}; T.d[k].push(r); } if(!String(r.t).trim()){ r.t=txt; n++; } }); T.d[k].sort((a,b)=>(a.h||"99").localeCompare(b.h||"99")); });
    save(); agRender(); toast(n? `${n} horários preenchidos com os alunos` : "Nada novo: os horários dos alunos já estão na agenda"); return; }
  if(b.hasAttribute("data-aggen")){ const [M,P]=A2.tabs; A2.days.forEach(k=>{ P.d[k]=(M.d[k]||[]).map(r=>({h:r.h,t:String(r.t||"").trim()?"OCUPADO":"",c:""})); }); save(); agRender(); toast(`Tabela de novos alunos gerada: o que tem nome virou OCUPADO`); return; }
});
document.addEventListener("change",e=>{ const t=e.target; if(!t.closest||!t.closest("#agview")) return; const A2=agData();
  if(t.dataset.agcorx){ agCores()[t.dataset.agcorx]=t.value.toUpperCase(); save(); agRender(); return; }
  if(t.id==="agMkAl"){ agMk.txt=t.value; agRender(); return; }
  if(t.id==="agMkTi"){ agMk.ti=+t.value; return; } if(t.id==="agMkH"){ agMk.h=t.value; return; } if(t.id==="agMkTxt"){ agMk.txt=t.value; return; }
  if(t.id==="agMkFrom"){ agMk.from=t.value; agMk.to=agMk.to.filter(x=>x!==t.value); agRender(); return; }
  if(t.dataset.agtitle!=null){ A2.tabs[+t.dataset.agtitle].title=t.value; save(); return; }
  if(t.dataset.agf){ const [ti,k,i,f]=t.dataset.agf.split("|"); const r=A2.tabs[+ti].d[k][+i]; if(!r) return; if(f==="h"){ t.value=agNorm(t.value); if(+ti===0) agCadHora(r,k,t.value); } r[f]=f==="t"? t.value.replace(/\s*\n\s*/g," ") : t.value; if(t.tagName==="TEXTAREA") agFit(t); delete r.auto; if(f==="t") delete r.an; save(); t.parentNode.style.setProperty("--ac",agCol(r)); if(f==="h"&&AG_EDH){ AG_EDH=null; agMirror(); save(); setTimeout(agRender,0); return; }
    if(+ti===0&&agMirror()){ save(); const el=document.querySelector('#agview [data-agtab="1"]'); if(el){ el.outerHTML=agTabHTML(A2.tabs[1],1); document.querySelectorAll('#agview [data-agtab="1"] textarea.agt').forEach(agFit); } } } });
document.addEventListener("input",e=>{ const t=e.target; if(!t.classList||!(t.classList.contains("agh")||t.classList.contains("agwhi"))) return; const d=t.value.replace(/\D/g,"").slice(0,4); const v=d.length>2? d.slice(0,2)+":"+d.slice(2) : d; if(t.value!==v&&!/^\d{1,2}:\d{0,2}$/.test(t.value)) t.value=v; else if(/^\d{3,4}$/.test(t.value)) t.value=v; });
const FZ=[0.55,0.62,0.7,0.8,0.87,0.94,1,1.08,1.16,1.25]; let fzI=6; try{ const fv=localStorage.getItem("fzV"); if(fv!==null){ const i=FZ.indexOf(+fv); if(i>=0) fzI=i; } else { const o=localStorage.getItem("fzI"); if(o!==null){ const i=FZ.indexOf([0.8,0.87,0.94,1,1.08,1.16,1.25][+o]); if(i>=0) fzI=i; } } }catch(e){}
function applyFz(){ document.body.style.zoom=FZ[fzI]; try{ sideApply(); }catch(e){} try{ localStorage.setItem("fzV",FZ[fzI]); }catch(e){} }
document.addEventListener("click",e=>{ const b=e.target.closest("#fzMinus,#fzPlus,.fzMinus,.fzPlus"); if(!b) return; fzI=Math.max(0,Math.min(FZ.length-1,fzI+(b.id==="fzPlus"||b.classList.contains("fzPlus")?1:-1))); applyFz(); toast(`Tamanho: ${Math.round(FZ[fzI]*100)}%`); });
setTimeout(applyFz,0);
function progTop(){ const top=document.getElementById("top"); if(!top) return; let el=document.getElementById("progTop");
  if(!el){ el=document.createElement("button"); el.id="progTop"; el.type="button"; el.addEventListener("click",()=>{ if(CUR_TAB==="semana"){ show("sessao"); } else { show("semana"); } }); }
  if(el.nextElementSibling!==top) top.parentNode.insertBefore(el,top);
  const on=CUR_TAB==="semana"; el.hidden=!on; if(!on) return; const m=A();
  el.className= CUR_TAB==="semana"? "progtop back" : "progtop";
  el.innerHTML= CUR_TAB==="semana"? `<span class="pt-ic">←</span><span><b>Voltar para a Sessão do dia</b><small>Você está na programação do treino de ${esc(first(m.name))}</small></span>`
    : `<span class="pt-ic">📊</span><span><b>Programação do treino de ${esc(first(m.name))}</b><small>Estruturação do treino do seu aluno: fases, semanas, letras e divisão</small></span><span class="pt-ar">›</span>`; }
function renderTop(){ setTimeout(()=>{ try{ progTop(); }catch(_){} },0);
  const st=A(); const p=phaseOf(st); const ms=sesMembers(); const uph=usesPh(st);
  document.documentElement.style.setProperty("--pc",uph?`var(--p${st.phase})`:"var(--accent)");
  document.getElementById("topPlate").textContent=uph? phK(st) : (st.name||"?").trim().charAt(0).toUpperCase(); setTimeout(alrBadge,0);
  document.getElementById("topName").textContent=st.name;
  document.getElementById("topMode").innerHTML= esc(ms.length>1? `${groupLabel(ms.length)} com ${ms.filter(m=>m!==st).map(m=>first(m.name)).join(" e ")}` : "Individual") + (stPend(st)? ` <button class="pendpill" data-pend>⚠ dias e horários pendentes</button>` : stTipo(st)==="avulsa"? ` <span class="pendpill ok">aula avulsa</span>` : "") + (()=>{ const u=st.pid&&presOn()&&PRES.pacUso(st.pid); return u? " "+pacTagHTML(u) : ""; })();
  document.getElementById("topPhase").textContent=uph? `${phT(st)} · ${p.n}` : "";
  const mates=document.getElementById("mates");
  if(ms.length>1){
    const idx=ms.indexOf(st); const nx=ms[(idx+1)%ms.length];
    mates.hidden=false;
    mates.innerHTML=ms.map(m=>`<button class="chip" data-st="${m.id}" style="--pc:var(--p${m.phase})" aria-pressed="${m===st}"><span class="dotnum">${phK(m)}</span>${esc(first(m.name))}</button>`).join("")
      + `<button class="chip next" data-st="${nx.id}" aria-label="Próximo aluno: ${esc(nx.name)}">Próximo →</button>`;
  } else { mates.hidden=true; mates.innerHTML=""; }
  document.getElementById("phaseStrip").innerHTML=Object.keys(PHASES).map(k=>`<button style="--pc:var(--p${k})" data-phase="${k}" aria-pressed="${+k===st.phase}" aria-label="${PHASES[k].t}: ${PHASES[k].n}">${PHASES[k].k}<span class="dot"></span></button>`).join("");
}
document.getElementById("mates").addEventListener("click",e=>{ const b=e.target.closest("[data-st]"); if(b) activate(b.dataset.st); });
document.getElementById("phaseStrip").addEventListener("click",e=>{
  const b=e.target.closest("[data-phase]"); if(!b) return;
  A().phase=+b.dataset.phase; phView=null; save(); renderAll(); toast(`${first(A().name)}: ${phT(A())} · ${phaseOf(A()).n}`);
});

/* ---------- Alunos ---------- */
let joinArm=null, delArm=null;
function openPeople(){ joinArm=null; delArm=null; renderPeople(); document.getElementById("people").hidden=false; }
function closePeople(){ document.getElementById("people").hidden=true; }
document.getElementById("peopleBtn").onclick=openPeople;
document.getElementById("pClose").onclick=closePeople;
document.getElementById("people").addEventListener("click",e=>{ if(e.target.id==="people") closePeople(); });

function renderPeople(){
  const groups=S.plans.map(pl=>({pl,ms:S.students.filter(s=>s.planId===pl.id)})).filter(g=>g.ms.length);
  groups.sort((a,b)=>b.ms.length-a.ms.length);
  document.getElementById("pBody").innerHTML=groups.map(g=>`
    <div class="pgroup">
      <span class="label">${groupLabel(g.ms.length)}${g.ms.length>1?" · mesmo treino":""}</span>
      ${g.ms.map(m=>{
        const others=S.students.filter(o=>o.planId!==m.planId && membersOf(o).length<3);
        return `<div class="prow">
          <button class="plate sm" style="--pc:var(--p${m.phase})" data-open="${m.id}" aria-label="Abrir ${esc(m.name)}">${phK(m)}</button>
          <input class="inp" id="rn-${m.id}" data-rename="${m.id}" value="${esc(m.name)}" aria-label="Nome">
          <button class="btn small ${m.id===S.active?"":"primary"}" data-open="${m.id}">${m.id===S.active?"Aberto":"Abrir"}</button>
        </div>
        <div class="pacts"><label class="pweight">Programação <select class="inp" data-pgl="${m.id}" aria-label="Programação de ${esc(m.name)}">${[["tio","Programação por fases"],["minha","Minha programação"],["conf","Medo de peso"],["","Nenhuma programação"]].map(([v,t])=>`<option value="${v}" ${lineOf(progOf(m))===v?"selected":""}>${t}</option>`).join("")}</select></label></div>
        <div class="pacts"><label class="pweight">Peso <input class="inp" type="text" inputmode="decimal" id="pw-${m.id}" data-peso="${m.id}" value="${esc(m.peso||"")}" placeholder="kg"></label><span class="muted" style="font-size:11.5px">para calcular o gasto calórico da sessão</span></div>
        ${(()=>{ const sl=getSlots(m); return `<div class="pacts pslots"><span class="pweight">Dias e horário</span><div class="pdrow">${[1,2,3,4,5,6,0].map(d=>`<button class="pday ${sl.some(x=>x.d===d)?"on":""}" data-psd="${m.id}" data-d="${d}" aria-pressed="${sl.some(x=>x.d===d)}">${CAD_DN[d]}</button>`).join("")}</div>
          ${sl.length?`<div class="pdrow">${sl.slice().sort((a,b)=>(a.d||7)-(b.d||7)).map(x=>`<label class="pst">${CAD_DN[x.d]}<input class="inp" type="time" data-pst="${m.id}" data-d="${x.d}" value="${esc(x.h||"")}"></label>`).join("")}</div>`:""}
          ${stTipo(m)==="avulsa"&&!sl.length?`<p class="pend ok">Aula avulsa, sem dias fixos. Lance cada aula na Presença em "+ Reposição ou aula extra". Para ter dias fixos, toque nos dias acima.</p>`:!sl.length?`<p class="pend">⚠ Dias e horários pendentes. Toque nos dias acima, ou <button class="linkb" data-pavul="${m.id}">marque como aula avulsa</button>.</p>`:""}
          <span class="muted" style="font-size:11.5px">Vai direto para a Presença e a Sessão. Valor e forma de pagamento ficam na aba Cadastro.</span></div>`; })()}
        <div class="pacts">
          ${g.ms.length>1? `<button class="btn small" data-leave="${m.id}">Separar do grupo</button>` : (others.length? `<select class="inp" id="jn-${m.id}" data-join="${m.id}" aria-label="Treinar junto com"><option value="">Treinar junto com…</option>${others.map(o=>`<option value="${o.id}">${esc(o.name)}</option>`).join("")}</select>`:"")}
          ${S.students.length>1? `<button class="btn small danger" data-del="${m.id}">${delArm===m.id?"Toque de novo para excluir":"Excluir"}</button>`:""}
        </div>
        ${joinArm&&joinArm.st===m.id? `<div class="pacts"><span class="just">O treino de ${esc(first(S.students.find(x=>x.id===joinArm.to).name))} passa a valer para ${esc(first(m.name))}. O treino atual de ${esc(first(m.name))} é descartado.</span><button class="btn small primary" data-joinok>Confirmar</button><button class="btn small" data-joinno>Cancelar</button></div>`:""}`;
      }).join("")}
    </div>`).join("");
  document.getElementById("nPhase").innerHTML=Object.keys(PHASES).map(k=>`<option value="${k}" ${k==="1"?"selected":""}>${PHASES[k].t} · ${PHASES[k].n}</option>`).join("");
  const opts=[`<option value="new">Individual · treino novo</option>`];
  S.students.forEach(s=>opts.push(`<option value="copy:${s.id}">Individual · copiar de ${esc(first(s.name))}</option>`));
  groups.forEach(g=>{ const n=g.ms.length; opts.push(`<option value="join:${g.ms[0].id}" ${n>=3?"disabled":""}>${n===1?"Dupla":"Trio"} com ${g.ms.map(m=>esc(first(m.name))).join(" e ")}${n>=3?" (cheio)":""}</option>`); });
  document.getElementById("nMode").innerHTML=opts.join("");
  bindPeople();
}
function getSlots(m){ const a=presOn()&&m.pid&&PRES.aluno(m.pid); if(a) return clean(a.slots||[]); return clean(m.slotsL||(Array.isArray(m.days)?m.days.map(d=>({d:(DAYS.indexOf(d)+1)%7,h:"07:00"})):[])); }
function setSlots(m,sl){ sl=sl.filter(x=>x.d>=0&&x.d<=6); m.slotsL=sl; if(sl.length) delete m.avulsa; m.days=[...new Set(sl.slice().sort((a,b)=>(a.d||7)-(b.d||7)).map(x=>CAD_DN[x.d]))];
  if(presOn()){ let a=m.pid&&PRES.aluno(m.pid); if(!a) a=PRES.alunos().find(x=>noAcc(x.nome).trim()===noAcc(m.name).trim()&&!byPid(x.id));
    const n= a? Object.assign({},a,{slots:sl},(a.tipo==="avulsa"&&sl.length)?{tipo:"aula"}:{}) : {id:null,nome:m.name,tipo:"aula",forma:"mensal",ativo:true,valorAula:0,contratadas:0,slots:sl};
    m.pid=PRES.upsert(n); delete m.noLink; }
  save(); renderAll(); renderPeople(); }
function bindPeople(){
  document.getElementById("pBody").querySelectorAll("[data-pday]").forEach(b=>b.onclick=()=>{ const m=S.students.find(x=>x.id===b.dataset.pday); const cur=[...trainDays(m)]; const d=b.dataset.d; m.days= cur.includes(d)? cur.filter(x=>x!==d) : DAYS.filter(x=>x===d||cur.includes(x)); save(); renderPeople(); renderSessao(); });
  const body=document.getElementById("pBody");
  body.querySelectorAll("[data-psd]").forEach(b=>b.onclick=()=>{ const m=S.students.find(x=>x.id===b.dataset.psd); const d=+b.dataset.d; const sl=getSlots(m);
    if(sl.some(x=>x.d===d)) setSlots(m,sl.filter(x=>x.d!==d)); else setSlots(m,[...sl,{d,h:(sl[sl.length-1]||{}).h||"07:00"}]); });
  body.querySelectorAll("[data-pavul]").forEach(b=>b.onclick=()=>setAvulsa(S.students.find(x=>x.id===b.dataset.pavul)));
  body.querySelectorAll("[data-pst]").forEach(i=>i.onchange=()=>{ const m=S.students.find(x=>x.id===i.dataset.pst); const d=+i.dataset.d; setSlots(m,getSlots(m).map(x=>x.d===d?{d,h:i.value}:x)); });
  body.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>{ closePeople(); activate(b.dataset.open); });
  body.querySelectorAll("[data-plink]").forEach(sel=>sel.onchange=()=>{ const m=S.students.find(x=>x.id===sel.dataset.plink); const other=sel.value&&byPid(sel.value); if(other&&other!==m) delete other.pid; if(sel.value) m.pid=sel.value; else { delete m.pid; m.noLink=1; } save(); renderAll(); renderPeople(); });
  body.querySelectorAll("[data-pgl]").forEach(sel=>sel.onchange=()=>{ const m=S.students.find(x=>x.id===sel.dataset.pgl); const pr=pgMat(m); pr.line=sel.value; delete pr.fases; if(pr.line==="conf"&&(+pr.weeks||0)<7) pr.weeks=7; fixWeeks(m,pr); save(); renderAll(); renderPeople(); toast(`${first(m.name)}: ${sel.options[sel.selectedIndex].text}`); });
  body.querySelectorAll("[data-phsel]").forEach(sel=>sel.onchange=()=>{ const m=S.students.find(x=>x.id===sel.dataset.phsel); m.phase=+sel.value; save(); renderAll(); renderPeople(); toast(`${first(m.name)}: ${phT(m)}`); });
  body.querySelectorAll("[data-novo]").forEach(b=>b.onclick=()=>{ const m=S.students.find(x=>x.id===b.dataset.novo); m.novo=!m.novo; save(); renderPeople(); });
  body.querySelectorAll("[data-ob]").forEach(b=>b.onclick=()=>{ const m=S.students.find(x=>x.id===b.dataset.ob); m.ob=!m.ob; save(); renderAll(); renderPeople(); });
  body.querySelectorAll("[data-peso]").forEach(i=>i.oninput=()=>{ const s2=S.students.find(x=>x.id===i.dataset.peso); s2.peso=i.value.trim(); save(); });
  body.querySelectorAll("[data-rename]").forEach(i=>i.oninput=()=>{ const s=S.students.find(x=>x.id===i.dataset.rename); s.name=i.value; save(); renderTop(); });
  body.querySelectorAll("[data-rename]").forEach(i=>i.onchange=()=>renderAll());
  body.querySelectorAll("[data-leave]").forEach(b=>b.onclick=()=>{ leaveGroup(S.students.find(x=>x.id===b.dataset.leave)); });
  body.querySelectorAll("[data-join]").forEach(sel=>sel.onchange=()=>{ if(!sel.value) return; joinArm={st:sel.dataset.join,to:sel.value}; renderPeople(); });
  const ok=body.querySelector("[data-joinok]"); if(ok) ok.onclick=()=>{ joinGroup(S.students.find(x=>x.id===joinArm.st), S.students.find(x=>x.id===joinArm.to)); };
  const no=body.querySelector("[data-joinno]"); if(no) no.onclick=()=>{ joinArm=null; renderPeople(); };
  body.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{
    if(delArm!==b.dataset.del){ delArm=b.dataset.del; renderPeople(); return; }
    removeStudent(S.students.find(x=>x.id===b.dataset.del));
  });
}
function copyPlanFrom(st){
  return {id:nid(),sessions:viewOf(st).map(({se,rows})=>({id:nid(),day:se.day,name:se.name,items:rows.filter(r=>!r.skip).map(r=>({id:nid(),ex:r.ex,sets:r.sets,reps:r.reps}))}))};
}
function dropEmptyPlans(){ S.plans=S.plans.filter(p=>S.students.some(s=>s.planId===p.id)); }
function leaveGroup(st){
  const pl=copyPlanFrom(st); S.plans.push(pl);
  const old=planOf(st); old.sessions.forEach(se=>se.items=se.items.filter(it=>it.only!==st.id));
  st.planId=pl.id; st.ov={}; save(); renderAll(); renderPeople(); toast(`${first(st.name)} agora treina individual, com o treino que já tinha`);
}
function joinGroup(st,to){
  if(membersOf(to).length>=3){ toast("Esse grupo já é um trio"); return; }
  st.planId=to.planId; st.ov={}; dropEmptyPlans(); joinArm=null; save(); renderAll(); renderPeople();
  toast(`${first(st.name)} entrou no grupo de ${first(to.name)}`);
}
function removeStudent(st){
  const pl=planOf(st); if(pl) pl.sessions.forEach(se=>se.items=se.items.filter(it=>it.only!==st.id));
  S.students=S.students.filter(s=>s!==st); dropEmptyPlans();
  if(S.active===st.id) S.active=S.students[0].id;
  delArm=null; save(); renderAll(); renderPeople(); toast("Aluno excluído");
}
document.getElementById("expApp").onclick=()=>{
  S.students.forEach(st=>{ if(!st.tok) st.tok=(noAcc(first(st.name)).replace(/[^a-z0-9]/g,"")||"aluno")+"-"+Math.random().toString(36).slice(2,6); });
  const desc=S.weeks.slice().sort((a,b)=>a.start<b.start?1:-1);
  const students=S.students.map(st=>{ const p=phaseOf(st); const days={};
    DAYS.forEach(dy=>{ for(const w of desc){ const d=dayOf(w.id,st.id,dy); if(dayHasData(d)){ days[dy]={rows:d.rows.filter(r=>r.n1.trim()).map(r=>({n:r.n1.trim(),conj:!!r.conj,a:{s:r.a.s,r:r.a.r,c:r.a.c,sec:r.a.sec||"",isoM:r.a.isoM||"",isoS:r.a.isoS||""},iso:!!r.iso,b:{s:r.b.s,r:r.b.r,c:r.b.c}})),cardio:d.cardio,wod:d.wod||null}; break; } } });
    return {tok:st.tok,name:st.name,phase:p.k,pn:p.n,sets:rng(p.sets),reps:p.reps[0]+"–"+p.reps[1],days}; }).filter(x=>Object.keys(x.days).length);
  save();
  if(!students.length){ toast("Nenhum aluno com treino lançado ainda."); return; }
  const t="FASES1:"+JSON.stringify({v:1,students});
  const fb=document.getElementById("expFallback"); const f=()=>{ fb.hidden=false; fb.value=t; fb.focus(); fb.select(); toast("Código selecionado. Copie manualmente."); };
  try{ navigator.clipboard.writeText(t).then(()=>toast(`Copiado: ${students.length} alunos. Cole no app do aluno.`),f); }catch(e){ f(); }
};
document.getElementById("nAdd").onclick=()=>{
  const name=document.getElementById("nName").value.trim(); if(!name){ toast("Escreva o nome do aluno"); document.getElementById("nName").focus(); return; }
  const phase=+document.getElementById("nPhase").value; const mode=document.getElementById("nMode").value;
  const st={id:nid(),name,phase,coreExtra:false,planId:null,ov:{},log:[]};
  if(mode.startsWith("join:")){ const to=S.students.find(x=>x.id===mode.slice(5)); if(membersOf(to).length>=3){ toast("Esse grupo já é um trio"); return; } st.planId=to.planId; }
  else if(mode.startsWith("copy:")){ const pl=copyPlanFrom(S.students.find(x=>x.id===mode.slice(5))); S.plans.push(pl); st.planId=pl.id; }
  else { const pl={id:nid(),sessions:[{id:nid(),day:"Seg",name:"Treino A",items:[]}]}; S.plans.push(pl); st.planId=pl.id; }
  S.students.push(st); S.active=st.id; document.getElementById("nName").value="";
  const nd=[...document.querySelectorAll("#nDays .pday.on")].map(b=>+b.dataset.nd), hr=document.getElementById("nHora").value||"07:00", avl=document.getElementById("nAvul").checked;
  save();
  if(avl) setAvulsa(st); else if(nd.length) setSlots(st,nd.map(d=>({d,h:hr})));
  document.querySelectorAll("#nDays .pday").forEach(b=>{ b.classList.remove("on"); b.setAttribute("aria-pressed","false"); }); document.getElementById("nAvul").checked=false;
  closePeople(); renderAll(); show("treino"); toast(avl||nd.length? `${first(name)} cadastrado` : `${first(name)} cadastrado · dias e horários pendentes`);
};
document.getElementById("nDays").addEventListener("click",e=>{ const b=e.target.closest("[data-nd]"); if(!b) return; const on=!b.classList.contains("on"); b.classList.toggle("on",on); b.setAttribute("aria-pressed",String(on)); if(on) document.getElementById("nAvul").checked=false; });
document.getElementById("nAvul").addEventListener("change",e=>{ if(e.target.checked) document.querySelectorAll("#nDays .pday").forEach(b=>{ b.classList.remove("on"); b.setAttribute("aria-pressed","false"); }); });
document.addEventListener("click",e=>{ const b=e.target.closest("[data-pend]"); if(b){ openPeople(); } });

/* ---------- Guia ---------- */
let phView=null;
const NOTE_LINHA=`<div class="dirnote">
  <span class="dn-k">Como usar</span>
  <h2>Uma direção, não uma regra.</h2>
  <p>Você pode <b>seguir a ordem das fases</b>, <b>ficar mais tempo</b> ou <b>menos tempo</b> em uma delas, ou <b>já começar em outra fase</b> conforme conhece o seu aluno.</p>
  <p>O sistema serve para <b>controlar e distribuir a carga</b> e para <b>mostrar organização ao aluno</b>. Ajuste com a sua vivência e a resposta dele.</p>
  <p class="dn-s">É uma linha de trabalho. Existem outras, e cada profissional segue a sua.</p>
  <p class="dn-s">É a programação usada pelo <b>Professor Maílson</b>. Ajuda quem precisa de uma direção para programar os treinos: as séries e as repetições já vêm definidas, com sugestões de métodos avançados (ou sem elas). Depois de concluir as fases, ou mesmo no meio delas, <b>crie a sua linha</b> e siga conforme a sua vivência e o seu conhecimento prático e científico.</p>
</div>`;
function phaseDetail(k){
  const st=A(); const nm=esc(first(st.name)); const p=PHASES[k];
  return `<article class="card phase-card" style="--pc:var(--p${k})">
      <div class="phase-head">
        <h3>${p.t} · ${p.n}</h3>
        ${+k===st.phase? `<span class="pill info">Fase de ${nm}</span>` : `<button class="btn small primary" data-use="${k}">Usar para ${nm}</button>`}
      </div>
      <span class="muted" style="font-size:13px">${p.dur}${+k===1&&st.ob?" · linha obesos: tende a ficar mais tempo":""}</span>
      <div class="specs">
        <div class="spec"><span>Séries/ex.</span><b>${rng(p.sets)}</b></div>
        <div class="spec"><span>Reps</span><b>${p.reps[0]}–${p.reps[1]}</b></div>
        <div class="spec"><span>Sobrando</span><b>${p.rir}</b></div>
      </div>
      ${p.goal?`<p>${p.goal}</p>`:""}
      <div><span class="label">Por membro, por sessão</span>
      <div class="memvol" style="margin-top:4px"><span class="pill">🦵 MMII ${memSes(p).join("–")} séries</span><span class="pill">💪 MMSS ${memSes(p).join("–")} séries</span></div></div>
      <p style="font-size:15px"><b>Métodos:</b> ${p.method}</p>
      ${p.adv?`<div class="note">${p.adv}</div>`:""}
      ${st.ob&&+k<=2?`<div class="note"><b>Linha obesos (${nm}):</b> ${+k===1?"manter 3 a 4 repetições sobrando por mais tempo, máquinas e exercícios apoiados, circuito MMSS + MMII.":"dropset e rest-pause só depois da Fase 2 bem tolerada. Progredir o número de séries antes da intensidade."}</div>`:""}
    </article>`;
}
function renderGuia(){
  const st=A(); const k= phView==null? st.phase : phView;
  document.getElementById("view-guia").innerHTML=`
  ${NOTE_LINHA}
  <div class="card">
    <span class="label">Toque na fase para ver a explicação</span>
    <div class="phpick" role="tablist" aria-label="Fases">${Object.keys(PHASES).map(x=>`<button role="tab" style="--pc:var(--p${x})" data-phv="${x}" aria-selected="${+x===+k}"><b>${PHASES[x].k}</b><span>${PHASES[x].n}</span></button>`).join("")}</div>
  </div>
  ${phaseDetail(k)}
  <details class="card more"><summary>Ordem lógica dos métodos</summary>
    <p class="muted" style="font-size:13px">Do menor para o maior estresse</p>
    <ol class="steps gquick">
      <li><span>Cadência controlada (3" na excêntrica)</span></li>
      <li><span>Isometria</span></li>
      <li><span>Aumento de carga (progressão dupla)</span></li>
      <li><span>Bi-set agonista/antagonista ou MMSS + MMII</span></li>
      <li><span>Tri-set / circuito</span></li>
      <li><span>Dropset ou rest-pause (só na última série)</span></li>
    </ol>
    <div class="note">Bi-set do mesmo músculo reduz a carga e as repetições do 2º exercício. Não usar como base.</div>
  </details>
  <details class="card more"><summary>Descanso</summary>
    <dl class="rule">
      <dt>2–3'</dt><dd>Multiarticular pesado</dd>
      <dt>60–90"</dt><dd>Demais exercícios</dd>
      <dt>30–60"</dt><dd>Só alternando músculos diferentes (bi-set, circuito)</dd>
    </dl>
  </details>
  <details class="card more"><summary>Controle por membro</summary>
    <dl class="rule">
      <dt>2–4</dt><dd>exercícios para músculos grandes</dd>
      <dt>1–3</dt><dd>exercícios para músculos pequenos</dd>
    </dl>
    <p class="muted" style="font-size:14px">Por sessão, para 🦵 membros inferiores e 💪 superiores. Séries = exercícios × séries por exercício da fase. A região que trabalhou precisa de descanso antes de levar carga de novo.</p>
  </details>
  <details class="card more"><summary>Linha para obesos${st.ob?` · ${esc(first(st.name))}`:""}</summary>
    <p><b>Quem entra:</b> IMC ≥ 30 (peso ÷ altura²), confirmado pela cintura: mulheres ≥ 88 cm, homens ≥ 102 cm.</p>
    <p class="muted" style="font-size:14px">IMC alto com cintura normal e muita massa muscular: usar a linha padrão.</p>
    <ul class="oblist">${OB_ADJ.map(x=>`<li>${x}</li>`).join("")}</ul>
    <p class="muted" style="font-size:13px">Marque o aluno em Alunos → Linha obesos.</p>
  </details>`;
  document.querySelectorAll("#view-guia [data-phv]").forEach(b=>b.onclick=()=>{ phView=+b.dataset.phv; renderGuia(); });
  document.querySelectorAll("#view-guia [data-use]").forEach(b=>b.onclick=()=>{ A().phase=+b.dataset.use; phView=null; save(); renderAll(); toast(`${first(A().name)}: ${phT(A())} · ${phaseOf(A()).n}`); });
}
function brandCardsHTML(){ return `  <div class="card" id="brandCard">
    <span class="label">Sua marca nos relatórios</span>
    <p class="muted" style="font-size:13px;margin:0">Aparece na imagem e no texto que o aluno recebe.</p>
    <div class="avform">
      <label>Seu nome ou marca<input class="inp" data-br="nome" value="${esc(BR().nome)}"></label>
      <label>Subtítulo<input class="inp" data-br="sub" value="${esc(BR().sub)}"></label>
      <label>Assinatura nas mensagens<input class="inp" data-br="ass" value="${esc(BR().ass)}" placeholder="ex.: Prof. Ana"></label>
      <label>Letra do logo<input class="inp" data-br="letra" maxlength="1" value="${esc(BR().letra)}" placeholder="${LETRA()}"></label>
    </div>
    <label class="label" style="display:grid;gap:4px">Seu lema (opcional)<input class="inp" data-br="lema" value="${esc(BR().lema)}" placeholder="ex.: Constância vence talento"></label>
    <span class="label">Cores do relatório e do planejamento do mês</span>
    <div class="thsw">${Object.entries(THEMES).map(([k,t])=>`<button class="thb ${repTemaK()===k?"on":""}" data-reptema="${k}" style="--tg:${t.g};--tbg:${t.bg}" aria-pressed="${repTemaK()===k}"><i></i>${t.n}</button>`).join("")}</div>
    <span class="label">Sua logo (opcional)</span>
    <div class="row" style="align-items:center">${(S.brand||{}).logo?`<img class="lgprev" src="${S.brand.logo}" alt="Sua logo"><button class="btn small ghost" data-lgrm>Remover</button>`:""}<label class="btn small" for="lgFile" style="margin:0">${(S.brand||{}).logo?"Trocar logo":"Enviar logo"}</label><input type="file" id="lgFile" accept="image/*" hidden></div>
    <p class="muted" style="font-size:12px;margin:0">Sem logo, aparece a letra. Prefira a logo com fundo transparente (PNG).</p>
    <span class="label">Prévia</span>
    <div class="pcard thprev" style="${thVars()}"><div class="pc-logo">${logoHTML()}<span class="pc-n">${esc(BR().nome).toUpperCase()}</span><span class="pc-s">${esc(BR().sub).toUpperCase()}</span></div><p class="pc-gold">${esc(BR().lema||"Seu lema aparece aqui")}</p></div>
  </div>
  <div class="card" id="msgCard">
    <span class="label">Mensagens do planejamento e do relatório do mês</span>
    <p class="muted" style="font-size:13px;margin:0">Escreva do seu jeito ou deixe em branco: campo vazio não aparece para o aluno. Use <b>{nome}</b> para o primeiro nome do aluno, <b>{n}</b> para o número de treinos do mês e <b>{aulas}</b> para as aulas a mais (ex.: 2 aulas).</p>
    <label class="label msgl">Frases no planejamento e no relatório<select class="inp" data-br="frases"><option value="sim" ${BR().frases!=="nao"?"selected":""}>Com as minhas frases</option><option value="nao" ${BR().frases==="nao"?"selected":""}>Sem frases: só as informações</option></select></label>
    <label class="label msgl">Aulas da 5ª semana<select class="inp" data-br="q5"><option value="gratis" ${BR().q5!=="cobra"&&BR().q5!=="cortesia"?"selected":""}>Dou sem cobrar, como contrapartida (compensam feriados e viagens)</option><option value="cortesia" ${BR().q5==="cortesia"?"selected":""}>Dou sem cobrar, de cortesia</option><option value="cobra" ${BR().q5==="cobra"?"selected":""}>Cobro as aulas a mais</option></select></label>
    <label class="label msgl">Aulas a mais da 5ª semana (quando não cobra)<textarea class="inp" rows="3" data-br="q5Txt" placeholder="ex.: Este mês você tem {aulas} a mais, sem custo. Elas compensam os dias de feriado e viagem.">${esc(BR().q5Txt)}</textarea></label>
    <label class="label msgl">Planejamento · mensagem principal<textarea class="inp" rows="4" data-br="pMsg" placeholder="ex.: São {n} treinos comigo este mês…">${esc(BR().pMsg)}</textarea></label>
    <label class="label msgl">Planejamento · frase em destaque<input class="inp" data-br="pGold" value="${esc(BR().pGold)}" placeholder="ex.: Seu eu do futuro vai se orgulhar."></label>
    <label class="label msgl">Planejamento e relatório · frase final<input class="inp" data-br="pFim" value="${esc(BR().pFim)}" placeholder="ex.: Constância é o que traz resultado."></label>
    <label class="label msgl">Relatório do mês · fez todas as aulas<textarea class="inp" rows="3" data-br="fOk" placeholder="ex.: Parabéns, {nome}! Você completou todos os treinos do mês.">${esc(BR().fOk)}</textarea></label>
    <label class="label msgl">Relatório do mês · faltou aulas<textarea class="inp" rows="3" data-br="fNo" placeholder="ex.: O importante é não desistir e se reajustar para o próximo mês!">${esc(BR().fNo)}</textarea></label>
    <label class="label msgl">Regra de reposição (sai em vermelho)<textarea class="inp" rows="3" data-br="regra" placeholder="ex.: Para a aula ser reposta, avise com pelo menos 1 hora de antecedência.">${esc(BR().regra)}</textarea></label>
  </div>
`; }
function wireBrand(box,rr){
  box.querySelectorAll("[data-reptema]").forEach(b=>b.onclick=()=>{ S.brand=Object.assign({},S.brand||{},{repTema:b.dataset.reptema}); save(); rr(); });
  const lr=box.querySelector("[data-lgrm]"); if(lr) lr.onclick=()=>{ const o=Object.assign({},S.brand||{}); delete o.logo; S.brand=o; save(); rr(); };
  const lf=box.querySelector("#lgFile"); if(lf) lf.onchange=()=>{ const f=lf.files&&lf.files[0]; if(!f) return; const rd=new FileReader(); rd.onload=()=>{ const im=new Image(); im.onload=()=>{ const M=320, k=Math.min(1,M/Math.max(im.width,im.height)); const c=document.createElement("canvas"); c.width=Math.round(im.width*k); c.height=Math.round(im.height*k); c.getContext("2d").drawImage(im,0,0,c.width,c.height);
      S.brand=Object.assign({},S.brand||{},{logo:c.toDataURL("image/png")}); save(); rr(); toast("Logo salva"); }; im.onerror=()=>toast("Não consegui abrir essa imagem"); im.src=rd.result; }; rd.readAsDataURL(f); };
  box.querySelectorAll("#brandCard [data-br]").forEach(i=>i.addEventListener("change",()=>rr()));
  box.querySelectorAll("#brandCard [data-br],#msgCard [data-br]").forEach(i=>{ const f=()=>{ S.brand=Object.assign({},S.brand||{},{[i.dataset.br]:i.tagName==="TEXTAREA"?i.value:i.value.trim()}); save(); }; i.oninput=f; i.onchange=f; });
}
function renderAjuda(){
  const box=document.getElementById("cad-extra"); if(!box) return;
  box.innerHTML=`
  <div class="card">
    <span class="label">Seus dados</span>
    ${cloud.ready?`<p><b>☁️ Onde ficam seus dados:</b> com o selo <b>Salvo na nuvem</b>, tudo fica salvo sozinho na sua conta (na nuvem) e abre no celular, tablet ou computador. Só você vê.</p>`
      :`<p><b>📱 Onde ficam seus dados:</b> neste acesso, tudo fica salvo <b>só neste aparelho</b>, no navegador. <b>Não fica na sua conta na nuvem.</b> Se limpar os dados do navegador, trocar de celular ou abrir em outro aparelho, os dados não vão junto. Por isso o backup é importante.</p>`}
    <div class="bkx"><b>💾 Salvar backup</b><span>Cria um arquivo com tudo: alunos, treinos, presença, financeiro e avaliações. Guarde onde não se perde: mande para você mesmo no WhatsApp, no e-mail ou no Google Drive. Faça uma vez por semana.</span></div>
    <div class="bkx"><b>♻️ Restaurar backup</b><span>Pega um backup salvo e coloca tudo de volta no app. Use ao trocar de celular ou se perder os dados. <b>Atenção:</b> substitui o que está no app agora pelo que está no backup.</span></div>
    <div class="row">
      <button class="btn primary" id="bkDown">💾 Salvar backup</button>
      <label class="btn" for="bkFile" style="margin:0">♻️ Restaurar backup</label>
      <input type="file" id="bkFile" accept=".json,application/json,text/plain" hidden>
      <button class="btn small ghost" id="bkPaste">Restaurar colando o texto</button>
    </div>
  </div>
  <button class="btn ghost small" id="resetBtn" style="justify-self:start">Apagar treinos e recomeçar</button>
  <div id="resetConfirm" class="card" hidden>
    <p>Isso apaga todos os treinos, sessões e motivos. Presença e financeiro não são apagados. Baixe um backup antes.</p>
    <div class="row"><button class="btn danger" id="resetYes">Apagar e recomeçar</button><button class="btn" id="resetNo">Cancelar</button></div>
  </div>`;
  document.getElementById("bkDown").onclick=downloadBackup;
  document.getElementById("bkPaste").onclick=()=>bkModal("restore");
  document.getElementById("bkFile").onchange=e=>{ const f=e.target.files[0]; if(f) importBackup(f); e.target.value=""; };
  document.getElementById("resetBtn").onclick=()=>{ document.getElementById("resetConfirm").hidden=false; };
  document.getElementById("resetNo").onclick=()=>{ document.getElementById("resetConfirm").hidden=true; };
  document.getElementById("resetYes").onclick=()=>{ S=sample(); save(); renderAll(); toast("Treinos apagados"); };
}

/* ---------- Treino ---------- */
function libOptions(sel){
  const groups={}; [...LIB,...(S.custom||[])].forEach(e=>{
    const main=Object.entries(e.m).sort((a,b)=>b[1]-a[1])[0]; const g=main&&MUSCLES[main[0]]? MUSCLES[main[0]].n : "Outros";
    (groups[g]=groups[g]||[]).push(e);
  });
  return `<option value="">${sel?"Trocar por…":"Escolher exercício…"}</option>` + Object.entries(groups).map(([g,list])=>`<optgroup label="${g}">${list.map(e=>`<option value="${e.id}" ${e.id===sel?"selected":""}>${e.n}</option>`).join("")}</optgroup>`).join("") + (sel?"":`<option value="__custom">Outro exercício…</option>`);
}
function orderHints(rows){
  const hints=[]; const seen={}; const live=rows.filter(r=>!r.skip);
  live.forEach((r,idx)=>{
    const e=exById(r.ex);
    Object.entries(e.m).forEach(([k,w])=>{ if(w<1||!MUSCLES[k]) return;
      if(e.t==="mono" && seen[k]===undefined) seen[k]={mono:idx};
      if(e.t==="multi" && seen[k] && !seen[k].flag){ seen[k].flag=1; hints.push(`${MUSCLES[k].n}: monoarticular antes do multiarticular. Faz sentido se for prioridade ou para poupar a articulação.`); }
    });
  });
  const types=live.map(r=>exById(r.ex).t);
  const coreIdx=types.indexOf("core");
  if(coreIdx>-1 && types.lastIndexOf("multi")>coreIdx) hints.push("Core antes de exercício multiarticular: pode reduzir a estabilidade do tronco nos exercícios pesados.");
  return hints;
}
const scopeMe=st=> isGroup(st) && S.scope!=="all";
let swapOpen=null;
function renderTreino(){
  const st=A(); const p=phaseOf(st); const v=weekly(st); const ms=membersOf(st); const grp=ms.length>1; const nm=esc(first(st.name));
  const vm=weeklyMem(st); const off=MEM.filter(k=>vm[k]>0 && statusOf(vm[k],memRange(st,k))!=="ok");
  const over=off.filter(k=>statusOf(vm[k],memRange(st,k))==="bad").length; const under=off.length-over;
  const el=document.getElementById("view-treino");
  el.innerHTML=`${helpBtn("treino")}
  <div class="card">
    <div class="status-bar">
      <span class="pill info">${phT(st)}: ${rng(p.sets)} séries × ${p.reps[0]}–${p.reps[1]} reps · RIR ${p.rir}</span>
      ${over? `<span class="pill bad">${over} acima da faixa</span>`:""}
      ${under? `<span class="pill warn">${under} abaixo da faixa</span>`:""}
      ${!off.length? `<span class="pill ok">Todos na faixa</span>`:""}
    </div>
    ${grp? `<div class="field"><span class="label">Mudanças valem para</span>
      <div class="seg" role="group" aria-label="Alcance das mudanças">
        <button data-scope="me" aria-pressed="${S.scope!=="all"}">Só ${nm}</button>
        <button data-scope="all" aria-pressed="${S.scope==="all"}">${ms.length===2?"A dupla toda":"O trio todo"}</button>
      </div></div>`:""}
  </div>
  ${viewOf(st).map(({se,rows})=>`
  <article class="card" data-session="${se.id}">
    <div class="session-head">
      <select class="inp" id="day-${se.id}" data-f="day" aria-label="Dia">${DAYS.map(d=>`<option ${d===se.day?"selected":""}>${d}</option>`).join("")}</select>
      <input class="inp" id="name-${se.id}" data-f="name" value="${esc(se.name)}" aria-label="Nome do treino">
      <button class="icon-btn" data-delsession aria-label="Remover treino">✕</button>
    </div>
    <div>
    ${rows.map((r,ii)=>{ const e=exById(r.ex);
      if(r.skip) return `<div class="ex skipped" data-item="${r.it.id}"><div class="ex-top"><div class="ex-name">${esc(exById(r.it.ex).n)}<small>${nm} não faz este exercício</small></div><button class="btn small" data-unskip>Incluir</button></div></div>`;
      const bs=(r.sets<p.sets[0]||r.sets>p.sets[1]); const br=(r.reps<p.reps[0]||r.reps>p.reps[1]);
      const j=(st.log||[]).filter(l=>l.itemId===r.it.id).slice(-1)[0];
      const ov=grp && hasOv(r.o);
      const baseTxt= r.o.ex? `${exById(r.it.ex).n} ${r.it.sets}×${r.it.reps}` : `${r.it.sets}×${r.it.reps}`;
      return `<div class="ex" data-item="${r.it.id}">
        <div class="ex-top">
          <div class="ex-name">${esc(e.n)}<span class="tag ${e.t}">${e.t==="multi"?"Multi":e.t==="mono"?"Mono":"Core"}</span>
            <small>${Object.entries(e.m).map(([k,w])=>`${MUSCLES[k]?MUSCLES[k].n:k}${w<1?" (½)":""}`).join(" · ")}</small></div>
        </div>
        ${grp&&(r.it.only||ov)? `<div class="ovline">${r.it.only?`<span class="pill info">Só ${nm}</span>`:""}${ov?`<span class="pill warn">Ajustado para ${nm}</span><span class="muted">Grupo: ${esc(baseTxt)}</span><button class="btn small" data-reset>Usar o do grupo</button>`:""}</div>`:""}
        <div class="ex-ctrl">
          <label>Séries<input type="number" inputmode="numeric" min="1" max="10" id="s-${r.it.id}" data-f="sets" value="${r.sets}" class="${bs?"off":""}"></label>
          <label>Reps<input type="number" inputmode="numeric" min="1" max="40" id="r-${r.it.id}" data-f="reps" value="${r.reps}" class="${br?"off":""}"></label>
          <button class="icon-btn" data-swap aria-label="Trocar exercício" title="Trocar exercício">⇄</button>
          <button class="icon-btn" data-up ${ii===0?"disabled":""} aria-label="Subir">↑</button>
          <button class="icon-btn" data-del aria-label="Remover exercício">✕</button>
        </div>
        ${swapOpen===r.it.id? `<div class="swap"><select class="inp" id="sw-${r.it.id}" data-swapsel aria-label="Trocar por">${libOptions(r.ex)}</select><button class="btn small" data-swapcancel>Cancelar</button></div>`:""}
        ${(bs||br||j)&&j? `<div class="just">Motivo registrado: ${esc(j.reason)}</div>`:""}
      </div>`;}).join("")}
    </div>
    ${orderHints(rows).map(h=>`<div class="hint">${h}</div>`).join("")}
    <div class="add-row">
      <select class="inp" id="add-${se.id}" aria-label="Adicionar exercício">${libOptions()}</select>
      <button class="btn primary" data-add>Adicionar</button>
    </div>
    <div class="custom" id="custom-${se.id}" hidden>
      <div class="field"><label class="label" for="cn-${se.id}">Nome do exercício</label><input class="inp" id="cn-${se.id}" placeholder="Ex.: Agachamento sumô"></div>
      <div class="two">
        <div class="field"><label class="label" for="cm-${se.id}">Músculo principal</label><select class="inp" id="cm-${se.id}">${Object.entries(MUSCLES).map(([k,m])=>`<option value="${k}">${m.n}</option>`).join("")}</select></div>
        <div class="field"><label class="label" for="ct-${se.id}">Tipo</label><select class="inp" id="ct-${se.id}"><option value="multi">Multiarticular</option><option value="mono">Monoarticular</option><option value="core">Core</option></select></div>
      </div>
      <button class="btn primary" data-addcustom>Criar e adicionar</button>
    </div>
  </article>`).join("")}
  <button class="btn" id="addSession">+ Novo dia de treino${grp?" (para o grupo)":""}</button>
  <button class="btn primary" id="copyBtn">Copiar treino de ${nm}</button>
  ${grp? `<button class="btn" id="copyGroup">Copiar treino ${ms.length===2?"da dupla":"do trio"} (com diferenças)</button>`:""}
  <textarea id="copyFallback" class="inp" rows="6" hidden aria-label="Resumo para copiar"></textarea>`;
  bindTreino();
}
function findIt(id){ for(const pl of S.plans) for(const se of pl.sessions){ const it=se.items.find(i=>i.id===id); if(it) return {se,it}; } return {}; }
function cleanOv(st,itemId){ const o=st.ov&&st.ov[itemId]; if(o && o.sets==null && o.reps==null && o.ex==null && !o.skip) delete st.ov[itemId]; }

function bindTreino(){
  const st=A(); const root=document.getElementById("view-treino"); const ms=membersOf(st);

  root.querySelectorAll("[data-scope]").forEach(b=>b.onclick=()=>{ S.scope=b.dataset.scope; save(); renderTreino(); });
  root.querySelectorAll("[data-session]").forEach(card=>{
    const se=planOf(st).sessions.find(s=>s.id===card.dataset.session);
    card.querySelector("[data-f=day]").onchange=e=>{ se.day=e.target.value; save(); };
    card.querySelector("[data-f=name]").oninput=e=>{ se.name=e.target.value; save(); };
    card.querySelector("[data-delsession]").onclick=()=>{
      if(!card.dataset.armed){ card.dataset.armed="1"; toast(ms.length>1? "Remove o dia para todo o grupo. Toque de novo no ✕ para confirmar" : "Toque de novo no ✕ para remover este treino"); return; }
      planOf(st).sessions=planOf(st).sessions.filter(s=>s!==se); save(); renderAll();
    };
    const sel=card.querySelector(`#add-${se.id}`); const cust=card.querySelector(`#custom-${se.id}`);
    sel.onchange=()=>{ cust.hidden = sel.value!=="__custom"; };
    card.querySelector("[data-add]").onclick=()=>{
      if(!sel.value){ toast("Escolha um exercício"); return; }
      if(sel.value==="__custom"){ cust.hidden=false; card.querySelector(`#cn-${se.id}`).focus(); return; }
      addItem(st, se, sel.value);
    };
    card.querySelector("[data-addcustom]").onclick=()=>{
      const n=card.querySelector(`#cn-${se.id}`).value.trim(); if(!n){ toast("Dê um nome ao exercício"); return; }
      const m=card.querySelector(`#cm-${se.id}`).value, t=card.querySelector(`#ct-${se.id}`).value;
      const ex={id:"c"+nid(),n,t,m:{[m]:1}}; S.custom=S.custom||[]; S.custom.push(ex); addItem(st, se, ex.id);
    };
    card.querySelectorAll("[data-item]").forEach(row=>{
      const {it}=findIt(row.dataset.item);
      const q=s=>row.querySelector(s);
      if(q("[data-unskip]")){ q("[data-unskip]").onclick=()=>{ delete st.ov[it.id].skip; cleanOv(st,it.id); save(); renderAll(); }; return; }
      row.querySelectorAll("input[data-f]").forEach(inp=>{
        inp.onchange=()=>{ const f=inp.dataset.f; const nv=Math.max(1,parseInt(inp.value,10)||1); editItem(st,it,f,nv); };
      });
      if(q("[data-reset]")) q("[data-reset]").onclick=()=>{ const o=st.ov[it.id]; delete o.sets; delete o.reps; delete o.ex; cleanOv(st,it.id); save(); renderAll(); toast(`${first(st.name)} volta ao treino do grupo`); };
      q("[data-swap]").onclick=()=>{ swapOpen= swapOpen===it.id? null : it.id; renderTreino(); };
      if(q("[data-swapcancel]")) q("[data-swapcancel]").onclick=()=>{ swapOpen=null; renderTreino(); };
      if(q("[data-swapsel]")) q("[data-swapsel]").onchange=e=>{ if(!e.target.value) return; swapOpen=null; editItem(st,it,"ex",e.target.value); };
      q("[data-del]").onclick=()=>{
        if(scopeMe(st) && !it.only){ st.ov[it.id]={...(st.ov[it.id]||{}),skip:true}; save(); renderAll(); toast(`Tirado só de ${first(st.name)}`); return; }
        const {se:s2}=findIt(it.id); s2.items=s2.items.filter(i=>i!==it); ms.forEach(m=>{ if(m.ov) delete m.ov[it.id]; }); save(); renderAll();
      };
      q("[data-up]").onclick=()=>{
        const {se:s2}=findIt(it.id); const visible=viewOf(st).find(x=>x.se===s2).rows.map(r=>r.it);
        const vi=visible.indexOf(it); if(vi<1) return; const prev=visible[vi-1];
        const a=s2.items.indexOf(it), b=s2.items.indexOf(prev); [s2.items[a],s2.items[b]]=[s2.items[b],s2.items[a]]; save(); renderAll();
      };
    });
  });
  document.getElementById("addSession").onclick=()=>{
    const pl=planOf(st); const used=pl.sessions.map(s=>s.day); const d=DAYS.find(x=>!used.includes(x))||"Sáb";
    pl.sessions.push({id:nid(),day:d,name:"Novo treino",items:[]}); save(); renderAll();
  };
  document.getElementById("copyBtn").onclick=()=>copyText(summaryOf(st));
  const cg=document.getElementById("copyGroup"); if(cg) cg.onclick=()=>copyText(groupSummary(st));
}

/* Edição com alcance (só o aluno ou o grupo) */
function editItem(st,it,field,val){
  const snap=JSON.stringify(S); const ms=membersOf(st);
  let affected;
  if(scopeMe(st) && !it.only){
    st.ov[it.id]={...(st.ov[it.id]||{}),[field]:val};
    if(st.ov[it.id][field]===it[field]) delete st.ov[it.id][field];
    cleanOv(st,it.id); affected=[st];
  } else {
    it[field]=val; ms.forEach(m=>{ if(m.ov&&m.ov[it.id]){ delete m.ov[it.id][field]; cleanOv(m,it.id); } });
    affected= it.only? [st] : ms;
  }
  check(affected,it,field,snap);
}
function addItem(st,se,exId){
  const snap=JSON.stringify(S); const p=phaseOf(st);
  const it={id:nid(),ex:exId,sets:p.sets[1],reps:p.reps[0]};
  if(scopeMe(st)) it.only=st.id;
  se.items.push(it);
  check(it.only?[st]:membersOf(st),it,"add",snap);
}

/* Checagem e modal */
let pending=null;
function issuesFor(st,it,field){
  const p=phaseOf(st); const out=[];
  const r=viewOf(st).flatMap(x=>x.rows).find(x=>x.it===it); if(!r||r.skip) return out;
  if(field!=="reps"){
    if(r.sets>p.sets[1]) out.push(`${r.sets} séries neste exercício. A fase ${st.phase} recomenda até ${p.sets[1]}.`);
    if(r.sets<p.sets[0]) out.push(`${r.sets} série(s) neste exercício. A fase ${st.phase} recomenda pelo menos ${p.sets[0]}.`);
    const v=weekly(st);
    const vm=weeklyMem(st); const mks=new Set(Object.keys(exById(r.ex).m).filter(k=>MUSCLES[k]&&MUSCLES[k].r!=="Core").map(k=>LOWER_M.has(k)?"MMII":"MMSS"));
    mks.forEach(k=>{ const [a,b]=memRange(st,k); if(vm[k]>b) out.push(`${MEM_N[k]} ficam com ${fmt(vm[k])} séries na semana. A faixa da fase ${st.phase} é ${a}–${b}.`); });
  }
  if(field==="reps"||field==="add"){ if(r.reps>p.reps[1]||r.reps<p.reps[0]) out.push(`${r.reps} repetições. A fase ${st.phase} trabalha com ${p.reps[0]}–${p.reps[1]}.`); }
  return out;
}
function check(students,it,field,snap){
  const per=students.map(s=>({s,issues:issuesFor(s,it,field)})).filter(x=>x.issues.length);
  if(!per.length){ save(); renderAll(); return; }
  pending={it,field,snap,per};
  const showNames= students.length>1 || isGroup(students[0]);
  const r=viewOf(per[0].s).flatMap(x=>x.rows).find(x=>x.it===it);
  document.getElementById("mBody").innerHTML=`<p><b>${esc(exById(r?r.ex:it.ex).n)}</b></p>`+per.map(x=>`${showNames?`<p class="label" style="margin-top:6px">${esc(x.s.name)} · ${phT(x.s)}</p>`:""}<ul>${x.issues.map(i=>`<li>${i}</li>`).join("")}</ul>`).join("")+`<p class="muted" style="font-size:14px">Você pode manter, mas o motivo fica registrado no histórico${per.length>1?" de cada aluno":""}.</p>`;
  const ta=document.getElementById("mReason"); ta.value=""; document.getElementById("mKeep").disabled=true;
  document.getElementById("mCount").textContent="Escreva pelo menos 10 caracteres para liberar.";
  document.getElementById("mBack").textContent= field==="add"? "Não adicionar" : "Desfazer a mudança";
  document.getElementById("modal").hidden=false; setTimeout(()=>ta.focus(),50);
}
document.getElementById("mReason").addEventListener("input",e=>{
  const n=e.target.value.trim().length; document.getElementById("mKeep").disabled=n<10;
  document.getElementById("mCount").textContent= n<10? `Escreva pelo menos 10 caracteres para liberar (${n}/10).` : "Pronto para registrar.";
});
document.getElementById("mKeep").onclick=()=>{
  const reason=document.getElementById("mReason").value.trim(); const {it,per}=pending;
  const {se}=findIt(it.id);
  per.forEach(({s,issues})=>{ const r=viewOf(s).flatMap(x=>x.rows).find(x=>x.it===it);
    s.log=s.log||[]; s.log.push({itemId:it.id,when:new Date().toLocaleDateString("pt-BR"),phase:s.phase,ex:exById(r?r.ex:it.ex).n,day:se?se.day:"",issues,reason}); });
  pending=null; document.getElementById("modal").hidden=true; save(); renderAll(); toast("Motivo registrado");
};
document.getElementById("mBack").onclick=()=>{
  S=JSON.parse(pending.snap); pending=null; document.getElementById("modal").hidden=true; save(); renderAll(); toast("Mudança desfeita");
};

/* Resumos */
function summaryOf(st){
  const p=phaseOf(st); const v=weekly(st);
  let t=`${st.name} — ${phT(st)} (${p.n})\n${p.reps[0]}–${p.reps[1]} reps · RIR ${p.rir}\n${p.method}\n`;
  viewOf(st).forEach(({se,rows})=>{ t+=`\n${se.day} — ${se.name}\n`; rows.filter(r=>!r.skip).forEach(r=>{ t+=`• ${exById(r.ex).n}: ${r.sets} x ${r.reps}\n`; }); });
  const vm=weeklyMem(st); t+=`\nSéries por semana:\n`+MEM.map(k=>`${MEM_N[k]}: ${fmt(vm[k])} (faixa ${memRange(st,k).join("–")})`).join("\n");
  return t;
}
function groupSummary(st){
  const ms=membersOf(st); const pl=planOf(st);
  let t=`${groupLabel(ms.length)}: ${ms.map(m=>`${m.name} (${phT(m)})`).join(", ")}\n`;
  pl.sessions.forEach(se=>{
    t+=`\n${se.day} — ${se.name}\n`;
    se.items.forEach(it=>{
      if(it.only){ const o=S.students.find(s=>s.id===it.only); t+=`• Só ${first(o?o.name:"")}: ${exById(it.ex).n} ${it.sets} x ${it.reps}\n`; return; }
      t+=`• ${exById(it.ex).n}: ${it.sets} x ${it.reps}\n`;
      ms.forEach(m=>{ const o=(m.ov||{})[it.id]; if(!o) return;
        if(o.skip){ t+=`   ${first(m.name)}: não faz\n`; return; }
        if(hasOv(o)) t+=`   ${first(m.name)}: ${exById(o.ex||it.ex).n} ${o.sets??it.sets} x ${o.reps??it.reps}\n`;
      });
    });
  });
  return t;
}
function copyText(t){
  const fb=document.getElementById("copyFallback");
  const fallback=()=>{ fb.hidden=false; fb.value=t; fb.focus(); fb.select(); toast("Texto selecionado. Copie manualmente."); };
  try{ navigator.clipboard.writeText(t).then(()=>{ fb.hidden=true; toast("Copiado"); },fallback); }catch(e){ fallback(); }
}


/* ---------- Sessão: controle do volume executado ---------- */
const REG=["MMII","MMSS","Core"];
const REG_N={MMII:"Membros inferiores",MMSS:"Membros superiores",Core:"Core"};
const DAY_N={Seg:"Segunda",Ter:"Terça",Qua:"Quarta",Qui:"Quinta",Sex:"Sexta","Sáb":"Sábado",Dom:"Domingo"};
const LOWER=new Set(["quad","glut","isq","adu","pant","soleo"]);
const DEF_T={MMII:{s:[12,15],r:[180,300]},MMSS:{s:[12,15],r:[180,300]},Core:{s:[4,8],r:[40,120]},cardio:150};
const START_ROWS=6;
const nf=n=> Math.round(n).toLocaleString("pt-BR");
const num=v=> +String(v??"").replace(",",".")||0;
function regionOfEx(e){ const main=Object.entries(e.m||{}).sort((a,b)=>b[1]-a[1])[0]; if(!main) return "MMSS"; if(MUSCLES[main[0]]&&MUSCLES[main[0]].r==="Core") return "Core"; return LOWER.has(main[0])?"MMII":"MMSS"; }
const noAcc=s=> String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
const KW_CORE=["flutter","hollow","arch hold","arch body","side bend","side crunch","side hold","tesoura","bicicleta","vacuum","plank","sit up","situp","toes to bar","woodchop","lenhador","core ","reto abdominal","extensao de tronco","extensao lombar","lombar","banco romano","hiperextensao","superman","flexao de tronco","rotacao de tronco","russian twist","ab wheel","prancha","abdominal","abdomen","pallof","dead bug","deadbug","perdigueiro","crunch","roda abdominal","canivete","hollow","bird dog","infra","obliquo"];
const KW_MMII=["adutor","abdutor","isquio","tibial","salto","sled","step up","box jump","wall sit","hamstring","hip ","squat","lunge","deadlift","calf","agach","leg","hack","bulgar","afundo","passada","avanco","recuo","extensora","flexora","stiff","rdl","terra","pelvica","hip thrust","gluteo","abdutora","adutora","abducao","aducao","panturrilha","soleo","gemeo","goblet","sumo","step","cadeira","mesa flexora","coice","kickback","good morning","nordic","pistol","sissy","levantamento terra"];
const KW_MMSS=["dips","curl","pushdown","push down","pull up","pullup","chin up","deltoide","push up","pushup","martelo","y raise","supino","remada","puxada","pulley","pulldown","pullover","barra fixa","desenvolvimento","elevacao lateral","elevacao frontal","crucifixo","cross","peck","voador","rosca","triceps","biceps","frances","testa","mergulho","paralela","face pull","encolhimento","flexao de braco","serrátil","serratil","arnold","militar","landmine press","chest","bench","row"];
/* Região lida pelo nome do exercício (vale mais que a anotação manual, que pode estar trocada) */
function kwRegion(n){ const t=noAcc(String(n||"")).toLowerCase().trim(); if(!t) return null;
  if(KW_CORE.some(k=>t.includes(k))||/(^|\s)(abd|core)(\s|$)|banco extensor|elevacao de pernas|elevacao de joelhos/.test(t)) return "Core";
  if(/triceps|biceps|rosca|ombro|flexao de braco|supino|remada|puxada|pull ?down|puxador|graviton|desenvolvimento|elevacao lateral|elevacao frontal/.test(t)) return "MMSS";
  if(KW_MMII.some(k=>t.includes(k))||/quadril|quatro apoios|4 apoios|joelho|coxa|perna/.test(t)) return "MMII";
  if(KW_MMSS.some(k=>t.includes(k))) return "MMSS"; return null; }
function regionOfName(n){
  const t=noAcc(n).trim(); if(!t) return null; if(S&&S.exReg&&S.exReg[t]) return S.exReg[t]; const kr=kwRegion(n); if(kr) return kr;
  const lib=[...LIB,...(S.custom||[])].find(e=>noAcc(e.n)===t); if(lib) return regionOfEx(lib);
  if(KW_CORE.some(k=>t.includes(k))) return "Core";
  if(t.includes("flexao de braco")) return "MMSS";
  if(KW_MMII.some(k=>t.includes(k))) return "MMII";
  if(KW_MMSS.some(k=>t.includes(k))) return "MMSS";
  return null;
}
const isoD=x=> x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");
function mondayOf(d){ const x=new Date(d); x.setHours(12,0,0,0); x.setDate(x.getDate()-((x.getDay()+6)%7)); return isoD(x); }
function addDays(s,n){ const x=new Date(s+"T12:00:00"); x.setDate(x.getDate()+n); return isoD(x); }
const ddmm=s=> s.slice(8,10)+"/"+s.slice(5,7);

/* Linha = um exercício (ou conjugado) com duas sublinhas fixas, como na planilha */
const sub=(s="",r="",c="")=>({s,r,c});
const newRow=()=>({id:nid(),conj:false,n1:"",n2:"",reg:null,a:sub(),b:sub()});
function emptyDay(){ return {rows:Array.from({length:START_ROWS},newRow),cardio:{t:"",z:"",tipo:"",pse:"",v:""},wod:{tipo:"",t:"",desc:""}}; }
const WOD_TIPOS=["Contínuo","Intervalado","Tiro","Tabata","EMOM","AMRAP","On/Off","For Time","Circuito","Volta à calma (recuperação ativa)","Outro"];
const CARDIO_T=["Caminhada na esteira","Trote na esteira","Corrida na esteira","Caminhada na rua","Trote na rua","Corrida na rua","Escada","Bike","Elíptico","Remo","Natação","Esteira","Outros"];
function wodOf(d){ if(d&&!d.wod) d.wod={tipo:"",t:"",desc:""}; return d? d.wod : {tipo:"",t:"",desc:""}; }
function normDay(d){
  if(d&&d.rows&&d.rows.some(r=>r.conj)){ const out=[]; d.rows.forEach(r=>{ if(!r.conj){ out.push(r); return; } const p=String(r.n1||"").split("+").map(x=>x.trim());
      const A2=Object.assign({},r,{conj:false,cj:true,n1:p[0]||"",n2:"",b:sub()}); delete A2.regB; out.push(A2);
      out.push({id:nid(),conj:false,n1:p[1]||"",n2:"",reg:r.regB||null,a:r.b||sub(),b:sub()}); }); d.rows=out; }
  if(d&&d.rows){ d.rows.forEach(r=>{ if(r.n2&&r.n2.trim()){ if(!r.n1.includes(r.n2)) r.n1=(r.n1.trim()+" + "+r.n2.trim()).replace(/^ \+ /,""); r.n2=""; } }); return d; }
  if(!d) return d;
  const rows=[];
  ["MMII","MMSS","Core"].forEach(k=>((d.blocks||{})[k]||[]).forEach(en=>{
    const p=en.parts||[]; const r=newRow(); r.conj=en.kind==="c"&&p.length>1; r.n1=(p[0]||{}).n||""; r.n2=r.conj?(p[1]||{}).n||"":"";
    r.reg=k; r.a=sub((p[0]||{}).s??"",(p[0]||{}).r??"",(p[0]||{}).c??""); if(p[1]) r.b=sub(p[1].s??"",p[1].r??"",p[1].c??""); rows.push(r);
  }));
  d.rows=rows; delete d.blocks; d.cardio=d.cardio||{t:"",z:"",tipo:"",pse:""}; return d;
}
function phWeeks(m){ const s=(m.pf&&m.pf.since)||isoD(new Date()); const d=(new Date(isoD(new Date())+"T12:00:00")-new Date(s+"T12:00:00"))/864e5; return Math.max(0,Math.floor(d/7)); }
function phAlert(m){ const w=phWeeks(m); const short= m.phase===0||m.phase===4; if(short) return w>=1?"hot":""; return w>=6?"hot":w>=4?"warn":""; }
function ensureWeeks(){
  S.phV2=1; /* a renumeração antiga das fases foi retirada: o campo não ia para a nuvem e desfazia a fase a cada carregamento */
  (S.students||[]).forEach(x=>{ if(!x.pf||x.pf.p!==x.phase) x.pf={p:x.phase,since:isoD(new Date())}; });
  if(!S.exClean){ S.exClean=1; const ex=new Set(S.students.filter(x=>/\(exemplo\)/.test(x.name)).map(x=>x.id)); Object.values(S.days||{}).forEach(W=>ex.forEach(id=>delete W[id])); }
  S.weeks=S.weeks||[]; S.days=S.days||{};
  if(!S.weeks.length) S.weeks.push({id:nid(),n:1,start:mondayOf(new Date())});
  S.weeks.sort((a,b)=> a.start<b.start?-1:1);
  if(!S.weeks.some(w=>w.id===S.week)) S.week=S.weeks[S.weeks.length-1].id;
  if(!DAYS.includes(S.day)) S.day=DAYS[Math.min(5,(new Date().getDay()+6)%7)];
  Object.values(S.days).forEach(W=>Object.values(W).forEach(P=>Object.values(P).forEach(normDay)));
}
function tg(st){
  if(st.tgCustom && st.tg) return st.tg;
  const p=phaseOf(st); const c=(st.tg&&st.tg.cardio)||150; const [a,b]=memSes(p);
  const mk=()=>({s:[a,b],r:[a*p.reps[0],b*p.reps[1]]});
  return {MMII:mk("MMII"),MMSS:mk("MMSS"),Core:{s:[4,8],r:[40,120]},cardio:c};
}
function dayOf(wid,sid,day,create){
  let W=S.days[wid]; if(!W){ if(!create) return null; W=S.days[wid]={}; }
  let P=W[sid]; if(!P){ if(!create) return null; P=W[sid]={}; }
  if(!P[day] && create) P[day]=emptyDay();
  return normDay(P[day]||null);
}
let regPick=null, tecPick=null, tecNew=null;
function tecMine(){ return Array.isArray(S.tecMine)? S.tecMine : []; }
function rowSz(row,R){ if(R==='Core') return ''; if(row.sz) return row.sz; const k=mainMuscle(row.n1||''); return k&&MUSCLES[k].r===R&&(MUSCLES[k].c==='G'||MUSCLES[k].c==='P')? MUSCLES[k].c : ''; }
function rowReg(row,which){ if(which==="b"&&row.conj){ if(row.regB) return row.regB; const p=String(row.n1||"").split("+"); return regionOfName(p[1]||"")||regionOfName(p[0]||"")||"MMSS"; } { const parts0=String(row.n1||"").split("+"); const kr=kwRegion(which==="b"&&parts0[1]?parts0[1]:parts0[0]); if(kr) return kr; } if(row.reg) return row.reg; const parts=String(row.n1||"").split("+"); const n= which==="b" && parts[1] ? parts[1] : parts[0]; return regionOfName(n)||regionOfName(row.n1)||"MMSS"; }
function subUsed(x){ return num(x.s)>0 || num(x.r)>0; }
/* Linhas extras do mesmo exercício (pirâmide, dropset, rest-pause ou manual) */
const subsOf=row=> Array.isArray(row&&row.sub)? row.sub : [];
const TEC_PICK=["Pirâmide crescente","Pirâmide decrescente","Dropset","Rest-pause","Cluster set","Bi-set agonista","Bi-set antagonista","Tri-set","Cadência controlada","Isometria"];
const TEC_SH={"Pirâmide crescente":"Pir. ↑","Pirâmide decrescente":"Pir. ↓","Dropset":"Drop","Rest-pause":"Rest-p.","Bi-set agonista":"Bi-set","Bi-set antagonista":"Bi-set","Tri-set":"Tri-set","Cadência controlada":"Cadência","Isometria":"Iso","Cluster set":"Cluster"};
function tecApply(row,t){ const c=row.a.c; const kg=x=>{ const v=num(x); return v? String(Math.round(v*2)/2).replace(".",",") : ""; };
  row.tec=t||undefined; delete row.tecR; delete row.tecD; if(!t){ delete row.tec; return "Método removido"; }
  { const c=tecMine().find(x=>x.n===t); if(c){ if(c.r) row.tecR=c.r; if(c.d) row.tecD=c.d; return `${t}${c.r?` · ${c.r} séries/rodadas`:""}${c.d?` · rest ${c.d}"`:""}`; } }
  if(t==="Pirâmide crescente"){ row.a.s="1"; row.a.r="12"; row.sub=[{s:"1",r:"10",c:""},{s:"1",r:"8",c:""}]; return "Pirâmide crescente: 12 → 10 → 8. Coloque a carga de cada série."; }
  if(t==="Pirâmide decrescente"){ row.a.s="1"; row.a.r="6"; row.sub=[{s:"1",r:"8",c:""},{s:"1",r:"10",c:""}]; return "Pirâmide decrescente: 6 → 8 → 10. Coloque a carga de cada série."; }
  if(t==="Dropset"){ row.sub=[{s:"1",r:"",c:kg(num(c)*0.8)},{s:"1",r:"",c:kg(num(c)*0.6)}]; return "Dropset: 2 drops com 20% a menos de carga cada. Coloque as repetições."; }
  if(t==="Cluster set"){ row.tecD="20"; return "Cluster set: blocos de 2 a 4 repetições, mesma carga, com Rest de 20\" entre eles (toque para mudar)."; }
  if(t==="Rest-pause"){ row.tecD="15"; row.sub=[{s:"1",r:"3",c:c||""},{s:"1",r:"2",c:c||""}]; return "Rest-pause: 2 mini-séries com Rest de 15\" (toque para mudar)."; }
  if(t==="Isometria"){ row.iso=true; return "Isometria: escolha onde e os segundos."; }
  return t+" marcado neste exercício."; }
function subLabel(row,j){ const t=row.tec||""; if(/^Pirâmide/.test(t)) return `${j+2}ª série`; if(t==="Dropset") return `↳ drop ${j+1}`; if(t==="Rest-pause") return `↳ após pausa ${j+1}`; return `↳ linha ${j+2}`; }
function dayHasData(d){ return !!d && ((d.rows||[]).some(r=>r.n1.trim()||subUsed(r.a)||subUsed(r.b)) || !!num(d.cardio.t) || !!(d.wod&&(num(d.wod.t)||String(d.wod.desc||"").trim()))); }
function totDay(d){
  const o={s:0,r:0,t:0,n:0,reg:{},cmin:0,cz:0};
  REG.forEach(k=>o.reg[k]={s:0,r:0,t:0,e:0});
  if(d) (d.rows||[]).forEach(row=>{ if(row.cp) return;
    if(row.n1.trim()) o.n+= row.conj&&row.n2.trim()?2:1;
    if(row.n1.trim()){ o.reg[rowReg(row,"a")].e++; if(row.conj && String(row.n1).split("+").length>1) o.reg[rowReg(row,"b")].e++; }
    [["a",row.a],["b",row.b],...subsOf(row).map(x=>["a",x])].forEach(([w,x])=>{ if(!subUsed(x)) return; const k=rowReg(row,w); const s=num(x.s), r=num(x.r), c=num(x.c);
      const f=uf(row); o.reg[k].s+=s; o.reg[k].r+=s*r*f; o.reg[k].t+=s*r*c*f; });
  });
  REG.forEach(k=>{ o.s+=o.reg[k].s; o.r+=o.reg[k].r; o.t+=o.reg[k].t; });
  if(d){ o.segs=[[num(d.cardio.t),num(d.cardio.z)],...[...Array(Math.max(0,cardioN(d.cardio)-1))].map((_,i)=>[num(d.cardio["t"+(i+2)]),num(d.cardio["z"+(i+2)])]),...(d.rows||[]).filter(r=>r.exe&&!r.cp&&num(r.a.tex)>0).map(r=>[Math.round(Math.max(1,num(r.a.s))*num(r.a.tex)/60*10)/10,num(r.a.zn)])].filter(x=>x[0]>0); o.cmin=o.segs.reduce((a,x)=>a+x[0],0); o.cz=num(d.cardio.z); o.cv=num(d.cardio.v); o.wmin=num((d.wod||{}).t); } else { o.wmin=0; o.cv=0; }
  return o;
}
const isReal=d=> !!d && (!d.cp||d.done||d.ini||d.presOk);
function totWeek(wid,sid){
  const o={s:0,r:0,t:0,reg:{},mod:0,int:0,days:{}};
  REG.forEach(k=>o.reg[k]={s:0,r:0,t:0});
  DAYS.forEach(dy=>{ const dd=dayOf(wid,sid,dy); const t=totDay(isReal(dd)?dd:null); o.days[dy]=t; o.s+=t.s; o.r+=t.r; o.t+=t.t;
    REG.forEach(k=>{ o.reg[k].s+=t.reg[k].s; o.reg[k].r+=t.reg[k].r; o.reg[k].t+=t.reg[k].t; });
    (t.segs||[]).forEach(([mn,z])=>{ if(z>=4) o.int+=mn; else o.mod+=mn; }); o.wod=(o.wod||0)+t.wmin; });
  o.wod=o.wod||0; o.eq=o.mod+2*o.int+o.wod; return o;
}
function prevWeekId(wid){ const i=S.weeks.findIndex(w=>w.id===wid); return i>0? S.weeks[i-1].id : null; }
function cloneDay(d,keepLoads,full){ const c=clean(normDay(d)); delete c.ltrNew; delete c.presOk; delete c.ini; delete c.fim; delete c.done; delete c.ltr; c.cp=1; c.rows.forEach(r=>{ r.id=nid();
    if(!full){ r.n1=""; r.n2=""; const im=r.a&&r.a.isoM; r.a=sub(); r.b=sub(); if(im) r.a.isoM=im; delete r.sub; delete r.cp; return; }
    if(r.n1&&r.n1.trim()) r.cp=1; if(!keepLoads){ r.a.c=""; r.b.c=""; } }); c.cardio={t:"",z:"",tipo:"",pse:"",v:""}; c.wod={tipo:"",t:"",desc:""}; return c; }
/* Cardio não vem copiado: aparece em cima como "Sem. Pass." com o botão Repetir */
const hasCardio=c=>!!(c&&(num(c.t)||c.tipo));
function prevCardio(sid,wid,day){ wid=wid||S.week; day=day||S.day; const ref=prevRef(sid,wid,day); if(ref&&hasCardio(ref.d.cardio)) return {d:ref.d,date:ref.date};
  const L=wkSorted(); const i=L.findIndex(x=>x.id===wid); for(let j=i-1;j>=0;j--){ const dd=dayOf(L[j].id,sid,day); if(dd&&hasCardio(dd.cardio)) return {d:dd,date:addDays(L[j].start,DAYS.indexOf(day))}; } return null; }
function cardioResumo(C){ const n=cardioN(C), g=(f,i)=>C[i?f+(i+1):f]; const out=[]; for(let i=0;i<n;i++){ const t=num(g("t",i)); if(!t&&!g("tipo",i)) continue; out.push(`${g("tipo",i)||"Cardio"}${g("met",i)?" ("+g("met",i)+")":""} ${t?t+"'":""}${num(g("z",i))?" Z"+num(g("z",i)):""}`); } return out.join(" + "); }
/* Exercício arquivado: a última vez que o aluno fez esse exercício, em qualquer treino anterior */
const LD_STOP=new Set(["com","de","da","do","das","dos","na","no","nas","nos","c","e","em","a","o","p","para"]);
function ldTok(s){ return noAcc(s).split(/[^a-z0-9]+/).filter(x=>x&&!LD_STOP.has(x)); }
function lastDone(sid,name,before){ const k=noAcc(name).trim(); if(!k) return null; const kt=ldTok(name); const W=wkSorted(); let best=null, fz=null;
  const near=n=>{ const t=ldTok(n); if(!t.length||!kt.length) return false; const S1=new Set(t), S2=new Set(kt); return kt.every(x=>S1.has(x))||t.every(x=>S2.has(x)); };
  W.forEach(w=>DAYS.forEach((dy,j)=>{ const date=addDays(w.start,j); if(date>=before) return; const d=dayOf(w.id,sid,dy); if(!d) return; const trained=!!(d.done||d.ini||d.presOk); if(d.cp&&!trained) return;
    (d.rows||[]).forEach(r=>{ if(r.cp&&!trained) return; const raw=String(r.n1||"").split("+").map(x=>x.trim()); const whole=String(r.n1||"").trim();
      const cands=[[whole,r.a,false],[raw[0],r.a,true]]; if(r.conj&&raw[1]) cands.push([raw[1],r.b,"b"]);
      cands.forEach(([n,x,part])=>{ if(!n||!subUsed(x)) return; const o=part==="b"? Object.assign({},r,{n1:n,a:r.b,b:sub(),sub:[]}) : part? Object.assign({},r,{n1:n,b:sub()}) : r;
        if(noAcc(n).trim()===k){ if(!best||date>=best.date) best={row:o,date}; }
        else if(near(n)){ if(!fz||date>=fz.date) fz={row:o,date}; } }); }); }));
  if(best) return Object.assign({},best.row,{_old:best.date});
  return fz? Object.assign({},fz.row,{_old:fz.date,_fz:1}) : null; }
function phaseDefaults(m){ const ln0=lineOf(progOf(m)); if(ln0!=="tio"&&ln0!=="conf") return {s:"",r:""}; const w=(typeof curWkPlan==="function")? curWkPlan(m) : null;
  if(w){ const ps=String(w.s).split(/[–-]/), pr=String(w.r).split(/[–-]/); const sv=parseInt(ps[ps.length-1],10), rv=parseInt(pr[0],10); if(sv&&rv) return {s:sv,r:rv}; }
  if(ln0==="conf") return {s:3,r:8}; const p=phaseOf(m); return {s:p.sets[1], r:p.reps[0]}; }

const ICO={
  MMII:`<span class="emo" aria-hidden="true">🦵</span>`,
  MMSS:`<span class="emo" aria-hidden="true">💪</span>`,
  Core:`<span class="emo abs" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 3.5c-1.6 1.8-2.2 4.5-2.2 8.5s.6 6.7 2.2 8.5M17 3.5c1.6 1.8 2.2 4.5 2.2 8.5s-.6 6.7-2.2 8.5" fill="none" stroke="#B9770A" stroke-width="1.7" stroke-linecap="round"/><g fill="#D98E04"><rect x="7.6" y="5.2" width="3.7" height="3.4" rx="1.2"/><rect x="12.7" y="5.2" width="3.7" height="3.4" rx="1.2"/><rect x="7.6" y="10" width="3.7" height="3.4" rx="1.2"/><rect x="12.7" y="10" width="3.7" height="3.4" rx="1.2"/><rect x="7.9" y="14.8" width="3.4" height="3.6" rx="1.2"/><rect x="12.7" y="14.8" width="3.4" height="3.6" rx="1.2"/></g></svg></span>`
};
const REG_LABEL={MMII:"Membros inferiores",MMSS:"Membros superiores",Core:"Core"};
function regIcon(k){ return ICO[k]||`<span class="ico-t">Core</span>`; }
let PICK_OPTS="";
const GRADE_SRC={};
function importGrade(){
  if(S.gradeV1) return false; S.gradeV1=1;
  const ex=S.students.filter(x=>/\(exemplo\)/.test(x.name));
  if(ex.length && ex.length<S.students.length+1){ S.students=S.students.filter(x=>!ex.includes(x)); Object.values(S.days||{}).forEach(W=>ex.forEach(x=>delete W[x.id])); }
  const byName=n=>{ let st=S.students.find(x=>noAcc(x.name).trim()===noAcc(n).trim()); if(!st){ const pl={id:nid(),sessions:[]}; S.plans.push(pl); st={id:nid(),name:n,phase:1,coreExtra:false,planId:pl.id,ov:{},log:[]}; S.students.push(st); } return st; };
  if(!S.students.length){ const pl={id:nid(),sessions:[]}; S.plans.push(pl); S.students.push({id:nid(),name:"Primeiro aluno",phase:1,novo:true,coreExtra:false,planId:pl.id,ov:{},log:[]}); }
  S.grade={}; Object.entries(GRADE_SRC).forEach(([dy,list])=>{ S.grade[dy]=list.map(([t,names])=>({id:nid(),t,ids:names.map(n=>byName(n).id)})); });
  S.plans=S.plans.filter(p=>S.students.some(x=>x.planId===p.id));
  if(!S.students.some(x=>x.id===S.active)) S.active=S.students[0].id;
  return true;
}
const presOn=()=> typeof PRES!=="undefined" && PRES.isReady();
function dateOfDay(dy){ const w=S.weeks.find(x=>x.id===S.week); return w? addDays(w.start,DAYS.indexOf(dy)) : null; }
const byPid=pid=> S.students.find(x=>x.pid===pid);
function presGrade(dy){ if(!presOn()) return []; const wd=(DAYS.indexOf(dy)+1)%7; const g={};
  PRES.alunos().filter(a=>a.ativo!==false).forEach(a=>(a.slots||[]).forEach(s=>{ if(s.d!==wd) return; const st=byPid(a.id); if(!st) return; (g[s.h]=g[s.h]||[]); if(!g[s.h].includes(st.id)) g[s.h].push(st.id); }));
  return Object.entries(g).map(([t,ids])=>({id:"p"+dy+t,t,ids:ids.slice(0,3),auto:1})); }
function stInativo(sid){ if(!presOn()) return false; const st=S.students.find(x=>x.id===sid); if(!st||!st.pid) return false; const a=PRES.aluno(st.pid); return !!(a&&a.ativo===false); }
function slotsOf(dy){ if(presOn()&&!gradeEdit&&PRES.alunos().some(a=>a.ativo!==false&&(a.slots||[]).length)) return presGrade(dy).slice().sort((a,b)=>a.t<b.t?-1:1); const L=((S.grade||{})[dy]||[]); return (L.length? L.map(x=>Object.assign({},x,{ids:x.ids.filter(id=>!stInativo(id))})).filter(x=>x.ids.length) : presGrade(dy)).slice().sort((a,b)=>a.t<b.t?-1:1); }
function presSlots(st){ if(!presOn()||!st.pid) return null; const a=PRES.alunos().find(x=>x.id===st.pid); return a&&a.ativo!==false? (a.slots||[]) : []; }
function gradeDays(st){ return DAYS.filter(dy=>slotsOf(dy).some(x=>x.ids.includes(st.id))); }
function trainDays(st){ const g=gradeDays(st); if(g.length) return g; if(Array.isArray(st.days)) return st.days; const pl=planOf(st); return pl? [...new Set(pl.sessions.filter(se=>se.items.length).map(se=>se.day))] : []; }
/* Grade do dia + reposições/extras no mesmo horário: aparecem juntos (dupla/trio) */
function slotsMerged(dy){ const base=slotsOf(dy).map(x=>Object.assign({},x,{ids:x.ids.slice(),xids:[]})); if(!presOn()) return base;
  sesExtras(dy).forEach(({i,m})=>{ const sl=base.find(x=>x.t===i.hora); if(sl&&!sl.ids.includes(m.id)){ sl.ids.push(m.id); sl.xids.push(m.id); } }); return base; }
function xSlots(dy){ const g={}; const fix=new Set(slotsOf(dy).map(x=>x.t)); sesExtras(dy).forEach(({i,m})=>{ if(fix.has(i.hora)) return; (g[i.hora]=g[i.hora]||[]); if(!g[i.hora].includes(m.id)) g[i.hora].push(m.id); });
  return Object.entries(g).filter(([,ids])=>ids.length>1).map(([t,ids])=>({id:"xs"+t,t,ids:ids.slice(0,3),x:1})); }
function curSlot(){ const L=slotsMerged(S.day).concat(presOn()?xSlots(S.day):[]); return L.find(x=>x.id===S.slot&&x.ids.includes(S.active)) || L.find(x=>x.ids.includes(S.active)) || null; }
function sesMembers(){ const sl=curSlot(); if(sl){ const l=sl.ids.map(id=>S.students.find(x=>x.id===id)).filter(Boolean); if(l.length) return l; } return membersOf(A()); }
function unitsOfDay(dy){ const seen=new Set(), out=[]; S.students.forEach(x=>{ if(seen.has(x.planId)||stInativo(x.id)) return; const ms=membersOf(x); if(ms.some(m=>trainDays(m).includes(dy))){ seen.add(x.planId); out.push(ms.filter(m=>trainDays(m).includes(dy))); } }); return out; }
let gradeEdit=false;
const stById=id=>S.students.find(x=>x.id===id);
let sesAddOpen=false, sesEdit=null, sesDel=null, sesDup=null;
const XT_LBL={rep:"Reposição",adi:"Adiantamento",extra:"Aula extra"};
function sesExtras(dy){ if(!presOn()) return []; const k=dateOfDay(dy); if(!k) return [];
  return PRES.agenda(k).filter(i=>i.tipo!=="fixo").map(i=>({i,m:byPid(i.a.id)})).filter(x=>x.m); }

(function(){ try{ const s0=document.createElement("style"); s0.textContent=".stk{display:inline-block;font-style:normal;font-weight:800;font-size:11px;border-radius:999px;padding:1px 7px;margin-left:5px;white-space:nowrap;vertical-align:middle}.stk.ok{background:#1E8E3E;color:#fff}.stk.bad{background:#C62828;color:#fff}.stk.pend{background:#E8A33D;color:#3a2400}"; document.head.appendChild(s0); }catch(e){} })();
function rpHoje(){ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function stkHTML(i,k){ try{ if(!i||!k||!presOn()) return "";
  if(i.tipo==="fixo"){ const e=PRES.efst(i,k); if(e==="p"||e==="x") return '<i class="stk ok">✓ veio</i>'; if(e==="f"){ if(i.repK&&i.destino!=="abt"&&i.destino!=="nao"){ const [,mm,dd]=i.repK.split("-"); return `<i class="stk rep">🔁 reposição ${+dd}/${+mm}${i.repH?" às "+esc(i.repH):""}</i>`; } return '<i class="stk bad">✗ faltou</i>'; } return ""; }
  const r=i.status; if(r==="p"||r==="x") return '<i class="stk ok">✓ veio</i>'; if(r==="f") return '<i class="stk bad">✗ não veio</i>'; if(k<rpHoje()) return '<i class="stk pend">? sem registro</i>'; return ""; }catch(e){ return ""; } }
function stkOf(m,sl,k){ try{ if(!k||!presOn()||!m||!m.pid) return ""; const L=PRES.agenda(k).filter(i=>i.a.id===m.pid); if(!L.length) return ""; const x=(sl.xids||[]).includes(m.id);
  let it=L.find(i=>x?(i.tipo!=="fixo"&&i.hora===sl.t):(i.tipo==="fixo"&&(i.hora===sl.t||i.orig===sl.t))); if(!it) it=L.find(i=>i.hora===sl.t); if(!it) it=L.find(i=>x?i.tipo!=="fixo":i.tipo==="fixo"); return stkHTML(it,k); }catch(e){ return ""; } }

let CV_DT=null;
document.addEventListener("input",e=>{ const el=e.target; if(!el||!el.matches||!el.matches(".cvnin")) return; clearTimeout(CV_DT);
  CV_DT=setTimeout(()=>{ const txt=el.value||""; if(!/\d|s[eé]rie|repeti|\breps?\b|quilo|\bkg\b/i.test(txt)) return; const o=vozParse(txt); if(!(o.s||o.r||o.c)) return;
    const rEl=el.closest("[data-row]"), cEl=el.closest("[data-col]"); if(!rEl||!cEl) return; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const r=d.rows.find(x=>x.id===rEl.dataset.row); if(!r) return;
    vozApply(r,o); toast("🎤 "+[o.n,o.s&&o.r?o.s+"×"+o.r:o.s?o.s+" séries":o.r?o.r+" reps":"",o.c?o.c+" kg":""].filter(Boolean).join(" · ")); },1400); });
function qsHTML(){ return `<div class="qsbox"><b>▶ Começar treino de aluno novo</b><div class="qsrow"><input class="inp" id="qsName" placeholder="Nome do aluno (ex.: Guilherme)" autocomplete="off"><button class="btn primary small" data-qsgo>Começar</button></div><small class="muted">Só o nome. Ajuste dados e dias depois, na aba Alunos.</small></div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-qsgo]"); if(!b) return; const inp=document.getElementById("qsName"); const name=(inp&&inp.value||"").trim(); if(!name){ toast("Escreva o nome do aluno"); if(inp) inp.focus(); return; }
  let st=S.students.find(x=>noAcc(x.name).trim()===noAcc(name).trim());
  if(!st){ const pl={id:nid(),sessions:[{id:nid(),day:S.day,name:"Treino A",items:[]}]}; S.plans.push(pl); st={id:nid(),name,phase:1,novo:true,coreExtra:false,planId:pl.id,ov:{},log:[],days:[S.day]}; S.students.push(st); }
  S.active=st.id; save(); try{ renderAll(); }catch(_){ renderSessao(); } toast("Treino de "+first(st.name)+" aberto"); });
/* Pop-up do aluno: veio / faltou / sem marcar; na falta, repor com data, abater ou não repor */
let RPF=null;
(function(){ try{ if(document.getElementById("rpfcss")) return; const s=document.createElement("style"); s.id="rpfcss"; s.textContent="#rpfm{z-index:80}.wbell .wbg{display:none}.stk.rep{background:#EF6C00!important;color:#fff!important}#rpfm .sheet{gap:10px}#rpfm .rpf-l{display:block;font-size:13px;margin-bottom:6px}#rpfm .rpf-ops{display:flex;flex-wrap:wrap;gap:6px}#rpfm .rpf-b{border:1.5px solid var(--line,#ccc);border-radius:14px;padding:10px;display:grid;gap:8px}#rpfm .rpf-n{font-size:16px}#rpfm .rpf-ok{border:1px solid var(--line,#ccc);border-radius:12px;padding:10px;display:grid;gap:8px}#rpfm .rpf-rep{display:grid;gap:8px}#rpfm .two{display:grid;grid-template-columns:1fr 1fr;gap:8px}#rpfm label{display:grid;gap:4px;font-size:13px}#rpfm .st-p.primary{background:#1E8E3E;border-color:#1E8E3E;color:#fff}#rpfm .st-f.primary{background:#C62828;border-color:#C62828;color:#fff}.rpfbtn{display:block;margin-top:6px;padding:8px 10px;border-radius:10px;border:1px dashed currentColor;background:transparent;color:inherit;font:inherit;font-size:13px;text-align:left;width:100%}button.rpfname{background:none;border:0;padding:0;font:inherit;color:inherit;text-align:left;cursor:pointer;font-weight:700}.rpfname .rpfed{font-size:12px;opacity:.55}"; document.head.appendChild(s); }catch(_){} })();
function rpfSlot(sl){ try{ if(!presOn()) return null; const k=dateOfDay(S.day); if(!k) return null; const keys=[]; let veio=null, any=null;
  for(const id of sl.ids){ const m=stById(id); if(!m) continue; if(!any) any=m; if(!m.pid) { if(!veio) veio=m; continue; } const x=(sl.xids||[]).includes(id);
    const L=PRES.agenda(k).filter(i=>i.a.id===m.pid&&(x?i.tipo!=="fixo":i.tipo==="fixo")); const it=L.find(i=>i.hora===sl.t||i.orig===sl.t)||L[0];
    if(it){ keys.push(it.key); if(PRES.efst(it,k)!=="f"&&!veio) veio=m; } else if(!veio) veio=m; }
  if(!keys.length) return null; const o=veio||any; return {k,keys,sid:o.id,slot:sl.id,sname:sl.ids.map(id=>{ const m=stById(id); return m?first(m.name):""; }).filter(Boolean).join(" + ")}; }catch(e){ return null; } }
function rpfItems(){ if(!RPF) return []; const A=PRES.agenda(RPF.k); return RPF.keys.map(key=>A.find(i=>i.key===key)).filter(Boolean); }
function rpfOpen(o){ RPF=Object.assign({ed:null},o); if(!RPF.keys) RPF.keys=[RPF.key]; rpfRender(); }
function rpfClose(){ RPF=null; const o=document.getElementById("rpfm"); if(o){ o.hidden=true; o.innerHTML=""; } }
function rpfDl(k){ const [y,m,d]=k.split("-").map(Number); return ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][new Date(y,m-1,d).getDay()]+" "+d+"/"+m; }
function rpfBlk(i){ const k=RPF.k, ef=PRES.efst(i,k), auto=!i.status&&ef==="f", fixo=i.tipo==="fixo", pac=i.a.tipo==="pacote", r=fixo?PRES.regOf(k,i.key):{}, dest=i.destino||"rep";
  const tl=fixo?"":i.tipo==="rep"?" · reposição":i.tipo==="adi"?" · adiantamento":" · aula extra";
  const st=`<div class="rpf-ops">${[["p","✓ Veio","st-p"],["f","✗ Faltou","st-f"],["","Sem marcar",""]].map(([v,l,c])=>`<button class="btn small ${c} ${(v===""?(!i.status&&!auto):v==="f"?ef==="f":i.status===v)?"primary":""}" data-rpfs="${v}" data-i="${esc(i.key)}">${l}</button>`).join("")}</div>${auto?`<small class="muted">Falta automática: a chamada não foi marcada nesse dia.</small>`:""}`;
  let fx="";
  if(ef==="f"&&fixo){ const ops=pac?[["rep","🔁 Reagendar"],["nao","✖ Perdeu a aula"]]:[["rep","🔁 Repor"],["abt","💲 Abater no valor"],["nao","✖ Não repor"]];
    fx=`<div><b class="rpf-l">O que fazer com essa falta?</b><div class="rpf-ops">${ops.map(([v,l])=>`<button class="btn small ${dest===v?"primary":""}" data-rpfd="${v}" data-i="${esc(i.key)}">${l}</button>`).join("")}</div></div>`;
    if(dest==="rep"){ const am=new Date(); am.setDate(am.getDate()+1);
      fx+= (r.repK&&RPF.ed!==i.key)
        ? `<div class="rpf-ok">✅ Reposição marcada: <b>${rpfDl(r.repK)} às ${esc(r.repH||"")}</b><div class="row-actions"><button class="btn small" data-rpfedit data-i="${esc(i.key)}">Mudar data</button><button class="btn small ghost" data-rpfdel data-i="${esc(i.key)}">Tirar a reposição</button></div></div>`
        : `<div class="rpf-rep"><b class="rpf-l">Quando vai repor?</b><div class="two"><label>Data<input class="inp" type="date" id="rpf-k-${esc(i.key)}" value="${r.repK||isoD(am)}"></label><label>Horário<input class="inp" type="time" step="300" id="rpf-h-${esc(i.key)}" value="${r.repH||i.hora}"></label></div><button class="btn primary" data-rpfok data-i="${esc(i.key)}">Marcar reposição</button><small class="muted">Ainda não combinou? Pode fechar. A falta fica como “a repor”.</small></div>`; } }
  return `<div class="rpf-b"><div><b class="rpf-n">${esc(i.a.nome)}</b> <small class="muted">${esc(i.hora)}${tl}</small></div>${st}${fx}</div>`; }
function rpfRender(){
  let o=document.getElementById("rpfm"); if(!o){ o=document.createElement("div"); o.id="rpfm"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",e=>{ if(e.target===o) rpfClose(); }); }
  const L=rpfItems(); if(!L.length){ rpfClose(); toast("Essa aula não está mais na agenda"); return; }
  const tit=L.length>1?`Horário ${esc(L[0].hora)}`:esc(first(L[0].a.nome));
  o.innerHTML=`<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-head"><h3>${tit}</h3><button class="btn small" data-rpfx>Fechar</button></div>
    <p style="margin:0">📅 <b>${rpfDl(RPF.k)}</b></p>
    ${RPF.sid?`<button class="btn primary" data-rpfopen>▶ Abrir o treino${L.length>1||RPF.sname.includes("+")?" ("+esc(RPF.sname)+")":""}</button>`:""}
    ${L.map(rpfBlk).join("")}</div>`;
  o.hidden=false; }
function rpfSync(){ setTimeout(()=>{ try{ renderAll(); }catch(_){} if(RPF) rpfRender(); },60); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-rpfm],[data-rpfx],[data-rpfs],[data-rpfd],[data-rpfok],[data-rpfedit],[data-rpfdel],[data-rpfopen]"); if(!b) return;
  e.stopPropagation(); e.preventDefault();
  if(b.hasAttribute("data-rpfm")){ if(b.disabled) return; rpfOpen({k:b.dataset.k,keys:[b.dataset.rpfm]}); return; }
  if(!RPF||b.hasAttribute("data-rpfx")){ rpfClose(); return; }
  if(b.hasAttribute("data-rpfopen")){ const o=RPF; rpfClose(); if(o.slot) S.slot=o.slot; S.active=o.sid; save(); renderAll(); return; }
  const i=rpfItems().find(x=>x.key===b.dataset.i); if(!i){ rpfRender(); return; } const nm=first(i.a.nome);
  if(b.dataset.rpfs!=null){ const v=b.dataset.rpfs, had=i.repK; PRES.setSt(RPF.k,i.key,v); RPF.ed=null; toast(v==="p"?nm+": veio"+(had?" · reposição tirada":""):v==="f"?nm+": faltou":nm+": sem marcar"+(had?" · reposição tirada":"")); rpfSync(); return; }
  if(b.dataset.rpfd){ const v=b.dataset.rpfd; PRES.setDest(RPF.k,i.key,v); RPF.ed=null; toast(v==="rep"?"Falta de "+nm+": vai repor":v==="abt"?"Falta de "+nm+": abate no valor":"Falta de "+nm+": não repõe"); rpfSync(); return; }
  if(b.hasAttribute("data-rpfedit")){ RPF.ed=i.key; rpfRender(); return; }
  if(b.hasAttribute("data-rpfdel")){ PRES.desmarcaRep(RPF.k,i.key); RPF.ed=null; toast("Reposição tirada. A falta continua a repor."); rpfSync(); return; }
  if(b.hasAttribute("data-rpfok")){ const kr=(document.getElementById("rpf-k-"+i.key)||{}).value, hr=(document.getElementById("rpf-h-"+i.key)||{}).value||i.hora;
    if(!kr){ toast("Escolha a data da reposição"); return; } if(kr===RPF.k&&hr===i.hora){ toast("É o mesmo dia e horário da falta. Escolha outro."); return; }
    PRES.marcaRep(i.a.id,RPF.k,i.key,kr,hr); RPF.ed=null; toast("Reposição de "+nm+" marcada: "+rpfDl(kr)+" às "+hr); rpfSync(); return; }
},true);
function sesAddHTML(st){
  const k=dateOfDay(S.day); const ex=sesExtras(S.day);
  const tpv=i=> i.tipo==="extra"&&i.a.tipo==="pacote"? "pac" : i.tipo;
  const edHTML=(i)=>`<div class="sesaddf xedit"><b>Editar aula de ${esc(first(i.a.nome))}</b>
    <div class="two"><label>Data<input class="inp" type="date" id="se-k" value="${k}"></label><label>Horário<input class="inp" type="time" step="300" id="se-h" value="${i.hora}"></label></div>
    <label>Tipo<select class="inp" id="se-tp">${[["rep","Reposição"],["adi","Adiantamento"],["pac","Mais uma aula do pacote"],["extra","Aula extra ou avulsa"]].map(([v,l])=>`<option value="${v}" ${tpv(i)===v?"selected":""}>${l}</option>`).join("")}</select></label>
    <div class="row-actions"><button class="btn small primary" data-sesedok="${i.key}">Salvar</button><button class="btn small danger" data-sesrm="${i.key}">Apagar aula</button><button class="btn small ghost" data-sesed="">Fechar</button></div></div>`;
  const grp={}; ex.forEach(e=>(grp[e.i.hora]=grp[e.i.hora]||[]).push(e));
  const cs=curSlot();
  const one=({i,m})=>`<span class="xu"><button class="unit ${m.id===st.id?"on":""} ${i.tipo==="rep"?"xrepu":""}" data-unit="${m.id}" data-sesed="${i.key}"><span class="ud" style="--pc:var(--p${m.phase})">${phK(m)}</span>${esc(first(m.name))}<span class="xtag">${i.tipo==="rep"?"🔁 REPOSIÇÃO":i.tipo==="extra"&&i.a.tipo==="pacote"?"Pacote":(XT_LBL[i.tipo]||"Extra")} · ${i.hora}</span>${stkHTML(i,k)}<span class="xpen">✎</span></button>${sesDel===i.key?`<span class="xdelq">Apagar? <button class="btn small danger" data-sesrmok="${i.key}">Sim</button><button class="btn small ghost" data-sesrmno>Não</button></span>`:`<button class="xurm" data-sesrm="${i.key}" aria-label="Apagar esta aula de ${esc(first(m.name))}">✕</button>`}</span>`;
  const many=(L)=>{ const h=L[0].i.hora, on=cs&&cs.id==="xs"+h; return `<div class="xgrp"><button class="unit ${on?"on":""} ${L.some(({i})=>i.tipo==="rep")?"xrepu":""}" data-xslot="xs${h}">${L.map(({i,m})=>`<span class="ud" style="--pc:var(--p${m.phase})">${phK(m)}</span>${esc(first(m.name))}${stkHTML(i,k)}`).join('<span class="uplus">+</span>')}<span class="xtag">${[...new Set(L.map(({i})=>i.tipo==="extra"&&i.a.tipo==="pacote"?"Pacote":(XT_LBL[i.tipo]||"Extra")))].join(" / ")} · ${h}</span></button>
    <div class="xgm">${L.map(({i,m})=>sesDel===i.key?`<span class="xdelq">Apagar ${esc(first(m.name))}? <button class="btn small danger" data-sesrmok="${i.key}">Sim</button><button class="btn small ghost" data-sesrmno>Não</button></span>`:`<span class="xu"><button class="xmini" data-sesed="${i.key}" data-xedonly>✎ ${esc(first(m.name))}</button><button class="xurm" data-sesrm="${i.key}" aria-label="Apagar a aula de ${esc(first(m.name))}">✕</button></span>`).join("")}<small class="muted">Treinando juntos. Para separar, mude o horário de um deles no ✎.</small></div></div>`; };
  const list= ex.length? `<div class="units xunits">${Object.values(grp).map(L=>L.length>1? many(L) : one(L[0])).join("")}</div>${(()=>{ const e=ex.find(x=>x.i.key===sesEdit); return e? edHTML(e.i) : ""; })()}` : "";
  if(!presOn()||!k) return list;
  if(window.RP_LIMPO&&!sesAddOpen) return list;
  if(!sesAddOpen) return `${list}<button class="btn small sesadd" data-sesadd>+ Marcar reposição ou aula fora da grade</button>`;
  const now=new Date(), hh=String(now.getHours()).padStart(2,"0")+":"+String(Math.floor(now.getMinutes()/5)*5).padStart(2,"0");
  const ops=PRES.alunos().filter(a=>a.ativo!==false&&a.tipo!=="ficha"&&a.tipo!=="consultoria").sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")).map(a=>({pid:a.id,name:a.nome})).map(x=>{ const sd=PRES.saldo(x.pid), tp=PRES.tipoAluno(x.pid); return `<option value="${x.pid}" data-tp="${tp}" data-sd="${sd}">${esc(x.name)}${sd>0?` · deve ${sd}`:sd<0?` · ${-sd} adiantada${-sd>1?"s":""}`:""}${tp==="pacote"?" · pacote":tp==="avulsa"?" · avulsa":""}</option>`; }).join("");
  return `${list}<div class="sesaddf"><b>Marcar reposição ou aula fora da grade</b>
    <label>Aluno<select class="inp" id="sa-al" data-saal><option value="">Escolha o aluno</option>${ops}</select></label>
    <label>Data<input class="inp" type="date" id="sa-k" value="${k}" max="${isoD(new Date(Date.now()+864e5*60))}"><small class="muted">Ex.: a Cris pediu quinta às 12:30? Escolha a data de quinta, o horário e “Reposição”. Fica marcada naquele dia em destaque.</small></label>
    ${(()=>{ const opts=[...slotsOf(S.day).map(sl=>({t:sl.t,n:sl.ids.map(id=>{const x=stById(id);return x?first(x.name):"";}).filter(Boolean).join(" + ")})), ...Object.entries(ex.reduce((g,{i,m})=>{(g[i.hora]=g[i.hora]||[]).push(first(m.name));return g;},{})).map(([t,ns])=>({t,n:ns.join(" + ")}))].filter(o=>o.n);
      return opts.length? `<label>Treinar junto com (opcional)<select class="inp" id="sa-jt"><option value="">Sozinho</option>${opts.map(o=>`<option value="${o.t}">${esc(o.n)} · ${o.t}</option>`).join("")}</select><small class="muted">Escolha alguém e o horário fica igual: treinam em dupla na Sessão.</small></label>` : ""; })()}
    <div class="two"><label>Tipo<select class="inp" id="sa-tp"><option value="rep">Reposição (repõe falta)</option><option value="adi">Adiantamento (adianta aula futura)</option><option value="pac">Mais uma aula do pacote</option><option value="extra">Aula extra ou avulsa</option></select></label>
    <label>Horário<input class="inp" type="time" step="300" id="sa-h" value="${hh}"></label></div>
    <p class="muted sahelp" id="sa-help">A aula entra na Presença deste dia e é marcada como dada quando você lançar o treino.</p>
    <div class="row-actions"><button class="btn small primary" data-sesaddok>Marcar</button><button class="btn small ghost" data-sesadd>Cancelar</button></div></div>`;
}
function todayHTML(st){
  const h=todayHTML0(st); if(gradeEdit) return h;
  return h.replace(/<\/div>\s*$/, sesAddHTML(st)+(window.RP_LIMPO?"":qsHTML())+"</div>");
}
function ownSt(make){ let o=S.students.find(x=>x.own); if(!o&&make){ const pl={id:nid(),sessions:[]}; S.plans.push(pl); o={id:nid(),name:"Meu treino",own:true,phase:1,coreExtra:false,planId:pl.id,ov:{},log:[]}; S.students.push(o); } return o; }
function ownBtnHTML(st){ const o=ownSt(false); return o? `<button class="slot own ${st&&st.id===o.id?"on":""}" data-unit="${o.id}"><b>🏋️</b><span>Meu treino (professor)</span></button>` : `<button class="btn small ownnew" data-ownnew>🏋️ Meu treino (professor)</button>`; }
function sesDayNav(){ const k=dateOfDay(S.day); const t=isoD(new Date()); const rel= k===t? "hoje" : k===addDays(t,1)? "amanhã" : k===addDays(t,-1)? "ontem" : "";
  return `<div class="sdnav"><button class="btn small" data-sesdy="-1" aria-label="Dia anterior">‹ Anterior</button><b>${DAY_N[S.day]}${k?` · ${ddmm(k)}`:""}${rel?` <small>(${rel})</small>`:""}</b><button class="btn small" data-sesdy="1" aria-label="Próximo dia">Próximo ›</button></div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-sesdy]"); if(!b) return; e.preventDefault(); e.stopImmediatePropagation(); const dir=+b.dataset.sesdy;
  const i=DAYS.indexOf(S.day)+dir; if(i>=0&&i<DAYS.length){ S.day=DAYS[i]; }
  else { const W=S.weeks.slice().sort((a,b)=>a.start<b.start?-1:1); const wi=W.findIndex(w=>w.id===S.week); const nw=W[wi+dir]; if(!nw){ toast(dir>0? "A próxima semana ainda não começou." : "Não há semana anterior."); return; } S.week=nw.id; S.day= dir>0? DAYS[0] : DAYS[DAYS.length-1]; }
  armAct=null; S.slot=null; const sl=slotsMerged(S.day); if(sl.length&&sl[0].ids[0]) S.active=sl[0].ids[0]; save(); renderSessao(); },true);
function todayHTML0(st){
  const slots=gradeEdit? slotsOf(S.day) : slotsMerged(S.day); const cs=curSlot();
  if(presOn()&&!gradeEdit){ const k=dateOfDay(S.day);
    if(k&&PRES.isOff(k)) return `<div class="card today">${sesDayNav()}<span class="label">${DAY_N[S.day]} · ${ddmm(k)}</span><p><b>Sem aula:</b> ${esc(PRES.offReason(k))}. Se atendeu, desmarque na Presença.</p></div>`; }
  if(gradeEdit) return `<div class="card today"><div class="phase-head"><span class="label">Grade de ${DAY_N[S.day].toLowerCase()}</span><button class="btn small primary" data-gedit>Concluir</button></div>
    ${slots.map(sl=>`<div class="gslot" data-gslot="${sl.id}"><input class="inp gtime" type="time" data-gtime id="gt-${sl.id}" value="${sl.t}">
      <div class="gchips">${sl.ids.map(id=>{ const m=stById(id); return m?`<span class="gchip">${esc(m.name)}<button data-gdel="${id}" aria-label="Tirar ${esc(m.name)}">✕</button></span>`:""; }).join("")}
      ${sl.ids.length<3?`<select class="inp gadd" data-gadd id="ga-${sl.id}"><option value="">+ aluno</option>${S.students.filter(x=>!sl.ids.includes(x.id)).sort((a,b)=>a.name.localeCompare(b.name)).map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join("")}</select>`:""}</div>
      <button class="icon-btn" data-gslotdel aria-label="Apagar horário">✕</button></div>`).join("")}
    <button class="btn small" data-gnew style="justify-self:start">+ Horário</button>
    <p class="muted" style="font-size:12px">Aluno novo: cadastre primeiro no botão Alunos.</p></div>`;
  if(slots.length) return `<div class="card today">${sesDayNav()}<div class="phase-head"><span class="label">Alunos de ${DAY_N[S.day].toLowerCase()} · ${slots.length} horários</span>${presOn()?`${window.RP_LIMPO?`<button class="btn small ${sesAddOpen?"primary":"ghost"}" data-sesadd>${sesAddOpen?"✕ Fechar":"+ Adicionar aluno"}</button>`:`<button class="btn small ghost" data-gocad>✎ Mudar no Cadastro</button>`}`:`<button class="btn small ghost" data-gedit>Editar grade</button>`}</div>
    <div class="slots">${slots.map(sl=>`<button class="slot ${cs&&cs.id===sl.id?"on":""}" data-slot="${sl.id}"><b class="num">${sl.t}</b><span>${sl.ids.map(id=>{ const m=stById(id); return m?esc(m.name)+((sl.xids||[]).includes(id)?` <i class="slrep">🔁 reposição</i>`:"")+stkOf(m,sl,dateOfDay(S.day)):""; }).filter(Boolean).join(" + ")}</span></button>`).join("")}${ownSt(false)?ownBtnHTML(st):""}</div>${ownSt(false)?"":ownBtnHTML(st)}</div>`;
  const units=unitsOfDay(S.day); const n=units.reduce((a,u)=>a+u.length,0);
  return `<div class="card today">${sesDayNav()}<div class="phase-head"><span class="label">Alunos de ${DAY_N[S.day].toLowerCase()} · ${n}</span><button class="btn small ghost" data-gedit>Montar grade</button></div>
    ${units.length? `<div class="units">${units.map(u=>`<button class="unit ${u.some(m=>m.id===st.id)?"on":""}" data-unit="${u.some(m=>m.id===st.id)?st.id:u[0].id}">${u.map(m=>`<span class="ud" style="--pc:var(--p${m.phase})">${phK(m)}</span>${esc(first(m.name))}`).join('<span class="uplus">+</span>')}</button>`).join("")}</div>`
      : `<p class="muted" style="font-size:14px">Nenhum aluno na grade de ${DAY_N[S.day].toLowerCase()}.</p>`}${ownBtnHTML(st)}</div>`;
}
let CUR_TAB="treino";
function renderTurnbar(){
  const bar=document.getElementById("turnbar"); const st=A(); const ms=sesMembers();
  const onT= CUR_TAB==="sessao" && sesMode==="lancar" && ms.length>=1;
  bar.hidden=!onT; document.getElementById("wrap").classList.toggle("withturn",onT);
  const LT=!!window.RP_LIMPO;
  try{ tmFabPlace(); }catch(_){}
  if(onT) bar.innerHTML=ms.map(m=>`<div class="tcell ${REST[m.id]&&REST[m.id]<=Date.now()?"go":""}" id="tc-${m.id}">
    ${ms.length>1?`<button class="tname" data-turn="${m.id}" style="--pc:var(--p${m.phase})" aria-pressed="${m===st}"><span class="ud">${phK(m)}</span>${esc(first(m.name))}</button>`:`<span class="tname solo"><span class="ud" style="--pc:var(--p${m.phase})">${phK(m)}</span>${esc(first(m.name))}</span>`}
    ${LT?`<button class="tdur tdur0" data-rdur="${m.id}" aria-label="Escolher o tempo de descanso" aria-expanded="${durOpen===m.id}">${restSec(m)}" ▾</button>`:""}<button class="trest" data-rest="${m.id}" aria-label="Descanso de ${esc(first(m.name))}"><span class="tr-s">${REST[m.id]?"toque p/ parar":"Descanso"}</span><span class="tr-t num" id="rt-${m.id}">${restLabel(m)}</span></button>
    ${LT?`<button class="tgear" data-ntf aria-label="Configurar o descanso e o alarme">⚙️</button>`:`<button class="tdur" data-rdur="${m.id}" aria-label="Tempo de descanso" aria-expanded="${durOpen===m.id}">${restSec(m)}"</button>`}</div>`).join("")
    + (durOpen&&ms.some(m=>m.id===durOpen)? `<div class="durpop" role="group" aria-label="Escolher descanso"><span>Descanso de ${esc(first(S.students.find(x=>x.id===durOpen).name))}</span><div>${REST_OPTS.map(v=>`<button data-setdur="${v}" aria-pressed="${restSec(S.students.find(x=>x.id===durOpen))===v}">${v}"</button>`).join("")}${(()=>{ const cur=restSec(S.students.find(x=>x.id===durOpen)); return REST_OPTS.includes(cur)? "" : `<button data-setdur="${cur}" aria-pressed="true">${cur}"</button>`; })()}</div><div class="duro"><input class="inp" type="number" inputmode="numeric" min="5" max="900" id="durX" name="rp-descanso-outro" autocomplete="off" enterkeyhint="done" placeholder="Outro (segundos)" aria-label="Outro tempo de descanso em segundos"><button class="btn small primary" data-setdurx>OK</button></div></div>` : "");
  const wt=document.getElementById("weektabs"); const onW= CUR_TAB==="sessao" && S.weeks && S.weeks.length;
  wt.hidden=!onW||!!window.RP_LIMPO; document.getElementById("wrap").classList.toggle("withweeks",!!onW&&!window.RP_LIMPO); try{ if(window.RP_LIMPO&&abPos()==="bottom") bar.style.setProperty("bottom",getComputedStyle(wt).bottom,"important"); else bar.style.removeProperty("bottom"); }catch(_){}
  try{ const dp=bar.querySelector(".durpop"); if(dp){ const r=bar.getBoundingClientRect(); dp.classList.toggle("down", r.top < innerHeight/2); } }catch(_){}
  if(onW){ const on=ntfOk()&&!almOff(), voz=sndSel()==="voz"&&!!audGet(""), sn=(SND.find(x=>x[0]===sndSel())||SND[0])[1].replace(/^\S+\s/,"").toLowerCase(); wt.innerHTML=`<button class="wbell wbig wdark ${on?"on":""}" data-ntf aria-label="Alarme do descanso: configurar"><span class="wbi">🔔</span><span class="wbt"> Alarme do descanso</span><span class="wbg" aria-hidden="true">⚙️</span> <small>${on?`✓ ligado · ${voz?"sua voz":sndSel()==="bip"?bipN()+" bipes":sn} · toque para configurar`:almOff()?"desligado · toque para configurar":"toque para ativar e configurar"}</small></button>`; }
  if(false){ wt.innerHTML=wkSorted().map(w=>`<button data-wtab="${w.id}" aria-selected="${w.id===S.week}" class="${wkDue(w)?"due":""} ${wkNum(w)==null?"old":""}">${wkDue(w)?"🔔 ":""}${wkLbl(w)} <small>${w.nome?esc(w.nome):ddmm(w.start)}</small></button>`).join("")+`<button data-wtab="new" class="wnew" aria-label="Nova semana">+</button><button class="wbell ${ntfOk()?"on":""}" data-ntf aria-label="Alarme no celular">${ntfOk()?"🔔":"🔕"}</button><button data-wtab="cfg" class="wcfg" aria-label="Contagem e lembrete das semanas">⚙</button>`;
    const on=wt.querySelector('[aria-selected="true"]'); if(on) on.scrollIntoView({inline:"nearest",block:"nearest"}); }
  let pop=document.getElementById("wkpop"); if(!pop){ pop=document.createElement("div"); pop.id="wkpop"; document.body.appendChild(pop); }
  if(onW&&WKCFG_OPEN){ pop.innerHTML=wkCfgHTML("ses"); pop.hidden=false; } else { pop.hidden=true; pop.innerHTML=""; }
}

/* ---------- Descanso por aluno (vibra e apita) ---------- */
const REST={}; const REST_OPTS=[10,20,30,40,50,60,70,80,90,100,110,120]; let durOpen=null, rrOpen=null;
const restSec=m=> m.rest||60;
function fmtRest(ms){ const s=Math.max(0,Math.ceil(ms/1000)); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); }
function restLabel(m){ const e=REST[m.id]; if(!e) return "▶ "+fmtRest(restSec(m)*1000); const left=e-Date.now(); return left>0? fmtRest(left) : "Bora!"; }
let AC=null;
const SND=[["bip","📟 Bipe"],["sino","🔔 Sino"],["camp","🛎 Campainha"],["sobe","🎺 Subida"],["voz","🎙 Sua voz"]];
const sndSel=()=>{ const v=(S.brand||{}).alSnd; return v||(audGet("")?"voz":"bip"); };
const bipN=()=>Math.max(1,Math.min(10,+((S.brand||{}).alBips)||7));
function acx(){ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); return AC; }
function sndTone(t,f,dur,type,vol){ const c=acx(), o=c.createOscillator(), g=c.createGain(); o.type=type||"sine"; o.frequency.value=f; const t0=c.currentTime+t;
  g.gain.setValueAtTime(0.0001,t0); g.gain.exponentialRampToValueAtTime(vol||0.35,t0+0.015); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur); o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0+dur+0.02); }
function beep(n){ try{ n=n||bipN(); for(let i=0;i<n;i++) sndTone(i*0.3,i===n-1&&n>1?1320:880,0.25,"square",0.35); }catch(e){} }
function playSnd(k){ try{ if(k==="sino"){ [0,0.9].forEach(t=>{ sndTone(t,880,1.6,"sine",0.5); sndTone(t,2430,1.0,"sine",0.18); sndTone(t,1760,1.2,"sine",0.15); }); }
  else if(k==="camp"){ [0,1.1].forEach(t=>{ sndTone(t,659,0.9,"triangle",0.5); sndTone(t+0.45,523,1.0,"triangle",0.5); }); }
  else if(k==="sobe"){ [[0,523],[0.16,659],[0.32,784]].forEach(([t,f])=>sndTone(t,f,0.18,"square",0.28)); sndTone(0.5,1047,0.7,"square",0.3); }
  else beep(); }catch(e){} }
const FIRED={};
/* Voz no fim do descanso: gravada aqui, guardada neste aparelho (geral ou de cada aluno) */
const almOff=()=>!!(S.brand||{}).alarmOff;
function audGet(id){ try{ return localStorage.getItem("rp_aud_"+(id||"geral"))||""; }catch(_){ return ""; } }
function audSet(id,v){ try{ if(v) localStorage.setItem("rp_aud_"+(id||"geral"),v); else localStorage.removeItem("rp_aud_"+(id||"geral")); try{ queueCloud(); }catch(_){} return true; }catch(_){ toast("Não coube na memória do aparelho. Grave mais curto."); return false; } }
async function audPlay(src){ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") await AC.resume();
  const bin=atob(src.split(",")[1]), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i);
  const buf=await AC.decodeAudioData(u.buffer); const n=AC.createBufferSource(), g=AC.createGain(); g.gain.value=1.6; n.buffer=buf; n.connect(g); g.connect(AC.destination); n.start(); }
function restSound(id){ if(almOff()) return; const k=sndSel(), som=k==="voz"? "camp" : k; const own=id? audGet(id) : audGet("");
  if(own){ audPlay(own).catch(()=>playSnd(som)); return; } playSnd(som); }
let REC=null, AUD_PEND=null;
const audPendHTML=id=> AUD_PEND&&AUD_PEND.id===(id||"")? `<div class="audpend"><button class="btn small" data-audpplay>▶ Ouvir a gravação</button><button class="btn small audok" data-audpok>✓ Salvar esta voz</button><button class="btn small ghost" data-audpno>Descartar</button></div>` : "";
async function audRec(id,btn){ if(REC){ try{ REC.stop(); }catch(_){} return; }
  if(!navigator.mediaDevices||!window.MediaRecorder){ toast("Este celular não grava áudio pelo navegador."); return; }
  let stream; try{ stream=await navigator.mediaDevices.getUserMedia({audio:true}); }catch(_){ toast("Libere o microfone para gravar."); return; }
  const mt=["audio/webm;codecs=opus","audio/mp4","audio/webm"].find(t=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t))||"";
  const r=new MediaRecorder(stream,mt?{mimeType:mt,audioBitsPerSecond:24000}:{}); const parts=[]; REC=r;
  r.ondataavailable=e=>{ if(e.data&&e.data.size) parts.push(e.data); };
  r.onstop=()=>{ REC=null; stream.getTracks().forEach(t=>t.stop()); const blob=new Blob(parts,{type:r.mimeType||mt||"audio/webm"}); const fr=new FileReader();
    fr.onload=()=>{ AUD_PEND={id:id||"",v:fr.result}; audPlay(fr.result).catch(()=>{}); toast("Ouça e toque no botão verde para salvar"); ntfRender(); }; fr.readAsDataURL(blob); };
  r.start(); if(btn){ btn.textContent="⏹ Gravando… toque para parar"; btn.classList.add("rec"); } setTimeout(()=>{ if(REC===r) try{ r.stop(); }catch(_){} },6000); }
function restTick(){
  Object.keys(REST).forEach(id=>{ const m=S.students.find(x=>x.id===id); const el=document.getElementById("rt-"+id); const cell=document.getElementById("tc-"+id);
    const left=REST[id]-Date.now();
    if(left<=0 && !FIRED[id]){ FIRED[id]=1; restSound(id); try{ navigator.vibrate&&navigator.vibrate([300,120,300,120,500]); }catch(e){} showAlarm(m?first(m.name):""); }
    if(left<-12000){ delete REST[id]; delete FIRED[id]; if(cell) cell.classList.remove("go"); if(el&&m) el.textContent=restLabel(m); const s2=cell&&cell.querySelector(".tr-s"); if(s2) s2.textContent="Descanso"; return; }
    if(el&&m) el.textContent=restLabel(m); if(cell) cell.classList.toggle("go",left<=0);
  });
}
setInterval(restTick,250);
/* Janelinha do descanso: aparece quando o descanso começa, dá para arrastar, fechar e trocar a cor */
const RW_SHOW=["branco","amarelo","ciano","verde","magenta","vermelho","azul","preto"];
const RW_COR={ciano:["#00BCD4","#111"],magenta:["#E91E63","#fff"],preto:["#111418","#fff"],marrom:["#6D4C41","#fff"],cinza:["#6B7280","#fff"],roxo:["#7B3FC4","#fff"],azul:["#1E63D6","#fff"],verde:["#1E8E3E","#fff"],vermelho:["#D32F2F","#fff"],turquesa:["#00A99D","#fff"],rosa:["#EC407A","#fff"],laranja:["#F57C00","#fff"],azulclaro:["#9FD3FF","#111"],rosaclaro:["#F8BBD0","#111"],amarelo:["#FFE45C","#111"],branco:["#FFFFFF","#111"]};
const rwOn=()=>(S.brand||{}).restWin!==false; const rwCor=()=>{ const b=S.brand||{}; return b.restWinCor==="x"&&b.restWinX? "x" : RW_COR[b.restWinCor]? b.restWinCor : "preto"; };
const rwPair=(k,x)=> k==="x"&&x? [x,cpInk(x)] : RW_COR[k]||RW_COR.preto;
let RW_X=(()=>{ try{ return localStorage.getItem("rp_rw_x")==="1"; }catch(_){ return false; } })(), RW_DRAG=null, RW_RS=null;
const rwXset=v=>{ RW_X=v; try{ localStorage.setItem("rp_rw_x",v?"1":"0"); }catch(_){} };
function rwSz(){ try{ return parseFloat(localStorage.getItem("rp_rw_sz"))||1; }catch(_){ return 1; } }
function rwPos(){ try{ return JSON.parse(localStorage.getItem("rp_rw_pos")||"null"); }catch(_){ return null; } }
function rwEl(){ let el=document.getElementById("restWin"); if(!el){ el=document.createElement("div"); el.id="restWin"; el.setAttribute("role","timer"); document.body.appendChild(el);
    el.addEventListener("pointerdown",e=>{ if(e.target.closest(".rwrs")){ const r=el.getBoundingClientRect(); RW_RS={x:e.clientX,y:e.clientY,w:r.width,k:rwSz()}; el.setPointerCapture(e.pointerId); el.classList.add("rsz"); e.preventDefault(); return; } if(e.target.closest("button")) return; const r=el.getBoundingClientRect(); RW_DRAG={dx:e.clientX-r.left,dy:e.clientY-r.top,id:e.pointerId}; el.setPointerCapture(e.pointerId); el.classList.add("drag"); e.preventDefault(); });
    el.addEventListener("pointermove",e=>{ if(RW_RS){ const d=((e.clientX-RW_RS.x)+(e.clientY-RW_RS.y))/2; const v=Math.max(0.7,Math.min(2.6,Math.round(RW_RS.k*(RW_RS.w+d)/RW_RS.w*100)/100)); el.style.setProperty("--rwk",v); try{ localStorage.setItem("rp_rw_sz",v); }catch(_){} return; } if(!RW_DRAG) return; const z=parseFloat(document.body.style.zoom)||1, w=el.offsetWidth,h=el.offsetHeight; const x=Math.max(4,Math.min(innerWidth/z-w-4,(e.clientX-RW_DRAG.dx)/z)), y=Math.max(4,Math.min(innerHeight/z-h-4,(e.clientY-RW_DRAG.dy)/z)); el.style.left=x+"px"; el.style.top=y+"px"; el.style.right="auto"; el.style.bottom="auto"; });
    const end=()=>{ if(RW_RS){ RW_RS=null; el.classList.remove("rsz"); const z=parseFloat(document.body.style.zoom)||1; const L=parseFloat(el.style.left), T=parseFloat(el.style.top); if(!isNaN(L)){ el.style.left=Math.max(4,Math.min(innerWidth/z-el.offsetWidth-4,L))+"px"; el.style.top=Math.max(4,Math.min(innerHeight/z-el.offsetHeight-4,T))+"px"; } return; } if(!RW_DRAG) return; RW_DRAG=null; el.classList.remove("drag"); try{ localStorage.setItem("rp_rw_pos",JSON.stringify({x:parseFloat(el.style.left),y:parseFloat(el.style.top)})); }catch(_){} };
    el.addEventListener("pointerup",end); el.addEventListener("pointercancel",end);
    el.addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return;
      if(b.hasAttribute("data-rwx")){ rwXset(true); rwRender(); try{ renderTurnbar(); }catch(_){} toast("Janelinha fechada. Ela volta no próximo descanso."); return; }
      if(b.dataset.rwsz){ const v=Math.max(0.7,Math.min(2.2,Math.round((rwSz()+(+b.dataset.rwsz)*0.15)*100)/100)); try{ localStorage.setItem("rp_rw_sz",v); }catch(_){} el.style.setProperty("--rwk",v);
        const z=parseFloat(document.body.style.zoom)||1; const L=parseFloat(el.style.left), T=parseFloat(el.style.top); if(!isNaN(L)){ el.style.left=Math.max(4,Math.min(innerWidth/z-el.offsetWidth-4,L))+"px"; el.style.top=Math.max(4,Math.min(innerHeight/z-el.offsetHeight-4,T))+"px"; } return; }
      if(b.dataset.rwcor){ S.brand=Object.assign({},S.brand||{},{restWinCor:b.dataset.rwcor}); save(); rwRender(); return; }
      if(b.dataset.rwgo){ const id=b.dataset.rwgo, m=S.students.find(x=>x.id===id); try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(_){} REST[id]=Date.now()+restSec(m)*1000; delete FIRED[id]; keepAwake(); autoPres(id); scAuto(); renderTurnbar(); rwRender(); return; }
      if(b.dataset.rwstop){ const id=b.dataset.rwstop; delete REST[id]; delete FIRED[id]; renderTurnbar(); rwRender(); } });
    const p=rwPos(); if(p){ el.style.left=Math.max(4,Math.min(innerWidth-170,p.x))+"px"; el.style.top=Math.max(4,Math.min(innerHeight-120,p.y))+"px"; el.style.right="auto"; el.style.bottom="auto"; } }
  return el; }
const RW_LAST={};
function rwWake(){ let wh=null; Object.keys(REST).forEach(id=>{ if(RW_LAST[id]===REST[id]) return; RW_LAST[id]=REST[id]; if(RW_X) rwXset(false); const W=wh||whGet(); if(W.includes(id)) wh=W.filter(x=>x!==id); }); Object.keys(RW_LAST).forEach(id=>{ if(!REST[id]) delete RW_LAST[id]; }); if(wh){ try{ localStorage.setItem(whKey(),JSON.stringify(wh)); }catch(_){} const r=document.getElementById("restWin"); if(r) r.dataset.k=""; } }
function rwRender(){ try{ rwWake(); }catch(_){} let ms=[]; try{ ms=sesMembers(); }catch(_){} const WH=whGet(); const idsAll=[...new Set(ms.map(m=>m.id).concat(Object.keys(REST)))]; const ids=idsAll.filter(id=>!WH.includes(id)); const el=rwEl(); const show=rwOn()&&!RW_X&&ids.length>0&&CUR_TAB==="sessao";
  el.hidden=!show; if(!show) return; const [bg,fg]=rwPair(rwCor(),(S.brand||{}).restWinX); el.style.setProperty("--rwbg",bg); el.style.setProperty("--rwfg",fg); el.style.setProperty("--rwk",rwSz());
  const rows=ids.map(id=>{ const m=S.students.find(x=>x.id===id); const xb=idsAll.length>1? `<button class="whx" data-whide="${id}" aria-label="Tirar ${esc(m?first(m.name):"")} de hoje" title="Não treina hoje">✕</button>` : ""; if(!REST[id]) return `<div class="rwr rwidle">${xb}<span class="rwn">${esc(m?first(m.name):"")}</span><b class="rwt num">${fmtRest((m?restSec(m):60)*1000)}</b><button class="rws rwgo" data-rwgo="${id}" aria-label="Começar o descanso">▶</button></div>`; const left=REST[id]-Date.now(); return `<div class="rwr ${left<=0?"go":""}">${xb}<span class="rwn">${esc(m?first(m.name):"")}</span><b class="rwt num" data-rwt="${id}">${left>0?fmtRest(left):"Bora!"}</b><button class="rws rwgo" data-rwstop="${id}" aria-label="Parar o descanso">■</button></div>`; }).join("");
  const key=WH.join(",")+"#"+ids.map(id=>id+(REST[id]?"r":"i")+(REST[id]?"":(S.students.find(x=>x.id===id)||{}).rest)).join("|")+"|"+rwCor(); if(el.dataset.k===key){ ids.forEach(id=>{ if(!REST[id]) return; const t=el.querySelector(`[data-rwt="${id}"]`); const left=REST[id]-Date.now(); if(t){ t.textContent=left>0?fmtRest(left):"Bora!"; t.parentNode.classList.toggle("go",left<=0); } }); return; }
  el.dataset.k=key; requestAnimationFrame(()=>{ try{ scPlace(); }catch(_){} });
  el.innerHTML=`<div class="rwh"><span class="rwg" aria-hidden="true">⠿</span><span>Descanso</span><button class="rwx" data-rwx aria-label="Fechar">✕</button></div>${rows}${WH.some(id=>idsAll.includes(id))?`<button class="whshow" data-wshow>↺ Mostrar todas (${WH.filter(id=>idsAll.includes(id)).length} fora hoje)</button>`:""}<span class="rwrs" aria-label="Arraste o canto para aumentar ou diminuir" title="Arraste para aumentar ou diminuir"></span><div class="rwc"><button class="rwplus ${rwCor()==="x"?"on":""}" data-cp="rw" aria-label="Outra cor e opacidade">＋</button>${RW_SHOW.map(k=>`<button data-rwcor="${k}" class="${rwCor()===k?"on":""}" style="background:${RW_COR[k][0]}" aria-label="Cor ${k}"></button>`).join("")}</div>`; }
setInterval(rwRender,250);
/* Contador de séries: janelinha opcional, arrastável, com cores; um contador por aluno da aula */
let SC_OPEN=(()=>{ try{ return localStorage.getItem("rp_sc_open")!=="0"; }catch(_){ return true; } })(), SC_DRAG=null, SC_RS=null; const SCN={};
const scKey=id=>"rp_sc_"+sesDateOf()+"_"+id;
const scGet=id=>{ if(SCN[id]!=null) return SCN[id]; let v=0; try{ v=+localStorage.getItem(scKey(id))||0; }catch(_){} return SCN[id]=v; };
const scSet=(id,v)=>{ SCN[id]=Math.max(0,v); try{ localStorage.setItem(scKey(id),SCN[id]); }catch(_){} };
const scCor=()=>{ const b=S.brand||{}; return b.scCor==="x"&&b.scX? "x" : RW_COR[b.scCor]? b.scCor : "azul"; };
function scAuto(){ return; if(SC_OPEN) return; SC_OPEN=true; try{ localStorage.setItem("rp_sc_open","1"); }catch(_){} setTimeout(()=>{ try{ scRender(); }catch(_){} },0); }
const whKey=()=>"rp_wh_"+sesDateOf();
function whGet(){ try{ return JSON.parse(localStorage.getItem(whKey())||"[]"); }catch(_){ return []; } }
function whSet(L){ try{ localStorage.setItem(whKey(),JSON.stringify(L)); }catch(_){} const r=document.getElementById("restWin"); if(r) r.dataset.k=""; try{ rwRender(); scRender(); }catch(_){} }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("#restWin [data-whide],#serWin [data-whide],#restWin [data-wshow],#serWin [data-wshow]"); if(!b) return; e.stopPropagation(); if(b.dataset.whide){ const id=b.dataset.whide; delete REST[id]; whSet(whGet().concat([id])); try{ renderTurnbar(); }catch(_){} } else whSet([]); },true);
function scTot(){ try{ return Math.max(1,Math.min(12,+localStorage.getItem("rp_sc_tot")||4)); }catch(_){ return 4; } }
function scTotSet(v){ try{ localStorage.setItem("rp_sc_tot",Math.max(1,Math.min(12,v))); }catch(_){} }
function scSz(){ try{ return parseFloat(localStorage.getItem("rp_sc_sz"))||1; }catch(_){ return 1; } }
function scEl(){ let el=document.getElementById("serWin"); if(el) return el; el=document.createElement("div"); el.id="serWin"; document.body.appendChild(el);
  el.addEventListener("pointerdown",e=>{ if(e.target.closest(".rwrs")){ const r=el.getBoundingClientRect(); SC_RS={x:e.clientX,y:e.clientY,w:r.width,k:scSz()}; el.setPointerCapture(e.pointerId); e.preventDefault(); return; } if(e.target.closest("button,input")) return; const r=el.getBoundingClientRect(); SC_DRAG={dx:e.clientX-r.left,dy:e.clientY-r.top}; el.setPointerCapture(e.pointerId); el.classList.add("drag"); e.preventDefault(); });
  el.addEventListener("pointermove",e=>{ const z=parseFloat(document.body.style.zoom)||1;
    if(SC_RS){ const d=((e.clientX-SC_RS.x)+(e.clientY-SC_RS.y))/2; const v=Math.max(0.7,Math.min(2.6,Math.round(SC_RS.k*(SC_RS.w+d)/SC_RS.w*100)/100)); el.style.setProperty("--rwk",v); try{ localStorage.setItem("rp_sc_sz",v); }catch(_){} return; }
    if(!SC_DRAG) return; const w=el.offsetWidth,h=el.offsetHeight; el.style.left=Math.max(4,Math.min(innerWidth/z-w-4,(e.clientX-SC_DRAG.dx)/z))+"px"; el.style.top=Math.max(4,Math.min(innerHeight/z-h-4,(e.clientY-SC_DRAG.dy)/z))+"px"; el.style.right="auto"; el.style.bottom="auto"; });
  const end=()=>{ if(SC_RS){ SC_RS=null; return; } if(!SC_DRAG) return; SC_DRAG=null; el.classList.remove("drag"); try{ localStorage.setItem("rp_sc_pos",JSON.stringify({x:parseFloat(el.style.left),y:parseFloat(el.style.top)})); }catch(_){} };
  el.addEventListener("pointerup",end); el.addEventListener("pointercancel",end);
  el.addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-scx")){ SC_OPEN=false; try{ localStorage.setItem("rp_sc_open","0"); }catch(_){} scRender(); try{ renderTurnbar(); }catch(_){} return; }
    if(b.dataset.sccor){ S.brand=Object.assign({},S.brand||{},{scCor:b.dataset.sccor}); save(); el.dataset.k=""; scRender(); return; }
    if(b.dataset.sctot){ scTotSet(scTot()+(+b.dataset.sctot)); scRender(); return; }
    if(b.dataset.scchip){ const [id,i]=b.dataset.scchip.split("|"); const n=+i; scSet(id, scGet(id)>=n? n-1 : n); try{ navigator.vibrate&&navigator.vibrate(20); }catch(_){} scRender(); return; }
    if(b.dataset.scadd){ scSet(b.dataset.scadd,scGet(b.dataset.scadd)+1); try{ navigator.vibrate&&navigator.vibrate(30); }catch(_){} scRender(); return; }
    if(b.dataset.scsub){ scSet(b.dataset.scsub,scGet(b.dataset.scsub)-1); scRender(); return; }
    if(b.hasAttribute("data-sczero")){ Object.keys(SCN).forEach(k=>scSet(k,0)); scRender(); toast("Séries zeradas"); return; } });
  el.addEventListener("change",e=>{ if(e.target.matches("[data-sctotin]")){ scTotSet(+e.target.value||4); scRender(); } });
  try{ const p=JSON.parse(localStorage.getItem("rp_sc_pos")||"null"); if(p){ el.style.left=Math.max(4,Math.min(innerWidth-170,p.x))+"px"; el.style.top=Math.max(4,Math.min(innerHeight-120,p.y))+"px"; el.style.right="auto"; el.style.bottom="auto"; } }catch(_){}
  return el; }
function scRender(){ SC_OPEN=false; const el=scEl(); let ms=[]; try{ ms=sesMembers(); }catch(_){} const msAll=ms, WH=whGet(); ms=ms.filter(m=>!WH.includes(m.id)); if(!ms.length&&msAll.length) ms=msAll; const show=SC_OPEN&&CUR_TAB==="sessao"&&ms.length>0; el.hidden=!show; if(!show) return;
  const [bg,fg]=rwPair(scCor(),(S.brand||{}).scX); el.style.setProperty("--rwbg",bg); el.style.setProperty("--rwfg",fg); el.style.setProperty("--rwk",scSz());
  el.innerHTML=`<div class="rwh"><span class="rwg" aria-hidden="true">⠿</span><span>Séries <span class="sctot"><button data-sctot="-1" aria-label="Menos séries">−</button><input type="number" inputmode="numeric" min="1" max="12" data-sctotin value="${scTot()}" aria-label="Quantidade de séries"><button data-sctot="1" aria-label="Mais séries">+</button></span></span><button data-sczero title="Zerar todos" aria-label="Zerar">↺</button><button class="rwx" data-scx aria-label="Fechar">✕</button></div>${msAll.some(m=>WH.includes(m.id))?`<button class="whshow" data-wshow>↺ Mostrar todas (${msAll.filter(m=>WH.includes(m.id)).length} fora hoje)</button>`:""}${ms.map(m=>`<div class="rwr scr">${msAll.length>1?`<button class="whx" data-whide="${m.id}" aria-label="Tirar ${esc(first(m.name))} de hoje" title="Não treina hoje">✕</button>`:""}<span class="rwn scnm">${esc(first(m.name))}<span class="scchips">${Array.from({length:scTot()},(_,i)=>`<button class="scchip ${scGet(m.id)>i?"x":""}" data-scchip="${m.id}|${i+1}" aria-label="Série ${i+1}">${i+1}</button>`).join("")}</span></span><button class="scb" data-scsub="${m.id}" aria-label="Menos uma série">−</button><button class="rwt num scn" data-scadd="${m.id}" aria-label="Mais uma série">${scGet(m.id)}</button><button class="scb" data-scadd="${m.id}" aria-label="Mais uma série">+</button></div>`).join("")}<span class="rwrs" title="Arraste para aumentar ou diminuir"></span><div class="rwc"><button class="rwplus ${scCor()==="x"?"on":""}" data-cp="sc" aria-label="Outra cor e opacidade">＋</button>${RW_SHOW.map(k=>`<button data-sccor="${k}" class="${scCor()===k?"on":""}" style="background:${RW_COR[k][0]}" aria-label="Cor ${k}"></button>`).join("")}</div>`; requestAnimationFrame(scPlace); }
function scPlace(){ const el=document.getElementById("serWin"), rw=document.getElementById("restWin"); if(!el||el.hidden) return; let sp=null; try{ sp=localStorage.getItem("rp_sc_pos"); }catch(_){} if(sp) return;
  if(rw&&!rw.hidden){ const r=rw.getBoundingClientRect(), z=parseFloat(document.body.style.zoom)||1; el.style.top=Math.max(4,(r.top/z)-el.offsetHeight-8)+"px"; el.style.left=Math.max(4,r.right/z-el.offsetWidth)+"px"; el.style.right="auto"; el.style.bottom="auto"; } }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-scopen]"); if(!b) return; SC_OPEN=!SC_OPEN; try{ localStorage.setItem("rp_sc_open",SC_OPEN?"1":"0"); }catch(_){} scRender(); try{ renderTurnbar(); }catch(_){} if(SC_OPEN) toast("Toque no número ou no + a cada série"); });
let ALARM=[], alarmT=null;
const ALM_DEF="Bora para a próxima série!";
const almMsg=()=>String((S.brand||{}).alarmMsg||"").trim()||ALM_DEF;
function ntfBanHTML(){ return ntfOk()? "" : `<button class="ntfban" data-ntf><b>🔔 Use o timer como alarme no celular</b><span>Avisa e vibra quando o descanso acaba, mesmo com a tela bloqueada. Toque aqui para ativar.</span></button>`; }
function ntfOk(){ return "Notification" in window && Notification.permission==="granted"; }
function ntfShow(title,body){ if(!ntfOk()) return; const o={body,tag:"rp-alarm",renotify:true,requireInteraction:true,vibrate:[300,120,300,120,500],icon:"icon-192.png",badge:"icon-192.png"};
  try{ if(navigator.serviceWorker&&navigator.serviceWorker.controller!==undefined&&navigator.serviceWorker.getRegistration){ navigator.serviceWorker.getRegistration().then(r=>{ if(r) r.showNotification(title,o); else { try{ new Notification(title,o); }catch(e){} } }); } else new Notification(title,o); }catch(e){} }
function showAlarm(n){ if(document.visibilityState!=="visible"&&!almOff()) ntfShow("⏰ Acabou o descanso"+(n?" · "+n:""),almMsg()); if(n&&!ALARM.includes(n)) ALARM.push(n); const a=document.getElementById("alarm"); document.getElementById("alarmName").textContent=ALARM.join(" · "); a.hidden=false; clearTimeout(alarmT); alarmT=setTimeout(hideAlarm,10000); }
function hideAlarm(){ ALARM=[]; document.getElementById("alarm").hidden=true; }
document.getElementById("alarm").addEventListener("click",hideAlarm);
let WAKE=null; async function keepAwake(){ try{ if(!WAKE&&navigator.wakeLock){ WAKE=await navigator.wakeLock.request("screen"); WAKE.addEventListener("release",()=>WAKE=null); } }catch(e){} }
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible"&&Object.keys(REST).length) keepAwake(); });
try{ if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")) navigator.serviceWorker.register("sw.js").catch(()=>{}); }catch(e){}
let NTF_OPEN=false;
function ntfHTML(){ const sup="Notification" in window, st=sup? Notification.permission : "nao", ios=/iPhone|iPad/.test(navigator.userAgent), app=matchMedia("(display-mode: standalone)").matches||navigator.standalone;
  return `<div class="ntfbox" role="dialog" aria-label="Alarme no celular"><b>🔔 Alarme do descanso no celular</b>
  <p class="ntfst ${st==="granted"?"ok":""}">${st==="granted"?"✅ Ativado neste aparelho.":st==="denied"?"⛔ Bloqueado. Libere nas configurações (passo 2).":!sup? (ios&&!app?"No iPhone, primeiro coloque o site na tela de início e abra pelo ícone.":"Este navegador não aceita alarme fora do site."):"Ainda não ativado."}</p>
  ${sup&&st!=="granted"&&st!=="denied"?`<button class="btn primary" data-ntfgo>Ativar alarme no celular</button>`:""}<label class="ntfml">✏️ Sua mensagem quando o descanso acaba<input class="inp" id="ntfMsg" maxlength="120" value="${esc((S.brand||{}).alarmMsg||"")}" placeholder="${esc(ALM_DEF)}"></label>
  <div class="ntfprev"><small>Vai chegar assim:</small><b>⏰ Acabou o descanso · Ana</b><span id="ntfPrev">${esc(almMsg())}</span></div>
  <div class="ntfsnd"><b>🔊 Som quando o descanso acaba</b>
    ${(()=>{ const k=sndSel(), nm=(SND.find(x=>x[0]===k)||SND[0])[1], vz=k==="voz"; return `<div class="sndnow"><span>Vai tocar:<b>${vz?"🎙️ Sua voz":k==="bip"?nm+" · "+bipN()+"x":nm}</b></span><button class="btn primary" data-sndtest>▶ Ouvir</button></div>`; })()}
    <small class="muted">Escolha outro som (toca na hora):</small>
    <div class="agwach sndch">${SND.map(([k,n])=>`<button class="agwc ${sndSel()===k?"on":""}" data-snd="${k}">${sndSel()===k?"✓ ":""}${n} <i class="sndpl">▶</i></button>`).join("")}</div>
    ${sndSel()==="bip"?`<div class="ntfvr bipn"><span>Quantos bipes</span><button class="btn small" data-bipn="-1" aria-label="Menos">−</button><b class="num">${bipN()}</b><button class="btn small" data-bipn="1" aria-label="Mais">+</button></div>`:""}
    <small class="muted">Toque numa opção para ouvir. Aluno com voz própria gravada sempre toca a voz dele.</small>
    <div class="ntfvr"><span>🎙 Sua voz (todos os alunos)${audGet("")?" ✓ salva":""}</span><button class="btn small ${audGet("")?"":"primary"}" data-audrec="">${audGet("")?"Regravar":"🎙 Gravar minha voz"}</button>${audGet("")?`<button class="btn small" data-audplay="">▶ Ouvir</button><button class="btn small ghost" data-auddel="">Apagar</button>`:""}</div>${audPendHTML("")}
    ${(()=>{ let M=[]; try{ M=sesMembers(); }catch(_){} const L2=M; return L2.length? `<small class="muted">Voz de cada aluno (opcional), ex.: “Dona Neli, bora!”. Grave na aula dele: fica salva só para ele.</small>`+L2.map(m=>`<div class="ntfvr"><span>${esc(first(m.name))}${audGet(m.id)?" · 🎙 ✓":""}</span><button class="btn small" data-audrec="${m.id}">${audGet(m.id)?"Regravar":"🎙 Gravar"}</button>${audGet(m.id)?`<button class="btn small" data-audplay="${m.id}">▶</button><button class="btn small ghost" data-auddel="${m.id}">×</button>`:""}</div>${audPendHTML(m.id)}`).join("") : ""; })()}
    <small class="muted">Até 6 segundos. Cada aluno fica com a voz dele, salva na nuvem: abre em qualquer aparelho seu. Com a tela bloqueada, o celular toca o som de notificação dele.</small></div>
  <div class="ntfsnd"><b>⏰ Cor da tela quando o descanso acaba</b>${odots([{pad:1,attr:'data-alarmcor=""',t:"Cor do site (padrão)",on:!(S.brand||{}).alarmCor}].concat(["#D3271B","#1E8E3E","#1B55B8","#7B3FC4","#EC407A","#F57C00","#111418","#8E1B3A","#00897B","#3949AB","#6D4C41","#455A64","#FFB300","#00ACC1","#AD1457","#6B7A1E","#E8603C"].map(c=>({set:{alarmCor:c},c,t:c,on:(S.brand||{}).alarmCor===c}))),"alarmCor",(S.brand||{}).alarmCor&&!["#D3271B","#1E8E3E","#1B55B8","#7B3FC4","#EC407A","#F57C00","#111418","#8E1B3A","#00897B","#3949AB","#6D4C41","#455A64","#FFB300","#00ACC1","#AD1457","#6B7A1E","#E8603C"].includes((S.brand||{}).alarmCor)?(S.brand||{}).alarmCor:"")}<small class="muted">Toque numa cor: a tela pisca para você ver.</small></div>
  <div class="ntfvr"><span>🪟 Janelinha do descanso (dá para arrastar e trocar a cor)</span><button class="btn small ${rwOn()?"":"primary"}" data-rwtog>${rwOn()?"Desligar":"Ligar"}</button></div>
  <button class="btn ${almOff()?"primary":"ghost"}" data-almtog>${almOff()?"🔔 Ligar o alarme do descanso":"🔕 Desligar o alarme do descanso"}</button>
  ${st==="granted"?`<button class="btn" data-ntftest>Testar agora (bloqueie a tela em 5 s)</button>`:""}
  <ol class="ntfl"><li>Toque em <b>Ativar</b> e escolha <b>Permitir</b>.</li>
  <li>Bloqueado sem querer? Toque no cadeado ao lado do endereço do site → <b>Permissões</b> → <b>Notificações: Permitir</b>.</li>
  <li><b>Volume de mídia alto.</b> O apito usa o volume de música/vídeo, não o da campainha.</li>
  <li>Android: Configurações → Notificações → Chrome → deixe <b>Pop-up na tela</b> (ou “Alertar”) ligado. É isso que faz o aviso aparecer por cima do que você estiver usando.</li>
  <li>Android: Configurações → Apps → Chrome → Bateria → <b>Sem restrições</b>. Sem isso, o aviso atrasa com a tela bloqueada.</li>
  <li>Modo <b>Não perturbe</b> desligado durante o treino.</li>
  <li>iPhone: só funciona com o site na tela de início (iOS 16.4 ou mais novo), aberto pelo ícone.</li></ol>
  <p class="muted" style="font-size:13px;margin:0">O melhor é deixar o site aberto: com o descanso correndo, a tela não apaga sozinha. Fora do site, o aviso chega como notificação com vibração.</p>
  <button class="btn ghost" data-ntfx>Fechar</button></div>`; }
document.addEventListener("change",e=>{ if(!e.target.matches||!e.target.matches("[data-loadmax]")) return; const v=Math.max(1,Math.min(100,parseInt(e.target.value,10)||LOAD_DEF)); S.brand=Object.assign({},S.brand||{},{loadMax:v}); save(); toast(`Alerta de carga: acima de ${v}%`); setTimeout(()=>{ try{ renderSessao(); }catch(_){} },0); });
document.addEventListener("change",e=>{ if(!e.target.matches||!e.target.matches("[data-paycor]")) return; S.brand=Object.assign({},S.brand||{},{payCor:e.target.value}); save(); applySiteCor(); });
document.addEventListener("change",e=>{ if(!e.target.matches||!e.target.matches("[data-donesend]")) return; S.brand=Object.assign({},S.brand||{},{doneSend:e.target.value}); save(); toast("Guardado"); });
document.addEventListener("input",e=>{ if(e.target.id!=="ntfMsg") return; S.brand=Object.assign({},S.brand||{},{alarmMsg:e.target.value}); save(); const pv=document.getElementById("ntfPrev"); if(pv) pv.textContent=almMsg(); });
function ntfRender(){ let el=document.getElementById("ntfpop"); if(!el){ el=document.createElement("div"); el.id="ntfpop"; document.body.appendChild(el); } el.hidden=!NTF_OPEN; el.innerHTML=NTF_OPEN? ntfHTML() : ""; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-audrec],[data-audplay],[data-auddel],[data-almtog],[data-snd],[data-bipn],[data-sndtest],[data-rwtog],[data-audpplay],[data-audpok],[data-audpno]"); if(!b) return;
  if(b.dataset.audrec!=null){ audRec(b.dataset.audrec,b); return; }
  if(b.dataset.audplay!=null){ const v=audGet(b.dataset.audplay); if(v) audPlay(v).catch(()=>toast("Não consegui tocar. Grave de novo.")); return; }
  if(b.hasAttribute("data-audpplay")){ if(AUD_PEND) audPlay(AUD_PEND.v).catch(()=>{}); return; }
  if(b.hasAttribute("data-audpok")){ if(AUD_PEND&&audSet(AUD_PEND.id,AUD_PEND.v)){ const nm=AUD_PEND.id? first((stById(AUD_PEND.id)||{}).name||"") : ""; if(!AUD_PEND.id) S.brand=Object.assign({},S.brand||{},{alSnd:"voz"}); save(); toast(nm?`Voz salva para ${nm} ✓`:"Sua voz salva para todos os alunos ✓"); } AUD_PEND=null; ntfRender(); renderTurnbar(); return; }
  if(b.hasAttribute("data-audpno")){ AUD_PEND=null; ntfRender(); toast("Gravação descartada"); return; }
  if(b.hasAttribute("data-rwtog")){ S.brand=Object.assign({},S.brand||{},{restWin:!rwOn()}); save(); ntfRender(); rwRender(); toast(rwOn()?"Janelinha do descanso ligada":"Janelinha do descanso desligada"); return; }
  if(b.dataset.snd){ S.brand=Object.assign({},S.brand||{},{alSnd:b.dataset.snd}); save(); if(b.dataset.snd==="voz"){ const v=audGet(""); if(v) audPlay(v).catch(()=>{}); } else playSnd(b.dataset.snd); ntfRender(); renderTurnbar(); return; }
  if(b.dataset.bipn){ S.brand=Object.assign({},S.brand||{},{alBips:Math.max(1,Math.min(10,bipN()+(+b.dataset.bipn)))}); save(); beep(); ntfRender(); return; }
  if(b.hasAttribute("data-sndtest")){ const k=sndSel(); if(k==="voz"){ let v=""; try{ for(const m of sesMembers()){ if(audGet(m.id)){ v=audGet(m.id); break; } } }catch(_){} v=v||audGet(""); if(v) audPlay(v).catch(()=>beep()); else beep(); return; } playSnd(k); return; }
  if(b.dataset.auddel!=null){ audSet(b.dataset.auddel,""); ntfRender(); renderTurnbar(); toast("Voz apagada. Volta o apito."); return; }
  if(b.hasAttribute("data-almtog")){ S.brand=Object.assign({},S.brand||{},{alarmOff:!almOff()}); save(); ntfRender(); renderTurnbar(); toast(almOff()?"Alarme do descanso desligado":"Alarme do descanso ligado"); }
});
document.addEventListener("click",e=>{ const b=e.target.closest("[data-ntf],[data-ntfgo],[data-ntftest],[data-ntfx]"); if(!b) return;
  if(b.hasAttribute("data-ntf")){ NTF_OPEN=!NTF_OPEN; ntfRender(); return; }
  if(b.hasAttribute("data-ntfx")){ NTF_OPEN=false; ntfRender(); try{ renderSessao(); }catch(_){} return; }
  if(b.hasAttribute("data-ntfgo")){ try{ beep(); }catch(_){} Promise.resolve(Notification.requestPermission()).then(p=>{ ntfRender(); renderTurnbar(); if(p==="granted"){ toast("Alarme ativado!"); ntfShow("🔔 Alarme ativado","Assim vai aparecer o fim do descanso."); } else toast("Não foi permitido. Veja o passo 2."); }); return; }
  if(b.hasAttribute("data-ntftest")){ toast("Bloqueie a tela agora: o aviso chega em 5 segundos"); setTimeout(()=>{ restSound(""); try{ navigator.vibrate&&navigator.vibrate([300,120,300]); }catch(_){} ntfShow("⏰ Acabou o descanso · Teste",almMsg()); },5000); return; }
});
/* Semana nova automática: quando começa uma semana (segunda), ela é criada sozinha copiando exercícios e cargas da última semana. */
function autoWeek(){ const mon=mondayOf(new Date()); let w=S.weeks.find(x=>x.start===mon); if(w) return {w,made:false};
  const last=S.weeks.slice().sort((a,b)=>a.start<b.start?-1:1).pop(); if(!last||last.start>mon) return {w:null,made:false};
  w={id:nid(),n:last.n+1,start:mon}; const src=S.days[last.id]||{}; const dst=S.days[w.id]={};
  Object.keys(src).forEach(s2=>{ dst[s2]={}; Object.keys(src[s2]).forEach(dy=>{ const c=cloneDay(src[s2][dy],true); c.cardio={...c.cardio,pse:""}; dst[s2][dy]=c; }); });
  S.weeks.push(w); fillWeekByLtr(w.id);
  toast(`Semana ${w.n} começou. Escolha repetir o treino anterior ou só visualizar`); return {w,made:true}; }
/* Semana nova: cada dia com letra (na programação ou já marcada) puxa o último treino daquela letra */
function fillWeekByLtr(wid){ const W=S.days[wid]||{}; const done=new Set();
  Object.keys(W).forEach(sid=>Object.keys(W[sid]).forEach(dy=>{ done.add(sid+"|"+dy); try{ fillByLtr(sid,wid,dy); }catch(e){} }));
  (S.students||[]).forEach(st=>DAYS.forEach(dy=>{ if(done.has(st.id+"|"+dy)) return; try{ if(progLtr(st.id,dy)) fillByLtr(st.id,wid,dy); }catch(e){} })); }
/* ---------- Interrogação: balão curto de explicação ---------- */
const TIPS={
 s_imp:["Importar treino do dia","Mande foto, print, PDF, Excel ou Word do treino: o site lê e lança os exercícios. Você confere antes."],
 s_hist:["Histórico de treino","Tudo o que o aluno já fez, exercício por exercício, com gráfico, comparação e envio para ele. Dentro tem o Visualizar treino do dia ou da semana."],
 s_treino:["Barra Treino","Toque para escolher a letra (A, B, C…), criar um treino novo, repetir a programação ou mover o treino para outro dia."],
 s_div:["Dividir a tela","Mostra a dupla ou o trio lado a lado, um aluno em cada coluna."],
 s_sem:["Semana e dia","Escolha a semana e o dia. Repetir esta programação repete a semana inteira; Zerar recomeça a contagem só deste aluno."],
 rm_plan:["Planejamento do mês","Imagem para o aluno com os dias de treino, feriados, aulas a mais da 5ª semana e o aviso de falta. Ver antes mostra como fica; Ajustar muda os textos."],
 rm_fech:["Relatório do mês","Imagem para o aluno com os treinos feitos e as faltas, cada uma com reposição, desconto ou aula dada e o motivo."],
 rm_card:["Cartão de apresentação","A sua formação, experiência e cursos numa imagem, com foto se quiser."],
 c_tipo:["Tipo de cardio","Onde foi feito: esteira, corrida na rua, bike, elíptico…"],
 c_met:["Método","Como foi feito. Contínuo: ritmo igual. Intervalado: alterna forte e leve. Tiro: curto e máximo. Tabata, EMOM, AMRAP: veja o ? do Cronômetro."],
 c_t:["Tempo","Minutos de cardio. Vai para o relatório e para o controle da semana."],
 c_z:["Zona (1 a 5)","Z1 muito leve · Z2 leve, conversa fácil · Z3 moderado, frases curtas · Z4 forte, poucas palavras · Z5 máximo."],
 c_v:["Velocidade","Em km/h (esteira, rua ou bike). Ajuda a estimar o gasto."],
 c_pse:["PSE","Percepção Subjetiva de Esforço: o aluno diz de 0 (parado) a 10 (máximo) o quanto foi pesado."],
 t_amrap:["AMRAP","O máximo de rodadas possível dentro do tempo. Ex.: 10 minutos fazendo o circuito quantas vezes der."],
 t_fortime:["Por tempo","Faz a tarefa toda o mais rápido possível. O tempo limite é o máximo que pode levar."],
 t_emom:["EMOM","A cada minuto começa uma série. Terminou antes? O que sobra do minuto é descanso."],
 t_tabata:["Tabata","20\" no máximo e 10\" de descanso, 8 vezes (4 minutos). Dá para mudar os tempos."],
 t_mix:["Mix","Junta vários cronômetros em sequência, com descanso entre eles."],
 t_criar:["Criar","Monte o seu: séries/rodadas, tempo de trabalho (ou livre) e descanso."],
 crono:["Cronômetros","AMRAP: o máximo de rodadas no tempo.\nPOR TEMPO: faz a tarefa o mais rápido possível, com limite.\nEMOM: a cada minuto começa uma série; o que sobra é descanso.\nTABATA: 20\" forte e 10\" de descanso, 8 vezes.\nMIX: junta vários.\n＋ CRIAR: o seu, com séries/rodadas e descanso."],
 ex:["Botões do exercício","Conj: abre outro exercício na mesma caixa (bi-set). +ex.: mais um (tri-set). ×: tira do conjugado.\n🗑 apagar: tira o exercício inteiro (toque duas vezes).\nIso: isometria.\nUni: unilateral, cada lado.\n+ linha: outra série com reps ou carga diferente.\nMet. Avan.: dropset, pirâmide… ou crie o seu.\n⏱ (Desc): descanso só deste exercício.\n🎤: fale o exercício e o site preenche.\nSem. Pass.: o que fez na semana passada."],
 ctl:["Controle","Metas: séries e reps alvo por grupo muscular.\nSessão: gráfico do treino de hoje.\nSemanal: a semana toda e comparar semanas."],
 rel:["Relatórios","Relatório do treino e Relatório dos treinos da semana: para mandar ao aluno pelo WhatsApp, em imagem ou texto. O Histórico mostra tudo o que o aluno já fez, exercício por exercício."],
 pg_by:["Repetir o treino por","Letra: o dia puxa o último treino da mesma letra (bom para reposição).\nDia: toda segunda igual, toda terça igual…"],
 pg_line:["Programação das semanas","Por fases e Medo de peso: prontas.\nMinha programação: a sua progressão, automática.\nNenhuma: só registra; a próxima semana vem com Sem. Pass."],
 fin:["Financeiro","Previsto: total do mês. Recebido: o que entrou. A receber: o que falta (toque para ver os nomes).\nAjustar valor: muda só este mês. + outro valor: pagamento extra ou parcial. Pagou adiantado: vários meses."],
 fz:["Tamanho da letra","A+ aumenta e A− diminui a letra de todo o site. Fica salvo no aparelho."]
};
function qtip(k){ return TIPS[k]? `<button type="button" class="qtip" data-tip="${k}" aria-label="O que é ${esc(TIPS[k][0])}?">?</button>` : ""; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest(".qtip"); let bub=document.getElementById("qbub");
  if(!b){ if(bub&&!e.target.closest("#qbub")) bub.hidden=true; return; }
  e.preventDefault(); e.stopPropagation(); const t=TIPS[b.dataset.tip]; if(!t) return;
  if(!bub){ bub=document.createElement("div"); bub.id="qbub"; bub.setAttribute("role","dialog"); document.body.appendChild(bub); }
  bub.innerHTML=`<b>${esc(t[0])}</b><p>${esc(t[1]).replace(/\n/g,"<br>")}</p><button type="button" class="qbx" aria-label="Fechar">Entendi</button>`; bub.hidden=false;
  bub.querySelector(".qbx").onclick=()=>{ bub.hidden=true; }; },true);
/* ---------- Lateral: A−/A+ e ajuda ---------- */
const SIDE_SZ=[0.6,0.75,1,1.3,1.6];
function sideGet(k,def){ try{ const v=localStorage.getItem(k); return v===null?def:v; }catch(e){ return def; } }
function sideSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
function sideApply(){ const d=document.getElementById("sidectl"), r=document.getElementById("sideopen"); if(!d||!r) return; const hid=sideGet("sideHide","0")==="1"; d.hidden=hid; r.hidden=!hid;
  const sz=SIDE_SZ[+sideGet("sideSz2","2")]||1, z=FZ[fzI]||1; d.style.zoom=sz/z; r.style.zoom=1/z; }
function sideCtl(){ if(document.getElementById("sidectl")) return; const d=document.createElement("div"); d.id="sidectl";
  d.innerHTML=`<div class="sdh"><button class="sdsz" data-sidesz aria-label="Mudar o tamanho destes botões" title="Tamanho dos botões">⤢</button><button class="sdx" data-sidex aria-label="Fechar zoom">×</button></div><span class="sdl">zoom</span><button class="fzPlus" aria-label="Aumentar letra">A+</button><button class="fzMinus" aria-label="Diminuir letra">A−</button><button class="sidehelp" data-botopen aria-label="Ajuda sobre o site">💬<span>ajuda</span></button>`;
  document.body.appendChild(d); const r=document.createElement("button"); r.id="sideopen"; r.type="button"; r.setAttribute("aria-label","Abrir zoom e ajuda"); r.innerHTML="🔍<span>zoom</span>"; document.body.appendChild(r); sideApply(); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-sidesz],[data-sidex],#sideopen"); if(!b) return;
  if(b.id==="sideopen"){ sideSet("sideHide","0"); sideApply(); return; }
  if(b.hasAttribute("data-sidex")){ sideSet("sideHide","1"); sideApply(); toast("Zoom fechado. Toque na 🔍 no canto para abrir de novo."); return; }
  const ni=(+sideGet("sideSz2","2")+1)%SIDE_SZ.length; sideSet("sideSz2",String(ni)); sideApply(); toast("Tamanho do zoom: "+Math.round(SIDE_SZ[ni]*100)+"%"); });
/* ---------- Robô de ajuda (só sobre o uso do site) ---------- */
const BOT=[
 {k:"cadastr cadastro novo adicionar incluir",a:"Aba 👥 Alunos → “+ Novo aluno”. Coloque nome, WhatsApp, dias, horários, valor e vencimento e toque em Salvar. Ele entra sozinho na Presença, Agenda e Financeiro. Tem uma lista em foto, Excel ou Word? Use “📎 Importar alunos”."},
 {k:"importar importacao foto print pdf excel word planilha anexar arquivo digitar",a:"Toque em “📎 Importar” (Sessão, Programação, Cadastro, Avaliação física ou Financeiro). Mande foto, print, PDF, Excel ou Word: o site lê, você confere e toca em Lançar."},
 {k:"inativ inativar excluir parou saiu",a:"Alunos → toque no aluno → “Inativar aluno” (guarda o histórico) ou “Excluir aluno” (apaga tudo de vez)."},
 {k:"horario horarios grade",a:"Alunos → toque no aluno → ajuste os dias e horários → Salvar. Vale daqui pra frente. Para mudar só um dia, ajuste na Chamada da Presença."},
 {k:"vencimento parcela parcelado duas vezes metade data pagar",a:"Alunos → aluno → em Vencimento escolha “Paga em 2, 3… vezes” e coloque o dia (e o valor, se quiser) de cada parcela."},
 {k:"pagou pagamento marcar recebi receber baixa",a:"Aba 💰 Financeiro → no cartão do aluno toque em “✓ Pagou” (ou na parcela, “toque se pagou”). Pagou valor diferente? Use “+ outro valor”."},
 {k:"avulsa avulsas aula feita nao pagou proximo mes passar",a:"Financeiro → caixa laranja “💵 Aulas avulsas não pagas”: ✓ Pagou ou ➡ Passar para o próximo mês. Lá aparece como “Mês anterior”, com os dias, no previsto e no a receber."},
 {k:"vencido alerta vermelho atrasado devendo",a:"O alerta vermelho “Pagamento vencido” leva direto ao aluno no Financeiro. Prometeu pagar depois? Use “Pendente até” no cartão do aluno."},
 {k:"previsto recebido soma total bate",a:"Previsto = recebido + a receber. Se alguém pagou a mais, aparece um aviso amarelo no Financeiro para você conferir."},
 {k:"adiantado trimestral varios meses",a:"Financeiro → cartão do aluno → “Pagou adiantado”. Escolha o mês em que recebeu e os meses que cobre."},
 {k:"relatorio financeiro pdf",a:"Financeiro → “📄 Relatório financeiro (PDF)”, no topo da aba."},
 {k:"relatorio mes mensal planejamento planejar enviar mes aluno cartao apresentacao",a:"Aba 📤 Relatório e planejamento do mês: escolha o aluno e o mês, toque em “👁 Ver antes de enviar” e depois em “Enviar planejamento do mês” ou “Enviar relatório do mês”. Lá também ficam a sua marca, as frases, o aviso de falta, as redes sociais, o registro profissional e o cartão de apresentação."},
 {k:"presenca chamada falta faltou presente",a:"Aba ✅ Controle de presença → Chamada: os alunos do dia aparecem sozinhos. Toque em Presente ou Faltou. Ao iniciar o treino na Sessão, a presença é marcada sozinha."},
 {k:"reposicao extra aula fora grade",a:"Sessão do dia → Alunos do dia → “+ Marcar reposição ou aula fora da grade”. Ou na Presença: “+ Reposição ou aula extra”."},
 {k:"agenda horarios livres whatsapp ocupado",a:"Aba 📅 Agenda. Em “🕐 Meu horário de trabalho” crie todos os horários (ex.: 05:00 às 20:00). Toque no horário para marcar livre ou ocupado, ou escreva o nome. A tabela de novos alunos se atualiza sozinha. Dá para enviar os livres pelo WhatsApp."},
 {k:"cor cores site tema mudar cor aba",a:"Toque em “Editar cores da aba”, no lado direito da tela: muda só a aba aberta. Para o site todo: 👤 Meu perfil/conta → 🎨 Personalizar site."},
 {k:"cor cores agenda",a:"Agenda da semana → “🎨 Cores da agenda”."},
 {k:"programacao fases medo peso minha nenhuma programar",a:"Na Sessão do dia, toque em “📊 Programação do treino de…” → no cartão do aluno escolha: Por fases, Medo de peso, Minha programação ou Nenhuma."},
 {k:"letra letras treino a b c novo treino",a:"Na Sessão, a barra “Treino A” fica em cima do treino: toque e troque a letra (puxa o último treino dela). “＋ Novo A” começa em branco e o A antigo fica no Histórico."},
 {k:"semana s1 s2 contagem lembrete recomecar",a:"Na Sessão, no quadro “📅 Semana e dia”: S1, S2… A S1 é a semana em que o aluno começa. “Repetir esta programação por X semanas” avisa; “Zerar contagem” recomeça."},
 {k:"sessao lancar treino exercicio serie repeticao carga peso",a:"Aba 🏋️ Sessão do dia → toque no cartão e escreva o exercício, ou toque no 🎤 e fale: “supino 3 de 10 com 20 kg”. Já escrito? Toque no número para corrigir ali mesmo."},
 {k:"audio voz falar microfone",a:"Na Sessão, abra o cartão e toque no 🎤 (“Fale o exercício”). Fale: “agachamento 3 de 12 com 30 kg”. Se não funcionar, confira se o navegador tem permissão de microfone."},
 {k:"semana passada sem pass anterior repetir",a:"“Sem. Pass.” em cima do cartão mostra o que o aluno fez da última vez. O botão “↻ Repetir” logo embaixo traz séries, reps e kg."},
 {k:"descanso timer intervalo",a:"Na Sessão, a barra de baixo tem o descanso de cada aluno: toque no ▶ para contar. O número ao lado muda o tempo."},
 {k:"cronometro tabata timer criar",a:"Na Sessão, em ⏱ Timers: Cronômetro, Tabata (8 × 20\" com 10\" de descanso) ou ＋ Criar o seu. Toque no ? para ver cada um."},
 {k:"cardio esteira zona pse velocidade meta",a:"Na Sessão, em 🏃 Cardio: tipo, método, tempo, zona, velocidade e PSE. Em “🎯 Metas de cardio para a semana” você põe vezes, tempo, distância e zonas."},
 {k:"conjugado conjugar conj biset bi-set triset tri-set junto juntos mais dois exercicio exercicios",a:"Na Sessão, toque em “Conjugar” embaixo do cartão: junta com o exercício de baixo num bloco. “+ Conjugar” põe mais um (tri-set) e “Desmembrar” separa."},
 {k:"dupla trio copiar colega",a:"Alunos no mesmo horário aparecem juntos na Sessão. Toque em “Repetir p/ colega” no cartão: escolha “Só este exercício” ou “Repetir sempre” (tudo o que lançar repete para o colega; “Parar” desliga). “Dividir a tela” mostra os dois lado a lado."},
 {k:"historico evolucao grafico comparar visualizar ver treino dia semana",a:"Na Sessão, botão escuro “📈 Histórico de treino”, logo abaixo do Importar treino. Dentro dele fica “Visualizar treino do dia ou da semana”."},
 {k:"repetir semana inteira programacao sexta",a:"Para repetir a semana toda, use “Repetir esta programação por X semanas” (no quadro Semana e dia ou dentro da barra Treino). “Repetir por: Letra” repete só a letra."},
 {k:"mover trocar dia treino outro dia",a:"Na Sessão, toque na barra Treino (ex.: Treino A). Lá dentro: “↔ Mover este treino para outro dia”."},
 {k:"apagar excluir tirar remover exercicio cartao lixeira",a:"Na Sessão, toque no 🗑 na coluna da direita do cartão. Aparece “Confirma apagar exercício X?”: toque em Apagar."},
 {k:"metodo avancado dropset piramide rest pause cluster tecnica",a:"Na Sessão, toque em “Métodos avançados” embaixo do cartão e escolha. O site pergunta se quer usar e monta as linhas (ex.: Dropset com −20% em cada drop). “Entenda os métodos avançados” explica todos."},
 {k:"isometria iso unilateral uni tempo execucao",a:"Abra o cartão: “Unilateral” mostra 12/12 ou 30\"/30\"; “Isometria” pede onde e os segundos; “Tempo de execução” abre TEMPO e ZONA e conta no cardio."},
 {k:"sugestao sugestoes exercicio",a:"Na Sessão, toque no exercício e depois em “💡 Sugestões de exercícios”, em cima da caixa de escrever: abre a lista por região e músculo."},
 {k:"grafico pizza barra controle metas",a:"Na Sessão, toque em “🎯 Metas e controle de séries e repetições da sessão”: os gráficos já abrem (barras, gráfico ou pizza). “⚙ Ajustar metas” fica em cima."},
 {k:"relatorio treino aluno whatsapp imagem enviar mandar",a:"Na Sessão, ao terminar o treino aparecem “📲 Enviar relatório”, “Ver relatório” e “Relatório da semana”: imagem, texto ou os dois pelo WhatsApp."},
 {k:"avaliacao fisica dobras medidas circunferencia bioimpedancia foto",a:"Aba 🧍 Avaliação física: Bioimpedância, Medidas (fita) ou Dobras (adipômetro) → Salvar. Fotos: tire na hora ou anexe da galeria com a data."},
 {k:"abas esconder aparecer sumir mostrar menu escolher",a:"Aba 👤 Meu perfil/conta → “🧩 Abas que aparecem”, logo embaixo de Minha conta. Marque só as abas que você usa; as outras ficam escondidas, sem perder nada."},
 {k:"slides explicacao entender aprender apresentacao",a:"Cada aba tem os slides dela, já abertos em cima (📽). Fechou? Toque em “📽 Ver a explicação desta aba em slides”."},
 {k:"alarme notificacao celular apitar vibrar bloqueada descanso mensagem sino",a:"Na Sessão, toque em “🔔 Alarme do descanso” (barra escura embaixo) → Ativar → Permitir. Ali você escolhe o som ou a sua voz e a mensagem. Deixe o volume de mídia alto."},
 {k:"consultoria online aluno online distancia tipo",a:"Alunos → aluno → Tipo → “Consultoria online”. Tem valor mensal e não entra na chamada nem na agenda."},
 {k:"logo marca nome relatorios cores frases",a:"Meu perfil/conta → “✎ Seu nome, logo, cores e frases dos relatórios”."},
 {k:"senha esqueci trocar email conta sair",a:"Meu perfil/conta: dados, e-mail, senha e Sair. Esqueceu a senha? Na tela de login toque em “Esqueci a senha”."},
 {k:"backup copia seguranca dados salvar",a:"Os dados ficam salvos na nuvem sozinhos. Para guardar uma cópia, use o Backup em Meu perfil/conta."},
 {k:"letra tamanho grande pequena zoom enxergar ler",a:"Use A+ e A− no painel ZOOM, na lateral direita da tela: aumenta ou diminui a letra do site todo."},
 {k:"sugestao ideia melhorar",a:"Toque em “💡 Sugestão ou ideia”: escreva ou fale a sua ideia. Chega direto para o desenvolvedor."}
];
const BOT_FORA="hipertrofia fisiologia biomecanica musculo musculos dieta nutricao suplemento whey creatina lesao lesoes emagrecer emagrecimento caloria calorias proteina carboidrato hormonio vo2 alongamento postura joelho ombro coluna lombar periodizar periodizacao";
const BOT_PROG="programacao fases medo peso progressao periodizacao montar treino divisao";
let BOT_LOG=[], BOT_OPEN=false;
function botNorm(t){ return String(t||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g," "); }
function botSupWa(){ return (window.RP_SUP_WA||"5531988260268"); }
function botAnswer(q){ const n=botNorm(q), W=n.split(/\s+/).filter(w=>w.length>2);
  let best=null, bs=0; BOT.forEach(e=>{ const K=e.k.split(" ").filter(k=>k.length>=3); let sc=0; K.forEach(k=>{ if(W.some(w=>w===k||(k.length>=4&&w.startsWith(k))||(w.length>=4&&k.startsWith(w)))) sc++; }); if(sc>bs){ bs=sc; best=e; } });
  const fora=BOT_FORA.split(" ").some(k=>n.includes(k)), prog=BOT_PROG.split(" ").some(k=>n.includes(k));
  const comoUsar=/\b(onde|como|botao|aba|tela|site|marcar|lancar|cadastrar|mudar|trocar|ver|abrir)\b/.test(n);
  if(best&&bs>=2) return {t:best.a};
  if(fora&&!comoUsar) return {t:"Eu só respondo sobre o uso do site. Para dúvidas de treino, fisiologia ou biomecânica, chame o professor.",wa:"prof"};
  if(best&&bs>=1) return {t:best.a};
  if(prog) return {t:"Não encontrei essa resposta. Para ajuda com a sua programação, chame o professor.",wa:"prof"};
  return {t:"Não sei responder isso. Chame o desenvolvedor que ele te ajuda.",wa:"dev"}; }
function botHTML(){ const wa=k=>`<a class="botwa" target="_blank" rel="noopener" href="https://wa.me/${botSupWa()}?text=${encodeURIComponent(k==="prof"?"Olá, professor! Preciso de ajuda com a minha programação no Rotina do Personal.":"Olá! Tenho uma dúvida sobre o Rotina do Personal.")}">💬 ${k==="prof"?"Chamar o professor":"Chamar o desenvolvedor"}</a>`;
  return `<div class="botbox" role="dialog" aria-label="Ajuda sobre o site"><div class="both"><b>💬 Ajuda sobre o site</b><button class="icon-btn" data-botx aria-label="Fechar">✕</button></div>
    <div class="botlog" id="botlog">${BOT_LOG.length?BOT_LOG.map(m=>`<div class="botm ${m.u?"u":""}">${esc(m.t)}${m.wa?"<br>"+wa(m.wa):""}</div>`).join(""):`<div class="botm">Olá! Pergunte como usar o site. Ex.: “como marco pagamento?”. Só respondo sobre o site.</div><div class="botq">${["Como cadastro um aluno?","Como marco um pagamento?","Como uso o áudio?","O que é Sem. Pass.?","Como aumento a letra?"].map(x=>`<button data-botq="${esc(x)}">${esc(x)}</button>`).join("")}</div>`}</div>
    <form class="botf" data-botf><input id="botin" placeholder="Escreva sua dúvida…" autocomplete="off"><button class="btn primary">Enviar</button></form></div>`; }
function botFit(){ const o=document.getElementById("botov"); if(!o) return; const z=FZ[fzI]||1, vv=window.visualViewport; const h=vv?vv.height:window.innerHeight, t=vv?vv.offsetTop:0; o.style.height=(h/z)+"px"; o.style.top=(t/z)+"px"; const l=document.getElementById("botlog"); if(l) l.scrollTop=l.scrollHeight; }
if(window.visualViewport){ visualViewport.addEventListener("resize",botFit); visualViewport.addEventListener("scroll",botFit); }
function botRender(){ let o=document.getElementById("botov"); if(!BOT_OPEN){ if(o) o.remove(); return; }
  if(!o){ o=document.createElement("div"); o.id="botov"; document.body.appendChild(o); } o.innerHTML=botHTML(); botFit(); }
function botAsk(q){ q=String(q||"").trim(); if(!q) return; BOT_LOG.push({u:1,t:q}); const r=botAnswer(q); BOT_LOG.push({t:r.t,wa:r.wa}); botRender(); setTimeout(()=>{ const i=document.getElementById("botin"); if(i) i.focus(); },30); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-botopen],[data-botx],[data-botq]"); if(!b){ if(e.target.id==="botov"){ BOT_OPEN=false; botRender(); } return; }
  if(b.hasAttribute("data-botopen")){ BOT_OPEN=true; botRender(); return; } if(b.hasAttribute("data-botx")){ BOT_OPEN=false; botRender(); return; } botAsk(b.dataset.botq); });
document.addEventListener("submit",e=>{ if(!e.target.matches("[data-botf]")) return; e.preventDefault(); botAsk(document.getElementById("botin").value); });
/* ---------- Contagem de semanas (S1, S2…) e lembrete ---------- */
let WKCFG_OPEN=false;
function wkCfg(){ S.wkCfg=S.wkCfg||{}; if(S.wkCfg.base&&!S.wkCfg.baseMig){ delete S.wkCfg.base; S.wkCfg.baseMig=1; } return S.wkCfg; }
/* Caixas que a pessoa fecha no X e reabre pelo nome: a tela fica só com o que ela usa */
function boxOff(k){ return !!(((S.brand||{}).fech||{})[k]); }
function boxW(k,title,inner){ if(!inner) return ""; return boxOff(k)? `<button class="boxbar" data-boxopen="${k}">▸ ${title}</button>` : `<div class="boxw" data-box="${k}"><div class="boxh"><span>${title}</span><button class="boxx" data-boxx="${k}" aria-label="Fechar ${title}">✕</button></div>${inner}</div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-boxx],[data-boxopen]"); if(!b) return; e.stopPropagation(); const k=b.dataset.boxx||b.dataset.boxopen; const f=Object.assign({},((S.brand||{}).fech)||{}); if(b.dataset.boxx) f[k]=1; else f[k]=0; S.brand=Object.assign({},S.brand||{},{fech:f}); save(); renderAll(); try{ agRender(); }catch(_){} },true);
function wkChipsHTML(){ return `<div class="wkrow" role="tablist" aria-label="Semanas">${wkSorted().filter(w=>wkNum(w)!=null||w.id===S.week).map(w=>`<button data-wtab="${w.id}" aria-selected="${w.id===S.week}" class="${wkDue(w)?"due":""} ${wkNum(w)==null?"old":""}">${wkDue(w)?"🔔 ":""}${wkLbl(w)||"–"} <small>${w.nome?esc(w.nome):ddmm(w.start)}</small></button>`).join("")}<button data-wtab="cfg" class="wcfg" aria-label="Nomes e lembrete das semanas">⚙</button></div>`; }
function wkRepHTML(){ const c=wkCfg();
  return `<div class="wkrep"><label>Repetir esta programação por <input class="inp" type="number" inputmode="numeric" min="0" max="99" data-wkalert value="${+c.alerta||""}" placeholder="4"> semanas</label><button class="btn small" data-wkok>OK</button><button class="btn small wkred" data-wkreset>Zerar contagem só de ${esc(first(A().name))}</button></div>
  ${+c.alerta?`<small class="muted wkreph">Ao chegar na S${c.alerta}, a semana fica laranja com 🔔 para você decidir se muda o treino.</small>`:""}`; }
function wkRepOnly(cls){ const c=wkCfg(); return `<div class="wkrep ${cls||""}"><label>Repetir esta programação por <input class="inp" type="number" inputmode="numeric" min="0" max="99" data-wkalert value="${+c.alerta||""}" placeholder="4"> semanas</label><button class="btn small" data-wkok>OK</button></div>`; }
function wkRepTxt(){ const c=wkCfg(); return `<small class="muted wkreph">${+c.alerta?`Ao chegar na S${c.alerta}, a semana fica laranja com 🔔 para você decidir se muda o treino.`:`Ao chegar na semana escolhida, ela fica laranja com 🔔 para você decidir se muda o treino.`}</small>`; }
function wkZerarBtn(){ return `<button class="btn small wkred" data-wkreset>Zerar contagem de semanas só de ${esc(first(A().name))}</button>`; }
function wkRowHTML(){ return wkChipsHTML()+wkRepHTML(); }
function wkSorted(){ return (S.weeks||[]).slice().sort((a,b)=>a.start<b.start?-1:1); }
/* Contagem das semanas é de cada aluno: a semana em que ele zerou vira S1; as anteriores mantêm o número antigo */
function wkBaseOf(w,m){ m=m||(typeof A==="function"? A() : null); const L=wkSorted(); const bs=((m&&m.wkBase)||[]).map(id=>L.find(x=>x.id===id)).filter(Boolean).sort((a,b)=>a.start<b.start?-1:1); let b=null; bs.forEach(x=>{ if(x.start<=w.start) b=x; }); return b; }
/* Semana em que o aluno começa: a da data "Começa a treinar em" do Cadastro; sem data, a 1ª semana com treino lançado */
function stuIni(m){ try{ const a=m&&m.pid&&PRES.aluno(m.pid); return (a&&a.inicio)||""; }catch(_){ return ""; } }
function wkFirst(m){ m=m||(typeof A==="function"? A() : null); if(!m) return null; const L=wkSorted(); const ini=stuIni(m);
  if(ini){ const f=L.find(w=>addDays(w.start,7)>ini); if(f) return f; }
  for(const w of L){ const D=(S.days[w.id]||{})[m.id]||{}; if(Object.values(D).some(x=>dayHasData(x))) return w; } return null; }
function wkNum(w,m){ m=m||(typeof A==="function"? A() : null); const L=wkSorted(), f=wkFirst(m); let b=wkBaseOf(w,m); if(b&&f&&b.start<f.start) b=null;
  const o=b||f; if(!o) return w.n; const k=L.indexOf(w)-L.indexOf(o)+1; return k<1? null : k; }
function wkLbl(w){ const k=wkNum(w); return k==null? "" : "S"+k; }
function wkDue(w){ const c=wkCfg(), n=+c.alerta||0; if(!n||c.manter) return false; const k=wkNum(w); return k!=null&&k>=n; }
function wkCfgHTML(where){ const c=wkCfg(), L=wkSorted(), b=(S.weeks.find(x=>x.id===S.week)&&wkBaseOf(S.weeks.find(x=>x.id===S.week)))||L[0], cur=L.find(x=>x.id===S.week), lastDue=L.filter(wkDue).pop();
  const due= lastDue? `<div class="wkdue"><b>🔔 Chegou na ${wkLbl(lastDue)}${+c.alerta?` (lembrete de ${c.alerta} semanas)`:""}.</b> Hora de mudar o treino?<div class="row"><button class="btn small wkred" data-wkreset>Recomeçar contagem: ${cur?ddmm(cur.start):""} vira S1</button><button class="btn small" data-wkkeep="1">Manter até eu decidir</button></div></div>` : "";
  if(where==="banner") return due;
  return `<div class="card wkcfg"><div class="phase-head"><h3 style="margin:0">📅 Contagem das semanas</h3>${where==="ses"?`<button class="btn small ghost" data-wkcfgx>Fechar</button>`:""}</div>
    <p class="muted" style="margin:0;font-size:13px">As semanas começam sempre na segunda-feira. A contagem começou em <b>S1 · ${b?ddmm(b.start):"–"}</b>.</p>
    <span class="label">Me lembrar quando chegar em</span>
    <div class="wkchips">${[0,2,3,4,5,6,8,10,12,16].map(n=>`<button type="button" class="${(+c.alerta||0)===n?"on":""}" data-wkset="${n}">${n?n+" sem.":"Sem lembrete"}</button>`).join("")}</div>
    <label class="label" style="display:grid;gap:4px">Outro número (quantas semanas quiser)<span style="display:flex;gap:8px;align-items:center"><input class="inp" type="number" inputmode="numeric" min="0" max="99" data-wkalert value="${[0,2,3,4,5,6,8,10,12,16].includes(+c.alerta||0)?"":+c.alerta}" placeholder="ex.: 7" style="max-width:110px"><button type="button" class="btn small" data-wkok>OK</button></span></label>
    <details class="wknames"><summary>✎ Dar nome às semanas (opcional)</summary><p class="muted" style="font-size:12px;margin:4px 0">Ex.: Adaptação, Choque, Deload. O nome aparece na barra de baixo.</p>${wkSorted().slice(-12).map(w=>`<label class="wkn"><b>${wkLbl(w)||ddmm(w.start)}</b><small>${ddmm(w.start)}</small><input class="inp" data-wkname="${w.id}" value="${esc(w.nome||"")}" maxlength="18" placeholder="sem nome"></label>`).join("")}</details>
    ${c.manter?`<p class="note" style="margin:0">Lembrete pausado: a contagem segue até você decidir. <button class="btn small" data-wkkeep="0">Voltar a lembrar</button></p>`:""}
    ${due}
    ${due?"":`<button class="btn small wkred" data-wkreset style="justify-self:start">Recomeçar contagem: ${cur?ddmm(cur.start):""} vira S1</button>`}
    <p class="muted" style="margin:0;font-size:12px">Ao chegar no número de semanas, a semana fica <b style="color:#B26A00">laranja com 🔔</b> na barra de baixo da Sessão. Recomeçar só muda a numeração: treinos e histórico continuam.</p></div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-wkreset],[data-wkkeep],[data-wkcfgx],[data-wkset],[data-wkok]"); if(!b) return;
  const c=wkCfg();
  if(b.dataset.wkset!=null){ c.alerta=+b.dataset.wkset||0; c.manter=false; save(); renderAll(); toast(c.alerta?`Vou lembrar ao chegar em ${c.alerta} semanas`:"Sem lembrete de semanas"); return; }
  if(b.hasAttribute("data-wkok")){ const i=(b.parentNode&&b.parentNode.querySelector("[data-wkalert]"))||document.querySelector("#wkpop [data-wkalert]"); const v=Math.max(0,Math.min(99,parseInt(i&&i.value,10)||0)); c.alerta=v; c.manter=false; save(); renderAll(); toast(v?`Vou lembrar ao chegar em ${v} semanas`:"Sem lembrete de semanas"); return; }
  if(b.hasAttribute("data-wkcfgx")){ WKCFG_OPEN=false; renderTurnbar(); return; }
  if(b.hasAttribute("data-wkreset")){ const m=A(), wid=S.week||(wkSorted().pop()||{}).id; m.wkBase=((m.wkBase||[]).filter(x=>x!==wid)).concat(wid); delete c.base; c.manter=false; save(); renderAll(); toast(`Contagem de ${first(m.name)} recomeçada: esta semana é a S1. As anteriores continuam com o número delas.`); return; }
  if(b.hasAttribute("data-wkkeep")){ c.manter=b.dataset.wkkeep==="1"; save(); renderAll(); toast(c.manter?"Lembrete pausado: a contagem segue":"Lembrete ligado de novo"); return; } });
document.addEventListener("change",e=>{ if(!(e.target.matches&&e.target.matches("[data-wkname]"))) return; const w=S.weeks.find(x=>x.id===e.target.dataset.wkname); if(!w) return; const v=e.target.value.trim(); if(v) w.nome=v; else delete w.nome; save(); setTimeout(()=>{ renderTurnbar(); renderSessao(); },0); });
document.addEventListener("change",e=>{ if(!(e.target.matches&&e.target.matches("[data-wkalert]"))) return; const c=wkCfg(); c.alerta=Math.max(0,Math.min(99,parseInt(e.target.value,10)||0)); c.manter=false; save(); setTimeout(renderAll,0); toast(c.alerta?`Vou lembrar ao chegar em ${c.alerta} semanas`:"Sem lembrete de semanas"); });
function newWeekNow(){ const last=S.weeks.slice().sort((a,b)=>a.start<b.start?-1:1).pop(); const nw={id:nid(),n:last.n+1,start:addDays(last.start,7)};
  const src=S.days[last.id]||{}; const dst=S.days[nw.id]={}; Object.keys(src).forEach(s2=>{ dst[s2]={}; Object.keys(src[s2]).forEach(dy=>{ const c=cloneDay(src[s2][dy],true); c.cardio={...c.cardio,pse:""}; dst[s2][dy]=c; }); });
  S.weeks.push(nw); fillWeekByLtr(nw.id);
  S.week=nw.id; armNewWeek=false; save(); toast(`Semana ${nw.n} criada. Escolha repetir o treino anterior ou só visualizar`); return nw; }
function autoWeekTick(){ if(!S||!S.weeks) return; const cur=S.week; const r=autoWeek(); if(r.made){ const wasLast=!cur||S.weeks.findIndex(x=>x.id===cur)===S.weeks.length-2; if(wasLast) S.week=r.w.id; save(); renderAll(); } }
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") autoWeekTick(); });
setInterval(autoWeekTick,10*60*1000);
function autoToday(){
  const now=new Date(); const wd=(now.getDay()+6)%7;
  const r=autoWeek(); const w=r.w;
  S.day=DAYS[wd];
  if(w) S.week=w.id;
  const hm=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0");
  const sl=slotsMerged(S.day); if(sl.length){ const cur=sl.filter(x=>x.t<=hm).pop()||sl[0]; S.slot=cur.id; if(cur.ids[0]) S.active=cur.ids[0]; }
}
let AUTO_SLOT_LAST=null;
function autoSlotTick(){ try{ if(!S||!S.weeks) return; const now=new Date(); const wd=(now.getDay()+6)%7; if(S.day!==DAYS[wd]) return;
  const hm=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0"); const sl=slotsMerged(S.day); const cur=sl.filter(x=>x.t<=hm).pop(); if(!cur) return;
  if(AUTO_SLOT_LAST===null){ AUTO_SLOT_LAST=cur.id; return; } if(AUTO_SLOT_LAST===cur.id) return; AUTO_SLOT_LAST=cur.id;
  if(S.slot===cur.id||cur.ids.includes(S.active)) return; const nm=cur.ids.map(id=>{ const m=S.students.find(x=>x.id===id); return m? first(m.name) : ""; }).filter(Boolean).join(" e ");
  const ae=document.activeElement; if(ae&&ae.matches&&ae.matches("input,textarea,select")){ toast(`${cur.t}: horário de ${nm}. Abra em Ver os alunos do dia.`); return; }
  const w=S.weeks.find(x=>x.id===S.week); const d=w&&dayOf(w.id,S.active,S.day); if(d&&d.ini&&!d.done&&!d.pz){ toast(`${cur.t}: horário de ${nm}. O treino atual continua; abra em Ver os alunos do dia.`); return; }
  S.slot=cur.id; if(cur.ids[0]) S.active=cur.ids[0]; save(); if(CUR_TAB==="sessao") renderAll(); toast(`${cur.t} · agora: ${nm}`); }catch(_){} }
setInterval(autoSlotTick,30000); setTimeout(autoSlotTick,4000);
let TEC_MODE=false; let sesMode="lancar", armNewWeek=false, armAct=null, metasOpen=null, ROWDEL_ARM=null, ROWDEL_T=null;
function pillCls(v,[a,b]){ if(!v) return ""; return statusOf(v,[a,b]); }
function ebar(label,val,target,right,cls,over){
  const pct= target? Math.min(val/target,1)*100 : (val?100:0);
  return `<div class="ebar ${cls}"><div class="ebar-top"><span>${label}</span><b class="num ${over?"over":""}">${right}</b></div><div class="etrack"><i style="width:${pct}%"></i></div></div>`;
}
const LETRAS=["A","B","C","D","E"]; const LTR_ALL=[...LETRAS,"FB"];
/* Programação da semana: cada aluno tem a letra (A–E) de cada dia e o bloco de X semanas.
   Sem programação salva, vale o automático: A, B, C… na ordem dos dias de treino. */
const PDAYS=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
function autoMap(st){ const td=DAYS.filter(d=>trainDays(st).includes(d)); const days=td.length?td:["Seg","Ter","Qua","Qui","Sex"]; const map={}; days.forEach((d,i)=>map[d]=LETRAS[i%LETRAS.length]); return map; }
function progOf(st){ return st&&st.prog&&st.prog.map? st.prog : {map:st?autoMap(st):{},weeks:4,auto:true}; }
function progLtr(sid,day){ return progOf(stById(sid)).map[day]||""; }
function ltrOf(sid,wid,day,d){ if(d===undefined) d=dayOf(wid,sid,day); if(d&&d.ltr!=null) return d.ltr; return progLtr(sid,day); }
const wkStart=wid=>{ const w=S.weeks.find(x=>x.id===wid); return w?w.start:null; };
function blockInfo(st,wid){ const p=progOf(st); if(p.auto||!p.start) return null; const ws=wkStart(wid||S.week); if(!ws) return null;
  const n=Math.round((new Date(ws+"T12:00:00")-new Date(p.start+"T12:00:00"))/(7*864e5))+1; const N=+p.weeks||0;
  return {n,N,start:p.start,end:N?addDays(p.start,7*N-3):null,over:N>0&&n>N,before:n<1}; }
/* Referência anterior: busca o último treino da mesma letra, sem voltar para antes do início do bloco atual. Sem letra, usa o mesmo dia da semana passada. */
const byDia=sid=>{ const st=stById(sid); return !!(st&&st.prog&&st.prog.by==="dia"); };
/* a letra fica gravada no dia assim que ele é treinado: mudar a programação depois não muda o passado */
function freezeLtr(sid,wid,day){ const d=dayOf(wid,sid,day); if(d&&d.ltr==null&&dayHasData(d)&&!d.cp){ const L=progLtr(sid,day); if(L){ d.ltr=L; return true; } } return false; }
function freezeAll(){ let ch=false; Object.keys(S.days||{}).forEach(wid=>Object.keys(S.days[wid]||{}).forEach(sid=>{ if(!stById(sid)) return; Object.keys(S.days[wid][sid]||{}).forEach(dy=>{ if(freezeLtr(sid,wid,dy)) ch=true; }); })); return ch; }
function prevRef(sid,wid,day){ wid=wid||S.week; day=day||S.day;
  const L=ltrOf(sid,wid,day); const wi=S.weeks.findIndex(w=>w.id===wid);
  if(L&&!byDia(sid)){ const p=progOf(stById(sid)); const curDate=addDays(wkStart(wid),DAYS.indexOf(day)); const bs= !p.auto&&p.start&&curDate>=p.start? p.start : "";
    for(let i=wi;i>=0;i--){ const w=S.weeks[i]; const lim= i===wi? DAYS.indexOf(day) : DAYS.length;
      for(let j=lim-1;j>=0;j--){ const dy=DAYS[j]; const date=addDays(w.start,j); if(bs&&date<bs) return null;
        const d=dayOf(w.id,sid,dy); if(d&&dayHasData(d)&&ltrOf(sid,w.id,dy,d)===L&&(!d.cp||d.done||d.ini||d.presOk)) return {d,wid:w.id,day:dy,date,ltr:L}; } }
    return null; }
  let pw=prevWeekId(wid), firstD=null, firstW=null;
  while(pw){ const d=dayOf(pw,sid,day); const w=S.weeks.find(x=>x.id===pw); if(d&&!firstD){ firstD=d; firstW=w; }
    if(d&&dayHasData(d)&&(!d.cp||d.done||d.ini||d.presOk)) return {d,wid:pw,day,date:addDays(w.start,DAYS.indexOf(day)),ltr:""}; pw=prevWeekId(pw); }
  return firstD? {d:firstD,wid:firstW.id,day,date:addDays(firstW.start,DAYS.indexOf(day)),ltr:""} : null;
}
/* Troca de letra: o dia ainda não treinado recebe os exercícios e cargas do último treino daquela letra */
const LTR_UNDO={};
function fillByLtr(sid,wid,day,force,clearLtr){ if(byDia(sid)) return null; let d=dayOf(wid,sid,day); const real=d&&dayHasData(d)&&!d.cp; if(real&&!force) return null;
  if(clearLtr&&d) delete d.ltr;
  const L=ltrOf(sid,wid,day,d); if(!L) return null; const ref=prevRef(sid,wid,day); if(!ref&&!d) return null;
  if(real) LTR_UNDO[wid+"|"+sid+"|"+day]=JSON.parse(JSON.stringify(S.days[wid][sid][day]));
  const W=S.days[wid]=S.days[wid]||{}, P=W[sid]=W[sid]||{}; const keep=d&&d.ltr;
  const c= ref? cloneDay(ref.d,true) : emptyDay(); if(ref) c.cardio={...c.cardio,pse:""}; else c.cp=1; if(keep!=null) c.ltr=keep; P[day]=c; return ref||false; }
function refTxt(sid){ const L=ltrOf(sid,S.week,S.day); if(!L) return "semana passada"; const r=prevRef(sid); return r? `Treino ${L} anterior (${r.day} ${ddmm(r.date)})` : `Treino ${L} anterior`; }
const tname=L=> LTR_ALL.includes(L)? `Treino ${L}` : L;
let ltrEdit=null, cz2Open=null; const LTR_HIDE={};
const CZF=["tipo","met","t","z","v","pse"];
function cardioN(C){ let n=Math.max(1,+C.n||1); for(let k=2;k<=12;k++) if(CZF.some(f=>C[f+k]!=null&&C[f+k]!=="")) n=Math.max(n,k); return n; }
/* Treinos com nome próprio (ex.: MMSS na reposição) ficam salvos como botões */
function ltrMine(){ return ((S.brand||{}).ltrMine||[]).filter(x=>x&&!LTR_ALL.includes(x)); }
function ltrAddMine(v){ v=String(v||"").trim().slice(0,14); if(!v||LTR_ALL.includes(v)) return; const L=ltrMine(); if(L.includes(v)) return; S.brand=Object.assign({},S.brand||{},{ltrMine:[...L,v].slice(-12)}); }
function ltrPickHTML(m,d){ const L=ltrOf(m.id,S.week,S.day,d); const r=L? prevRef(m.id) : null; const p=progOf(m); const pl=p.map[S.day]||""; const bi=blockInfo(m); const custom=L&&!LTR_ALL.includes(L); const w=curWkPlan(m);
  const src= d&&d.ltr!=null&&pl&&d.ltr!==pl? `<span class="ltr-chg">Trocado só neste dia (Programação: Treino ${pl})</span>` : "";
  const blk= bi&&!bi.before? (bi.over? `<p class="blk-over">⚠ As ${bi.N} semanas deste treino terminaram. Monte o treino novo e, na Programação, escolha em <b>a partir de</b> a semana em que ele começa.</p>` : `<span class="blk-n">Semana ${bi.n} de ${bi.N}${w?` · ${planTxt(w)}`:""}</span>`) : "";
  return `<div class="ltrbox"><span class="ltr-q">Qual treino é hoje?</span><button class="ltrx" data-ltrx aria-label="Fechar">✕</button>
    <div class="phmini ltrpick" role="group" aria-label="Treino de ${esc(first(m.name))}">${LTR_ALL.map(x=>`<button style="--pc:var(--accent)" data-setltr="${x}" ${x==="FB"?'title="Full body"':""} aria-pressed="${x===L}">${x}</button>`).join("")}${ltrMine().map(x=>`<span class="ltrmy"><button style="--pc:var(--accent)" data-setltr="${esc(x)}" aria-pressed="${x===L}">${esc(x)}</button><button class="ltrdel" data-ltrdel="${esc(x)}" aria-label="Tirar ${esc(x)} da lista">×</button></span>`).join("")}<input class="inp ltr-txt" data-ltrtxt id="lt-${m.id}" value="${custom&&!ltrMine().includes(L)?esc(L):""}" placeholder="ou crie outro: ex. Push, Legs..."></div>
    <div class="ltrwk">${wkRepOnly("ltrwkr")}<small class="muted">Repete a <b>semana inteira</b> (todos os dias). Para repetir só esta letra, use <b>Repetir por: Letra</b>.</small></div>
    <div class="ltrtools"><button class="btn small" data-vwltrs="${m.id}">Ver os treinos A, B, C…</button><span class="ltrby">Repetir por: <button data-ltrby="letra" aria-pressed="${!byDia(m.id)}">Letra</button><button data-ltrby="dia" aria-pressed="${byDia(m.id)}">Dia da semana</button></span><button class="btn small ltrmv ${mvOpen===m.id?"on":""}" data-mvopen>↔ Mover este treino para outro dia</button></div>
    ${mvOpen===m.id? mvHTML(m,S.weeks.find(x=>x.id===S.week),sesMembers().filter(o=>o!==m)) : ""}
    <div class="ltrnewrow"><span>Ou comece um treino novo (o antigo fica no Histórico):</span><div>${["A","B","C","D","E",...ltrMine()].map(x=>`<button data-ltrnew="${esc(x)}">＋ Novo ${esc(x)}</button>`).join("")}</div></div>
    <p class="ltrnote">${blk}${L? (r? `Comparando com o <b>${esc(tname(L))}</b> de ${DAY_N[r.day].toLowerCase()}, ${ddmm(r.date)}.` : `Primeiro <b>${esc(tname(L))}</b> registrado: ele vira a referência do próximo.`) : `Escolha o treino para comparar com o último igual. Sem escolher, compara com o mesmo dia da semana passada.`} ${src}</p></div>`; }
function prevDayTot(sid){ const r=prevRef(sid); return r? totDay(r.d) : null; }
function deltaTxt(a,b){ if(!b) return ""; const p=Math.round((a-b)/b*100); return `${p>0?"+":""}${p}%`; }
const REG_LIT={MMSS:[30,60],MMII:[30,60],Core:[4,10]};
const REG_COL={MMSS:"#2F6FE4",MMII:"#D03A2F",Core:"#D9A400"};
const REG_DK={MMSS:"#1B3F8F",MMII:"#8E1F17",Core:"#7A5A00"};
function weekRegMG(m,wid){ const o={MMSS:{t:0,G:0,P:0,RG:0,RP:0},MMII:{t:0,G:0,P:0,RG:0,RP:0},Core:{t:0,R:0}};
  DAYS.forEach(dy=>{ const d=dayOf(wid||S.week,m.id,dy); if(!isReal(d)) return; d.rows.forEach(r=>{ if(r.cp) return; const sv=num(r.a.s)+subsOf(r).reduce((t,x)=>t+num(x.s),0); if(!sv||!(r.n1||"").trim()) return; const R=rowReg(r,"a"); const rv=(num(r.a.s)*num(r.a.r)+subsOf(r).reduce((t,x)=>t+num(x.s)*num(x.r),0))*uf(r); o[R].t+=sv;
    if(R==="Core"){ o.Core.R+=rv; return; } const z=rowSz(r,R); if(z){ o[R][z]+=sv; o[R]["R"+z]+=rv; } }); });
  return o; }
function volWeekHTML(m){ const V=weekRegMG(m); const W=totWeek(S.week,m.id); const g=tg(m); const goal=g.cardio||150; const eq=Math.round(W.eq||0);
  const mx0=Math.max(30,V.MMSS.G,V.MMII.G,V.MMSS.P,V.MMII.P,V.Core.t); const step=mx0<=40?10:20; const mx=Math.ceil(mx0/step)*step+step/2;
  const cmx=Math.max(goal,eq)*1.15;
  const Wd=330,H=150,pl=22,pt=14,pb=44; const ih=H-pt-pb; const y=v=>pt+ih*(1-Math.min(v,mx)/mx); const yc=v=>pt+ih*(1-Math.min(v,cmx)/cmx);
  /* 6 colunas + respiro entre grupos */
  const X=[0,1,2.45,3.45,4.9,6.35], tot=7.35, cw=(Wd-pl-2)/tot, cx=i=>pl+cw*(X[i]+.5), bw=8;
  let gr=""; for(let v=0;v<=mx;v+=step) gr+=`<line x1="${pl}" x2="${pl+cw*6.12}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="${v?0.5:1}"/><text x="${pl-4}" y="${y(v)+3.5}" text-anchor="end" font-size="9.5" fill="var(--muted)">${v}</text>`;
  gr+=`<line x1="${pl+cw*6.12}" x2="${Wd-2}" y1="${pt+ih}" y2="${pt+ih}" stroke="var(--line)" stroke-width="1"/>`;
  [2.22,4.67,6.12].forEach(k=>{ gr+=`<line x1="${pl+cw*k}" x2="${pl+cw*k}" y1="${pt-4}" y2="${H-4}" stroke="var(--line)" stroke-width="0.6"/>`; });
  const bar=(i,v,col,yy,u)=>{ const f=yy||y; return `<rect x="${cx(i)-bw/2}" y="${f(v)}" width="${bw}" height="${Math.max(pt+ih-f(v),0)}" rx="1.5" fill="${col}"/><text x="${cx(i)}" y="${f(v)-3.5}" text-anchor="middle" font-size="10" fill="var(--fg)">${v}${u||""}</text>`; };
  const lab=(i,t,col)=>`<text x="${cx(i)}" y="${pt+ih+12}" text-anchor="middle" font-size="9.5" font-weight="700" fill="${col}">${t}</text>`;
  const grp=(a,b,t1,t2)=>{ const x=(cx(a)+cx(b))/2; return `<text x="${x}" y="${pt+ih+26}" text-anchor="middle" font-size="9.5" fill="var(--muted)">${t1}</text><text x="${x}" y="${pt+ih+38}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--fg)">${t2}</text>`; };
  const ref=`<line x1="${cx(0)-cw*.45}" x2="${cx(1)+cw*.45}" y1="${y(30)}" y2="${y(30)}" stroke="var(--ok)" stroke-width="1" stroke-dasharray="4 3"/>`;
  const gl=`<line x1="${cx(5)-cw*.45}" x2="${cx(5)+cw*.45}" y1="${yc(goal)}" y2="${yc(goal)}" stroke="var(--ok)" stroke-width="1" stroke-dasharray="3 3"/><text x="${cx(5)+cw*.45}" y="${yc(goal)-3}" text-anchor="end" font-size="8.5" fill="var(--ok)">meta ${goal}'</text>`;
  const body=ref+gl+bar(0,V.MMSS.G,REG_COL.MMSS)+bar(1,V.MMII.G,REG_COL.MMII)+bar(2,V.MMSS.P,REG_COL.MMSS)+bar(3,V.MMII.P,REG_COL.MMII)+bar(4,V.Core.t,REG_COL.Core)+bar(5,eq,"var(--ok)",yc,"'")
    +lab(0,"MMSS",REG_COL.MMSS)+lab(1,"MMII",REG_COL.MMII)+lab(2,"MMSS",REG_COL.MMSS)+lab(3,"MMII",REG_COL.MMII)+lab(4,"Core",REG_COL.Core)+lab(5,"Semana","var(--ok)")
    +grp(0,1,"Séries","Musc. Grandes")+grp(2,3,"Séries","Musc. Pequenos")+grp(4,4,"Séries","Core")+grp(5,5,"Cardio","Min");
  return `<div class="vw"><span class="label">Séries da semana</span>
    <svg viewBox="0 0 ${Wd} ${H}" width="100%" role="img" aria-label="Séries da semana: grandes MMSS ${V.MMSS.G}, MMII ${V.MMII.G}; pequenos MMSS ${V.MMSS.P}, MMII ${V.MMII.P}; core ${V.Core.t}; cardio ${eq} de ${goal} minutos">${gr}${body}</svg>
    <p class="vw-note">Tracejado verde: nos grandes, 30 séries (10 por músculo grande); no cardio, a meta da semana (zonas 4 e 5 contam em dobro). O cardio tem escala própria, em minutos.</p></div>`; }
function divDayHTML(m){ const L=ltrOf(m.id,S.week,S.day); const sp=L&&(progOf(m).split||{})[L]; if(!sp||!Object.keys(sp).length) return "";
  return `<p class="ctl-div"><b>Divisão sugerida · Treino ${L}:</b> ${Object.entries(sp).map(([k,n])=>`${MUSCLES[k].n} ${n}`).join(" · ")}</p>`; }
function tonSplitHTML(T){ const ks=["MMSS","MMII","Core"].filter(k=>T.reg[k].t>0||(k==="Core"&&T.reg.Core.s>0)); if(!ks.length) return "";
  return `<span class="tonsp">${ks.map(k=>`<span style="--c:${REG_COL[k]}"><i></i>${k} <b class="num">${nf(T.reg[k].t)} kg</b></span>`).join("")}</span>`; }
const SZ_DEF={MMSS:{G:[6,10],P:[3,6]},MMII:{G:[6,10],P:[2,4]}};
function szOf(g){ let z=g.sz; if(!z||z.G){ z=JSON.parse(JSON.stringify(SZ_DEF)); g.sz=z; } return z; }
function szDay(m){ const d=dayOf(S.week,m.id,S.day); const o={MMSS:{G:0,P:0},MMII:{G:0,P:0}}; if(!d) return o; d.rows.forEach(r=>{ if(!(r.n1||"").trim()) return; const R=rowReg(r,"a"); if(R==="Core") return; const z=rowSz(r,R); if(!z) return; o[R][z]+=num(r.a.s)+subsOf(r).reduce((t,x)=>t+num(x.s),0); }); return o; }
function szBarsHTML(m){ const g=tg(m); if(!g.useZ) return ""; const Z=szOf(g), D=szDay(m);
  return ["MMSS","MMII"].map(R=>`<div class="rgrp zb" style="--bar:${REG_COL[R]}"><span class="rtag r-${R}" style="color:${REG_COL[R]}">${regIcon(R)}<span>${R} · grandes e pequenos</span></span>${["G","P"].map(k=>ebar(k==="G"?"Grandes":"Pequenos",D[R][k],Z[R][k][1],`${D[R][k]}/${Z[R][k][0]}–${Z[R][k][1]}`,"e-z",D[R][k]>Z[R][k][1])).join("")}</div>`).join(""); }
function ctlView(){ return (S.ui&&S.ui.ctlV)||"bar"; }
function ctlZoom(){ return (S.ui&&S.ui.ctlZ)||0.85; }
function ctlSumHTML(T){ return `<div class="ctlsum">${REG.map(k=>`<span style="--c:${REG_COL[k]}"><i></i><b>${T.reg[k].e}</b> exerc. ${k}</span>`).join("")}${T.cmin?`<span style="--c:var(--ok)"><i></i><b>${T.cmin}</b> min cardio</span>`:""}</div>`; }
function ctlHeadHTML(m){ return `<div class="ctl-h"><span class="label">Controle da sessão · ${DAY_N[S.day]}${ltrOf(m.id,S.week,S.day)?` · ${tname(ltrOf(m.id,S.week,S.day))}`:""}</span><button class="linkbtn" data-metas>🎯 Editar metas</button></div>`; }
function colChartHTML(T){ const M=[["Exercícios",k=>T.reg[k].e,""],["Séries",k=>T.reg[k].s,""],["Repetições",k=>T.reg[k].r,""],["Tonelagem",k=>T.reg[k].t," kg"]];
  const W=330,H=150,pt=16,pb=30,ih=H-pt-pb,gw=W/4,bw=16;
  let sv=""; M.forEach(([lab,f,u],gi)=>{ const mx=Math.max(1,...REG.map(f)); const x0=gi*gw+gw/2-(bw*1.5+4);
    REG.forEach((k,i)=>{ const v=f(k), h=ih*v/mx, x=x0+i*(bw+4), y=pt+ih-h; sv+=`<rect x="${x}" y="${y}" width="${bw}" height="${Math.max(h,0)}" rx="2" fill="${REG_COL[k]}"/><text x="${x+bw/2}" y="${y-3}" text-anchor="middle" font-size="9" fill="var(--fg)">${v?nf(v):""}</text>`; });
    sv+=`<text x="${gi*gw+gw/2}" y="${H-12}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">${lab}</text>`; if(gi) sv+=`<line x1="${gi*gw}" x2="${gi*gw}" y1="${pt-6}" y2="${H-6}" stroke="var(--line)" stroke-width=".6"/>`; });
  sv+=`<line x1="0" x2="${W}" y1="${pt+ih}" y2="${pt+ih}" stroke="var(--line)"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Gráfico da sessão por região">${sv}</svg><p class="ctlleg">${REG.map(k=>`<span style="--c:${REG_COL[k]}"><i></i>${k}</span>`).join("")} · cada grupo tem a própria escala</p>`; }
function pieSVG(vals,cols,lab){ const tot=vals.reduce((a,b)=>a+b,0); const R=38,C=2*Math.PI*R; let off=0, sv="";
  if(!tot) sv=`<circle cx="50" cy="50" r="${R}" fill="none" stroke="var(--line)" stroke-width="16"/>`;
  else vals.forEach((v,i)=>{ if(!v) return; const L=C*v/tot; sv+=`<circle cx="50" cy="50" r="${R}" fill="none" stroke="${cols[i]}" stroke-width="16" stroke-dasharray="${L} ${C-L}" stroke-dashoffset="${-off}" transform="rotate(-90 50 50)"/>`; off+=L; });
  return `<figure class="pief"><svg viewBox="0 0 100 100" width="96" height="96">${sv}<text x="50" y="54" text-anchor="middle" font-size="13" font-weight="800" fill="var(--fg)">${nf(tot)}</text></svg><figcaption>${lab}</figcaption><small>${vals.map((v,i)=>tot&&v?`<span style="color:${cols[i]}">${Math.round(v/tot*100)}%</span>`:"").filter(Boolean).join(" · ")}</small></figure>`; }
function pieChartHTML(m,T){ const C=REG.map(k=>REG_COL[k]); const g=tg(m); let z="";
  if(g.useZ){ const D=szDay(m); z=pieSVG([D.MMSS.G,D.MMSS.P,D.MMII.G,D.MMII.P],["#2F6FE4","#8FB3F2","#D03A2F","#EFA39C"],"Séries grandes/pequenos"); }
  return `<div class="pies">${pieSVG(REG.map(k=>T.reg[k].e),C,"Exercícios")}${pieSVG(REG.map(k=>T.reg[k].s),C,"Séries")}${pieSVG(REG.map(k=>T.reg[k].t),C,"Tonelagem (kg)")}${z}</div><p class="ctlleg">${REG.map(k=>`<span style="--c:${REG_COL[k]}"><i></i>${k}</span>`).join("")}</p>`; }
function ctlHTML(m,T){ const v=ctlView(); if(v==="bar") return ctlBarsHTML(m,T);
  return `${divDayHTML(m)}${ctlHeadHTML(m)}${ctlSumHTML(T)}${v==="col"? colChartHTML(T) : pieChartHTML(m,T)}<div class="ctl-foot"><span>Tonelagem total do treino: <b class="num">${nf(T.t)} kg</b></span>${T.cmin?`<span>Cardio <b class="num">${T.cmin} min</b></span>`:""}</div>`; }
function ctlBarsHTML(m,T){
  const g=tg(m); const P=prevDayTot(m.id); const uph=usesPh(m)||!!m.tgCustom;
  const ks=["MMSS","MMII","Core"].filter(k=>T.reg[k].s>0||T.reg[k].r>0);
  if(!uph) return `${divDayHTML(m)}${ctlSumHTML(T)}<div class="ctl-h"><span class="label">Controle da sessão · ${DAY_N[S.day]}${ltrOf(m.id,S.week,S.day)?` · ${tname(ltrOf(m.id,S.week,S.day))}`:""}</span><button class="linkbtn" data-metas>${metasOpen===m.id?"✕ Fechar metas":"🎯 Editar metas"}</button></div>
  <div class="ctlgrid" style="--n:${Math.max(1,ks.length)}">${ks.length? ks.map(k=>{ const t=T.reg[k]; const pr=P?P.reg[k]:{s:0,r:0,t:0}; const cmp=(v,b,lab,cls)=>{ const f=x=>lab==="Tonelagem"?nf(x)+" kg":nf(x); return ebar(lab,v,Math.max(v,b||0)||1,`${f(v)}${b?` <small>último: ${f(b)}</small>`:""}`,cls,false); };
    return `<div class="rgrp"><span class="rtag r-${k}" title="${REG_LABEL[k]}">${regIcon(k)}<span>${REG_LABEL[k]}</span></span>${cmp(t.e,0,"Exercícios","e-x")}${cmp(t.s,pr.s,"Séries","e-s")}${cmp(t.r,pr.r,"Reps","e-r")}${cmp(t.t,pr.t,"Tonelagem","e-t")}</div>`; }).join("")
    : `<p class="muted" style="font-size:13px">As barras aparecem quando você lançar o primeiro exercício. Elas comparam com o último treino igual.</p>`}
  <div class="ctl-foot"><span>Tonelagem total do treino: <b class="num">${nf(T.t)} kg</b></span>${tonSplitHTML(T)}${T.cmin?`<span>Cardio <b class="num">${T.cmin} min</b></span>`:""}</div></div>
  ${num(g.cardioDia)?`<div class="rgrp"><span class="rtag" style="color:var(--ok)">♥<span>Cardio do dia</span></span>${ebar("Minutos",T.cmin||0,g.cardioDia,`${T.cmin||0}/${g.cardioDia} min`,"e-c",false)}</div>`:""}`;
  return `${divDayHTML(m)}${ctlSumHTML(T)}<div class="ctl-h"><span class="label">Controle da sessão · ${DAY_N[S.day]}${ltrOf(m.id,S.week,S.day)?` · Treino ${ltrOf(m.id,S.week,S.day)}`:""}</span><button class="linkbtn" data-metas>${metasOpen===m.id?"✕ Fechar metas":"🎯 Editar metas"}</button></div>
  <div class="ctlgrid" style="--n:${Math.max(1,ks.length)}">${ks.length? ks.map(k=>{ const t=T.reg[k]; const pt=P?P.reg[k].t:0; return `<div class="rgrp">${ks.length>1||k!=="MMSS"||true?`<span class="rtag r-${k}" title="${REG_LABEL[k]}">${regIcon(k)}<span>${REG_LABEL[k]}</span></span>`:""}
    ${(()=>{ const X=exGoal(m); const gg=tg(m); if(k==="Core"&&!(X.use&&m.tgCustom&&gg.ex&&gg.ex.Core)) return ""; const [a,b]=X.get(k); return X.use? ebar("Exercícios",t.e,b,`${t.e}/${a}–${b}`,"e-x",t.e>b) : ebar("Exercícios",t.e,t.e,String(t.e),"e-x",false); })()}
    ${ebar("Séries",t.s,g[k].s[1],`${t.s}/${g[k].s[0]}–${g[k].s[1]}`,"e-s",t.s>g[k].s[1])}
    ${(m.tgCustom? !!g.useR : true)? ebar("Reps",t.r,g[k].r[1],`${nf(t.r)}/${g[k].r[1]}`,"e-r",t.r>g[k].r[1]) : ebar("Reps",t.r,t.r,nf(t.r),"e-r",false)}
    ${ebar("Tonelagem",t.t,t.t,`${nf(t.t)} kg`,"e-t",false)}</div>`; }).join("")
    : `<p class="muted" style="font-size:13px">As barras aparecem quando você lançar o primeiro exercício.</p>`}
  <div class="ctl-foot"><span>Tonelagem total do treino: <b class="num">${nf(T.t)} kg</b></span>${tonSplitHTML(T)}${T.cmin?`<span>Cardio <b class="num">${T.cmin} min</b>${T.cv?` · ${String(T.cv).replace(".",",")} km/h`:""}</span>`:""}${T.wmin?`<span>WOD <b class="num">${T.wmin} min</b></span>`:""}</div></div>
  ${szBarsHTML(m)}
  ${num(g.cardioDia)?`<div class="rgrp"><span class="rtag" style="color:var(--ok)">♥<span>Cardio do dia</span></span>${ebar("Minutos",T.cmin||0,g.cardioDia,`${T.cmin||0}/${g.cardioDia} min`,"e-c",false)}</div>`:""}`;
}
/* ---------- Relatório para o aluno ---------- */

/* Gasto calórico estimado (faixa). METs do Compendium; esteira/corrida pelas equações do ACSM. */
const ZONE_MET={1:3,2:4.5,3:6,4:8,5:10};
function kcalDay(m,d,T){
  const w=num(m.peso); if(!w||!d) return null;
  const kpm=met=>met*3.5*w/200;
  let lo=0, hi=0;
  if(T.s){ const min=T.s*(40+restSec(m))/60; lo+=kpm(3.5)*min; hi+=kpm(5)*min; }
  if(T.cmin){ let met;
    if(T.cv){ const v=T.cv*1000/60; met=(T.cv<7? 0.1*v+3.5 : 0.2*v+3.5)/3.5; lo+=kpm(met*0.9)*T.cmin; hi+=kpm(met*1.1)*T.cmin; }
    else { met=ZONE_MET[T.cz]||4.5; lo+=kpm(met*0.85)*T.cmin; hi+=kpm(met*1.15)*T.cmin; } }
  if(T.wmin){ lo+=kpm(6)*T.wmin; hi+=kpm(9)*T.wmin; }
  if(!hi) return null;
  const r10=x=>Math.round(x/10)*10; return {lo:r10(lo),hi:r10(hi)};
}
function kcalWeek(m,wid){ let lo=0,hi=0,any=false; DAYS.forEach(dy=>{ const d=dayOf(wid,m.id,dy); if(!dayHasData(d)) return; const k=kcalDay(m,d,totDay(d)); if(k){ lo+=k.lo; hi+=k.hi; any=true; } }); return any?{lo,hi}:null; }
const KCAL_NOTE="É só uma estimativa e pode variar um pouco para mais ou para menos! O que transforma é a constância nos treinos, não as calorias. E não adianta queimar tudo isso e compensar na besteira depois 😉";
const kcalTxt=k=> k? `~${nf(Math.round((k.lo+k.hi)/2/10)*10)} kcal` : "";
/* Frases do Tio Má */
const BR_TXT=window.RP_OWNER? {
 pMsg:"São {n} treinos comigo este mês, mas o trabalho não para aqui: faça também a sua musculação por conta própria, com o treino que está no seu aplicativo. Seus músculos respondem ao estímulo frequente, e cada sessão conta. Nos outros dias, mexa o corpo: caminhada, bicicleta, escada.\n\nA musculação mantém seus músculos fortes e faz a perda de gordura durar. O cardio e o movimento do dia a dia aumentam o gasto. Juntos, o resultado vem e fica.",
 pGold:"Seu eu do futuro vai se orgulhar.",
 pFim:"Seu corpo se adapta ao que você repete. Cada treino é um recado para ele.",
 fOk:"Parabéns, {nome}! Você completou todos os treinos do mês comigo. Vamos continuar com esse foco e essa constância: é isso que traz resultado.",
 fNo:"Parabéns por ter dado o seu máximo, {nome}! Lembre: é insistir e se esforçar, e o seu eu do futuro vai agradecer. O importante é não desistir e se reajustar para o próximo mês!",
 regra:"Para a aula ser reposta, a falta precisa ser avisada com pelo menos 1 hora de antecedência (30 minutos para os horários das 5:00 e 5:30), ou a aula ter sido desmarcada por mim. Caso contrário, infelizmente ela é considerada aula dada, por conta da minha programação semanal.",
 q5:"gratis",
 q5Txt:"Este mês você tem {aulas} a mais, sem nenhum custo! Em contrapartida, isso compensa os dias em que eu precisar viajar ou em que não houver aula por causa de feriado. Uma mão lava a outra. 🤝"} : {pMsg:"",pGold:"",pFim:"",fOk:"",fNo:"",regra:"",q5:"gratis",q5Txt:""};
const THEMES={ouro:{n:"Preto e dourado",g:"#C9A46A",bg:"#0E0E0E",t:"#181818",b:"#16130E"},azul:{n:"Azul",g:"#5EA8FF",bg:"#0A1628",t:"#10213A",b:"#0E1C33"},verde:{n:"Verde",g:"#4CD08A",bg:"#0B1A13",t:"#12261C",b:"#0F2219"},roxo:{n:"Roxo",g:"#B794F6",bg:"#140D22",t:"#1E1531",b:"#1A122B"},rosa:{n:"Rosa",g:"#F48FB1",bg:"#1F0C16",t:"#2A1220",b:"#26101C"},vermelho:{n:"Vermelho",g:"#FF7A6B",bg:"#1A0C0B",t:"#261412",b:"#22110F"},prata:{n:"Preto e prata",g:"#C9CED6",bg:"#0E0F11",t:"#1A1C1F",b:"#16181B"}};
const repTemaK=()=>{ try{ const m=A(); if(m&&m.corP&&m.corP.tema&&THEMES[m.corP.tema]) return m.corP.tema; if(m&&m.cor&&THEMES[m.cor]) return m.cor; }catch(_){} const b=S.brand||{}; return THEMES[b.repTema]? b.repTema : "ouro"; };
const TH=()=>THEMES[repTemaK()];
const thVars=()=>{ const t=TH(); return `--g:${t.g};--pbg:${t.bg};--pt:${t.t};--pbox:${t.b}`; };
function logoHTML(){ const l=(S.brand||{}).logo; return l? `<img class="pc-img" src="${l}" alt="">` : `<span class="pc-m">${LETRA()}</span>`; }
function repLogo(){ const l=(S.brand||{}).logo; return l? `<img class="rep-img" src="${l}" alt="">` : `<span class="rep-m">${LETRA()}</span>`; }
function goBrand(){ show("relmes"); setTimeout(()=>{ const c=document.getElementById("brandCard"); if(c) c.scrollIntoView({block:"start",behavior:"smooth"}); },150); }
document.addEventListener("click",e=>{ const b=e.target.closest("[data-gobrand]"); if(b){ e.preventDefault(); goBrand(); } });
/* Entrega de arquivo: 1) compartilhar (celular) 2) baixar pelo Claude 3) mostrar a imagem para salvar com o dedo. Sempre diz o que aconteceu. */
async function offerFile(blob,name,o){ o=o||{}; let why="";
  if(o.share!==false){ try{ const f=new File([blob],name,{type:blob.type||(/\.pdf$/.test(name)?"application/pdf":/\.zip$/.test(name)?"application/zip":"image/png")});
    if(navigator.canShare&&navigator.canShare({files:[f]})){ await navigator.share({files:[f],title:name,text:o.text||""}); return "shared"; } }catch(e){ if(e&&e.name==="AbortError") return "aborted"; why="compartilhar bloqueado"; } }
  let dlx=null; try{ dlx=(window.claude&&claude.use)? await claude.use("downloads") : null; }catch(e){ dlx=null; }
  if(dlx){ try{ await dlx.save({filename:name,data:blob}); toast("Arquivo salvo ✓ "+name); return "saved"; }
    catch(e){ const c=(e&&e.code)||"erro"; if(c==="declined"){ toast("Download cancelado."); return "declined"; } if(c==="rate_limited"){ toast("Já tem um download esperando confirmação. Confirme ou cancele e toque de novo."); return "busy"; } why=erroPT(e); } }
  else why=why||"download não liberado neste acesso";
  const imgs=o.imgs||(blob.type&&blob.type.startsWith("image/")? [{src:await blobToUrl(blob),name}] : null);
  if(imgs&&imgs.length){ showImgs(imgs,(imgs.length>1?"Salvar as imagens":"Salvar a imagem"),why); return "shown"; }
  if(!o.silent) toast("Não consegui baixar aqui ("+why+")."); return "fail"; }
function blobToUrl(b){ return new Promise(r=>{ const f=new FileReader(); f.onload=()=>r(f.result); f.readAsDataURL(b); }); }
function showImgs(items,title,why){ let o=document.getElementById("imgfb");
  if(!o){ o=document.createElement("div"); o.id="imgfb"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",e=>{ if(e.target===o||e.target.closest("[data-imgfbx]")){ o.hidden=true; document.body.style.overflow=""; } }); }
  o.innerHTML=`<div class="sheet imgfb-s" role="dialog" aria-modal="true" aria-label="Salvar imagem"><div class="sheet-head"><h3>${title||"Salvar a imagem"}</h3><button class="btn small" data-imgfbx>Fechar</button></div>
    ${why?`<p class="muted" style="font-size:11.5px;margin:0 0 6px">O arquivo não pôde ser baixado direto (${esc(why)}).</p>`:""}<p class="imgfb-tip">👆 <b>Toque e segure</b> a imagem e escolha <b>Baixar imagem</b> ou <b>Compartilhar</b> (dá para mandar direto no WhatsApp do aluno).</p>
    ${items.map(i=>`<figure class="imgfb"><img src="${i.src}" alt="${esc(i.name)}"><figcaption>${esc(i.name)}</figcaption></figure>`).join("")}</div>`;
  o.hidden=false; o.scrollTop=0; }
const BR=()=>Object.assign(window.RP_OWNER? {nome:"Maílson",sub:"Personal Trainer",ass:"Prof. Maílson",lema:"Não é só o quanto você treina, é como você treina.",letra:"M",site:"coachmailson.com"} : {nome:"Seu nome",sub:"Personal Trainer",ass:"Seu personal",lema:"",letra:""},BR_TXT,S.brand||{});
const LETRA=()=> esc((BR().letra||BR().nome||"P").trim().charAt(0).toUpperCase());
const MOTTO_T=()=> BR().lema? `\n_${BR().lema}_` : "";
const MOTTO_H=()=> BR().lema? `<p class="rep-motto">“${esc(BR().lema)}”</p>` : "";
const PHRASES={
  up:["Hoje você levantou mais do que na semana passada. Isso não é sorte, é constância. Orgulho de você!",
      "Cada quilo a mais hoje é a prova de que você está mais forte do que ontem. Valeu demais ter vindo!",
      "Você superou a sua própria marca. Essa é a única competição que importa, e hoje você ganhou!",
      "Mais forte que na semana passada. O seu esforço está aparecendo, continue assim!"],
  same:["Treino feito é treino que ninguém tira de você. Parabéns pelo esforço de hoje!",
      "Nem todo dia é dia de recorde, mas todo dia que você aparece conta. Que bom que você veio!",
      "Você escolheu vir, e isso já te deixa mais forte. O resultado é a soma de dias como o de hoje.",
      "Hoje você cuidou de você. Valeu a pena cada série, pode ter certeza!"],
  first:["Primeiro registro feito! A partir de hoje, cada treino vai mostrar o quanto você evolui.",
      "Hoje começa a sua história aqui. Daqui pra frente, é só superar a você mesma(o)!"],
  week:["Mais uma semana vencida! Constância é o que transforma, e você está fazendo a sua parte.",
      "Semana entregue com esforço e dedicação. Descansa bem, que a próxima vai ser ainda melhor!",
      "Olha o quanto você levantou nesta semana! Cada treino somou. Orgulho do seu compromisso!"]
};
function pickPhrase(kind,seed){ const L=PHRASES[kind]; let h=0; for(const c of seed) h=(h*31+c.charCodeAt(0))>>>0; return L[h%L.length]; }
const FRASE_NOVO="Hoje começa a sua história aqui. Daqui pra frente, é só superar a você mesma(o)!";
const FRASE_DIA="+1 dia de investimento em você e -1 dia de sedentarismo! Seu eu do futuro sentirá orgulho e agradecerá pela sua decisão!";
function earlierSession(m,date){ return (S.weeks||[]).some(w=>DAYS.some((dy,i)=>{ const k=addDays(w.start,i); return k<date && dayHasData(dayOf(w.id,m.id,dy)); })); }
function dayPhrase(m,T,P,date){ return m.novo && !earlierSession(m,date)? FRASE_NOVO : FRASE_DIA; }
function phraseHTML(txt){ return `<div class="rep-phrase"><span class="rep-m">${LETRA()}</span><div><p>${esc(txt)}</p><span>— ${esc(BR().ass)}</span></div></div>`; }

function carsTxt(t){ return String(Math.round(t/1200*10)/10).replace(".",","); }
function cardioTxt(min,weekEq,mix){ if(!min) return ""; const songs=Math.max(1,Math.round(min/3.5)); const pct=Math.round((weekEq||min)/150*100);
  return `${min} min ${mix?"de cardio e condicionamento":"de cardio"} é como ouvir ${songs} ${songs>1?"músicas inteiras":"música inteira"} se mexendo. ${weekEq&&weekEq>min?`Na semana você já soma ${nf(weekEq)} min.`:""}`; }
function regionBoxHTML(T){
  const ks=REG.filter(k=>T.reg[k].s); if(!ks.length) return "";
  return `<div class="rep-box"><h3>Total por região</h3>${ks.map(k=>`<div class="rg"><span class="rep-reg r-${k}" title="${REG_LABEL[k]}">${regIcon(k)}</span><div class="rg-m"><b>${REG_LABEL[k]}</b><span>${T.reg[k].s} séries · ${nf(T.reg[k].r)} repetições</span></div><b class="rg-t num">${nf(T.reg[k].t)} kg</b></div>`).join("")}</div>`;
}

let repOpen=false;
let repKind="day";
function exLoads(wid,sid){
  const map={};
  DAYS.forEach(dy=>{ const d=dayOf(wid,sid,dy); if(!d) return; d.rows.forEach(r=>rowLines(r).forEach(l=>{ const n=(l.n||"").trim(); if(!n) return; const key=noAcc(n); const c=num(l.x.c); const v=vol(l.x)*(l.u||1);
    const e=map[key]||(map[key]={n,c:0,v:0,k:rowReg(r,"a")}); e.c=Math.max(e.c,c); e.v+=v; })); });
  return map;
}
function statusTag(v,lo,hi){ if(!v) return `<span class="st st-0">Sem treino</span>`; if(v<lo) return `<span class="st st-lo">Pouco</span>`; if(v>hi) return `<span class="st st-hi">Muito</span>`; return `<span class="st st-ok">Na meta</span>`; }
function musBoxHTML(m,wid){ const {v}=weekMuscles(m,wid); const groups=[["MMSS","💪"],["Core","🎯"],["MMII","🦵"]];
  const any=Object.values(v).some(x=>x>0); if(!any) return "";
  return `<div class="rep-box"><h3>Músculos trabalhados na semana</h3><p class="rep-sub">Séries por músculo. Quando um exercício ajuda outro músculo, conta meia série para ele.</p>
    ${groups.map(([R,ic])=>{ const ks=Object.keys(MUSCLES).filter(k=>MUSCLES[k].r===R&&v[k]>0); if(!ks.length) return "";
      const mx=Math.max(...ks.map(k=>v[k]),1); return `<div class="mus-g"><b style="color:${REG_COL[R]}">${ic} ${R==="MMSS"?"Membros superiores":R==="MMII"?"Membros inferiores":"Core"}</b>
      ${ks.map(k=>`<div class="mus-r"><span>${MUSCLES[k].n}</span><span class="mus-t"><i style="width:${v[k]/mx*100}%;background:${REG_COL[R]}"></i></span><b class="num">${fmt(v[k])}</b></div>`).join("")}</div>`; }).join("")}</div>`; }
function weekExHTML(m,wid){ const w=S.weeks.find(x=>x.id===wid); const days=DAYS.filter(dy=>dayHasData(dayOf(wid,m.id,dy)));
  if(!days.length) return "";
  return `<div class="rep-box"><h3>Todos os exercícios da semana</h3>${days.map(dy=>{ const d=dayOf(wid,m.id,dy); const L=ltrOf(m.id,wid,dy,d); const rows=d.rows.filter(r=>r.n1.trim()&&subUsed(r.a));
    return `<div class="wx-d"><b>${DAY_N[dy]} ${ddmm(addDays(w.start,DAYS.indexOf(dy)))}${L?` · ${esc(tname(L))}`:""}</b>${rows.map(r=>`<div class="wx-r"><span>${r.cj?"⛓ ":""}${esc(r.n1)}</span><span class="num">${esc(setTxt(r.a,0,uf(r)))}</span></div>`).join("")}${num(d.cardio.t)?`<div class="wx-r"><span>❤️ ${esc(d.cardio.tipo||"Cardio")}${wodOf(d).tipo?` · ${esc(wodOf(d).tipo)}`:""}</span><span class="num">${d.cardio.t} min</span></div>`:""}</div>`; }).join("")}</div>`; }
function weekReportHTML(m){
  const w=S.weeks.find(x=>x.id===S.week); const pw=prevWeekId(w.id); const W=totWeek(w.id,m.id); const PW=pw?totWeek(pw,m.id):null; const g=tg(m);
  const planned=trainDays(m); const done=DAYS.filter(dy=>dayHasData(dayOf(w.id,m.id,dy)));
  const ks=REG.filter(k=>W.reg[k].s||(PW&&PW.reg[k].s));
  const nSes=k=>{ const n=DAYS.filter(dy=>{ const t=W.days[dy]; return t&&t.reg[k].s>0; }).length; return n||1; };
  const shown=DAYS.filter(dy=>dy!=="Dom"||W.days.Dom.t||(PW&&PW.days.Dom.t));
  const maxD=Math.max(1,...shown.map(dy=>Math.max(W.days[dy].t,PW?PW.days[dy].t:0)));
  const L=exLoads(w.id,m.id), PL=pw?exLoads(pw,m.id):{};
  const exs=Object.entries(L).sort((a,b)=>a[1].k<b[1].k?-1:a[1].k>b[1].k?1:0);
  const dT=PW&&PW.t? deltaTxt(W.t,PW.t) : "";
  return `<div class="repcard" id="repcard">
    <div class="rep-brand">${repLogo()}<span>${esc(BR().nome).toUpperCase()} <small>${esc(BR().sub)}</small></span></div>
    <div class="rep-head"><h2>${esc(m.name)}</h2><p>Relatório da semana ${w.n} · ${ddmm(w.start)} a ${ddmm(addDays(w.start,6))}${usesPh(m)?` · ${phT(m)} · ${phaseOf(m).n}`:""}</p></div>
    ${W.t||W.eq? phraseHTML(pickPhrase(W.t&&PW&&PW.t&&W.t>PW.t?"up":"week",m.id+w.id)) : ""}
    <div class="rep-box rep-hero"><span class="rep-k">Tonelagem da semana</span><b class="rep-big num">${nf(W.t)} <small>kg</small></b>
      <span class="rep-sub">${PW&&PW.t? `Semana anterior: ${nf(PW.t)} kg · <b class="${W.t>=PW.t?"up":"down"}">${dT}</b>` : "Primeira semana registrada."}</span>
      <div class="rep-mini"><span>Treinos <b>${done.length}/${planned.length||done.length}</b></span><span>Séries <b>${W.s}</b>${PW?` <small>(${PW.s})</small>`:""}</span><span>Repetições <b>${nf(W.r)}</b>${PW?` <small>(${nf(PW.r)})</small>`:""}</span>${(()=>{ const k=kcalWeek(m,w.id); return k?`<span>🔥 Gasto estimado <b>${kcalTxt(k)}</b></span><span class="kc-note">${KCAL_NOTE}</span>`:""; })()}</div>
    </div>
    ${usesPh(m)?`<div class="rep-box"><h3>Previsto x feito</h3>
      ${ks.length? ks.map(k=>{ const n=nSes(k); const t=W.reg[k]; const sLo=g[k].s[0]*n, sHi=g[k].s[1]*n, rLo=g[k].r[0]*n, rHi=g[k].r[1]*n;
        return `<div class="pf"><div class="pf-h"><span class="rep-reg r-${k}">${regIcon(k)}</span><b>${REG_LABEL[k]}</b><small>${n} ${n>1?"sessões":"sessão"}</small></div>
          <div class="pf-row"><span>Séries</span><span class="num">${t.s}</span><span class="pf-meta">previsto ${sLo}–${sHi}</span>${statusTag(t.s,sLo,sHi)}</div>
          <div class="pf-row"><span>Repetições</span><span class="num">${nf(t.r)}</span><span class="pf-meta">previsto ${nf(rLo)}–${nf(rHi)}</span>${statusTag(t.r,rLo,rHi)}</div>
          <div class="pf-row"><span>Tonelagem</span><span class="num">${nf(t.t)} kg</span><span class="pf-meta">${PW&&PW.reg[k].t?`antes ${nf(PW.reg[k].t)} kg`:"—"}</span>${PW&&PW.reg[k].t?`<span class="st ${t.t>=PW.reg[k].t?"st-ok":"st-lo"}">${deltaTxt(t.t,PW.reg[k].t)}</span>`:"<span></span>"}</div></div>`; }).join("")
        : `<p class="rep-empty">Nenhum treino lançado nesta semana.</p>`}
      <div class="pf-row pf-c"><span>Cardio</span><span class="num">${nf(W.eq)} min</span><span class="pf-meta">previsto ${g.cardio} min</span>${statusTag(W.eq,g.cardio,99999)}</div>
      ${W.eq?`<p class="rep-sub">❤️ ${W.eq} min na semana é como ouvir ${Math.max(1,Math.round(W.eq/3.5))} músicas inteiras se mexendo.</p>`:""}
      ${W.t>=1200?`<p class="rep-sub">🚗 Na semana, ${nf(W.t)} kg: como levantar ${carsTxt(W.t)} carros populares.</p>`:""}
    </div>`:`<div class="rep-box"><div class="pf-row pf-c" style="border:0;padding:0"><span>Cardio</span><span class="num">${nf(W.eq)} min</span><span class="pf-meta">na semana</span><span></span></div>${W.eq?`<p class="rep-sub">❤️ ${W.eq} min na semana é como ouvir ${Math.max(1,Math.round(W.eq/3.5))} músicas inteiras se mexendo.</p>`:""}</div>`}
    ${S.repMus!==false? musBoxHTML(m,w.id) : ""}
    ${weekExHTML(m,w.id)}
    <div class="rep-box"><h3>Tonelagem por dia</h3>
      <div class="wbars" style="--cols:${shown.length}">${shown.map(dy=>`<div class="wbar"><span class="wv num">${W.days[dy].t?nf(W.days[dy].t):""}</span><div class="wb-area"><i class="prev" style="height:${PW?PW.days[dy].t/maxD*100:0}%"></i><i class="cur" style="height:${W.days[dy].t/maxD*100}%"></i></div><span class="wl">${dy}</span></div>`).join("")}</div>
      <div class="wlegend"><span><i class="cur"></i>Esta semana</span>${PW?`<span><i class="prev"></i>Semana anterior</span>`:""}</div>
    </div>
    ${exs.length? `<div class="rep-box"><h3>Controle de carga</h3>
      <div class="lc lc-h"><span>Exercício</span><span>Antes</span><span>Agora</span><span></span></div>
      ${exs.map(([key,e])=>{ const p=PL[key]; const d=p&&p.c? e.c-p.c : null;
        return `<div class="lc"><span class="lc-n"><span class="emo-s">${e.k==="MMII"?"🦵":e.k==="MMSS"?"💪":"•"}</span>${esc(e.n)}</span><span class="num">${p&&p.c?String(p.c).replace(".",","):"—"}</span><span class="num"><b>${e.c?String(e.c).replace(".",","):"—"}</b></span><span>${d===null?"":d>0?`<span class="st st-ok">▲ ${String(d).replace(".",",")} kg</span>`:d<0?`<span class="st st-lo">▼ ${String(-d).replace(".",",")} kg</span>`:`<span class="st st-0">=</span>`}</span></div>`; }).join("")}
      <p class="rep-sub">Maior carga usada no exercício em cada semana.</p></div>`:""}
    ${bodyBoxHTML(m)}
    ${MOTTO_H()}
  </div>`;
}
function weekReportText(m){
  const w=S.weeks.find(x=>x.id===S.week); const pw=prevWeekId(w.id); const W=totWeek(w.id,m.id); const PW=pw?totWeek(pw,m.id):null;
  const done=DAYS.filter(dy=>dayHasData(dayOf(w.id,m.id,dy))).length; const planned=trainDays(m).length||done;
  let t=`*Relatório da semana ${w.n} — ${first(m.name)}*\n${ddmm(w.start)} a ${ddmm(addDays(w.start,6))}${usesPh(m)?` · ${phT(m)}`:""}\n\n`;
  t+=`🏋️ Tonelagem: ${nf(W.t)} kg${PW&&PW.t?` (${deltaTxt(W.t,PW.t)} vs semana anterior)`:""}\n✅ Treinos: ${done}/${planned}\n🔢 Séries: ${W.s} | Repetições: ${nf(W.r)}\n`;
  if(W.eq) t+=`❤️ Cardio: ${nf(W.eq)} min\n`;
  { const k=kcalWeek(m,w.id); if(k) t+=`🔥 Gasto estimado: ${kcalTxt(k)}\n_${KCAL_NOTE}_\n`; }
  const L=exLoads(w.id,m.id), PL=pw?exLoads(pw,m.id):{}; const ups=Object.entries(L).filter(([k,e])=>PL[k]&&PL[k].c&&e.c>PL[k].c);
  if(ups.length) t+=`\n📈 Carga subiu em: ${ups.map(([k,e])=>`${e.n} (+${String(e.c-PL[k].c).replace(".",",")} kg)`).join(", ")}\n`;
  { const days=DAYS.filter(dy=>dayHasData(dayOf(w.id,m.id,dy))); if(days.length){ t+=`\n📋 *Exercícios da semana*\n`; days.forEach(dy=>{ const d=dayOf(w.id,m.id,dy); const L=ltrOf(m.id,w.id,dy,d); t+=`_${DAY_N[dy]}${L?` · ${tname(L)}`:""}_\n`; d.rows.filter(r=>r.n1.trim()&&subUsed(r.a)).forEach(r=>{ t+=`• ${r.n1.trim()}: ${setTxt(r.a,0,uf(r))}\n`; }); if(num(d.cardio.t)) t+=`• Cardio${d.cardio.tipo?` ${d.cardio.tipo}`:""}: ${d.cardio.t} min\n`; }); } }
  if(S.repMus!==false){ const {v}=weekMuscles(m,w.id); const ks=Object.keys(MUSCLES).filter(k=>v[k]>0); if(ks.length) t+=`\n💪 *Séries por músculo*\n`+ks.map(k=>`• ${MUSCLES[k].n}: ${fmt(v[k])}`).join("\n")+"\n"; }
  t+=bodyText(m);
  if(W.t||W.eq) t+=`\n💬 ${pickPhrase(W.t&&PW&&PW.t&&W.t>PW.t?"up":"week",m.id+w.id)}\n— ${BR().ass}${MOTTO_T()}`;
  return t;
}

function rowLines(row){
  const parts=String(row.n1||"").split("+").map(x=>x.trim());
  const out=[]; const nA=parts[0]||"", nB= row.conj? (parts[1]||"") : "";
  const u=uf(row); if(nA||subUsed(row.a)) out.push({n:nA,x:row.a,u});
  if(subUsed(row.b)) out.push({n:nB||nA,x:row.b,u});
  subsOf(row).forEach(x=>{ if(subUsed(x)) out.push({n:nA,x,u,sub:true}); });
  return out;
}
function prevRowVol(sid,name){ const ref=prevRef(sid); if(!ref) return 0; const d=ref.d; const r=d.rows.find(x=>noAcc(x.n1).trim()===noAcc(name).trim()); return r? rowVol(r) : 0; }
function rowVol(r){ return (vol(r.a)+vol(r.b)+subsOf(r).reduce((t,x)=>t+vol(x),0))*uf(r); }
function repColsHTML(m,rows,P){ const L=rows.map(r=>({n:r.n1||"Exercício",v:rowVol(r),pv:prevRowVol(m.id,r.n1)})).filter(x=>x.v||x.pv); if(!L.length) return "";
  const mx=Math.max(1,...L.map(x=>Math.max(x.v,x.pv))); const hasP=L.some(x=>x.pv); const ref=prevRef(m.id);
  const col=x=>`<div class="rc-c"><div class="rc-bars">${hasP?`<div class="rc-b a" style="height:${Math.max(x.pv?3:0,x.pv/mx*100)}%"></div>`:""}<div class="rc-b b" style="height:${Math.max(x.v?3:0,x.v/mx*100)}%"></div></div><span class="rc-l">${esc(x.n)}</span><span class="rc-v">${hasP?`<i>${x.pv?nf(x.pv):"–"}</i> → `:""}<b>${x.v?nf(x.v):"–"}</b></span></div>`;
  return `<div class="rep-cols"><div class="rc-t">Tonelagem por exercício (kg)</div>${hasP?`<div class="rc-leg"><span><i class="a"></i>Anterior${ref?` (${ref.day} ${ddmm(ref.date)})`:""}</span><span><i class="b"></i>Hoje</span></div>`:""}<div class="rc-grid">${L.map(col).join("")}</div></div>`; }
function paceTxt(v){ if(!v) return ""; const p=60/v; let mn=Math.floor(p), sc=Math.round((p-mn)*60); if(sc===60){ mn++; sc=0; } return `${mn}:${String(sc).padStart(2,"0")}`; }
function repCardioHTML(T,P){ if(!T.cmin||!T.cv) return ""; const pc=P&&P.cmin&&P.cv; const km=v=>Math.round(v*10)/10;
  const dT=km(T.cv*T.cmin/60), dP=pc? km(P.cv*P.cmin/60) : 0;
  const fb= pc&&P.cv!==T.cv? `<small class="${T.cv>P.cv?"up":"down"}">${T.cv>P.cv?"▲ mais rápido":"▼ mais lento"} que o anterior (${paceTxt(P.cv)} /km)</small>` : pc? `<small>= mesmo pace do anterior</small>` : "";
  const pair=(lb,a,b,u)=>{ const mx=Math.max(a,b,0.0001); return `<div class="rc-c"><div class="rc-bars">${pc?`<div class="rc-b a" style="height:${Math.max(3,a/mx*100)}%"></div>`:""}<div class="rc-b b" style="height:${Math.max(3,b/mx*100)}%"></div></div><span class="rc-l">${lb} (${u})</span><span class="rc-v">${pc?`<i>${String(a).replace(".",",")}</i> → `:""}<b>${String(b).replace(".",",")}</b></span></div>`; };
  return `<div class="rep-pace"><span>Pace</span><b class="num">${paceTxt(T.cv)} <small>/km</small></b>${fb}</div>
    <div class="rep-cols rc-cardio">${pc?`<div class="rc-leg"><span><i class="a"></i>Anterior</span><span><i class="b"></i>Hoje</span></div>`:""}<div class="rc-grid">${pair("Tempo",pc?P.cmin:0,T.cmin,"min")}${pair("Distância",dP,dT,"km")}${pair("Velocidade",pc?P.cv:0,T.cv,"km/h")}</div></div>`; }
function reportHTML(m){
  const w=S.weeks.find(x=>x.id===S.week); const d=dayOf(w.id,m.id,S.day); const T=totDay(d); const P=prevDayTot(m.id); const g=tg(m);
  const ks=REG.filter(k=>T.reg[k].s); const metaS=ks.reduce((a,k)=>a+g[k].s[1],0)||g.MMII.s[1]; const metaR=ks.reduce((a,k)=>a+g[k].r[1],0)||g.MMII.r[1];
  const date=addDays(w.start,DAYS.indexOf(S.day)); const p=phaseOf(m);
  const rows=(d?d.rows:[]).filter(r=>r.n1.trim()||subUsed(r.a)||subUsed(r.b));
  const hasC=!!(dayHasData(d)&&(T.cmin||T.wmin||String(wodOf(d).desc||"").trim()));
  const cLine= T.cmin? `<div class="rep-ex"><span class="rep-reg r-C">♥</span><div class="rep-exm"><b>Cardio${d.cardio.tipo?` · ${esc(d.cardio.tipo)}`:""}</b><span>${T.cmin} min${T.cv?` · ${String(T.cv).replace(".",",")} km/h`:""}${d.cardio.z?` · zona ${esc(d.cardio.z)}`:""}${d.cardio.pse!==""?` · PSE ${esc(d.cardio.pse)}`:""}</span></div>${P&&P.cv&&T.cv?`<div class="rep-exv"><small class="${T.cv>=P.cv?"up":"down"}">${T.cv>P.cv?"▲":T.cv<P.cv?"▼":"="} ${String(Math.round(Math.abs(T.cv-P.cv)*10)/10).replace(".",",")} km/h</small></div>`:""}</div>` : "";
  return `<div class="repcard rep-day" id="repcard">
    <div class="rep-brand">${repLogo()}<span>${esc(BR().nome).toUpperCase()} <small>${esc(BR().sub)}</small></span></div>
    <div class="rep-head"><div><h2>${esc(m.name)}</h2><p>${ltrOf(m.id,w.id,S.day,d)?`${tname(ltrOf(m.id,w.id,S.day,d))} · `:""}${DAY_N[S.day]}, ${ddmm(date)} · ${usesPh(m)?`${phT(m)} · ${p.n} · `:""}Semana ${w.n}</p>${sesTimes(d)?`<p class="rep-time">⏱ ${sesTimes(d)}</p>`:""}</div></div>
    ${dayHasData(d)? phraseHTML(dayPhrase(m,T,P,date)) : ""}
    ${!dayHasData(d)? `<p class="rep-empty">Nenhum treino lançado neste dia.</p>` : `
    <div class="rep-2c ${hasC?"":"one"}"><div class="rep-box rep-vol"><h3>📊 Séries, repetições e tonelagem</h3>
      ${repColsHTML(m,rows,P)}
      ${ks.length? `<div class="rep-rsum">${ks.map(k=>{ const t=T.reg[k]; const pt=P?P.reg[k].t:0; return `<div class="rep-rsl"><span class="rep-reg r-${k}">${regIcon(k)}</span><b>${REG_LABEL[k]}</b><span>${t.s}/${g[k].s[1]} séries · ${nf(t.r)}/${nf(g[k].r[1])} reps · <b class="num">${nf(t.t)} kg</b>${pt?` <small>${deltaTxt(t.t,pt)}</small>`:""}</span></div>`; }).join("")}</div>` : ""}
      <div class="rep-total"><span>Tonelagem total do treino</span><b class="num">${nf(T.t)} kg</b></div>
      ${(()=>{ const k=kcalDay(m,d,T); return k? `<div class="rep-kcal"><div class="rk-top"><span>🔥 Gasto <u>estimado</u></span><b class="num">${kcalTxt(k)}</b></div><p>${KCAL_NOTE}</p></div>` : ""; })()}
      <p class="rep-sub">${P&&P.t? `${deltaTxt(T.t,P.t)} de tonelagem em relação ao ${ltrOf(m.id,w.id,S.day,d)?refTxt(m.id):"treino da semana passada"}.` : ltrOf(m.id,w.id,S.day,d)? `Primeiro Treino ${ltrOf(m.id,w.id,S.day,d)} registrado.` : "Primeira semana registrada deste treino."}${T.t>=1200?` É como levantar ${carsTxt(T.t)} carros populares de 1.200 kg.`:""}</p>
    </div>
    ${hasC?`<div class="rep-colB"><div class="rep-box rep-cbox"><h3>❤️ Cardio</h3>${cLine}${repCardioHTML(T,P)}${T.wmin||String(wodOf(d).desc||"").trim()? `<div class="rep-ex"><span class="rep-reg r-C">🔥</span><div class="rep-exm"><b>${wodOf(d).tipo?`Método · ${esc(wodOf(d).tipo)}`:"Método"}${T.wmin?` · ${T.wmin} min`:""}</b>${wodOf(d).desc?`<span class="wdesc">${esc(wodOf(d).desc)}</span>`:""}</div></div>`:""}
      ${T.cmin+T.wmin?`<p class="rep-ctxt">${cardioTxt(T.cmin+T.wmin,totWeek(w.id,m.id).eq,T.cmin&&T.wmin)}</p>`:""}</div>
    ${(()=>{ const f=intensFb(d); return f? `<div class="rep-box rep-int"><span class="ri-tag">🎚 ${esc(f.tag)}</span><p>${esc(f.msg)}</p></div>` : ""; })()}</div>`:""}</div>
    <div class="rep-box"><h3>Treino</h3>
      ${rows.map(r=>{ const L=rowLines(r); const v=rowVol(r); const pv=prevRowVol(m.id,r.n1); const k=rowReg(r,"a"); const k2= r.conj&&L.length>1? rowReg(r,"b") : null;
        const badge=x=>`<span class="rep-reg r-${x}" title="${REG_LABEL[x]}">${regIcon(x)}</span>`;
        return `<div class="rep-ex">${k2? `<span class="rep-regs">${badge(k)}${badge(k2)}</span>` : badge(k)}<div class="rep-exm"><b>${esc(r.n1||"Exercício")}</b>
          ${r.tec?`<span class="rep-tec">${esc(tecLbl(r))}</span>`:""}${L.map(l=>`<span>${r.conj&&L.length>1&&!l.sub?esc(l.n)+": ":""}${esc(setTxt(l.x,1,l.u))}</span>`).join("")}</div>
          <div class="rep-exv"><b class="num">${nf(v)} kg</b>${pv?`<small class="${v>=pv?"up":"down"}">${deltaTxt(v,pv)}</small>`:""}</div></div>`; }).join("")}
      ${!hasC&&T.cmin? `<div class="rep-ex"><span class="rep-reg r-C">♥</span><div class="rep-exm"><b>Cardio${d.cardio.tipo?` · ${esc(d.cardio.tipo)}`:""}</b><span>${T.cmin} min${T.cv?` · ${String(T.cv).replace(".",",")} km/h`:""}${d.cardio.z?` · zona ${esc(d.cardio.z)}`:""}${d.cardio.pse!==""?` · PSE ${esc(d.cardio.pse)}`:""}</span></div>${P&&P.cv&&T.cv?`<div class="rep-exv"><small class="${T.cv>=P.cv?"up":"down"}">${T.cv>P.cv?"▲":T.cv<P.cv?"▼":"="} ${String(Math.round(Math.abs(T.cv-P.cv)*10)/10).replace(".",",")} km/h</small></div>`:""}</div>`:""}
      ${!hasC&&(T.wmin||String(wodOf(d).desc||"").trim())? `<div class="rep-ex"><span class="rep-reg r-C">🔥</span><div class="rep-exm"><b>${wodOf(d).tipo?`Método · ${esc(wodOf(d).tipo)}`:"Método"}${T.wmin?` · ${T.wmin} min`:""}</b>${wodOf(d).desc?`<span class="wdesc">${esc(wodOf(d).desc)}</span>`:""}</div></div>`:""}
    </div>`}
    ${bodyBoxHTML(m,date)}
    ${MOTTO_H()}
  </div>`;
}
function telOf(m){
  if(!presOn()||!m) return ""; const L0=PRES.alunos(); const a=(m.pid&&L0.find(x=>x.id===m.pid))||L0.find(x=>noAcc(String(x.nome||"")).trim()===noAcc(String(m.name||"")).trim()); let d=String((a&&a.tel)||"").replace(/\D/g,"");
  if(!d) return ""; if(d.length<=11) d="55"+d.replace(/^0+/,""); return d; }
function waOpen(m,text){
  const tel=telOf(m); const url="https://wa.me/"+tel+"?text="+encodeURIComponent(text);
  let w=null; try{ w=window.open(url,"_blank"); }catch(e){}
  if(!w){ const a=document.createElement("a"); a.href=url; a.target="_blank"; a.rel="noopener"; document.body.appendChild(a); a.click(); a.remove(); }
  if(!tel) toast(`Sem WhatsApp de ${first(m.name)}: escolha o contato. Cadastre em Presença → Alunos.`);
}
const ZONA_N={1:"Zona 1 · Recuperação",2:"Zona 2 · Base",3:"Zona 3 · Resistência",4:"Zona 4 · Potência",5:"Zona 5 · Velocidade"};
const ZONA_T={
 1:"Ritmo bem leve, de conversa tranquila. Ajuda o corpo a se recuperar e a \"limpar\" o cansaço dos treinos mais fortes.",
 2:"Ritmo confortável, ainda dá para conversar. Aqui o corpo cria mais \"usinas de energia\" dentro dos músculos: é o que te dá fôlego para aguentar mais tempo cansando menos.",
 3:"A respiração aperta e começa aquela \"queimação\" nas pernas. É aqui que o corpo aprende a aguentar o cansaço por mais tempo.",
 4:"Esforço forte, falar fica difícil. Treina o seu \"motor\" a captar e usar mais oxigênio, e o que era pesado passa a ficar mais fácil.",
 5:"Esforço máximo e curtinho, como tiros e subidas. Deixa as pernas mais fortes e mais rápidas."};
const ZONA_PSE={1:[1,4],2:[4,6],3:[6,7],4:[7,9],5:[9,10]};
function pseNome(p){ return p<=3?"leve":p<=6?"moderado":p<=8?"difícil":"máximo"; }
function intensFb(d){
  if(!d||!d.cardio) return null; const z=num(d.cardio.z); const hasP=d.cardio.pse!==""&&d.cardio.pse!=null; const p=hasP?num(d.cardio.pse):null;
  if(!z&&!hasP) return null;
  const tag=[z?ZONA_N[z]:"", hasP?`PSE ${p} (${pseNome(p)})`:""].filter(Boolean).join(" · ");
  let msg="";
  if(z&&hasP){ const [a,b]=ZONA_PSE[z];
    if(p>b+1) msg="Você sentiu mais pesado do que essa zona costuma ser. Acontece em dia de cansaço, pouco sono ou calor. Bora observar no próximo!";
    else if(p<a-1) msg="Você sentiu mais leve do que essa zona costuma ser. Sinal de que o seu condicionamento está melhorando! 💪";
    else msg="Sensação e zona bateram: intensidade no ponto certo. 👏"; }
  else if(z) msg=ZONA_T[z];
  else msg= p>=9? "Esforço máximo! Lembre de recuperar bem: sono, água e boa alimentação." : p>=7? "Treino puxado, foi para cima! 🔥" : p>=4? "Ritmo firme, que dá para manter por 30 minutos ou mais. É assim que o fôlego cresce." : "Treino leve, ótimo para manter o ritmo e recuperar.";
  if(z&&hasP) msg=ZONA_T[z]+" "+msg;
  return {tag,msg};
}
function sesDur(d){ if(!d||!d.ini||!d.fim) return null; const mm=t=>+t.slice(0,2)*60+ +t.slice(3,5); const dur=mm(d.fim)-mm(d.ini); if(dur<=0) return null; const c=num((d.cardio||{}).t); return {dur,c,tot:dur+c}; }
function sesTimes(d){ const x=sesDur(d); if(!x) return ""; return x.c? `Tempo total: ${x.tot} min (${x.dur} min de treino + ${x.c} min de cardio)` : `Tempo total: ${x.dur} min`; }
function reportText(m){
  const w=S.weeks.find(x=>x.id===S.week); const d=dayOf(w.id,m.id,S.day); const T=totDay(d); const P=prevDayTot(m.id);
  const date=addDays(w.start,DAYS.indexOf(S.day));
  let t=`*${ltrOf(m.id,w.id,S.day,d)?tname(ltrOf(m.id,w.id,S.day,d)):"Treino"} de ${first(m.name)} — ${DAY_N[S.day]}, ${ddmm(date)}*\n${usesPh(m)?`${phT(m)} · `:""}Semana ${w.n}${sesTimes(d)?`\n⏱ ${sesTimes(d)}`:""}\n\n`;
  (d?d.rows:[]).filter(r=>r.n1.trim()).forEach(r=>{ rowLines(r).forEach((l,i)=>{ t+= l.sub? `   ↳ ${setTxt(l.x,0,l.u)}\n` : `• ${i&&r.conj?"  ↳ ":""}${l.n}${r.tec&&!i?` (${tecLbl(r)})`:""}: ${setTxt(l.x,0,l.u)}\n`; }); });
  if(T.cmin) t+=`• Cardio: ${T.cmin} min${d.cardio.tipo?` ${d.cardio.tipo}`:""}${T.cv?` · ${String(T.cv).replace(".",",")} km/h`:""}\n`;
  if(T.wmin||String(wodOf(d).desc||"").trim()) t+=`• 🔥 Método${wodOf(d).tipo?` ${wodOf(d).tipo}`:""}${T.wmin?` ${T.wmin} min`:""}${wodOf(d).desc?`: ${wodOf(d).desc}`:""}\n`;
  t+="\n"+REG.filter(k=>T.reg[k].s).map(k=>`${k==="MMII"?"🦵":k==="MMSS"?"💪":"🎯"} ${REG_LABEL[k]}: ${T.reg[k].s} séries · ${nf(T.reg[k].r)} reps · ${nf(T.reg[k].t)} kg`).join("\n")+"\n";
  t+=`\nSéries: ${T.s} | Repetições: ${nf(T.r)} | Tonelagem: ${nf(T.t)} kg${P&&P.t?` (${deltaTxt(T.t,P.t)} vs ${refTxt(m.id)})`:""}`;
  if(T.t>=1200) t+=`\n🚗 É como levantar ${carsTxt(T.t)} carros populares!`;
  { const k=kcalDay(m,d,T); if(k) t+=`\n🔥 Gasto estimado: ${kcalTxt(k)}\n_${KCAL_NOTE}_`; }
  if(T.cmin+T.wmin) t+=`\n❤️ ${cardioTxt(T.cmin+T.wmin,totWeek(w.id,m.id).eq,T.cmin&&T.wmin)}`;
  { const f=intensFb(d); if(f) t+=`\n🎚 *${f.tag}*\n${f.msg}`; }
  { const L=avList(m); if(L.length&&L[L.length-1].date===date) t+="\n"+bodyText(m); }
  if(dayHasData(d)){ const P2=prevDayTot(m.id); t+=`\n\n💬 ${dayPhrase(m,T,P2,addDays(w.start,DAYS.indexOf(S.day)))}\n— ${BR().ass}${MOTTO_T()}`; }
  return t;
}
function renderReport(){
  const el=document.getElementById("report"); if(!repOpen){ el.hidden=true; return; }
  const st=A(); const ms=sesMembers();
  el.hidden=false;
  el.innerHTML=`<div class="rep-wrap">
    <div class="rep-actions"><button class="btn small" data-rclose>✕ Fechar</button><span class="sp"></span><button class="btn small" data-rcopy>Copiar</button><button class="btn small" data-rimg>🖼 Imagem</button><button class="btn small" data-rpdf>📄 PDF</button><button class="btn small primary" data-rboth>📲 Texto + imagem</button></div>
    <div id="sendPanel" class="sendpanel" hidden></div>
    ${ms.length>1?`<div class="rep-mates">${ms.map(x=>`<button data-rst="${x.id}" aria-pressed="${x===st}">${esc(first(x.name))}</button>`).join("")}</div>`:""}
    ${repKind==="week"?`<label class="repmus"><input type="checkbox" data-repmus ${S.repMus!==false?"checked":""}> Mandar o resumo por músculo para o aluno</label>`:""}
    <div class="seg rep-kind"><button data-rkind="day" aria-pressed="${repKind==="day"}">Treino do dia</button><button data-rkind="week" aria-pressed="${repKind==="week"}">Semana</button></div>
    ${!num(st.peso)?`<div class="rep-hint">🔥 O gasto estimado não aparece porque falta o <b>peso de ${esc(first(st.name))}</b>.<label>Peso (kg) <input type="text" inputmode="decimal" id="rp-${st.id}" data-rpeso="${st.id}" placeholder="ex.: 68"></label><button data-rpok>Mostrar gasto</button><small>Este aviso não sai na imagem nem no texto enviado ao aluno.</small></div>`:""}
    ${repKind==="week"? profWeekHTML(st) : ""}
    ${repKind==="week"? weekReportHTML(st) : reportHTML(st)}
    <textarea id="repFallback" class="inp" rows="6" hidden aria-label="Texto do relatório"></textarea>
  </div>`;
}
function h2cZ(el,o){ const z=document.body.style.zoom; document.body.style.zoom=""; const r=html2canvas(el,o); const back=()=>{ document.body.style.zoom=z; }; return r.then(v=>{ back(); return v; },e=>{ back(); throw e; }); }
function repImageBlob(id){ const card=document.getElementById(id||"repcard"); const wide=card.classList.contains("rep-day"); if(wide) card.classList.add("cap");
  return h2cZ(card,{scale:2,backgroundColor:"#ffffff",useCORS:true}).then(c=>{ card.classList.remove("cap"); return new Promise(res=>c.toBlob(res,"image/png")); },e=>{ card.classList.remove("cap"); throw e; }); }
async function saveImgBlob(blob,name){ const dl=(window.claude&&claude.use)? await claude.use("downloads") : null;
  if(dl){ await dl.save({filename:name,data:blob}); return true; }
  try{ const u=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=u; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(u),4000); return true; }catch(e){ return false; } }
async function shareImg(blob,name,text){ try{ const f=new File([blob],name,{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[f]})){ await navigator.share({files:[f],text}); return "shared"; } }catch(e){ if(e&&e.name==="AbortError") return "cancel"; } return ""; }
let SF_BLOB=null;
async function sendFlow(panelId,cardId,fname,goAttr){
  const m=A(); const p=document.getElementById(panelId); const nm=esc(first(m.name));
  if(!window.html2canvas){ toast("O gerador de imagem não carregou. Recarregue a página."); return; }
  p.hidden=false; p.innerHTML=`<b>Preparando a imagem…</b>`;
  let how="fail";
  const tel0=goAttr==="data-rgo"? telOf(m) : "";
  const txt0=(goAttr==="data-rgo"&&repKind==="week")? weekReportText(m) : reportText(m);
  try{ const blob=await repImageBlob(cardId); SF_BLOB={b:blob,n:fname}; const sh=await shareImg(blob,fname,txt0); if(sh==="shared"){ p.innerHTML=`<b>✓ Enviado.</b> Se escolheu o WhatsApp, a imagem foi com o texto junto.`; return; } if(sh==="cancel"){ p.innerHTML=`<button class="btn primary" data-rshare>📲 Enviar imagem + texto</button>`; return; }
    let cs=false; try{ cs=!!(navigator.canShare&&navigator.canShare({files:[new File([blob],fname,{type:"image/png"})]})); }catch(_){}
    if(cs){ p.innerHTML=`<b>Imagem pronta.</b><button class="btn primary" data-rshare>📲 Enviar imagem + texto (escolha o WhatsApp e o aluno)</button>`; p.scrollIntoView({block:"nearest"}); return; }
    if(await saveImgBlob(blob,fname)) how="saved"; else { showImgs([{src:await blobToUrl(blob),name:fname}],"Salvar a imagem"); how="shown"; } }catch(e){ if(e&&e.code==="declined") how="declined"; }
  p.innerHTML=`${how==="saved"?`<b>1. Imagem salva ✓</b>`:how==="shown"?`<b>1. Toque e segure a imagem que abriu e escolha Baixar imagem.</b>`:how==="declined"?`<b>1. Você cancelou o salvamento.</b> Toque de novo para salvar.`:`<b>1. Não consegui salvar a imagem.</b> Tire um print do relatório.`}
    <button class="btn primary" ${goAttr}>2. Abrir WhatsApp de ${nm} com o texto</button>
    <span><b>3.</b> Na conversa: 📎 → <b>Galeria</b> → a primeira foto (é a do relatório) → enviar.<br><b>4.</b> Depois envie o texto, que já está escrito.</span>`;
  p.scrollIntoView({block:"nearest"});
}
/* Direto no WhatsApp do aluno: prepara a imagem, copia para a área de transferência e abre a conversa dele com o texto */
async function sendDirect(){ const m=A(); const p=document.getElementById("sendPanel"); const nm=esc(first(m.name)); const tel=telOf(m);
  if(!tel){ toast(`Sem WhatsApp de ${first(m.name)} no cadastro: escolha o contato.`); return sendBoth(); }
  if(p){ p.hidden=false; p.innerHTML=`<b>Abrindo o WhatsApp de ${nm}…</b>`; }
  const can=!!(window.html2canvas&&navigator.clipboard&&navigator.clipboard.write&&window.ClipboardItem); let ok=false;
  if(can){ try{ const fname=`treino-${noAcc(first(m.name)).replace(/[^a-z0-9]/g,"")}.png`; const blob=await Promise.race([repImageBlob("repcard"),new Promise(r=>setTimeout(()=>r(null),3500))]); if(blob){ SF_BLOB={b:blob,n:fname}; await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]); ok=true; } }catch(_){} }
  waOpen(m, repKind==="week"? weekReportText(m) : reportText(m));
  if(p) p.innerHTML= ok? `<b>✓ Abriu a conversa de ${nm} com o texto.</b><small>A imagem está copiada: na conversa, <b>toque e segure</b> na caixa de mensagem → <b>Colar</b> e envie.</small><button class="btn" data-rdir>💬 Abrir de novo</button>`
    : `<b>✓ Abriu a conversa de ${nm} com o texto.</b><small>Para mandar a imagem junto, use <b>📲 Texto + imagem</b>.</small><button class="btn" data-rdir>💬 Abrir de novo</button>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-rdir]"); if(!b) return; e.preventDefault(); const m=A();
  try{ if(SF_BLOB&&navigator.clipboard&&window.ClipboardItem) navigator.clipboard.write([new ClipboardItem({"image/png":SF_BLOB.b})]).catch(()=>{}); }catch(_){}
  waOpen(m, repKind==="week"? weekReportText(m) : reportText(m)); });
function sendBoth(){ const m=A(); return sendFlow("sendPanel","repcard",`${repKind==="week"?"semana":"treino"}-${noAcc(first(m.name)).replace(/[^a-z0-9]/g,"")}.png`,"data-rgo"); }
async function reportPdf(){
  const card=document.getElementById("repcard"); const st=A();
  if(!window.html2canvas||!window.jspdf){ toast("O gerador de PDF não carregou. Recarregue a página."); return; }
  toast("Gerando o PDF…");
  try{ const c=await h2cZ(card,{scale:2,backgroundColor:"#ffffff",useCORS:true});
    const W=150,H=W*c.height/c.width; const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:"mm",format:[W,H]}); const im=c.toDataURL("image/jpeg",0.92); doc.addImage(im,"JPEG",0,0,W,H);
    const nm=`${repKind==="week"?"semana":"treino"}-${noAcc(first(st.name)).replace(/[^a-z0-9]/g,"")}-${repKind==="week"?"s"+(S.weeks.find(x=>x.id===S.week)||{}).n:S.day}.pdf`;
    await offerFile(doc.output("blob"),nm,{imgs:[{src:im,name:nm.replace(/\.pdf$/,".jpg")}],text:`${repKind==="week"?"Semana":"Treino"} de ${first(st.name)} 💪 — ${BR().ass}`});
  }catch(e){ toast("Não consegui gerar o PDF ("+erroPT(e)+")."); }
}
async function reportImage(){
  const card=document.getElementById("repcard"); const st=A();
  if(!window.html2canvas){ toast("Não consegui gerar a imagem aqui. Tire um print da tela."); return; }
  try{
    const canvas=await h2cZ(card,{scale:2,backgroundColor:"#ffffff",useCORS:true});
    const blob=await new Promise(r=>canvas.toBlob(r,"image/png"));
    const fname=`${repKind==="week"?"semana":"treino"}-${noAcc(first(st.name)).replace(/[^a-z0-9]/g,"")}.png`;
    if(true){ await offerFile(blob,fname,{text:`${repKind==="week"?"Semana":"Treino"} de ${first(st.name)} 💪 — ${BR().ass}`}); return; }
    try{ const file=new File([blob],fname,{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[file]})){ toast("Escolha o WhatsApp e o aluno"); await navigator.share({files:[file],text:`${repKind==="week"?"Semana":"Treino"} de ${first(st.name)} 💪 — ${BR().ass}`}); return; } }catch(err){ if(err&&err.name==="AbortError") return; }
    toast("Envio direto não liberado aqui. Salvando a imagem.");
    const dl=(window.claude&&claude.use)? await claude.use("downloads") : null;
    if(!dl){ showImgs([{src:await blobToUrl(blob),name:fname}],"Salvar a imagem"); return; }
    await dl.save({filename:`${repKind==="week"?"semana":"treino"}-${noAcc(first(st.name)).replace(/[^a-z0-9]/g,"")}-${repKind==="week"?"s"+(S.weeks.find(x=>x.id===S.week)||{}).n:S.day}.png`,data:blob}); toast("Imagem salva");
  }catch(e){ if(!(e&&e.code==="declined")) toast("Não consegui gerar a imagem ("+erroPT(e)+")."); }
}
document.addEventListener("change",e=>{ if(e.target.matches&&e.target.matches("#report [data-repmus]")){ S.repMus=e.target.checked; save(); renderReport(); } });
document.addEventListener("click",e=>{
  const r=e.target.closest("#report button"); if(!r) return;
  if(r.hasAttribute("data-rclose")){ repOpen=false; renderReport(); document.body.style.overflow=""; return; }
  if(r.hasAttribute("data-rpok")){ const i=document.querySelector("[data-rpeso]"); const v=i&&i.value.trim(); if(!num(v)){ toast("Digite o peso em kg"); return; } const m=S.students.find(x=>x.id===i.dataset.rpeso); m.peso=v; save(); renderReport(); return; }
  if(r.dataset.rkind){ repKind=r.dataset.rkind; renderReport(); return; }
  if(r.hasAttribute("data-rcopy")){ const t= repKind==="week"? weekReportText(A()) : reportText(A()); const fb=document.getElementById("repFallback");
    const fallback=()=>{ fb.hidden=false; fb.value=t; fb.focus(); fb.select(); toast("Texto selecionado. Copie e cole no WhatsApp."); };
    try{ navigator.clipboard.writeText(t).then(()=>toast("Copiado. Cole no WhatsApp do aluno."),fallback); }catch(err){ fallback(); } return; }
  if(r.hasAttribute("data-rimg")){ reportImage(); return; }
  if(r.hasAttribute("data-rpdf")){ reportPdf(); return; }
  if(r.hasAttribute("data-rboth")){ sendBoth(); return; }
  if(r.hasAttribute("data-rshare")){ if(SF_BLOB) shareImg(SF_BLOB.b,SF_BLOB.n,repKind==="week"? weekReportText(A()) : reportText(A())).then(x=>{ const p=document.getElementById("sendPanel"); if(x==="shared"&&p) p.innerHTML=`<b>✓ Enviado.</b> Se escolheu o WhatsApp, a imagem foi com o texto junto.`; }); return; }
  if(r.hasAttribute("data-rgo")){ const m=A(); waOpen(m, repKind==="week"? weekReportText(m) : reportText(m)); return; }
  if(r.hasAttribute("data-rwa")){ const m=A(); waOpen(m, repKind==="week"? weekReportText(m) : reportText(m)); return; }
  if(r.dataset.rst){ S.active=r.dataset.rst; save(); renderAll(); renderReport(); return; }
});
function exGoal(m){ const g=tg(m); const use= m.tgCustom? !!g.useE : usesPh(m); const e=(g.ex&&typeof g.ex==="object")? g.ex : {}; return {use,get:k=>e[k]||(k==="Core"?[1,3]:EXM.slice())}; }
function metasHTML(m){
  const g=tg(m); const useR=m.tgCustom? !!g.useR : usesPh(m); const oth=[...new Set([...sesMembers(),...membersOf(m)])].filter(o=>o!==m);
  const f=(path,v,lab,dis)=>`<label class="mfi"><input class="inp mini" type="number" inputmode="numeric" data-tg="${path}" id="tg-${m.id}-${path.replace(/\./g,"-")}" value="${v??""}" ${dis?"disabled":""}><small>${lab}</small></label>`;
  return `<div class="card metas"><div class="phase-head"><span class="label">Metas de ${esc(first(m.name))} por sessão · ${m.tgCustom?"personalizadas":usesPh(m)?"padrão da "+phT(m).toLowerCase():"sem meta"}</span>${m.tgCustom?`<button class="btn small ghost" data-tgreset>${usesPh(m)?"Voltar ao padrão da fase":"Tirar as metas"}</button>`:""}</div>
    <p class="muted" style="font-size:12px;margin:0">Opcional. Mude um número para criar a meta: as barras passam a mostrar quanto falta para ela.</p>
    <p class="refnote">Faixas de referência com direção no ACSM 2026 (Currier et al., Med Sci Sports Exerc): cerca de 10 séries por músculo por semana para hipertrofia, 2–3 séries por exercício para força. São sugestões: quem determina é o conhecimento científico e a prática do profissional.</p>
    ${(()=>{ const X=exGoal(m); return `<label class="mchk"><input type="checkbox" data-tg="useE" ${X.use?"checked":""}> Usar meta de exercícios</label>
    ${REG.map(k=>{ const [a,b]=X.get(k); return `<div class="mrow mrow-e rc-${k}"><b>${k}</b><span class="${X.use?"":"mdim"}">Exerc.</span>${f("ex."+k+".0",a,"mín.",!X.use)}${f("ex."+k+".1",b,"máx.",!X.use)}</div>`; }).join("")}`; })()}
    <label class="mchk"><input type="checkbox" data-tg="useR" ${useR?"checked":""}> Usar meta de repetições</label>
    ${REG.map(k=>`<div class="mrow rc-${k}"><b>${k}</b><span>Séries</span>${f(k+".s.0",g[k].s[0],"mín.")}${f(k+".s.1",g[k].s[1],"máx.")}<span class="${useR?"":"mdim"}">Reps</span>${f(k+".r.0",g[k].r[0],"mín.",!useR)}${f(k+".r.1",g[k].r[1],"máx.",!useR)}</div>`).join("")}
    <label class="mchk"><input type="checkbox" data-tg="useZ" ${g.useZ?"checked":""}> Usar meta de músculos grandes e pequenos (séries por sessão)</label>
    ${(()=>{ const Z=g.useZ? szOf(g) : (g.sz&&!g.sz.G? g.sz : SZ_DEF); return ["MMSS","MMII"].map(R=>[["G","Grandes"],["P","Pequenos"]].map(([k,l],i)=>`<div class="mrow mrow-z rc-${R}"><b>${i?"":R}</b><span class="${g.useZ?"":"mdim"}">${l}</span>${f("sz."+R+"."+k+".0",Z[R][k][0],"mín.",!g.useZ)}${f("sz."+R+"."+k+".1",Z[R][k][1],"máx.",!g.useZ)}</div>`).join("")).join(""); })()}
    <div class="mrow mrow-c rc-Cardio"><b>Cardio</b><span>Min/dia</span>${f("cardioDia",g.cardioDia||"","opcional")}<span>Min/semana</span>${f("cardio",g.cardio,"semana")}</div>
    <p class="muted" style="font-size:12px;margin:0">Reps = séries × repetições. Cardio: equivalente moderado; zona 4–5 conta em dobro (ACSM: 150 min moderado ou 75 min vigoroso por semana).</p>
    <div class="row"><button class="btn primary small" data-tgsave>Salvar metas</button>${oth.length?`<button class="btn small" data-tgcopy>📋 Copiar metas p/ ${esc(oth.map(o=>first(o.name)).join(" e "))}</button>`:""}</div></div>`;
}
function phaseBanner(m,ms){
  const p=phaseOf(m);
  if(!usesPh(m)) return `<button class="nbanner" ${ms.length>1?"data-colsel":""} style="--pc:var(--accent)"><span class="nb-name">${esc(m.name)}</span></button>`;
  return `<button class="nbanner" ${ms.length>1?"data-colsel":""} style="--pc:var(--p${m.phase})"><span class="nb-name">${esc(m.name)}</span>
    <span class="nb-phase"><span class="dotnum">${phK(m)}</span>${phT(m)} · ${p.n} · ${rng(p.sets)} séries × ${p.reps[0]}–${p.reps[1]} reps · RIR ${p.rir}</span>
    <span class="nb-tech">Método: ${p.method}${m.ob?` · <b>Linha obesos</b>`:""}</span></button>`;
}
const SECS=Array.from({length:24},(_,i)=>(i+1)*5);
function secsDL(){ if(!document.getElementById("secsdl")) document.body.insertAdjacentHTML("beforeend",`<datalist id="secsdl">${SECS.map(v=>`<option value="${v}">`).join("")}</datalist>`); return ""; }
const ISO_M={ini:"Início",meio:"Meio",fim:"Final",cada:"Toda rep",so:"Só isometria"};
const ISO_W={ini:"no início",meio:"no meio",fim:"no final",cada:"em toda rep"};
function setTxt(x,sp,u){ const so=num(x.sec)&&(x.isoM||"so")==="so"; const k=num(x.c)?` · ${String(x.c).replace(".",",")} kg`:"";
  if(so) return `${x.s||0}${sp?" × ":"×"}${u>1?`${x.sec}"/${x.sec}"`:`${x.sec}"`} iso${u>1?" (cada lado)":""}${k}`;
  return `${x.s||0}${sp?" × ":"×"}${x.f?(num(x.r)?x.r+" (até a falha)":"até a falha"):(x.r||0)}${k}${num(x.sec)?` · iso ${x.sec}" ${ISO_W[x.isoM]||""}${num(x.isoS)&&num(x.isoS)!==num(x.s)?` (${x.isoS} ${num(x.isoS)>1?"séries":"série"})`:""}`:""}`; }
function vol(x){ return num(x.s)*num(x.r)*num(x.c); }
/* Seta comparando com a semana passada: ▲ verde maior, ▼ vermelha menor, = amarela igual */
function arwC(cur,pv){ if(!(cur>0)||!(pv>0)) return ["",""]; return cur>pv? ["up","▲"] : cur<pv? ["dn","▼"] : ["eq","="]; }
function arwH(f,cur,pv){ const [c,t]=arwC(cur,pv); return `<i class="xar ${c}" data-ar="${f}" data-pv="${pv||0}" aria-label="${c==="up"?"maior que a semana passada":c==="dn"?"menor que a semana passada":c==="eq"?"igual à semana passada":""}">${t}</i>`; }
function arwUpd(r){ const root=document.querySelector(`[data-row="${r.id}"]`); if(!root) return; root.querySelectorAll(".xar").forEach(el=>{ const f=el.dataset.ar, pv=+el.dataset.pv; const cur= f==="v"? vol(r.a) : num(r.a[f]); const [c,t]=arwC(cur,pv); el.className="xar "+c; el.textContent=t; }); }
/* Unilateral: séries e repetições são por lado (3×8 = 3 séries de 8 em cada lado). As séries contam uma vez só; repetições e tonelagem contam os dois lados. */
function isUni(row){ if(!row) return false; if(row.uni!==undefined) return !!row.uni; return /unilateral|\bunil\b|\buni\b|cada lado|alternad/.test(noAcc(String(row.n1||""))); }
const uf=row=> isUni(row)? 2 : 1;
let cycPick=null;
/* Alertas da sessão: séries e repetições fora da fase, carga subindo mais de 10% em relação ao treino anterior da mesma letra */
const LOAD_DEF=10; const loadMax=()=>{ const v=+((S.brand||{}).loadMax); return v>0? v : LOAD_DEF; };
function rowAlerts(m,row){
  const out=[]; const cells={}; if(!row.n1.trim()) return {out,cells};
  const p=phaseOf(m); const ref=prevRef(m.id); const pr= ref&&ref.d? ref.d.rows.find(x=>noAcc(x.n1).trim()===noAcc(row.n1).trim()) : null;
  const L=rowLines(row);
  ["a","b"].forEach((w,i)=>{ const x=row[w]; if(!subUsed(x)) return; const nm=(L[i]&&L[i].n)||row.n1.trim();
    const sv=num(x.s), rv=num(x.r), cv=num(x.c);
    if(usesPh(m)&&sv>p.sets[1]){ cells[w+"s"]="hi"; out.push(`${nm}: ${sv} séries (fase: até ${p.sets[1]})`); }
    if(usesPh(m)&&rv && rv>p.reps[1]){ cells[w+"r"]="hi"; out.push(`${nm}: ${rv} reps (fase: até ${p.reps[1]})`); }
    else if(usesPh(m)&&rv && rv<p.reps[0]){ cells[w+"r"]="lo"; out.push(`${nm}: ${rv} reps (fase: a partir de ${p.reps[0]})`); }
    const pc= pr? num(pr[w].c) : 0;
    if(pc && cv){ const inc=(cv-pc)/pc*100; if(inc>loadMax()+0.01 && cv-pc>2){ cells[w+"c"]="hi"; out.push(`${nm}: carga ${String(pc).replace(".",",")} → ${String(cv).replace(".",",")} kg (+${Math.round(inc)}%, limite ${loadMax()}%)`); } }
  });
  return {out,cells};
}
const TON_MAX=20;
function regAlerts(m,d){ const ref=prevRef(m.id); if(!ref||!ref.d||!d) return []; const T=totDay(d), P=totDay(ref.d); const out=[];
  REG.forEach(k=>{ const a=T.reg[k].t, b=P.reg[k].t; if(a&&b&&(a-b)/b*100>TON_MAX+0.01) out.push(`${REG_LABEL[k]}: tonelagem ${nf(b)} → ${nf(a)} kg (+${Math.round((a-b)/b*100)}% em relação ao último treino igual). Salto grande, confira`); });
  return out; }
/* Alerta de carga: aparece no círculo do aluno lá em cima; a caixa fecha no ✕ e volta tocando no círculo */
let ALR_HIDE={}; const alrKey=m=>m.id+"|"+S.week+"|"+S.day;
function alertList(m,d){ return (d?d.rows:[]).flatMap(r=>rowAlerts(m,r).out).concat(regAlerts(m,d)); }
function alrBadge(){ const pl=document.getElementById("topPlate"); if(!pl) return; let n=0; try{ if(CUR_TAB==="sessao") sesMembers().forEach(m=>{ const k=alertList(m,dayOf(S.week,m.id,S.day)).length; if(!(ALR_HIDE[alrKey(m)]>=k)) n+=k; }); }catch(_){}
  let bd=pl.querySelector(".plbadge"); if(!n){ if(bd) bd.remove(); pl.classList.remove("plal"); return; }
  if(!bd){ bd=document.createElement("i"); bd.className="plbadge"; pl.appendChild(bd); } bd.textContent="⚠"+n; pl.classList.add("plal"); pl.title="Ver alertas de carga"; }
document.addEventListener("pointerdown",e=>{ const x=e.target.closest&&e.target.closest("[data-alrx]"); if(x){ ALR_HIDE[x.dataset.alrx]=+x.dataset.n; setTimeout(alrBadge,0); } },true);
document.addEventListener("click",e=>{ const x=e.target.closest&&e.target.closest("[data-alrx]"); if(x){ e.stopPropagation(); ALR_HIDE[x.dataset.alrx]=+x.dataset.n; const box=x.closest(".salert"); if(box) box.remove(); alrBadge(); return; }
  const pl=e.target.closest&&e.target.closest("#topPlate.plal"); if(!pl) return; ALR_HIDE={}; try{ renderSessao(); }catch(_){} setTimeout(()=>{ const a=document.querySelector(".salert"); if(a){ a.scrollIntoView({block:"center",behavior:"smooth"}); a.classList.add("salfl"); setTimeout(()=>a.classList.remove("salfl"),1600); } alrBadge(); },60); },true);
/* Início do treino: pergunta se repete o treino anterior inteiro ou só mostra como referência */
function repAskOn(m,d){ if(!d||!d.cp||d.ask||d.ini||d.done||d.presOk) return null; const ref=prevRef(m.id); return ref&&ref.d&&dayHasData(ref.d)&&(!ref.d.cp||ref.d.done||ref.d.ini||ref.d.presOk)? ref : null; }
const repRefOk=sid=>{ const ref=prevRef(sid); return ref&&ref.d&&dayHasData(ref.d)? ref : null; };
const repMode=()=> (S.brand||{}).repAskMode==="uma"? "uma" : "sempre";
let REP_POP=null; const REP_SEEN={};
function repAskHTML(){ return ""; }
function repPopHTML(sid){ const m=stById(sid); if(!m) return ""; const d=dayOf(S.week,sid,S.day); const auto=repAskOn(m,d); const ref=auto||repRefOk(sid); if(!ref) return "";
  const has=!auto&&d&&dayHasData(d)&&(d.ini||d.done||d.presOk||(d.rows||[]).some(r=>!r.cp&&String(r.n1||"").trim()));
  return `<div class="repscrim" data-repx></div><div class="repask reppop" role="dialog" aria-modal="true" aria-label="Treino anterior"><button class="icon-btn repx" data-repx aria-label="Fechar">✕</button>
    <p><b>${esc(first(m.name))}</b>, ${ref.ltr?`treino ${esc(ref.ltr)}`:"treino"} de ${ddmm(ref.date)}:</p><p class="rq">Deseja repetir o treino anterior ou apenas visualizar?</p>
    ${has?`<p class="repwarn">⚠ Hoje já tem treino lançado. Repetir <b>substitui</b> o que está lançado.</p>`:""}
    <div class="rbt"><button class="btn primary" data-repask="rep" data-repsid="${sid}">↻ ${has?"Substituir pelo treino anterior":"Repetir o treino anterior"}</button><button class="btn" data-repask="ver" data-repsid="${sid}">👀 Apenas visualizar</button></div>
    <small>Visualizar: o treino anterior aparece em cima de cada exercício (<b>Sem. Pass.</b>).</small>
    <div class="repmode"><span>Mostrar este aviso:</span><button class="agwc ${repMode()==="sempre"?"on":""}" data-repmode="sempre">🔁 Sempre que o treino começar</button><button class="agwc ${repMode()==="uma"?"on":""}" data-repmode="uma">1️⃣ Só desta vez</button></div>
    <small>${repMode()==="uma"?"Não abre mais sozinho.":"Abre sozinho quando o treino do aluno começa."}</small></div>`; }
function repPopRender(){ let el=document.getElementById("repPop"); if(!el){ el=document.createElement("div"); el.id="repPop"; document.body.appendChild(el); }
  const h= REP_POP&&CUR_TAB==="sessao"? repPopHTML(REP_POP) : ""; if(!h) REP_POP=null; el.hidden=!h; el.innerHTML=h; }
const repKey=sid=>S.week+"|"+sid+"|"+S.day;
function repAuto(){ if(CUR_TAB!=="sessao"||REP_POP||repMode()==="uma") return; let ms=[]; try{ ms=sesMembers(); }catch(_){ return; }
  const st=A(); ms=[st].concat(ms.filter(x=>x!==st)).filter(x=>ms.includes(x));
  const m=ms.find(x=>!REP_SEEN[repKey(x.id)]&&repAskOn(x,dayOf(S.week,x.id,S.day))); if(!m) return; REP_SEEN[repKey(m.id)]=1; REP_POP=m.id; repPopRender(); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("#repPop [data-repx],#repPop [data-repask],#repPop [data-repmode],[data-repopen]"); if(!b) return;
  if(b.dataset.repopen){ if(!repRefOk(b.dataset.repopen)){ toast("Ainda não tem treino anterior lançado para este treino."); return; } REP_POP=b.dataset.repopen; repPopRender(); return; }
  if(b.dataset.repmode){ S.brand=Object.assign({},S.brand||{},{repAskMode:b.dataset.repmode}); save(); repPopRender(); toast(b.dataset.repmode==="uma"?"Não vai abrir sozinho.":"Vai abrir sempre que o treino começar."); return; }
  if(b.dataset.repask){ const sid=b.dataset.repsid; repAskDo(sid,b.dataset.repask,true); REP_POP=null; repPopRender(); renderSessao(); setTimeout(repAuto,50); return; }
  if(b.hasAttribute("data-repx")){ REP_POP=null; repPopRender(); setTimeout(repAuto,50); } });
function repAskDo(sid,v,force){ let d=dayOf(S.week,sid,S.day); let ref=repAskOn(stById(sid),d);
  if(!ref&&force){ ref=repRefOk(sid); if(ref&&v==="ver"&&d&&dayHasData(d)&&!d.cp){ d.ask=1; save(); return; } if(ref&&!d) d=dayOf(S.week,sid,S.day,true); }
  if(!d) return; d.ask=1; if(!ref){ save(); return; }
  const keep=d.ltr, card=d.cardio; const c= v==="rep"? cloneDay(ref.d,true,true) : cloneDay(ref.d,true,false);
  c.ask=1; if(keep!=null) c.ltr=keep; if(card) c.cardio=card;
  if(v==="rep"){ c.rows.forEach(r=>delete r.cp); delete c.cp; }
  S.days[S.week][sid][S.day]=c; save(); if(v==="rep"){ try{ markStart(sid); autoPres(sid); }catch(_){} toast("Treino anterior repetido. Ajuste o que quiser."); } }
function alertsHTML(m,d){
  const all=alertList(m,d); setTimeout(alrBadge,0);
  if(!all.length) return "";
  if(ALR_HIDE[alrKey(m)]>=all.length) return "";
  return `<div class="salert" role="alert"><button class="salx" data-alrx="${alrKey(m)}" data-n="${all.length}" aria-label="Fechar alerta">✕</button><b>⚠ ${all.length} ${all.length>1?"alertas":"alerta"} neste treino</b><ul>${all.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><span>Pode manter se for intencional. Confira antes de seguir.</span></div>`;
}
function paintAlerts(m,d){
  (d?d.rows:[]).forEach(r=>{ const {cells}=rowAlerts(m,r); ["a","b"].forEach(w=>["s","r","c"].forEach(f=>{ const el=document.getElementById(`x-${r.id}-${w}${f}`); if(!el) return; el.classList.remove("al-hi","al-lo"); if(cells[w+f]) el.classList.add("al-"+cells[w+f]); })); });
  const box=document.getElementById("alr-"+m.id); if(box) box.innerHTML=alertsHTML(m,d);
}
/* Sugestão automática por exercício: segue a semana da programação e o que o aluno fez no último treino da mesma letra */
function loadInc(c){ return c<=5?1 : c<=25?2 : c<=60?4 : 5; }
function sugFor(m,prev){ if(!m||!prev||!prev.a) return null; const w=curWkPlan(m); if(!w) return null;
  const pa=prev.a; const pc=num(pa.c), pr=num(pa.r), ps=num(pa.s); if(!ps||!pr) return null; if(w.c==="nova") return null;
  const rr=String(w.r).split(/[–-]/).map(x=>parseInt(x,10)).filter(Boolean); const ss=String(w.s).split(/[–-]/).map(x=>parseInt(x,10)).filter(Boolean);
  const tr=rr[0]||pr, ts=ss[ss.length-1]||ps;
  const rows=wkPlan(m)||[]; const pw=rows[w.n-2]; const ptr= pw? parseInt(String(pw.r).split(/[–-]/)[0],10) : 0;
  if(ptr&&pr<ptr) return {s:ps,r:pr,c:pa.c,lab:"repetir (não completou)"};
  let c=pc, lab=[]; if(pc){ if(w.c==="sobe"){ c=pc+loadInc(pc); lab.push(`+${loadInc(pc)} kg`); } else if(w.c==="desce"){ c=Math.max(1,Math.round(pc*0.85)); lab.push("menos peso"); } }
  if(tr>pr) lab.push(`+${tr-pr} reps`); else if(tr<pr) lab.push(`${tr} reps`);
  return {s:ts,r:tr,c:pc?String(c).replace(".",","):"",lab:lab.join(" · ")||"manter"}; }
/* ---------- Ditado por voz na linha do exercício ---------- */
let vozRow=null, vozRec=null;
const VOZ_N={um:1,uma:1,dois:2,duas:2,"três":3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100};
function vozParse(txt){ let t=" "+String(txt||"").toLowerCase().replace(/,/g,".")+" ";
  t=t.replace(/[a-zçãõéêíóú]+/g,w=> VOZ_N[w]!=null? String(VOZ_N[w]) : w);
  t=t.replace(/(\d+)0 e (\d)\b/g,(m,a,b)=>String(+a*10+ +b)).replace(/(\d+) e meio/g,"$1.5").replace(/(\d+) e (\d+)(?= ?(kg|quilo|kilo))/g,"$1.$2");
  const o={}; let m;
  if((m=t.match(/(\d+)\s*(?:x|vezes|por|de)\s*(\d+)(?!\s*(?:\.\d+)?\s*(?:kg|quilos?|kilos?|k\b))/))){ o.s=m[1]; o.r=m[2]; }
  if((m=t.match(/(\d+)\s*s[ée]ries?/))) o.s=m[1];
  if(!o.r&&(m=t.match(/(\d+)\s*s[ée]ries?\s*(?:de|com|por)?\s*(\d+)(?!\s*(?:\.\d+)?\s*(?:kg|quilos?|kilos?|k\b))/))) o.r=m[2];
  if((m=t.match(/(\d+)\s*(?:repeti[çc][õoãa](?:es|o)?|reps?\b|vezes)/))) o.r=m[1];
  if((m=t.match(/(\d+(?:\.\d+)?)\s*(?:kg|quilos?|kilos?|k\b)/))||(m=t.match(/(?:com|carga(?: de)?|peso(?: de)?)\s*(\d+(?:\.\d+)?)/))) o.c=m[1].replace(".",",");
  const nums=(t.match(/\d+(?:\.\d+)?/g)||[]);
  if(!o.s&&!o.r&&!o.c&&nums.length>=2){ o.s=nums[0]; o.r=nums[1]; if(nums[2]) o.c=nums[2].replace(".",","); }
  else if(!o.s&&!o.r&&o.c){ const rest=nums.slice(); const ci=rest.lastIndexOf(o.c.replace(",",".")); if(ci>=0) rest.splice(ci,1); if(rest.length>=2){ o.s=rest[0]; o.r=rest[1]; } }
  const cut=t.search(/\d|\bs[ée]ries?\b|\bcom\b|\bcarga\b/); let nm=(cut>0? t.slice(0,cut) : (nums.length? "" : t)).replace(/\b(exerc[íi]cio|fazer|fiz|de|o|a)\s*$/,"").trim();
  if(nm) o.n=nm.charAt(0).toUpperCase()+nm.slice(1);
  return o; }
function vozApply(row,o){ const set=(id,v)=>{ const el=document.getElementById(id); if(!el||v==null) return; el.value=v; el.dispatchEvent(new Event("input",{bubbles:true})); el.dispatchEvent(new Event("change",{bubbles:true})); };
  set("n1-"+row.id,o.n); set("x-"+row.id+"-as",o.s); set("x-"+row.id+"-ar",o.r); set("x-"+row.id+"-ac",o.c);
  try{ if(o.n) row.n1=o.n; if(o.s) row.a.s=o.s; if(o.r) row.a.r=o.r; if(o.c) row.a.c=o.c; save(); if(cvMode()==="card") setTimeout(renderSessao,50); }catch(_){} }
function vozStart(row){ const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(vozRec){ try{ vozRec.stop(); }catch(e){} return; }
  if(!SR){ toast("Este navegador não tem ditado. Use o 🎤 do teclado do celular."); return; }
  const rec=new SR(); vozRec=rec; vozRow=row.id; rec.lang="pt-BR"; rec.interimResults=true; rec.maxAlternatives=1; let fin="";
  const pill=document.getElementById("vozPill")||(()=>{ const d=document.createElement("div"); d.id="vozPill"; document.body.appendChild(d); return d; })();
  const mark=on=>{ const b=document.querySelector(`[data-row="${row.id}"] [data-mic]`); if(b) b.classList.toggle("on",on); };
  pill.innerHTML=`<b>🎤 Ouvindo…</b><span>Ex.: “supino reto 4 séries 10 repetições 40 quilos”</span>`; pill.hidden=false; mark(true);
  rec.onresult=e=>{ let tmp=""; for(let i=e.resultIndex;i<e.results.length;i++){ if(e.results[i].isFinal) fin+=e.results[i][0].transcript+" "; else tmp+=e.results[i][0].transcript; } pill.innerHTML=`<b>🎤 Ouvindo…</b><span>${esc((fin+tmp).trim()||"…")}</span>`; };
  rec.onerror=e=>{ const c=e&&e.error; if(c==="not-allowed"||c==="service-not-allowed") toast("Libere o microfone para este site nas permissões do navegador."); else if(c==="no-speech") toast("Não ouvi nada. Toque no 🎤 e fale de novo."); else if(c!=="aborted") toast("Não consegui ouvir ("+c+")."); };
  rec.onend=()=>{ vozRec=null; vozRow=null; pill.hidden=true; mark(false); const txt=fin.trim(); if(!txt) return; const o=vozParse(txt);
    if(!o.n&&!o.s&&!o.r&&!o.c){ toast("Não entendi: “"+txt+"”"); return; } vozApply(row,o);
    toast("🎤 "+[o.n,o.s&&o.r?o.s+"×"+o.r:o.s?o.s+" séries":o.r?o.r+" reps":"",o.c?o.c+" kg":""].filter(Boolean).join(" · ")); };
  try{ rec.start(); }catch(e){ vozRec=null; vozRow=null; pill.hidden=true; mark(false); toast("Não consegui abrir o microfone."); } }
let CJ_ASK=null; const HIST={}, HISTR={}, FIRSTX={};
function rowHTML(row,i,prev,linkPrev,sg,cpTo){
  const k=rowReg(row,"a"); const named=!!row.n1.trim()||!!row.reg;
  const isoSo=row.iso&&(row.a.isoM||"so")==="so";
  const PV=prev&&prev.a&&!(prev.iso&&(prev.a.isoM||"so")==="so")? prev.a : null; const AR=f=> PV&&!isoSo? arwH(f, f==="v"? vol(row.a) : num(row.a[f]), f==="v"? vol(PV) : num(PV[f])) : "";
  const cell=f=> f==="r"&&isoSo? `<span class="xcw"><button class="xunib ${isUni(row)?"on":""}" data-unil aria-pressed="${isUni(row)}" title="Unilateral: a isometria vale para cada lado">Uni</button><span class="xc xc-na" title="Só isometria: conta só as séries">${num(row.a.sec)?(isUni(row)?`<span class="xisou">${row.a.sec}"/${row.a.sec}"</span>`:row.a.sec+'"'):"—"}</span></span>`
    : f==="r"? `<span class="xcw">${true?`<button class="xunib ${isUni(row)?"on":""}" data-unil aria-pressed="${isUni(row)}" title="Unilateral: divide as repetições por lado">Uni</button>`:""}<button class="xunib xfal ${row.a.f?"on":""}" data-falha="a" aria-pressed="${!!row.a.f}" title="Até a falha">Falha</button><input class="xc" type="text" inputmode="numeric" data-x="a.r" ${isUni(row)?"data-ur":""} id="x-${row.id}-ar" value="${esc(isUni(row)&&String(row.a.r).trim()?row.a.r+"/"+row.a.r:row.a.r)}">${AR("r")}</span>`
    : f==="s"? `<span class="xcw xcw-b"><input class="xc" type="text" inputmode="numeric" data-x="a.s" id="x-${row.id}-as" value="${esc(row.a.s)}">${AR("s")}<button class="xunib xaddl" data-addl title="Adicionar linha a este exercício">+ linha</button></span>`
    : `<span class="xcw xcw-c"><input class="xc" type="text" inputmode="${f==="c"?"decimal":"numeric"}" data-x="a.${f}" id="x-${row.id}-a${f}" value="${esc(row.a[f])}">${AR(f)}</span>`;
  const SB=subsOf(row); const K=2+(sg?1:0)+(row.iso?1:0)+SB.length+(TEC_MODE?1:0);
  const pv=prev? prev.a : null; const pn=prev? (prev.n1||"").trim() : "";
  const pc=v=>`<span class="xp num">${pv&&v!==""&&v!=null?esc(String(v)):""}</span>`;
  const same= sg&&String(row.a.s)===String(sg.s)&&String(row.a.r)===String(sg.r)&&String(row.a.c).replace(".",",")===String(sg.c);
  const sgH= sg? `<span class="xs xsn"><button class="xsug ${same?"ok":""}" data-sugok='${esc(JSON.stringify({s:sg.s,r:sg.r,c:sg.c}))}' title="Toque para usar a sugestão">${same?"✓ ":"Sug. "}${esc(sg.lab)}</button></span><span class="xs num">${sg.s}</span><span class="xs num">${sg.r}</span><span class="xs num">${sg.c||""}</span><span class="xs"></span>` : "";
  return `<div class="xrow xr1 ${row.cp?"xr-cp":""} ${sg?"xr-sug":""} ${row.iso?"xr-iso":""} ${row.cj?"cja":""} ${linkPrev?"cjb":""} ${SB.length?"xr-subs":""}" data-row="${row.id}" ${SB.length?`style="grid-template-rows:repeat(${K},auto)!important"`:""}>
    <div class="xg ${linkPrev?"xg-cj":""}" ${SB.length?`style="grid-row:span ${K}"`:""}>${linkPrev?`<button class="xmic ${vozRow===row.id?"on":""}" data-mic aria-label="Falar o exercício conjugado" title="Falar: ex. flexora 3 séries 12 repetições 30 quilos">🎤</button><button class="xcj xcjrm" data-cjrm title="Separar este exercício do conjugado" aria-label="Separar do conjugado">✂</button><button class="xcj xcjadd" data-cjadd title="Conjugar mais um exercício">+ex.</button>`:`<button class="xmic ${vozRow===row.id?"on":""}" data-mic aria-label="Falar o exercício" title="Falar: ex. supino 4 séries 10 repetições 40 quilos">🎤</button><button class="xcj ${row.cj?"on":""}" data-cjt aria-pressed="${!!row.cj}" title="Conjugar: junta com o exercício de baixo ou abre um novo">Conj</button>`}${CJ_ASK===row.id?(()=>{ const nx=(dayOf(S.week,S.active,S.day)||{rows:[]}).rows; return `<div class="regpick cjpick" role="menu"><b class="tecph">Conjugar</b><button role="menuitem" data-cjjoin>🔗 Juntar com o de baixo</button><button role="menuitem" data-cjt data-cjnew>＋ Novo exercício</button><button role="menuitem" data-cjx class="tec-rm">Cancelar</button></div>`; })():""}<button class="xcj xisb ${row.iso?"on":""}" data-isot aria-pressed="${!!row.iso}" title="Isometria neste exercício">Iso</button>
      <button class="rb on r-${k} ${named?"":"dim"}" data-reg aria-expanded="${regPick===row.id}" aria-label="${REG_LABEL[k]}${rowSz(row,k)?` · músculo ${rowSz(row,k)==="G"?"grande":"pequeno"}`:""}: toque para trocar" title="${REG_LABEL[k]} · toque para trocar">${ICO[k]}${rowSz(row,k)?`<i class="rsz">${rowSz(row,k)}</i>`:""}</button>
      ${regPick===row.id?`<div class="regpick" role="menu">${[["MMSS","G","💪 Superior · grande"],["MMSS","P","💪 Superior · pequeno"],["MMII","G","🦵 Inferior · grande"],["MMII","P","🦵 Inferior · pequeno"],["Core","","🎯 Core"]].map(([R,z,t])=>`<button role="menuitem" data-regset="${R}|${z}" class="${k===R&&(R==="Core"||rowSz(row,k)===z)?"on":""}">${t}</button>`).join("")}</div>`:""}</div>
    <span class="xp xpn">${true?`<span class="xacts">${row.tec||TEC_MODE?`<button class="xtec ${row.tec?"on":""} ${TEC_MODE&&!row.tec?"pick":""}" data-tecb aria-expanded="${tecPick===row.id}" title="Método avançado">${row.tec?esc(TEC_SH[row.tec]||row.tec):"+ Método"}</button>`:""}${row.tec&&(row.tecR||row.tecD)?`<small class="xtecinfo">${row.tecR?esc(row.tecR)+" séries/rod.":""}${row.tecR&&row.tecD?" · ":""}${row.tecD?"rest "+esc(row.tecD)+'"':""}</small>`:""}</span>`:""}${pv?`<small class="xsp xsp2"><b>${prev&&prev._old?`Feito anteriormente (${ddmm(prev._old)}):`:"Sem. Pass.:"}</b> ${esc(pn||"—")}</small>`:FIRSTX[row.id]?`<small class="xsp xsp2">🆕 Primeira vez deste exercício (sem registro anterior)</small>`:HIST[row.id]?(()=>{ const P=HISTR[row.id]; const L=P? rowLines(P).filter(l=>!l.sub).map(l=>setTxt(l.x,0,l.u)).join(" + ") : ""; const sb=P? subsOf(P).filter(subUsed).map(x=>setTxt(x,0,uf(P))).join(" / ") : ""; return `<small class="xsp xsp2 xhist" title="Exercício que estava nesta posição na semana passada"><b>Sem. Pass.:</b> ${esc(HIST[row.id])}${L?` · <b>${esc(L)}</b>`:""}${sb?` · ${esc(sb)}`:""}${P?` <button class="xrep xrepall" data-rowrep="${esc(JSON.stringify({all:1,n:P.n1,a:P.a,sub:subsOf(P),tec:P.tec||"",cj:!!P.cj}))}" title="Trocar por este exercício com séries, repetições e carga">↻ Repetir</button>`:""}</small>`; })():""}<span class="xrepw">${row.cp?`<button class="xrep" data-rowrep title="Fez igual à semana passada: conta no gráfico">↻ Repetir</button>`:(pv&&(pv.s!==""||pv.r!==""||pv.c!=="")&&!(String(pv.s)===String(row.a.s)&&String(pv.r)===String(row.a.r)&&String(pv.c)===String(row.a.c))?`<button class="xrep" data-rowrep="${esc(JSON.stringify({n:pn,a:pv,sub:subsOf(prev)}))}" title="Repetir o que fez na semana passada">↻ Repetir</button>`:"")}</span>
      ${tecPick===row.id?`<div class="regpick tecpick" role="menu"><b class="tecph">${tecNew===row.id?"Criar método":"Método avançado"}</b>${tecNew===row.id?"":`${TEC_PICK.map(t=>`<span class="tecit"><button role="menuitem" data-tecset="${esc(t)}" class="${row.tec===t?"on":""}">${t}</button><button class="tecq" data-techelp="${esc(t)}" aria-label="O que é ${esc(t)}">?</button></span>`).join("")}${tecMine().map(c=>`<span class="tecmy"><button role="menuitem" data-tecset="${esc(c.n)}" class="${row.tec===c.n?"on":""}">★ ${esc(c.n)}</button><button class="tecdel" data-tecdel="${esc(c.n)}" aria-label="Apagar ${esc(c.n)}">×</button></span>`).join("")}<button role="menuitem" data-tecnew class="tec-new">＋ Criar método</button>${row.tec?`<button role="menuitem" data-tecset="" class="tec-rm">Sem método</button>`:""}`}
        ${tecNew===row.id?(()=>{ const c=tecMine().find(x=>x.n===row.tec)||{}; const rr=row.tec&&!TEC_PICK.includes(row.tec); return `<div class="tecnew"><label>Nome do método<input id="tn-n" value="${esc(rr?row.tec:"")}" placeholder="ex.: FST-7, Circuito, EMOM"></label><div class="tecnew2"><label>Séries/rodadas<input id="tn-r" inputmode="numeric" value="${esc(rr?(row.tecR||c.r||""):"")}" placeholder="ex.: 3"></label><label>Rest/descanso (seg)<input id="tn-d" inputmode="numeric" value="${esc(rr?(row.tecD||c.d||""):"")}" placeholder="ex.: 30"></label></div><div class="tecnew2"><button class="tec-ok" data-tecnewok>Salvar</button><button data-tecnewx>Cancelar</button></div></div>`; })():""}</div>`:""}</span>${pc(pv&&pv.s)}${pc(pv&&pv.r)}${pc(pv&&(num(pv.c)?pv.c:num(pv.sec)?pv.sec+'"':""))}<span class="xp num">${pv&&vol(pv)?nf(vol(pv)):""}</span>
    ${sgH}
    <span class="xnw"><textarea class="xn xn1" rows="1" data-n="n1" id="n1-${row.id}" spellcheck="false" aria-label="Exercício ${i+1}" placeholder="${esc(row.iso?"Isometria · ex.: Prancha":"")}">${esc(row.n1)}</textarea>${cpTo?`<button class="xcp xcpn" data-copyrow="${row.id}">📋 copiar ${esc(cpTo)}</button>`:""}</span>
    ${cell("s")}${cell("r")}${cell("c")}<span class="xdesc" style="grid-column:7;grid-row:1 / span ${K}"><button class="xdelc ${ROWDEL_ARM===row.id?"arm":""}" data-rowdel title="Apagar este exercício" aria-label="${ROWDEL_ARM===row.id?"Toque de novo para apagar":"Apagar este exercício"}">🗑<span class="xdl-t">${(ROWDEL_ARM===row.id?"DENOVO":"APAGAR").split("").map(c=>`<i>${c}</i>`).join("")}</span></button><button class="xrest ${row.rest?"on":""}" data-rrest title="Descanso deste exercício" aria-label="Descanso deste exercício">${row.rest?`${row.rest}"`:"⏱"}</button>${rrOpen===row.id?`<span class="rrpop" role="group" aria-label="Descanso deste exercício">${REST_OPTS.map(v=>`<button data-rrset="${v}" aria-pressed="${row.rest===v}">${v}"</button>`).join("")}${row.rest?`<button data-rrset="0">padrão</button>`:""}</span>`:""}</span><span class="xv num">${AR("v")}<span id="va-${row.id}">${isoSo?"Iso":vol(row.a)?nf(vol(row.a)*uf(row)):"0"}${isUni(row)&&!isoSo?`<small class="xvu">2 lados</small>`:""}</span></span>
    ${row.iso?`<span class="xiso-n"><span>⏱ Iso</span><select class="inp" data-isom aria-label="Onde entra a isometria">${Object.entries(ISO_M).map(([k,t])=>`<option value="${k}" ${(row.a.isoM||"so")===k?"selected":""}>${t}</option>`).join("")}</select></span>
      <input class="xc xiso-c" type="text" inputmode="numeric" data-isos aria-label="Séries com isometria" placeholder="${esc(row.a.s||"")}" value="${esc(row.a.isoS||"")}">
      <input class="xc xsec" type="text" inputmode="numeric" list="secsdl" data-sec aria-label="Segundos de isometria" placeholder="seg" value="${esc(row.a.sec||"")}">${secsDL()}<span class="xiso-e"></span><span class="xiso-e"></span>`:""}
    ${SB.map((x,j)=>`<span class="xsubn"><button class="xdl" data-dell="${j}" aria-label="Apagar esta linha">×</button>${esc(subLabel(row,j))}</span>${["s","r","c"].map(f=>{ const inp=`<input class="xc xcs" type="text" inputmode="${f==="c"?"decimal":"numeric"}" data-x="sub.${j}.${f}" id="x-${row.id}-s${j}${f}" value="${esc(x[f]||"")}">`; return f==="r"? `<span class="xcw xcws"><button class="xunib xfal ${x.f?"on":""}" data-falha="sub.${j}" aria-pressed="${!!x.f}" title="Até a falha">Falha</button>${inp}</span>` : inp; }).join("")}<span class="xv num" id="vs${j}-${row.id}">${vol(x)?nf(vol(x)*uf(row)):"0"}</span>`).join("")}
    ${TEC_MODE?`<div class="tecfull"><b>⚡ Método:</b>${TEC_PICK.concat(tecMine().map(c=>c.n)).map(t=>`<span class="tecit"><button data-tecset="${esc(t)}" class="${row.tec===t?"on":""}">${esc(({"Bi-set agonista":"Bi-set agonista","Bi-set antagonista":"Bi-set antagonista","Cadência controlada":"Cadência"})[t]||TEC_SH[t]||t)}</button><button class="tecq" data-techelp="${esc(t)}" aria-label="O que é ${esc(t)}">?</button></span>`).join("")}${row.tec?`<button class="tecrm" data-tecset="">✕ Sem método</button>`:""}</div>`:""}
  </div>`;
}
function totRowsHTML(m,T){
  return REG.map(k=>`<div class="xtot r-${k}"><span></span><span>Total ${k}</span><span class="num">${T.reg[k].s}</span><span class="num">${nf(T.reg[k].r)}</span><span></span><span class="num">${nf(T.reg[k].t)}</span><span></span></div>`).join("");
}
const ZCOL={0:"#9AA9A3",1:"#8FB8E8",2:"#2F6FE4",3:"#E9A23B",4:"#E2552D",5:"#B42318"};
/* Metas de cardio da semana (vezes, tempo total, distância e minutos por zona) */
let CDM_ED=null;
function cdMetaOf(m){ return Object.assign({n:"",min:"",km:"",z1:"",z2:"",z3:"",z4:"",z5:""},m.cdMeta||{}); }
function cdWeekReal(m,wid){ const o={n:0,min:0,km:0,z:{1:0,2:0,3:0,4:0,5:0}};
  DAYS.forEach(dy=>{ const dd=dayOf(wid,m.id,dy); if(!isReal(dd)) return; const t=totDay(dd); if(t.cmin>0) o.n++; o.min+=t.cmin; (t.segs||[]).forEach(([mn,z])=>{ if(z>=1&&z<=5) o.z[z]+=mn; });
    const C=dd.cardio||{}; const N=cardioN(C); for(let k=1;k<=N;k++){ const sx=k===1?"":String(k); const tm=num(C["t"+sx]), v=num(String(C["v"+sx]||"").replace(",",".")); if(tm>0&&v>0) o.km+=tm/60*v; } });
  o.min=Math.round(o.min*10)/10; o.km=Math.round(o.km*10)/10; return o; }
function cdMetaHTML(m,w){ const M=cdMetaOf(m), R=cdWeekReal(m,w.id); const f=v=>String(v).replace(".",",");
  const pill=(val,meta,u)=> num(meta)? `<span class="pill ${val>=num(meta)?"ok":"warn"}">${f(val)} / ${f(meta)}${u}</span>` : "";
  const has=["n","min","km","z1","z2","z3","z4","z5"].some(k=>num(M[k]));
  const resumo= has? `<div class="cdmres">${num(M.n)?`<span>Vezes ${pill(R.n,M.n,"")}</span>`:""}${num(M.min)?`<span>Tempo total ${pill(R.min,M.min," min")}</span>`:""}${num(M.km)?`<span>Distância ${pill(R.km,M.km," km")}</span>`:""}${[1,2,3,4,5].filter(z=>num(M["z"+z])).map(z=>`<span>Zona ${z} ${pill(R.z[z],M["z"+z]," min")}</span>`).join("")}</div>` : "";
  const inp=(k,l,ph)=>`<label>${l}<input class="inp" type="number" inputmode="decimal" min="0" data-cdm="${k}" value="${esc(M[k])}" placeholder="${ph}"></label>`;
  return `<div class="cdmeta"><button class="cdmbtn" data-cdmed>🎯 Metas de cardio para a semana <span>✏️</span></button>${resumo}
    ${CDM_ED===m.id?`<div class="cdmform">${inp("n","Vezes na semana","ex.: 3")}${inp("min","Tempo total (min)","ex.: 150")}${inp("km","Distância (km)","ex.: 10")}
      <b class="cdmz">Minutos por zona na semana</b><div class="cdmzg">${[1,2,3,4,5].map(z=>inp("z"+z,"Zona "+z,"min")).join("")}</div>
      <button class="btn small primary" data-cdmed>Pronto</button></div>`:""}</div>`; }
function weekCardHTML(m,wid){
  const W=totWeek(wid,m.id); const g=tg(m);
  const days=DAYS.map(dy=>({dy,segs:(W.days[dy].segs||[]),t:W.days[dy].cmin||0}));
  const mx0=Math.max(30,...days.flatMap(x=>x.segs.map(s2=>s2[0]))); const step=mx0<=40?10:mx0<=90?20:30; const mx=Math.ceil(mx0/step)*step;
  const Wd=320,H=165,pl=26,pb=32,pt=20; const ih=H-pb-pt; const cw=(Wd-pl-4)/7; const y=v=>pt+ih*(1-v/mx);
  let gr=""; for(let v=0;v<=mx;v+=step) gr+=`<line x1="${pl}" x2="${Wd}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="${v?0.6:1.2}"/><text x="${pl-4}" y="${y(v)+3.5}" text-anchor="end" font-size="9.5" fill="var(--muted)">${v}</text>`;
  const bars=days.map((x,i)=>{ const n=Math.max(1,x.segs.length); const slot=cw*.84; const bw=Math.min(slot/n-2,10); const x0=pl+4+i*cw+(cw-(bw*n+2*(n-1)))/2;
    const out=x.segs.map(([mn,z],k)=>{ const bx=x0+k*(bw+2); return `<rect x="${bx}" y="${y(mn)}" width="${bw}" height="${Math.max(ih*mn/mx,0)}" fill="${ZCOL[z]||ZCOL[0]}" rx="2"/><text x="${bx+bw/2}" y="${y(mn)-10}" text-anchor="middle" font-size="8.5" font-weight="800" fill="var(--fg)">${z?"Z"+z:""}</text><text x="${bx+bw/2}" y="${y(mn)-2}" text-anchor="middle" font-size="8.5" fill="var(--fg)">${mn}'</text>`; }).join("");
    return out+`<text x="${pl+4+i*cw+cw/2}" y="${H-pb+13}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">${x.dy}</text>${x.t?`<text x="${pl+4+i*cw+cw/2}" y="${H-pb+25}" text-anchor="middle" font-size="9" fill="var(--fg)">${x.t}' total</text>`:""}`; }).join("");
  const used=[...new Set(days.flatMap(x=>x.segs.map(s2=>s2[1])))].filter(Boolean).sort();
  return `<div class="cw-h"><span class="label">Cardio na semana</span><span class="pill ${W.eq? (W.eq>=g.cardio?"ok":"warn"):""}">${nf(W.eq)} / ${g.cardio} min</span></div>
    <svg viewBox="0 0 ${Wd} ${H}" width="100%" role="img" aria-label="Cardio por dia e zona na semana">${gr}${bars}</svg>
    ${used.length?`<div class="cw-leg">${used.map(z=>`<span><i style="background:${ZCOL[z]}"></i>Zona ${z}</span>`).join("")}</div>`:""}
    <p class="vw-note">Uma coluna para cada cardio do dia, com a zona e os minutos em cima. Zonas 4 e 5 contam em dobro na meta da semana.</p>`;
}

/* ---------- Controle em janela: sessão e semanal ---------- */
let ctlOv=null, semV={mode:"w",from:"",to:"",a:"",b:""};
function aggPeriod(sid,from,to){ const o={n:0,s:0,r:0,t:0,c:0,reg:{},ex:{}}; REG.forEach(k=>o.reg[k]={s:0,r:0,t:0});
  S.weeks.forEach(w=>DAYS.forEach((dy,j)=>{ const date=addDays(w.start,j); if((from&&date<from)||(to&&date>to)) return; const d=dayOf(w.id,sid,dy); if(!isReal(d)||!dayHasData(d)) return;
    const T=totDay(d); o.n++; o.s+=T.s; o.r+=T.r; o.t+=T.t; o.c+=T.cmin||0; REG.forEach(k=>{ o.reg[k].s+=T.reg[k].s; o.reg[k].r+=T.reg[k].r; o.reg[k].t+=T.reg[k].t; });
    d.rows.forEach(r=>{ if(r.cp) return; const nm=(r.n1||"").trim(); if(!nm) return; const SB=subsOf(r); const sv=num(r.a.s)+SB.reduce((a,x)=>a+num(x.s),0); if(!sv) return;
      const k=noAcc(nm).toLowerCase(); const e=o.ex[k]=o.ex[k]||{n:nm,x:0,s:0,r:0,t:0,mx:0};
      e.x++; e.s+=sv; e.r+=(num(r.a.s)*num(r.a.r)+SB.reduce((a,x)=>a+num(x.s)*num(x.r),0))*uf(r); e.t+=(vol(r.a)+SB.reduce((a,x)=>a+vol(x),0))*uf(r); e.mx=Math.max(e.mx,num(r.a.c),...SB.map(x=>num(x.c))); }); }));
  return o; }
function aggHTML(A2,lab){ const ex=Object.values(A2.ex).sort((a,b)=>b.x-a.x||a.n.localeCompare(b.n));
  return `<div class="aggk"><div><b>${A2.n}</b><span>treinos</span></div><div><b>${nf(A2.s)}</b><span>séries</span></div><div><b>${nf(A2.r)}</b><span>repetições</span></div><div><b>${nf(A2.t)}</b><span>kg tonelagem</span></div><div><b>${nf(A2.c)}</b><span>min cardio</span></div></div>
    <div class="aggreg">${REG.filter(k=>A2.reg[k].s).map(k=>`<span style="--c:${REG_COL[k]}"><i></i>${k}: <b>${nf(A2.reg[k].s)}</b> séries · <b>${nf(A2.reg[k].t)}</b> kg</span>`).join("")}</div>
    ${ex.length?`<table class="aggt"><thead><tr><th>Exercício</th><th>Vezes</th><th>Séries</th><th>Reps</th><th>Ton.</th><th>Máx kg</th></tr></thead><tbody>${ex.map(e=>`<tr><td>${esc(e.n)}</td><td>${e.x}</td><td>${nf(e.s)}</td><td>${nf(e.r)}</td><td>${nf(e.t)}</td><td>${e.mx?String(e.mx).replace(".",","):"–"}</td></tr>`).join("")}</tbody></table>`:`<p class="muted">Nenhum treino lançado ${lab}.</p>`}`; }
function semCtlHTML(m){ const w=S.weeks.find(x=>x.id===S.week); const today=addDays(w.start,DAYS.indexOf(S.day)); const M=semV.mode;
  const seg=`<div class="seg seg3" role="group"><button data-semmode="w" aria-pressed="${M==="w"}">Esta semana</button><button data-semmode="all" aria-pressed="${M==="all"}">Tudo até ${ddmm(today)}</button><button data-semmode="p" aria-pressed="${M==="p"}">Período</button><button data-semmode="cmp" aria-pressed="${M==="cmp"}">Comparar</button></div>`;
  let body="";
  if(M==="w"){ const A2=aggPeriod(m.id,w.start,addDays(w.start,6)); body=volWeekHTML(m)+aggHTML(A2,"nesta semana"); }
  else if(M==="all"){ body=aggHTML(aggPeriod(m.id,"",today),"até agora"); }
  else if(M==="p"){ const f=semV.from||addDays(today,-27), t=semV.to||today; body=`<div class="row semp"><label>De<input class="inp" type="date" data-semf value="${f}"></label><label>Até<input class="inp" type="date" data-semt value="${t}"></label></div>`+aggHTML(aggPeriod(m.id,f,t),"nesse período"); }
  else { const wi=S.weeks.indexOf(w); const a=S.weeks.find(x=>x.id===semV.a)||S.weeks[Math.max(0,wi-1)], b=S.weeks.find(x=>x.id===semV.b)||w;
    const opt=sel=>S.weeks.map(x=>`<option value="${x.id}" ${x===sel?"selected":""}>Semana ${x.n} · ${ddmm(x.start)}</option>`).join("");
    const A1=aggPeriod(m.id,a.start,addDays(a.start,6)), B1=aggPeriod(m.id,b.start,addDays(b.start,6)), WA=totWeek(a.id,m.id), WB=totWeek(b.id,m.id);
    const dl=(x,y)=>{ if(!x) return y?'<span class="pos">novo</span>':"–"; const p=Math.round((y-x)/x*100); return `<span class="${p>0?"pos":p<0?"neg":""}">${p>0?"+":""}${p}%</span>`; };
    const rows=[["Treinos",A1.n,B1.n],["Séries",A1.s,B1.s],["Repetições",A1.r,B1.r],["Tonelagem (kg)",A1.t,B1.t],...REG.map(k=>[`Séries ${k}`,A1.reg[k].s,B1.reg[k].s]),["Cardio (min)",A1.c,B1.c],["Cardio equivalente",Math.round(WA.eq||0),Math.round(WB.eq||0)]];
    body=`<div class="row semp"><label>Semana<select class="inp" data-cmpa>${opt(a)}</select></label><label>com<select class="inp" data-cmpb>${opt(b)}</select></label></div>
      <table class="aggt cmpt"><thead><tr><th></th><th>S${a.n}</th><th>S${b.n}</th><th>Dif.</th></tr></thead><tbody>${rows.map(([l,x,y])=>`<tr><td>${l}</td><td>${nf(x)}</td><td>${nf(y)}</td><td>${dl(x,y)}</td></tr>`).join("")}</tbody></table>`; }
  return `<div class="ctltool"><span></span><div class="fzb" role="group" aria-label="Tamanho"><button data-ctlz="-1" aria-label="Diminuir">A−</button><button data-ctlz="1" aria-label="Aumentar">A+</button></div></div>`+seg+body+`<p class="refnote">Faixas de referência com direção no ACSM 2026 (Currier et al., Med Sci Sports Exerc). São sugestões: quem determina é o conhecimento científico e a prática do profissional.</p><p class="muted" style="font-size:11.5px;margin:6px 0 0">Conta só os dias treinados. Os dias copiados da semana anterior e ainda não feitos não entram.</p>`; }
function ctlOvHTML(m,T){ const k=ctlOv.k;
  return `<div class="${k==="met"?"ctlov":"ctlin"}" role="${k==="met"?"dialog":"region"}" aria-label="${k==="ses"?"Controle da sessão":k==="met"?"Metas":"Controle semanal"}"><div class="ctlov-box"><div class="ctlov-h"><b>${k==="ses"?"📊 Controle da sessão":k==="met"?"🎯 Metas":"📅 Controle semanal"} · ${esc(first(m.name))}</b><button class="icon-btn" data-ctlov="x" aria-label="Fechar">✕</button></div>
    ${k==="ses"? `<div class="ctltool"><div class="seg segv" role="group" aria-label="Ver como">${[["bar","Barras"],["col","Gráfico"],["pie","Pizza"]].map(([v,l])=>`<button data-ctlv="${v}" aria-pressed="${ctlView()===v}">${l}</button>`).join("")}</div><div class="fzb" role="group" aria-label="Tamanho"><button data-ctlz="-1" aria-label="Diminuir">A−</button><button data-ctlz="1" aria-label="Aumentar">A+</button></div></div>
      <div class="ctl ctlz" id="ctl-${m.id}" style="zoom:${ctlZoom()}">${ctlHTML(m,T)}</div>` : k==="met"? metasHTML(m) : `<div class="ctlz" style="zoom:${ctlZoom()}">${semCtlHTML(m)}</div>`}</div></div>`; }
let mvOpen=null, mvWk=null;
function mvHTML(m,w,others){ const wk=S.weeks.find(x=>x.id===(mvWk||w.id))||w; const wi=S.weeks.indexOf(wk);
  return `<div class="mvbox"><b>Mover o treino de ${esc(first(m.name))} (${DAY_N[S.day]} ${ddmm(addDays(w.start,DAYS.indexOf(S.day)))}) para:</b>
    <div class="row" style="align-items:center"><button class="icon-btn" data-mvwk="-1" ${wi<=0?"disabled":""} aria-label="Semana anterior">‹</button><span>Semana ${wk.n} · ${ddmm(wk.start)}</span><button class="icon-btn" data-mvwk="1" ${wi>=S.weeks.length-1?"disabled":""} aria-label="Próxima semana">›</button></div>
    <div class="daychips">${DAYS.map(dy=>{ const same=wk.id===w.id&&dy===S.day; const has=dayHasData(dayOf(wk.id,m.id,dy)); return `<button data-mvto="${dy}" ${same?"disabled":""}>${dy}<small>${ddmm(addDays(wk.start,DAYS.indexOf(dy)))}</small>${has?'<span class="dot"></span>':""}</button>`; }).join("")}</div>
    ${others.length?`<label class="mvall"><input type="checkbox" id="mv-all"> Mover também ${others.map(o=>esc(first(o.name))).join(" e ")}</label>`:""}
    <small class="muted">Se o dia escolhido já tiver treino (ponto azul), os dois trocam de lugar.</small>
    <button class="btn small ghost" data-mvopen style="justify-self:start">Cancelar</button></div>`; }

/* ---------- Cronômetro de cardio (AMRAP, Por tempo, EMOM, Tabata, Mix) ---------- */
const TM_MODES={crono:{n:"⏱ CRONÔMETRO",c:"#2B3440"},amrap:{n:"AMRAP",c:"#E0913F"},fortime:{n:"POR TEMPO",c:"#5B6EF5"},emom:{n:"EMOM",c:"#8E1CDB"},tabata:{n:"TABATA",c:"#3FAE7E"},mix:{n:"MIX",c:"#444"}};
const TM_DEF={crono:{},amrap:{min:10,sec:0},fortime:{cap:15},emom:{every:60,rounds:10},tabata:{work:20,rest:10,rounds:8},mix:{blocks:[{t:"emom",every:60,rounds:5},{t:"rest",sec:60},{t:"tabata",work:20,rest:10,rounds:8}]},prep:10};
function tmMineL(){ return Array.isArray(S.tmMine)? S.tmMine : []; }
function tmModes(){ const o=Object.assign({},TM_MODES); tmMineL().forEach(c=>{ o["c_"+c.id]={n:String(c.n||"Meu cronômetro").toUpperCase(),c:"#1F7A8C",mine:1}; }); return o; }
function tmCfg(mode){ S.tmr=S.tmr||{}; if(S.tmr.prep==null) S.tmr.prep=10; if(String(mode).startsWith("c_")){ return tmMineL().find(c=>"c_"+c.id===mode)||{n:"",rounds:1,work:0,rest:0}; } if(!S.tmr[mode]) S.tmr[mode]=JSON.parse(JSON.stringify(TM_DEF[mode])); if(S.tmr.prep==null) S.tmr.prep=10; return S.tmr[mode]; }
let tmrEd=null, TMR=null, TMR_I=null;
const tmN=v=>Math.max(0,Math.round(+String(v).replace(",","."))||0);
function tmBlockSeq(b){ const out=[];
  if(b.t==="crono") out.push({lab:"Cronômetro",k:"up",d:5940});
  else if(b.t==="amrap") out.push({lab:"AMRAP",k:"work",d:tmN(b.min)*60+tmN(b.sec),cnt:1});
  else if(b.t==="fortime") out.push({lab:"Por tempo",k:"up",d:tmN(b.cap)*60,cnt:1});
  else if(b.t==="emom"){ const n=Math.max(1,tmN(b.rounds)); for(let i=0;i<n;i++) out.push({lab:"EMOM",k:"work",d:Math.max(5,tmN(b.every)),r:i+1,of:n}); }
  else if(b.t==="tabata"){ const n=Math.max(1,tmN(b.rounds)); for(let i=0;i<n;i++){ out.push({lab:"Trabalho",k:"work",d:Math.max(1,tmN(b.work)),r:i+1,of:n}); if(i<n-1&&tmN(b.rest)) out.push({lab:"Descanso",k:"rest",d:tmN(b.rest),r:i+1,of:n}); } }
  else if(b.t==="rest") out.push({lab:"Rest",k:"rest",d:Math.max(1,tmN(b.sec))});
  else if(String(b.t).startsWith("c_")){ const n=Math.max(1,tmN(b.rounds)), wk=tmN(b.work), rs=tmN(b.rest), W2=(b.works||[]).filter(x=>tmN(x.s)), le=tmN(b.lrEvery), ls=tmN(b.lrSec); const l1=String(b.wn||"").trim()||(W2.length?"Trabalho 1":"Série");
    for(let i=0;i<n;i++){ out.push(wk? {lab:l1,k:"work",d:wk,r:i+1,of:n} : {lab:l1,k:"man",d:5940,r:i+1,of:n}); W2.forEach((x,j)=>out.push({lab:String(x.n||"").trim()||"Trabalho "+(j+2),k:"work",d:tmN(x.s),r:i+1,of:n}));
      if(i<n-1){ if(le&&ls&&(i+1)%le===0) out.push({lab:"Descanso longo",k:"rest",d:ls,r:i+1,of:n}); else if(rs) out.push({lab:"Descanso",k:"rest",d:rs,r:i+1,of:n}); } } }
  return out.filter(x=>x.d>0); }
function tmSeq(mode){ const c=tmCfg(mode); let bl= mode==="mix"? (c.blocks||[]) : [Object.assign({t:mode},c)];
  if(mode!=="mix"){ const n=Math.max(1,tmN(c.reps||1)), r=tmN(c.rrest); const L=[]; for(let i=0;i<n;i++){ L.push(Object.assign({t:mode},c,{_set:i+1,_sets:n})); if(i<n-1&&r) L.push({t:"rest",sec:r}); }
    (c.more||[]).forEach(b=>{ if(tmN(b.rb)) L.push({t:"rest",sec:tmN(b.rb)}); const k=Math.max(1,tmN(b.reps||1)); for(let i=0;i<k;i++){ L.push(Object.assign({t:mode},b,{_set:i+1,_sets:k})); if(i<k-1&&tmN(b.rrest)) L.push({t:"rest",sec:tmN(b.rrest)}); } }); bl=L; }
  const seq=[];   bl.forEach((b,bi)=>tmBlockSeq(b).forEach(x=>{ const MM=tmModes(); x.c=MM[b.t]?MM[b.t].c:"#2F8F5B"; x.blk=bi; if(b._sets>1) x.set=`Série ${b._set}/${b._sets}`; seq.push(x); }));
  const p=tmN(S.tmr.prep); if(p&&mode!=="crono") seq.unshift({lab:"Prepare",k:"prep",d:p,c:"#666"}); return seq; }
const tmFmt=s=>{ s=Math.max(0,Math.ceil(s)); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); };
function tmTotal(mode){ return tmSeq(mode).reduce((a,x)=>a+(x.k==="prep"||x.k==="man"?0:x.d),0); }
function tmBlockTxt(b){ if(String(b.t).startsWith("c_")){ const W2=(b.works||[]).filter(x=>tmN(x.s)); return `${b.n||"Cronômetro"}: ${Math.max(1,tmN(b.rounds))} séries/rodadas${tmN(b.work)?` de ${tmN(b.work)}"${String(b.wn||"").trim()?" "+b.wn:""}`:""}${W2.map(x=>` + ${tmN(x.s)}"${String(x.n||"").trim()?" "+x.n:""}`).join("")}${tmN(b.rest)?` · rest ${tmN(b.rest)}"`:""}${tmN(b.lrEvery)&&tmN(b.lrSec)?` · descanso ${tmN(b.lrSec)}" a cada ${tmN(b.lrEvery)} rodadas`:""}`; } return b.t==="amrap"?`AMRAP ${tmN(b.min)}'${tmN(b.sec)?tmN(b.sec)+'"':""}`:b.t==="fortime"?`Por tempo (limite ${tmN(b.cap)}')`:b.t==="emom"?`EMOM ${tmN(b.rounds)}x a cada ${tmN(b.every)}"`:b.t==="tabata"?`Tabata ${tmN(b.rounds)}x ${tmN(b.work)}"/${tmN(b.rest)}"`:`Rest ${tmN(b.sec)}"`; }
function tmSummary(mode){ if(mode==="crono") return "Conta o tempo do zero, sem limite. Toque ✔ para parar."; const c=tmCfg(mode); if(String(mode).startsWith("c_")) return tmBlockTxt(Object.assign({t:mode},c)); const n=Math.max(1,tmN(c.reps||1)); return mode==="mix"? "Mix: "+(c.blocks||[]).map(tmBlockTxt).join(" + ") : (n>1?`${n}x `:"")+tmBlockTxt(Object.assign({t:mode},c))+(n>1&&tmN(c.rrest)?` · rest ${tmN(c.rrest)}" entre`:"")+(c.more||[]).map(b=>{ const k=Math.max(1,tmN(b.reps||1)); return (tmN(b.rb)?` + rest ${tmN(b.rb)}"`:"")+" + "+(k>1?`${k}x `:"")+tmBlockTxt(Object.assign({t:mode},b)); }).join(""); }
function tmFields(b,pre){ const f=(k,l,u)=>`<label>${l}<input class="inp tmn" type="number" inputmode="numeric" min="0" ${pre}="${k}" value="${esc(String(b[k]??""))}"${u?` placeholder="${u}"`:""}></label>`;
  return b.t==="amrap"? f("min","Minutos")+f("sec","Segundos") : b.t==="fortime"? f("cap","Limite (min)") : b.t==="emom"? f("every","A cada (seg)")+f("rounds","Rodadas") : b.t==="tabata"? f("work","Trabalho (seg)")+f("rest","Descanso (seg)")+f("rounds","Rodadas") : f("sec","Rest (seg)"); }
function tmrHTML(m){ const MM=tmModes(); const btns=Object.entries(MM).filter(([k])=>!["amrap","fortime","emom","mix"].includes(k)).map(([k,v])=>`<button class="tmb ${tmrEd&&tmrEd.sid===m.id&&tmrEd.mode===k?"on":""}" style="--tc:${v.c}" data-tmopen="${k}">${v.mine?"★ ":""}${esc(v.n)}</button>`).join("").replace(/(<button class="tmb [^"]*" style="[^"]*" data-tmopen="(amrap|fortime|emom|tabata|mix)">[^<]*<\/button>)/g,(m0,b0,k0)=>`<span class="tmbw">${b0}${qtip("t_"+k0)}</span>`)+`<span class="tmbw"><button class="tmb tmnew" data-tmnew>＋ CRIAR</button>${qtip("t_criar")}</span>`;
  let ed=""; if(tmrEd&&tmrEd.sid===m.id){ const mode=tmrEd.mode, c=tmCfg(mode);
    const body= String(mode).startsWith("c_")? `<div class="tmf tmv tmmine"><label class="tmnm">Nome<input class="inp" data-tmname value="${esc(c.n||"")}" placeholder="ex.: Séries do supino"></label><label>Séries/rodadas<input class="inp tmn" type="number" inputmode="numeric" min="1" data-tmk="rounds" value="${esc(String(c.rounds??""))}"></label><label>Rest/descanso (seg)<input class="inp tmn" type="number" inputmode="numeric" min="0" data-tmk="rest" value="${esc(String(c.rest??""))}"></label></div>
      <div class="tmws"><b class="tmwh">Trabalho de cada rodada</b>
        <div class="tmw"><input class="inp" data-tmwn="-1" value="${esc(c.wn||"")}" placeholder="Movimento (ex.: Burpee)"><input class="inp tmn" type="number" inputmode="numeric" min="0" data-tmk="work" value="${tmN(c.work)?esc(String(c.work)):""}" placeholder="livre"><small>seg</small><button class="tmwadd" data-tmwadd aria-label="Mais um tempo de trabalho" title="Mais um tempo de trabalho">＋</button></div>
        ${(c.works||[]).map((x,i)=>`<div class="tmw"><input class="inp" data-tmwn="${i}" value="${esc(x.n||"")}" placeholder="Movimento ${i+2}"><input class="inp tmn" type="number" inputmode="numeric" min="0" data-tmws="${i}" value="${tmN(x.s)?esc(String(x.s)):""}" placeholder="seg"><small>seg</small><button class="tmwdel" data-tmwdel="${i}" aria-label="Tirar">✕</button></div>`).join("")}
        <div class="tmlr">⏸ Descanso de <input class="inp tmn" type="number" inputmode="numeric" min="0" data-tmk="lrSec" value="${tmN(c.lrSec)?esc(String(c.lrSec)):""}" placeholder="seg"> seg após cada <input class="inp tmn" type="number" inputmode="numeric" min="0" data-tmk="lrEvery" value="${tmN(c.lrEvery)?esc(String(c.lrEvery)):""}" placeholder="X"> rodadas</div></div>
      <p class="muted" style="font-size:12px;margin:0">Ex.: 3 rodadas de 10" de agachamento + 30" de prancha, rest 60". Trabalho vazio = tempo livre: o aluno faz a série no ritmo dele e você toca <b>✔</b> quando terminar; aí o descanso conta sozinho.</p><button class="btn small ${armAct&&armAct.sid===m.id&&armAct.k==="tmdel"+String(mode).slice(2)?"danger":"ghost"}" data-tmdelmine style="justify-self:start">${armAct&&armAct.sid===m.id&&armAct.k==="tmdel"+String(mode).slice(2)?"Toque de novo para apagar":"Apagar este cronômetro"}</button>`
      : mode==="mix"? (()=>{ const B=c.blocks||[]; const OPT=[["amrap","AMRAP"],["fortime","Por tempo"],["emom","EMOM"],["tabata","Tabata"]];
      const plus=i=>`<button class="tmstrip tmplus" data-tmadd="rest|${i}" title="Pôr rest aqui"><b>+</b><span>REST</span></button>`;
      return `<div class="tmrow">${B.map((b,i)=> b.t==="rest"
        ? `<div class="tmstrip"><span>REST</span><input class="inp tmn tms" type="number" inputmode="numeric" min="0" data-tmb="${i}" data-k="sec" value="${esc(String(b.sec??""))}" aria-label="Rest (seg)"><small>seg</small><button class="tmsx" data-tmdel="${i}" aria-label="Tirar rest">✕</button></div>`
        : `<div class="tmcol tmmcol" style="--tc:${TM_MODES[b.t].c}"><select class="inp tmsel" data-tmbt="${i}">${OPT.map(([v,l])=>`<option value="${v}" ${b.t===v?"selected":""}>${l}</option>`).join("")}<option value="rest">Rest</option></select>
            <div class="tmmv"><button class="icon-btn" data-tmmv="${i}|-1" ${i?"":"disabled"} aria-label="Para a esquerda">←</button><button class="icon-btn" data-tmmv="${i}|1" ${i<B.length-1?"":"disabled"} aria-label="Para a direita">→</button><button class="icon-btn" data-tmdel="${i}" aria-label="Apagar">✕</button></div>
            <div class="tmf tmv">${tmFields(b,`data-tmb="${i}" data-k`)}</div></div>${B[i+1]&&B[i+1].t!=="rest"?plus(i+1):""}`).join("")}
        <div class="tmaddc">${[["amrap","+ AMRAP"],["fortime","+ Por tempo"],["emom","+ EMOM"],["tabata","+ Tabata"],["rest","+ Rest"]].map(([v,l])=>`<button class="btn small" data-tmadd="${v}|end">${l}</button>`).join("")}</div></div>`; })()
      : mode==="crono"? `<p class="muted" style="margin:4px 0">Cronômetro simples: começa do zero e conta até você tocar <b>✔</b> (terminou) ou ✕.</p>`
      : (()=>{ const col=(b,pre,title,del)=>`<div class="tmcol">${title?`<div class="tmmore-h"><b>${title}</b>${del!=null?`<button class="icon-btn" data-tmmdel="${del}" aria-label="Apagar ${title}">✕</button>`:""}</div>`:""}<div class="tmf tmv">${tmFields(Object.assign({t:mode},b),pre)}
          <label>Repetir (vezes)<input class="inp tmn" type="number" inputmode="numeric" min="1" ${pre}="reps" value="${esc(String(b.reps||1))}"></label>
          <label class="tmrl">⏸ Rest entre (seg)<input class="inp tmn" type="number" inputmode="numeric" min="0" ${pre}="rrest" value="${esc(String(b.rrest??60))}"></label></div></div>`;
        const more=(c.more||[]);
        return `<div class="tmrow">${col(c,"data-tmk",more.length?"Tempo 1":"",null)}${more.map((b,i)=>`<div class="tmstrip" title="Rest entre os tempos"><span>REST</span><input class="inp tmn tms" type="number" inputmode="numeric" min="0" data-tmm="${i}" data-k="rb" value="${tmN(b.rb)?esc(String(b.rb)):""}" placeholder="0" aria-label="Rest antes do tempo ${i+2} (seg)"><small>seg</small></div>${col(b,`data-tmm="${i}" data-k`,"Tempo "+(i+2),i)}`).join("")}<button class="tmaddt" data-tmmore>+ Adicionar tempo</button></div>`; })();
    const right="";
    const live=`<div class="tmlive" id="tmlive-${m.id}">${tmLiveHTML()}</div>`;
    ed=`<div class="tmed" style="--tc:${(MM[mode]||{c:"#444"}).c}"><b>${esc((MM[mode]||{n:""}).n)}</b>${body}
      ${mode==="crono"?"":`<div class="tmf ${mode==="mix"?"":"tmv"}"><label>Preparação (seg)<input class="inp tmn" type="number" inputmode="numeric" min="0" data-tmprep value="${esc(String(S.tmr.prep))}"></label></div>`}
      <p class="muted tmsum">${esc(tmSummary(mode))}${tmSeq(mode).some(z=>z.k==="man")||mode==="crono"?"":` · total ${tmFmt(tmTotal(mode))}`}</p>${live}
      <div class="row"><button class="btn primary" data-tmgo>▶ Iniciar</button><button class="btn small ghost" data-tmopen="${mode}">Fechar</button></div>${mode==="tabata"?`<button class="slbtn vidbtn tbmus" data-tbmus style="margin-top:10px">🎵 Músicas para Tabata</button>`:""}</div>`; }
  return `<div class="tmbox"><span class="xc2-h tmtit">Timers</span><div class="tmbtns">${btns}</div>${ed}</div>`; }
function tmLiveHTML(){ if(!TMR) return `<span class="tml-idle">⏱ o tempo aparece aqui</span>`;
  const x=TMR.seq[Math.min(TMR.i,TMR.seq.length-1)]; const l=tmLeft(); const shown= TMR.done? (TMR.fin? tmFmt(TMR.fin) : "0:00") : (x.k==="up"||x.k==="man")? tmFmt(x.d-l) : tmFmt(l);
  return `<div class="tml" style="--lc:${TMR.done||x.k==="rest"?"#2F8F5B":x.c}"><small>${TMR.done?"Fim!":esc(x.lab)}${!TMR.done&&x.r?` ${x.r}/${x.of}`:""}${!TMR.done&&x.set?` · ${x.set}`:""}</small><b>${shown}</b>${TMR.seq.some(z=>z.cnt)?`<small>rodadas: ${TMR.rounds}</small>`:""}</div>`; }
function tone(f,d,v){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); const o=AC.createOscillator(),g=AC.createGain(); o.type="square"; o.frequency.value=f; const t=AC.currentTime; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(v||0.3,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+d); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t+d+0.02); }catch(e){} }
function tmStart(mode,sid){ const seq=tmSeq(mode); if(!seq.length){ toast("Configure o tempo primeiro"); return; }
  tone(880,0.12,0.05); TMR={mode,sid,seq,i:0,end:Date.now()+seq[0].d*1000,st:Date.now(),paused:false,left:0,rounds:0,beeped:{},done:false,min:!!window.RP_LIMPO};
  keepAwake(); clearInterval(TMR_I); TMR_I=setInterval(tmTick,200); tmRender(); }
function tmNext(){ if(!TMR) return; const cur=TMR.seq[TMR.i]; TMR.i++; if(TMR.i>=TMR.seq.length){ TMR.done=true; TMR.fin=cur&&cur.k==="up"? (Date.now()-TMR.st)/1000 : 0; beep(); if(document.visibilityState!=="visible") ntfShow("⏰ Cronômetro terminou","Toque para voltar ao treino."); clearInterval(TMR_I); tmRender(); return; }
  const x=TMR.seq[TMR.i]; TMR.end=Date.now()+x.d*1000; TMR.st=Date.now(); TMR.beeped={}; tone(x.k==="rest"?660:1320,0.45); tmRender(); }
/* Timer grande: dá para arrastar pela tela e aumentar/diminuir pelo canto ⇲ */
let TMPOS=null; try{ TMPOS=JSON.parse(localStorage.getItem("rp_tmpos")||"null"); }catch(e){}
function tmPlace(el){ if(window.RP_LIMPO&&TMR&&TMR.min){ bubPlace(el); return; } if(TMR&&TMR.big&&!TMR.min&&TMPOS){ const W=Math.max(220,Math.min(window.innerWidth-8,TMPOS.w||420)); el.style.width=W+"px"; el.style.left=Math.max(0,Math.min(window.innerWidth-60,TMPOS.x))+"px"; el.style.top=Math.max(0,Math.min(window.innerHeight-60,TMPOS.y))+"px"; el.style.transform="none"; el.style.setProperty("--tz",W/620); }
  else { el.style.width=""; el.style.left=""; el.style.top=""; el.style.transform=""; el.style.setProperty("--tz",TMR&&TMR.big? Math.min(620,window.innerWidth*0.96)/620 : 1); } }
function tmSavePos(){ try{ localStorage.setItem("rp_tmpos",JSON.stringify(TMPOS)); }catch(e){} }
document.addEventListener("pointerdown",e=>{ const el=e.target.closest&&e.target.closest("#tmrbar.big"); if(!el) return; const rs=e.target.closest(".tm-rs"); if(!rs&&e.target.closest("button")) return;
  const r=el.getBoundingClientRect(); const z=parseFloat(getComputedStyle(document.body).zoom)||1; const st={x:e.clientX,y:e.clientY,l:r.left/z,t:r.top/z,w:r.width/z,rs:!!rs};
  if(!TMPOS) TMPOS={x:st.l,y:st.t,w:st.w}; e.preventDefault(); try{ el.setPointerCapture(e.pointerId); }catch(_){}
  const mv=ev=>{ const dx=(ev.clientX-st.x)/z, dy=(ev.clientY-st.y)/z; if(st.rs) TMPOS={x:st.l,y:st.t,w:Math.max(220,st.w+dx)}; else TMPOS={x:st.l+dx,y:st.t+dy,w:st.w}; tmPlace(el); };
  const up=()=>{ el.removeEventListener("pointermove",mv); el.removeEventListener("pointerup",up); el.removeEventListener("pointercancel",up); tmSavePos(); };
  el.addEventListener("pointermove",mv); el.addEventListener("pointerup",up); el.addEventListener("pointercancel",up); });
/* Timer minimizado em bolinha (visual limpo): toque abre, arrasta e encaixa na borda mais próxima */
let BUB=(()=>{ try{ return JSON.parse(localStorage.getItem("rp_tmbub")||"null")||{s:"r",y:110}; }catch(_){ return {s:"r",y:110}; } })(), BUB_MV=false;
const bubZ=()=>parseFloat(getComputedStyle(document.body).zoom)||1;
function bubPlace(el){ const z=bubZ(), W=innerWidth/z, H=innerHeight/z, w=el.offsetWidth||64, h=el.offsetHeight||64;
  el.style.transform="none"; el.style.width=""; el.style.top=Math.max(8,Math.min(H-h-8,BUB.y))+"px"; el.style.left=(BUB.s==="l"? 8 : W-w-8)+"px"; }
document.addEventListener("pointerdown",e=>{ const el=e.target.closest&&e.target.closest("#tmrbar.bub"); if(!el) return; const z=bubZ(), r=el.getBoundingClientRect(); const s={x:e.clientX,y:e.clientY,l:r.left/z,t:r.top/z}; BUB_MV=false; const pid=e.pointerId;
  const mv=ev=>{ const dx=(ev.clientX-s.x)/z, dy=(ev.clientY-s.y)/z; if(!BUB_MV){ if(Math.abs(dx)+Math.abs(dy)<8) return; BUB_MV=true; el.classList.add("drag"); try{ el.setPointerCapture(pid); }catch(_){} } el.style.left=Math.max(0,Math.min(innerWidth/z-el.offsetWidth,s.l+dx))+"px"; el.style.top=Math.max(0,Math.min(innerHeight/z-el.offsetHeight,s.t+dy))+"px"; };
  const up=()=>{ el.removeEventListener("pointermove",mv); el.removeEventListener("pointerup",up); el.removeEventListener("pointercancel",up); el.classList.remove("drag");
    if(BUB_MV){ const cx=parseFloat(el.style.left)+el.offsetWidth/2; BUB={s: cx<innerWidth/z/2? "l":"r", y:parseFloat(el.style.top)}; try{ localStorage.setItem("rp_tmbub",JSON.stringify(BUB)); }catch(_){} bubPlace(el); setTimeout(()=>{ BUB_MV=false; },350); } };
  el.addEventListener("pointermove",mv); el.addEventListener("pointerup",up); el.addEventListener("pointercancel",up); });
window.addEventListener("click",e=>{ if(BUB_MV&&e.target.closest&&e.target.closest("#tmrbar")){ e.stopPropagation(); e.preventDefault(); BUB_MV=false; } },true);
addEventListener("resize",()=>{ const el=document.getElementById("tmrbar"); if(el&&el.classList.contains("bub")) bubPlace(el); });
function tmLeft(){ if(!TMR) return 0; return TMR.paused? TMR.left : (TMR.end-Date.now())/1000; }
function tmTick(){ if(!TMR||TMR.paused||TMR.done) return; const l=tmLeft(); const sec=Math.ceil(l);
  if(TMR.seq[TMR.i]&&TMR.seq[TMR.i].k==="man"){ tmRender(true); return; } if(sec<=3&&sec>=1&&!TMR.beeped[sec]){ TMR.beeped[sec]=1; tone(880,0.15); }
  if(l<=0){ tmNext(); return; } tmRender(true); }
function tmRender(fast){ document.querySelectorAll(".tmlive").forEach(z=>z.innerHTML=tmLiveHTML()); let el=document.getElementById("tmrbar"); if(!TMR){ if(el) el.remove(); return; }
  if(!el){ el=document.createElement("div"); el.id="tmrbar"; el.className="tmrbar"; document.body.appendChild(el);
    el.addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b||!TMR) return; const a=b.dataset.tma;
      if(a==="pause"){ if(TMR.paused){ TMR.end=Date.now()+TMR.left*1000; if(TMR.seq[TMR.i]&&TMR.seq[TMR.i].k==="up") TMR.st=Date.now()-(TMR.seq[TMR.i].d-TMR.left)*1000; TMR.paused=false; } else { TMR.left=tmLeft(); TMR.paused=true; } }
      else if(a==="skip"){ tmNext(); return; }
      else if(a==="done"){ const x=TMR.seq[TMR.i]; if(x&&x.k==="man"){ tmNext(); return; } if(x&&x.k==="up"){ TMR.fin=(Date.now()-TMR.st)/1000; TMR.done=true; beep(); clearInterval(TMR_I); } }
      else if(a==="rnd"){ TMR.rounds++; }
      else if(a==="rndm"){ TMR.rounds=Math.max(0,TMR.rounds-1); }
      else if(a==="min"){ TMR.min=!TMR.min; TMR.big=false; }
      else if(a==="big"){ TMR.big=!TMR.big; TMR.min=false; }
      else if(a==="stop"){ clearInterval(TMR_I); TMR=null; tmRender(); return; }
      tmRender(); }); }
  const x=TMR.seq[Math.min(TMR.i,TMR.seq.length-1)], nx=TMR.seq[TMR.i+1];
  const l=tmLeft(); const up=x.k==="up"||x.k==="man"; const shown= TMR.done? (TMR.fin? tmFmt(TMR.fin) : "0:00") : up? tmFmt(x.d-l) : tmFmt(l);
  const col= TMR.done? "#2F8F5B" : x.k==="rest"? "#2F8F5B" : x.c;
  el.style.setProperty("--tc",col);
  const t=el.querySelector(".tm-t"); if(fast&&t&&!TMR.min===!el.classList.contains("min")){ t.textContent=shown; return; }
  el.classList.toggle("min",!!TMR.min); el.classList.toggle("big",!!TMR.big&&!TMR.min); tmPlace(el);
  const cnt= TMR.seq.some(z=>z.cnt);
  el.classList.toggle("bub",!!(window.RP_LIMPO&&TMR.min)); if(window.RP_LIMPO&&TMR.min){ el.innerHTML=`<button class="tm-bub" data-tma="min" aria-label="Abrir o timer: ${esc(TMR.done?"Fim":x.lab)} ${shown}"><span class="tm-t">${shown}</span><small>${TMR.done?"fim":TMR.paused?"⏸":esc(x.lab).slice(0,8)}</small></button>`; bubPlace(el); return; }
  el.innerHTML= TMR.min? `<button class="tm-pill" data-tma="min"><span class="tm-t">${shown}</span> ${esc(TMR.done?"Fim":x.lab)}</button>`
   : `<div class="tm-l"><b>${TMR.done?"Fim! 🎉":esc(x.lab)}${!TMR.done&&x.r?` <small>${x.r}/${x.of}</small>`:""}${!TMR.done&&x.set?` <small>· ${x.set}</small>`:""}</b><span class="tm-t">${shown}</span><small>${TMR.done? (TMR.fin?"tempo final":"") : nx? `Próximo: ${esc(nx.lab)} ${nx.k==="man"?"(livre)":tmFmt(nx.d)}` : "Último"}${cnt?` · rodadas: <b>${TMR.rounds}</b>`:""}</small></div>
    <div class="tm-b">${cnt&&!TMR.done?`<button data-tma="rnd" title="Contar rodada">+1</button>`:""}${!TMR.done&&up?`<button data-tma="done" title="${x.k==="man"?"Terminei a série":"Terminou"}">✔</button>`:""}${!TMR.done?`<button data-tma="pause">${TMR.paused?"▶":"⏸"}</button><button data-tma="skip" title="Pular">⏭</button>`:""}<button data-tma="big" title="${TMR.big?"Voltar ao normal":"Aumentar na tela"}">${TMR.big?"↙":"⛶"}</button>`+(TMR.big?`<span class="tm-rs" title="Arraste para aumentar ou diminuir" aria-hidden="true">⇲</span>`:"")+`<button data-tma="min" title="Minimizar">–</button><button data-tma="stop" title="Fechar">✕</button></div>`; }
function colHTML(m,w,ms){
  const d=dayOf(w.id,m.id,S.day,true); const dRaw=d; const T=totDay(d); const st=A();
  const planSe=(planOf(m)||{sessions:[]}).sessions.filter(se=>se.day===S.day);
  const others=ms.filter(o=>o!==m);
  const arm=k=> armAct && armAct.k===k && armAct.sid===m.id;
  const has=dayHasData(dRaw);
  const ctlHere= m===(ms.includes(st)?st:ms[0])&&sesMode==="lancar"&&!boxOff("semana");
  const CTLB=(window.RP_LIMPO? (k,t,i)=>`<div class="boxw sesmt" data-box="${k}"><button class="pclose" data-sesmt aria-label="Fechar">✕ Fechar</button><div class="boxh"><span>${t}</span></div>${i}</div>` : boxW)("controle",window.RP_LIMPO?"🎯 Metas e controle da sessão":"🎯 Metas e controle de séries e repetições da sessão",`<div class="ctlbtns"><button class="btn ctladj" data-metas>⚙ Ajustar metas</button><div class="ctltool"><div class="seg segv" role="group" aria-label="Ver como">${[["bar","Barras"],["col","Gráfico"],["pie","Pizza"]].map(([v,l])=>`<button data-ctlv="${v}" aria-pressed="${ctlView()===v}">${l}</button>`).join("")}</div><div class="fzb" role="group" aria-label="Tamanho"><button data-ctlz="-1" aria-label="Diminuir">A−</button><button data-ctlz="1" aria-label="Aumentar">A+</button></div></div>
      <div class="ctl ctlz" id="ctl-${m.id}" style="zoom:${ctlZoom()}">${ctlHTML(m,T)}</div>${window.RP_LIMPO?(()=>{ try{ return `<div class="card wk ctlwk" id="wk-${m.id}">${weekCardHTML(m,w.id)}</div>`; }catch(_){ return ""; } })():""}<div class="ctlbig"><button class="btn" data-ctlov="sem">📅 Controle da semana</button>${qtip("ctl")}</div>
      <label class="ldrule">⚠ Avisar quando a carga subir mais de <input class="inp" type="number" inputmode="numeric" min="1" max="100" data-loadmax value="${loadMax()}"> % de uma semana para a outra</label></div>`);
  const cvOn=cvMode()==="card"; const LH=!!window.RP_LIMPO&&!SES_ALL;
  const SHEET_CD=(part)=>{ const W=wodOf(d); const tp=d.cardio.tipo||""; const oth=sesMembers().filter(o=>o!==m); const CRB=(part==="all"||part==="crono")? boxW("crono","⏱ Timers",`<div class="xcard2">${tmrHTML(m)}</div>`) : ""; if(part==="crono"||part==="none") return CRB; return CRB+boxW("cardio","🏃 Cardio",`<div class="xcard2">
        ${window.RP_LIMPO?"":cdMetaHTML(m,w)}
        ${(()=>{ const pc=hasCardio(d.cardio)? null : prevCardio(m.id); return pc? `<div class="xcpass"><small><b>Sem. Pass.</b> (${ddmm(pc.date)}): ${esc(cardioResumo(pc.d.cardio))}${pc.d.wod&&String(pc.d.wod.desc||"").trim()?" · "+esc(pc.d.wod.desc):""}</small><button class="xrep" data-repcardio>↻ Repetir</button></div>` : ""; })()}
        <span class="xc2-h">Cardio <button class="xcp xcprep" data-repcardio>↻ Repetir cardio da semana passada</button>${oth.length?` <button class="xcp" data-copycardio>📋 copiar cardio p/ ${esc(oth.map(o=>first(o.name)).join(" e "))}</button>`:""}</span>
        <div class="xc2-g2"><label>Tipo ${qtip("c_tipo")}<select class="inp" data-cf="tipo" id="cy-${m.id}"><option value="">–</option>${CARDIO_T.map(x=>`<option ${tp===x?"selected":""}>${x}</option>`).join("")}${tp&&!CARDIO_T.includes(tp)?`<option selected>${esc(tp)}</option>`:""}</select></label>
          <label>Método ${qtip("c_met")}<select class="inp" data-wf="tipo" id="wt-${m.id}"><option value="">–</option>${WOD_TIPOS.map(x=>`<option ${W.tipo===x?"selected":""}>${x}</option>`).join("")}</select></label></div>
        <div class="xc2-g4"><label>Tempo ${qtip("c_t")}<input class="inp" type="number" inputmode="numeric" data-cf="t" id="ct-${m.id}" value="${esc(d.cardio.t)}" placeholder="min"></label>
          <label>Zona ${qtip("c_z")}<select class="inp" data-cf="z" id="cz-${m.id}"><option value="">–</option>${[1,2,3,4,5].map(z=>`<option ${num(d.cardio.z)===z?"selected":""}>${z}</option>`).join("")}</select></label>
          <label>Vel. ${qtip("c_v")}<input class="inp" type="text" inputmode="decimal" data-cf="v" id="cv-${m.id}" value="${esc(d.cardio.v||"")}" placeholder="km/h"></label>
          <label>PSE ${qtip("c_pse")}<select class="inp" data-cf="pse" id="cp-${m.id}"><option value="">–</option>${[0,1,2,3,4,5,6,7,8,9,10].map(z=>`<option ${d.cardio.pse!==""&&num(d.cardio.pse)===z?"selected":""}>${z}</option>`).join("")}</select></label></div>
        ${(()=>{ const C=d.cardio, N=cardioN(C); let h="";
          for(let k=2;k<=N;k++){ const g=f=>C[f+k]; h+=`<div class="xc2-sec"><div class="xc2-hh"><span class="xc2-h">Cardio ${k}</span><button class="icon-btn xc2-rm" data-czrm="${k}" aria-label="Apagar cardio ${k}">✕</button></div>
            <div class="xc2-g2"><label>Tipo<select class="inp" data-cf="tipo${k}" id="cy${k}-${m.id}"><option value="">–</option>${CARDIO_T.map(x=>`<option ${g("tipo")===x?"selected":""}>${x}</option>`).join("")}${g("tipo")&&!CARDIO_T.includes(g("tipo"))?`<option selected>${esc(g("tipo"))}</option>`:""}</select></label>
              <label>Método<select class="inp" data-cf="met${k}" id="wt${k}-${m.id}"><option value="">–</option>${WOD_TIPOS.map(x=>`<option ${g("met")===x?"selected":""}>${x}</option>`).join("")}</select></label></div>
            <div class="xc2-g4"><label>Tempo<input class="inp" type="number" inputmode="numeric" data-cf="t${k}" id="ct${k}-${m.id}" value="${esc(g("t")||"")}" placeholder="min"></label>
              <label>Zona<select class="inp" data-cf="z${k}" id="cz${k}-${m.id}"><option value="">–</option>${[1,2,3,4,5].map(z=>`<option ${num(g("z"))===z?"selected":""}>${z}</option>`).join("")}</select></label>
              <label>Vel.<input class="inp" type="text" inputmode="decimal" data-cf="v${k}" id="cv${k}-${m.id}" value="${esc(g("v")||"")}" placeholder="km/h"></label>
              <label>PSE<select class="inp" data-cf="pse${k}" id="cp${k}-${m.id}"><option value="">–</option>${[0,1,2,3,4,5,6,7,8,9,10].map(z=>`<option ${g("pse")!=null&&g("pse")!==""&&num(g("pse"))===z?"selected":""}>${z}</option>`).join("")}</select></label></div></div>`; }
          return h+`<button class="linkbtn" data-cz2 style="justify-self:start">+ adicionar outro cardio${N<2?" (ex.: AMRAP e depois volta à calma em Z2)":""}</button>`; })()}
        <textarea class="inp xwdesc2" data-wf="desc" id="wd-${m.id}" rows="2" placeholder="Descrição do método (opcional). Ex.: EMOM 12' — 10 kettlebell swing + 8 burpees">${esc(W.desc)}</textarea>
      </div>`); }; CV_CDFN=SHEET_CD;
  return `<div class="col ${m===st?"active":""} ${cvOn?"cvcard":""}" data-col="${m.id}"><div class="sidenm">${esc(m.name)}</div>

    ${LH?"":phaseBanner(m,ms)}
    ${!LH&&usesPh(m)?`<div class="phmini" role="group" aria-label="Fase de ${esc(first(m.name))}"><span>Fase${phAlert(m)?` · <b class="tw ${phAlert(m)}">${phWeeks(m)} sem ⚠️</b>`:""}</span>${Object.keys(PHASES).map(k=>`<button style="--pc:var(--p${k})" data-setph="${k}" aria-pressed="${+k===m.phase}" title="${PHASES[k].t} · ${PHASES[k].n}">${PHASES[k].k}</button>`).join("")}</div>`:""}
    ${LH?"":tecSugHTML(m)}
    ${LH?"":`<div class="sbar" id="sb-${m.id}">${sbarInner(m)}</div>`}
    ${LTR_UNDO[w.id+"|"+m.id+"|"+S.day]?`<div class="ltrundo"><span>Os exercícios foram trocados pela nova letra.</span><button class="btn small" data-ltrundo>↩ Desfazer e voltar os anteriores</button><button class="icon-btn" data-ltrundox aria-label="Ok">✓</button></div>`:""}
    ${sugOpen===m.id&&!SUG_ROW? sugHTML(m,d) : ""}
    ${!LH&&m===st? `<div class="qw">${impBtn("sessao","Importar treino do dia (foto, PDF, Excel ou Word)")}${qtip("s_imp")}</div>` : ""}
    ${!LH&&m===st? `<div class="qw"><button class="btn histbtn" data-histopen>📈 Histórico de treino ${!m.own?"de "+esc(first(m.name)):"do professor"}</button>${qtip("s_hist")}</div>` : ""}
    ${!LH&&m===(ms.includes(st)?st:ms[0])&&sesMode==="lancar"? `<div class="qw">${boxW("semana","📅 Semana e dia",SES_WK.replace("%%CTL%%",""))}${qtip("s_sem")}</div>` : ""}
    ${repAskHTML(m,d)}${LH&&!(SES_MT&&m===(ms.includes(st)?st:ms[0]))?"":`<div id="alr-${m.id}">${alertsHTML(m,d)}</div>
    <div class="sesctlw">${CTLB}</div>`}
    ${ctlOv&&ctlOv.sid===m.id? ctlOvHTML(m,T) : ""}
    ${sesMode==="lancar"? (()=>{ const L=ltrOf(m.id,w.id,S.day,d); return `<div class="qw${LH?" ltrq":""}"><button class="ltrbar ${ltrEdit===m.id?"on":""}" data-ltredit><span>Treino</span><b>${L? esc(LTR_ALL.includes(L)? L : L) : "?"}</b><small>${ltrEdit===m.id? "fechar" : L? (d&&d.ltrNew? "treino novo · toque para trocar" : "toque para trocar") : "toque para escolher A, B, C…"}</small></button>${LH?"":qtip("s_treino")}</div>`; })() : ""}
    ${((!ltrOf(m.id,w.id,S.day,d)&&!LTR_HIDE[m.id+"|"+S.week+"|"+S.day])||ltrEdit===m.id)? ltrPickHTML(m,d) : ""}
    ${!LH&&others.length&&sesMode==="lancar"&&!sideOn()&&m===(ms.includes(st)?st:ms[0])? `<div class="qw"><button class="sidetog" data-sidetog>👥 Dividir a tela: ${ms.map(x=>esc(first(x.name))).join(" e ")} lado a lado</button>${qtip("s_div")}</div>` : ""}
    ${dRaw&&dRaw.mir&&others.length? `<div class="mirbar">🔁 Tudo o que você lançar para ${esc(first(m.name))} repete para ${others.map(o=>esc(first(o.name))).join(" e ")}.<button class="btn small" data-mirstop>Parar</button></div>` : ""}
    ${cvOn? cvHTML(m,d,others) : ""}
    <div class="sheetx" data-sheet>
      <div class="xhead"><span class="xh-l">${(()=>{ const L=ltrOf(m.id,w.id,S.day,d); return `<button class="xh-ltr" data-ltredit aria-label="Trocar o treino do dia"><small>Treino</small><b>${L?esc(LTR_ALL.includes(L)?L:L.slice(0,4)):"?"}</b></button>`; })()}</span><span class="xh-ex">Exercício${qtip("ex")}</span><span><i class="s">Sér</i><i class="l">Séries</i></span><span><i class="s">Reps</i><i class="l">Repetições</i></span><span><i class="s">Kg</i><i class="l">Carga (kg)</i></span><span><i class="s">Ton</i><i class="l">Tonelagem</i></span><span><i class="s">Desc</i><i class="l">Descanso</i></span></div>
      <div class="xband xband3"><span class="xb-ex xb-ex2 xb3"><button class="xb-sug" data-repopen="${m.id}" title="Repetir ou visualizar o treino anterior">↻ Treino anterior</button><button class="xb-sug ${sugOpen===m.id?"on":""}" data-sug>💡 Sugerir exercícios</button><button class="xb-sug xb-tec ${TEC_MODE?"on":""}" data-tecmode title="Escolher método avançado nos exercícios">⚡ Métodos avançados${TEC_MODE?" ✓":""}</button></span></div>${TEC_MODE?`<p class="tecmhint">Escolha o método direto em cada exercício. O <b>?</b> explica cada um. Toque em ⚡ Métodos avançados de novo para esconder.</p>`:""}
      ${(()=>{ const ref=prevRef(m.id); const pr=ref&&ref.d? ref.d.rows : []; const used=new Set(); cjSync(dayOf(S.week,m.id,S.day),pr);
        const curD=addDays(w.start,DAYS.indexOf(S.day));
        /* Histórico na posição: o exercício da semana passada nesta linha continua aparecendo; só compara números se for o mesmo exercício */
        const pick=(r,i)=>{ const pos=pr[i]&&(pr[i].n1.trim()||subUsed(pr[i].a))? pr[i] : null; delete HIST[r.id]; delete HISTR[r.id]; delete FIRSTX[r.id];
          if(!r.n1.trim()) return pos;
          if(pos&&noAcc(pos.n1).trim()===noAcc(r.n1).trim()) return pos;
          if(pos&&pos.n1.trim()){ HIST[r.id]=pos.n1.trim(); HISTR[r.id]=pos; }
          { delete FIRSTX[r.id]; const ld=lastDone(m.id,r.n1,curD); delete HIST[r.id]; delete HISTR[r.id]; if(ld) return ld; FIRSTX[r.id]=1; return null; } };
        return d.rows.map((r,i)=>{ const pv=pick(r,i); const cpTo= ms.length>1? "p/ "+ms.filter(o=>o!==m).map(o=>first(o.name)).join(" e ") : ""; return rowHTML(r,i,pv,i>0&&d.rows[i-1].cj, r.iso&&(r.a.isoM||"so")==="so"? null : sugFor(m,pv), cpTo)+(i<d.rows.length-1&&!r.cj?`<button class="xinsbar" data-insrow data-after="${r.id}" aria-label="Inserir exercício aqui"><span>+ exercício</span></button>`:""); }).join(""); })()}
      <button class="xadd" data-addrow>+ Linha</button>

      ${SHEET_CD(window.RP_LIMPO&&cvOn? (CD_AT[m.id]? "none" : (hasCardio(d.cardio)||String((wodOf(d)||{}).desc||"").trim()? "cardio" : "none")) : "all")}
    </div>
    <div class="row">
      ${has? `<button class="btn small danger" data-clear>${arm("clear")?"Toque de novo para limpar":"Limpar dia"}</button>`:""}
    </div>
    ${window.RP_LIMPO? "" : boxW("grafsem","📊 Gráfico do cardio da semana",`<div class="card wk" id="wk-${m.id}">${weekCardHTML(m,w.id)}</div>`)}
  </div>`;
}
function painelHTML(st,w){
  const d=dayOf(w.id,st.id,S.day); const T=totDay(d); const pw=prevWeekId(w.id);
  const P= prevDayTot(st.id); const RT=refTxt(st.id); const W=totWeek(w.id,st.id);
  const date=addDays(w.start,DAYS.indexOf(S.day));
  const delta=(a,b)=>{ if(!b) return ""; const p=Math.round((a-b)/b*100); return `<span class="delta">${p>0?"▲":p<0?"▼":"="} ${Math.abs(p)}% vs ${RT}</span>`; };
  const maxR=Math.max(1,...REG.map(k=>T.reg[k].t));
  const shownDays=DAYS.filter(dy=>dy!=="Dom"||W.days.Dom.t);
  const maxD=Math.max(1,...shownDays.map(dy=>W.days[dy].t));
  if(!dayHasData(d)) return `<div class="card"><p><b>Sem treino lançado para ${esc(first(st.name))} na ${DAY_N[S.day].toLowerCase()}.</b></p><p class="muted">Lance os exercícios em "Lançar" e o painel aparece aqui.</p></div>`;
  return `<div class="card painel">
    <span class="label">${ltrOf(st.id,w.id,S.day,d)?`Treino ${ltrOf(st.id,w.id,S.day,d)} · `:""}${DAY_N[S.day]} · ${ddmm(date)} · ${phT(st)} · Semana ${w.n}</span>
    <h2 class="pname">${esc(st.name)}</h2>
    <div class="hero"><span class="label">Tonelagem do treino</span><b class="hero-n">${nf(T.t)}<small> kg</small></b>${P?delta(T.t,P.t):""}
      ${T.t>=1200?`<span class="muted" style="font-size:14px">É como levantar ${String(Math.round(T.t/1200*10)/10).replace(".",",")} carros populares de 1.200 kg.</span>`:""}</div>
    <div class="tiles">
      <div class="tile"><span class="label">Séries</span><b>${T.s}</b>${P?delta(T.s,P.s):""}</div>
      <div class="tile"><span class="label">Repetições</span><b>${nf(T.r)}</b>${P?delta(T.r,P.r):""}</div>
      <div class="tile"><span class="label">Exercícios</span><b>${T.n}</b></div>
      <div class="tile"><span class="label">Cardio</span><b>${T.cmin}<small> min</small></b>${d.cardio.tipo?`<span class="delta">${esc(d.cardio.tipo)}${d.cardio.z?` · zona ${d.cardio.z}`:""}</span>`:""}</div>
    </div>
    <div class="rbars"><span class="label">Por região</span>
      ${REG.filter(k=>T.reg[k].s).map(k=>`<div class="rbar" title="${REG_N[k]}: ${nf(T.reg[k].t)} kg"><div class="rbar-top"><b>${REG_N[k]}</b><span class="num">${nf(T.reg[k].t)} kg · ${T.reg[k].s} séries · ${nf(T.reg[k].r)} reps</span></div><div class="bar"><i style="width:${T.reg[k].t/maxR*100}%"></i></div></div>`).join("")}
    </div>
    <div><span class="label">Tonelagem na semana · total ${nf(W.t)} kg</span>
      <div class="daybars" style="--cols:${shownDays.length}">${shownDays.map(dy=>`<div class="dbar ${dy===S.day?"cur":""}" title="${DAY_N[dy]}: ${nf(W.days[dy].t)} kg"><span class="num dv">${W.days[dy].t?nf(W.days[dy].t):""}</span><div class="barea"><div class="bcol" style="height:${W.days[dy].t/maxD*100}%"></div></div><span class="dl">${dy}</span></div>`).join("")}</div>
    </div>
  </div>`;
}
/* Histórico de treino do aluno: tudo o que ele fez, exercício por exercício, com gráfico, comparação e envio */
let HV=null; const HCH={};
function histData(sid){ const m=stById(sid); const hoje=isoD(new Date()); const ses=[];
  wkSorted().forEach(w=>DAYS.forEach((dy,i)=>{ const d=dayOf(w.id,sid,dy); if(!dayHasData(d)) return; const date=addDays(w.start,i); if(date>hoje) return;
    const ex=[]; (d.rows||[]).forEach(r=>{ if(r.cp) return; let cur=null, li=0; rowLines(r).forEach(l=>{ if(!l.sub||!cur){ cur={n:(l.n||"").trim(),sets:[],tec:r.tec||""}; cur.k=noAcc(cur.n).trim(); try{ cur.reg=rowReg(r, r.conj&&li===1?"b":"a")||regionOfName(cur.n)||""; }catch(_){ cur.reg=""; } li++; ex.push(cur); } cur.sets.push({s:num(l.x.s),r:String(l.x.r||""),c:num(l.x.c),v:vol(l.x)*(l.u||1),nr:num(l.x.s)*num(l.x.r)*(l.u||1),t:setTxt(l.x,0,l.u)}); }); });
    const E=ex.filter(e=>e.k); E.forEach(e=>{ e.kg=Math.max(0,...e.sets.map(x=>x.c)); e.vol=e.sets.reduce((t,x)=>t+x.v,0); e.ns=e.sets.reduce((t,x)=>t+x.s,0); e.nr=e.sets.reduce((t,x)=>t+x.nr,0); e.txt=e.sets.map(x=>x.t).join(" + "); });
    ses.push({id:w.id+"|"+dy,date,dy,ltr:ltrOf(sid,w.id,dy,d)||"",wid:w.id,wn:(m&&cliWk(m,w))||w.n,ex:E,vol:E.reduce((t,e)=>t+e.vol,0),cardio:num(d.cardio&&d.cardio.t)}); }));
  ses.sort((a,b)=>a.date<b.date?-1:1);
  const exs={}; ses.forEach(s=>s.ex.forEach(e=>{ const o=exs[e.k]=exs[e.k]||{k:e.k,n:e.n,list:[]}; o.n=e.n; o.list.push({date:s.date,dy:s.dy,ltr:s.ltr,wn:s.wn,kg:e.kg,vol:e.vol,ns:e.ns,nr:e.nr,txt:e.txt,tec:e.tec}); }));
  return {m,ses,exs}; }
const hLtr=l=> l? (LTR_ALL.includes(l)?"Treino "+l:l) : "";
const hKg=v=> v? String(Math.round(v*10)/10).replace(".",",")+" kg" : "sem carga";
const hDelta=(a,b,u)=>{ const d=Math.round((b-a)*10)/10; if(!d) return `<span class="hd0">=</span>`; return `<span class="${d>0?"hdup":"hddn"}">${d>0?"▲ +":"▼ "}${String(d).replace(".",",")}${u||""}</span>`; };
function histOpen(sid,only){ sid=sid||(A()&&A().id); let by="dia"; try{ const H=histData(sid); if(H.ses.some(x=>x.ltr)) by="ltr"; }catch(_){} HV={sid,tab:only?"cmp":"ex",only:!!only,ex:null,met:"kg",q:"",by,bk:"",a:"",b:"",lf:"",view:"tab",cm:"ns",mg:"",xk:"",de:"",ate:""}; histRender(); document.body.style.overflow="hidden"; }
function histClose(){ HV=null; const o=document.getElementById("histOv"); if(o) o.hidden=true; document.body.style.overflow=""; }
function histChart(id,pts,met,h){ HCH[id]={pts,met,h:h||190}; return `<canvas class="hchart" data-hch="${id}" height="${h||190}"></canvas>`; }
function pieDraw(cv,D){ const W=cv.clientWidth||170, H=170, k=2; cv.width=W*k; cv.height=H*k; cv.style.height=H+"px"; const g=cv.getContext("2d"); g.scale(k,k); g.fillStyle="#fff"; g.fillRect(0,0,W,H);
  const tot=D.sl.reduce((t,x)=>t+x.v,0)||1, cx=W/2, cy=H/2, r=Math.min(W,H)/2-6; let a=-Math.PI/2;
  D.sl.forEach(x=>{ const da=x.v/tot*Math.PI*2; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,r,a,a+da); g.closePath(); g.fillStyle=x.c; g.fill(); g.strokeStyle="#fff"; g.lineWidth=2; g.stroke();
    const p=Math.round(x.v/tot*100); if(p>=7){ const m=a+da/2; g.fillStyle="#fff"; g.font="bold 12px sans-serif"; g.textAlign="center"; g.fillText(p+"%",cx+Math.cos(m)*r*.62,cy+Math.sin(m)*r*.62+4); } a+=da; }); }
function histDraw(root){ (root||document).querySelectorAll("canvas[data-hch]").forEach(cv=>{ const D=HCH[cv.dataset.hch]; if(!D) return; if(D.type==="pie"){ pieDraw(cv,D); return; } if(D.type==="dash"){ dashDraw(cv,D); return; } const W=cv.clientWidth||cv.parentNode.clientWidth||320, H=D.h||190, k=2; cv.width=W*k; cv.height=H*k; cv.style.height=H+"px"; const g=cv.getContext("2d"); g.scale(k,k);
  const P=D.pts; const L=34,R=12,T=22,B=30; g.fillStyle="#fff"; g.fillRect(0,0,W,H); if(!P.length) return;
  const vs=P.map(p=>p.v), mx=Math.max(...vs,1), mn=Math.min(...vs,0)>0? Math.min(...vs)*0.85 : 0; const y=v=>T+(H-T-B)*(1-(v-mn)/((mx-mn)||1)); const stp= P.length>1? Math.min(58,(W-L-R-24)/(P.length-1)) : 0; const x=i=> L+18+stp*i;
  g.strokeStyle="#E3E6EA"; g.lineWidth=1; g.font="10px sans-serif"; g.fillStyle="#6B7280"; [0,.5,1].forEach(f=>{ const v=mn+(mx-mn)*f, yy=y(v); g.beginPath(); g.moveTo(L,yy); g.lineTo(W-R,yy); g.stroke(); g.fillText(D.met==="kg"? String(Math.round(v*10)/10).replace(".",","):nf(v),2,yy+3); });
  const ac=getComputedStyle(document.body).getPropertyValue("--accent").trim()||"#1F5FBF";
  g.strokeStyle=ac; g.lineWidth=2.5; g.beginPath(); P.forEach((p,i)=>{ i?g.lineTo(x(i),y(p.v)):g.moveTo(x(i),y(p.v)); }); g.stroke();
  const step=Math.max(1,Math.ceil(40/Math.max(stp,1))); P.forEach((p,i)=>{ g.fillStyle=ac; g.beginPath(); g.arc(x(i),y(p.v),4,0,7); g.fill(); g.fillStyle="#111"; g.font="bold 10px sans-serif"; g.textAlign="center"; if(i%step===0||i===P.length-1){ g.fillText(D.met==="kg"? String(Math.round(p.v*10)/10).replace(".",","):nf(p.v),x(i),y(p.v)-8); g.fillStyle="#6B7280"; g.font="10px sans-serif"; g.fillText(p.l,x(i),H-10); } g.textAlign="left"; }); }); }
function histExHTML(H){ const e=H.exs[HV.ex]; if(!e){ HV.ex=null; return histHTML(); } const L=e.list, met=HV.met;
  const pts=L.map(x=>({v:met==="kg"?x.kg:met==="vol"?x.vol:x.ns,l:ddmm(x.date)}));
  const f=L[0], l=L[L.length-1];
  return `<button class="btn small ghost" data-hback>‹ Todos os exercícios</button>
  <div class="hcard" id="histcard"><div class="hct">${repLogo()}<div><b>${esc(e.n)}</b><small>${esc(first(H.m.name))} · começou em ${ddmm(f.date)} · ${L.length} ${L.length>1?"treinos":"treino"}</small></div></div>
  <div class="hsum"><span>Primeiro: <b>${esc(f.txt)}</b></span><span>Último: <b>${esc(l.txt)}</b></span>${L.length>1?`<span>Carga: <b>${hKg(f.kg)} → ${hKg(l.kg)}</b> ${hDelta(f.kg,l.kg," kg")}</span>`:""}</div>
  ${[["kg","Carga (kg)"],["vol","Tonelagem (kg)"],["ns","Séries"]].map(([k,n])=>`<div class="hchw"><b>${n}</b>${histChart("ex"+k,L.map(x=>({v:k==="kg"?x.kg:k==="vol"?x.vol:x.ns,l:ddmm(x.date)})),k,140)}</div>`).join("")}
  <table class="htab"><thead><tr><th>Data</th><th>Treino</th><th>Séries × reps · carga</th><th>Tonel. (kg)</th></tr></thead><tbody>${L.slice().reverse().map(x=>`<tr><td><b>${ddmm(x.date)}</b><small>${x.dy} · S${x.wn}</small></td><td>${esc(hLtr(x.ltr))}${x.tec?`<small>${esc(x.tec)}</small>`:""}</td><td>${esc(x.txt)}</td><td>${nf(x.vol)}</td></tr>`).join("")}</tbody></table></div>
  <div class="hsendg"><button class="btn primary hsend" data-hsend="ex" data-hmode="both">📲 Enviar este exercício para ${esc(first(H.m.name))}</button><div class="row"><button class="btn small" data-hsend="ex" data-hmode="img">🖼 Só imagem</button><button class="btn small" data-hsend="ex" data-hmode="txt">💬 Só texto</button></div></div>`; }
const PIE_C=["#1F5FBF","#D93025","#2F8F3A","#E8A317","#7B3FB5","#0E9AA7","#C2185B","#6D4C41","#5C6BC0","#9E9D24","#F57C00","#455A64"];
const cmpNum=(v,met)=> met==="nr"? nf(v)+" reps" : met==="kg"? String(Math.round(v*10)/10).replace(".",",")+" kg" : met==="vol"? nf(v)+" kg" : nf(v);
function cmpModesHTML(H){ const hasL=H.ses.some(x=>x.ltr); const M=[...(hasL?[["ltr","Por treino (letra)"]]:[]),["dia","Por dia da semana"],["sem","Semana × semana"],["ex","Por exercício e período"],["memb","MMII × MMSS"]];
  return `<div class="hchips">${M.map(([k,n])=>`<button class="chip" data-hby="${k}" aria-pressed="${HV.by===k}">${n}</button>`).join("")}</div>`; }
function cmpViewHTML(ex){ if(HV.view==="pie") HV.view="bar"; if(!ex&&HV.view==="line") HV.view="bar"; const V=[["tab","📋 Tabela"],["bar","📊 Colunas"],...(ex?[["line","〰️ Linha tracejada"]]:[])];
  const mets=[["ns","Séries"],["nr","Repetições"],["vol","Tonelagem"],["kg","Carga máx."]];
  return `<div class="hchips">${V.map(([k,n])=>`<button class="chip" data-hview="${k}" aria-pressed="${HV.view===k}">${n}</button>`).join("")}</div>${HV.view!=="tab"?`<div class="hchips hmets">${mets.map(([k,n])=>`<button class="chip" data-hcm="${k}" aria-pressed="${HV.cm===k}">${n}</button>`).join("")}</div>`:""}`; }
function cmpBars(rows,met,la,lb){ const mx=Math.max(1,...rows.flatMap(r=>[r.a||0,r.b||0])); const two=rows.some(r=>r.a!=null)&&rows.some(r=>r.b!=null);
  const sh=v=> v>=1000? String(Math.round(v/100)/10).replace(".",",")+"k" : met==="kg"? String(Math.round(v*10)/10).replace(".",",") : nf(v);
  const bar=(v,c)=>`<div class="ccb"><span class="ccv">${v?sh(v):"—"}</span><i class="${c}" style="height:${v?Math.max(3,v/mx*100):0}%"></i></div>`;
  return `<div class="ccols">${lb!=null?`<div class="cblg"><span><i class="cbA"></i>${esc(la)}</span><span><i class="cbB"></i>${esc(lb)}</span></div>`:""}<small class="ccu">${met==="kg"?"Carga máxima em kg":met==="vol"?"Tonelagem em kg (séries × reps × carga · k = mil)":met==="nr"?"Total de repetições":"Número de séries"}</small><div class="ccg${two?"":" one"}">${rows.map(r=>`<div class="ccx"><div class="ccbars">${r.a!=null?bar(r.a,"cbA"):""}${r.b!=null?bar(r.b,"cbB"):""}</div><b title="${esc(r.n)}">${esc(r.n)}</b></div>`).join("")}</div></div>`; }
function cmpLine(id,rows,met,la,lb){ HCH[id]={type:"dash",rows,met}; const n=rows.length;
  return `<div class="ccols">${lb!=null?`<div class="cblg"><span><i class="cbA cbdash"></i>${esc(la)}</span><span><i class="cbB cbdash"></i>${esc(lb)}</span></div>`:""}<canvas class="hchart" data-hch="${id}" height="230"></canvas></div>`; }
function dashDraw(cv,D){ const rows=D.rows, W=cv.clientWidth||cv.parentNode.clientWidth||320, H=230, k=2; cv.width=W*k; cv.height=H*k; cv.style.height=H+"px"; const g=cv.getContext("2d"); g.scale(k,k); g.fillStyle="#fff"; g.fillRect(0,0,W,H); if(!rows.length) return;
  const L=36,R=14,T=22,B=74; const vs=rows.flatMap(r=>[r.a||0,r.b||0]); const mx=Math.max(1,...vs); const y=v=>T+(H-T-B)*(1-v/mx); const st=rows.length>1?(W-L-R-20)/(rows.length-1):0; const x0=L+46; const st2=rows.length>1?(W-x0-R)/(rows.length-1):0; const x=i=>rows.length>1? x0+st2*i : (L+W-R)/2;
  const fmt=v=>D.met==="kg"? String(Math.round(v*10)/10).replace(".",",") : nf(v);
  g.strokeStyle="#E3E6EA"; g.lineWidth=1; g.setLineDash([]); g.font="10px sans-serif"; g.fillStyle="#6B7280"; [0,.5,1].forEach(f=>{ const yy=y(mx*f); g.beginPath(); g.moveTo(L,yy); g.lineTo(W-R,yy); g.stroke(); g.fillText(fmt(mx*f),2,yy+3); });
  const ser=(key,col)=>{ if(!rows.some(r=>r[key]!=null)) return; g.strokeStyle=col; g.lineWidth=2.2; g.setLineDash([7,5]); g.beginPath(); let on=false; rows.forEach((r,i)=>{ const v=r[key]; if(!v){ on=false; return; } on? g.lineTo(x(i),y(v)) : g.moveTo(x(i),y(v)); on=true; }); g.stroke(); g.setLineDash([]);
    rows.forEach((r,i)=>{ const v=r[key]; if(!v) return; g.fillStyle=col; g.beginPath(); g.arc(x(i),y(v),3.8,0,7); g.fill(); g.fillStyle="#111"; g.font="bold 10px sans-serif"; g.textAlign="center"; g.fillText(fmt(v),x(i),y(v)+(key==="a"&&r.b&&r.b>v? 14 : -8)); g.textAlign="left"; }); };
  ser("a","#9AA3AE"); ser("b",getComputedStyle(document.body).getPropertyValue("--accent").trim()||"#1F5FBF");
  g.fillStyle="#374151"; g.font="10px sans-serif"; rows.forEach((r,i)=>{ let t=String(r.n||""); if(t.length>15) t=t.slice(0,14)+"…"; g.save(); g.translate(x(i),H-B+12); g.rotate(-Math.PI/4); g.textAlign="right"; g.fillText(t,0,0); g.restore(); }); }
function cmpPies(ks,A2,B2,met,la,lb){ const RC={MMII:"#D93025",MMSS:"#1F5FBF"}, RN={MMII:"Membros inferiores (MMII)",MMSS:"Membros superiores (MMSS)"}; let core=0;
  const pie=(id,X,lab)=>{ const t={MMII:0,MMSS:0}; ks.forEach(k=>{ const e=X.ex[k]; if(!e) return; const r=e.reg||regionOfName(e.n)||""; const v=e[met]||0; if(r==="MMII"||r==="MMSS") t[r]+=v; else if(v) core++; });
    const sl=["MMII","MMSS"].map(r=>({n:RN[r],v:t[r],c:RC[r]})).filter(x=>x.v>0); const tot=sl.reduce((a,x)=>a+x.v,0);
    HCH[id]={type:"pie",sl}; return `<div class="cpie"><b>${esc(lab)}</b>${tot?`<canvas class="hchart cpc" data-hch="${id}" height="170"></canvas><div class="cpl">${["MMII","MMSS"].map(r=>`<span><i style="background:${RC[r]}"></i>${r} · ${tot?Math.round(t[r]/tot*100):0}% <small>(${met==="vol"?nf(t[r])+" kg":t[r]+" séries"})</small></span>`).join("")}</div>`:`<span class="muted">sem ${met==="vol"?"tonelagem":"séries"} de MMII ou MMSS</span>`}</div>`; };
  const h=`<div class="cpies">${pie("cpA",A2,"Antes · "+la)}${pie("cpB",B2,"Depois · "+lb)}</div>`;
  return h+`<small class="muted">Divisão do ${met==="vol"?"tonelagem (kg)":"total de séries"} entre membros inferiores e superiores.${core?" Exercícios de core ficam de fora.":""}</small>`; }
function cmpExHTML(H){ const E=Object.values(H.exs).sort((a,b)=>a.n.localeCompare(b.n,"pt-BR")); if(!E.length) return `<p class="muted">Nenhum treino lançado ainda.</p>`;
  if(!H.exs[HV.xk]) HV.xk=(E.slice().sort((a,b)=>b.list.length-a.list.length)[0]).k; const e=H.exs[HV.xk]; const ds=e.list.map(x=>x.date);
  if(!ds.includes(HV.de)) HV.de=ds[0]; if(!ds.includes(HV.ate)||HV.ate<HV.de) HV.ate=ds[ds.length-1];
  const L=e.list.filter(x=>x.date>=HV.de&&x.date<=HV.ate); const f=L[0], l=L[L.length-1]; HV._cx={e,L};
  const dsel=(k,v)=>`<select class="inp" data-hsel="${k}">${ds.map(d=>`<option value="${d}" ${d===v?"selected":""}>${ddmm(d)}</option>`).join("")}</select>`;
  const met=HV.cm, val=x=>met==="kg"?x.kg:met==="vol"?x.vol:met==="nr"?(x.nr||0):x.ns;
  return `<label class="hexsel">Exercício <select class="inp" data-hsel="xk">${E.map(x=>`<option value="${esc(x.k)}" ${x.k===HV.xk?"selected":""}>${esc(x.n)} (${x.list.length}×)</option>`).join("")}</select></label>
  <div class="hcmpsel"><label>De ${dsel("de",HV.de)}</label><label>Até ${dsel("ate",HV.ate)}</label></div>${cmpViewHTML(true)}
  <div class="hcard" id="histcard"><div class="hct">${repLogo()}<div><b>${esc(e.n)} · ${esc(first(H.m.name))}</b><small>${ddmm(HV.de)} a ${ddmm(HV.ate)} · ${L.length} ${L.length===1?"treino":"treinos"}</small></div></div>
  ${L.length>1?`<div class="hsum"><span>Primeiro: <b>${esc(f.txt)}</b></span><span>Último: <b>${esc(l.txt)}</b></span><span>Carga: <b>${hKg(f.kg)} → ${hKg(l.kg)}</b> ${hDelta(f.kg,l.kg," kg")}</span></div>`:""}
  ${HV.view==="bar"||HV.view==="line"? (()=>{ const rw=L.map(x=>({n:`${ddmm(x.date)} · ${x.dy}${x.ltr?" · "+hLtr(x.ltr):""}`,b:val(x)})); return HV.view==="bar"? cmpBars(rw,met) : cmpLine("clx",rw,met); })() :
  `<table class="htab"><thead><tr><th>Data</th><th>Treino</th><th>Séries × reps · carga</th><th>Tonel. (kg)</th></tr></thead><tbody>${L.map(x=>`<tr><td><b>${ddmm(x.date)}</b><small>${x.dy} · S${x.wn}</small></td><td>${esc(hLtr(x.ltr))}${x.tec?`<small>${esc(x.tec)}</small>`:""}</td><td>${esc(x.txt)}</td><td>${nf(x.vol)}</td></tr>`).join("")}</tbody></table>`}</div>
  <div class="hsendg"><button class="btn primary hsend" data-hsend="cmpx" data-hmode="both">📲 Enviar para ${esc(first(H.m.name))}</button><div class="row"><button class="btn small" data-hsend="cmpx" data-hmode="img">🖼 Só imagem</button><button class="btn small" data-hsend="cmpx" data-hmode="txt">💬 Só texto</button></div></div>`; }
/* MMII × MMSS: só em texto, agrupado por treino (letra), semana, dia ou mês */
const MES_N=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
function membGroups(H){ const g=HV.mg, S2=H.ses; const rs=e=> e.reg||regionOfName(e.n)||"";
  const sum=L=>{ const t={MMII:{ns:0,nr:0,vol:0},MMSS:{ns:0,nr:0,vol:0}}; let core=0; L.forEach(s=>s.ex.forEach(e=>{ const r=rs(e); if(t[r]){ t[r].ns+=e.ns; t[r].nr+=e.nr||0; t[r].vol+=e.vol; } else core++; })); return {t,core,n:L.length}; };
  let out=[];
  if(g==="ltr"){ const ls=[...new Set(S2.map(s=>s.ltr).filter(Boolean))].sort(); out=ls.map(l=>{ const s=S2.filter(x=>x.ltr===l).slice(-1)[0]; return {l:hLtr(l),sub:"último em "+ddmm(s.date),...sum([s])}; }); }
  else if(g==="dia"){ out=S2.slice(-12).reverse().map(s=>({l:`${ddmm(s.date)} · ${DAY_N[s.dy]}`,sub:hLtr(s.ltr),...sum([s])})); }
  else if(g==="sem"){ const ws=[...new Set(S2.map(s=>s.wid))]; out=ws.slice(-10).reverse().map(id=>{ const L=S2.filter(s=>s.wid===id); const w=S.weeks.find(x=>x.id===id); return {l:`S${L[0].wn} · ${ddmm(w?w.start:L[0].date)}`,sub:`${L.length} ${L.length===1?"treino":"treinos"}`,...sum(L)}; }); }
  else { const ms=[...new Set(S2.map(s=>s.date.slice(0,7)))]; out=ms.slice(-12).reverse().map(m=>{ const L=S2.filter(s=>s.date.slice(0,7)===m); return {l:`${MES_N[+m.slice(5,7)-1]}/${m.slice(2,4)}`,sub:`${L.length} ${L.length===1?"treino":"treinos"}`,...sum(L)}; }); }
  return out; }
function membHTML(H){ const hasL=H.ses.some(x=>x.ltr); if(!HV.mg||(HV.mg==="ltr"&&!hasL)) HV.mg=hasL?"ltr":"sem"; if(!["ns","nr","vol"].includes(HV.cm)) HV.cm="ns";
  const G=[...(hasL?[["ltr","Por treino (A, B, C…)"]]:[]),["sem","Por semana"],["dia","Por dia"],["mes","Por mês"]], M=[["ns","Séries"],["nr","Repetições"],["vol","Tonelagem"]];
  const rows=membGroups(H); HV._memb=rows; const met=HV.cm; const f=v=> met==="vol"? nf(v)+" kg" : met==="nr"? nf(v)+" reps" : nf(v)+(v===1?" série":" séries");
  const core=rows.reduce((a,r)=>a+r.core,0);
  return `<div class="hchips">${G.map(([k,n])=>`<button class="chip" data-hmg="${k}" aria-pressed="${HV.mg===k}">${n}</button>`).join("")}</div>
  <div class="hchips hmets">${M.map(([k,n])=>`<button class="chip" data-hcm="${k}" aria-pressed="${met===k}">${n}</button>`).join("")}</div>
  <div class="hcard" id="histcard"><div class="hct">${repLogo()}<div><b>MMII × MMSS · ${esc(first(H.m.name))}</b><small>${G.find(x=>x[0]===HV.mg)[1]} · ${M.find(x=>x[0]===met)[1].toLowerCase()}</small></div></div>
  ${rows.length?`<table class="htab hmemb"><thead><tr><th>${HV.mg==="ltr"?"Treino":HV.mg==="mes"?"Mês":HV.mg==="sem"?"Semana":"Dia"}</th><th>MMII</th><th>MMSS</th></tr></thead><tbody>${rows.map(r=>{ const a=r.t.MMII[met], b=r.t.MMSS[met], tot=a+b; const pa=tot?Math.round(a/tot*100):0;
    return `<tr><td><b>${esc(r.l)}</b>${r.sub?`<small>${esc(r.sub)}</small>`:""}</td><td><b>${f(a)}</b><small>${tot?pa+"%":"—"}</small></td><td><b>${f(b)}</b><small>${tot?(100-pa)+"%":"—"}</small></td></tr>`; }).join("")}</tbody></table>
  <small class="muted">${met==="vol"?"Tonelagem = séries × repetições × carga. Exercícios de pernas usam cargas maiores, então MMII tende a pesar mais aqui; para equilíbrio entre membros, compare por séries.":met==="nr"?"Repetições somadas de todas as séries. Isometria em segundos entra como repetição.":"Séries somadas dos exercícios de cada região."}${core?" Exercícios de core ficam de fora.":""}</small>`:`<p class="muted">Nenhum treino lançado ainda.</p>`}</div>
  ${rows.length?`<div class="hsendg"><button class="btn primary hsend" data-hsend="memb" data-hmode="both">📲 Enviar para ${esc(first(H.m.name))}</button><div class="row"><button class="btn small" data-hsend="memb" data-hmode="img">🖼 Só imagem</button><button class="btn small" data-hsend="memb" data-hmode="txt">💬 Só texto</button></div></div>`:""}`; }
function histCmpHTML(H){ if(HV.by==="ex") return cmpModesHTML(H)+cmpExHTML(H); if(HV.by==="memb") return cmpModesHTML(H)+membHTML(H); if(HV.by==="ltr"&&!H.ses.some(x=>x.ltr)) HV.by="dia"; const S2=H.ses; const by=HV.by;
  const keys= by==="dia"? DAYS.filter(d=>S2.some(s=>s.dy===d)) : by==="ltr"? [...new Set(S2.map(s=>s.ltr).filter(Boolean))].sort() : [];
  if(by!=="sem"&&(!HV.bk||!keys.includes(HV.bk))) HV.bk=keys[keys.length-1]||"";
  let opts, A2, B2, lab;
  if(by==="sem"){ const ws=[...new Set(S2.map(s=>s.wid))]; opts=ws.map(id=>{ const s=S2.find(x=>x.wid===id); return {id,l:`S${s.wn} · ${ddmm(addDays((S.weeks.find(w=>w.id===id)||{}).start||s.date,0))}`}; }); }
  else opts=S2.filter(s=>by==="dia"?s.dy===HV.bk:s.ltr===HV.bk).map(s=>({id:s.id,l:`${ddmm(s.date)} · ${s.dy}${s.ltr?" · "+hLtr(s.ltr):""}`}));
  if(!opts.some(o=>o.id===HV.a)) HV.a=(opts[opts.length-2]||opts[0]||{}).id||""; if(!opts.some(o=>o.id===HV.b)) HV.b=(opts[opts.length-1]||{}).id||"";
  const grab=id=>{ if(by==="sem"){ const L=S2.filter(s=>s.wid===id); const ex={}; L.forEach(s=>s.ex.forEach(e=>{ const o=ex[e.k]=ex[e.k]||{n:e.n,reg:e.reg,kg:0,vol:0,ns:0,nr:0,txt:[]}; o.kg=Math.max(o.kg,e.kg); o.vol+=e.vol; o.ns+=e.ns; o.nr+=e.nr||0; o.txt.push(e.txt); })); Object.values(ex).forEach(o=>o.txt=o.txt.join(" | ")); return {ex,vol:L.reduce((t,s)=>t+s.vol,0),n:L.length}; }
    const s=S2.find(x=>x.id===id); const ex={}; (s?s.ex:[]).forEach(e=>{ ex[e.k]={n:e.n,reg:e.reg,kg:e.kg,vol:e.vol,ns:e.ns,nr:e.nr||0,txt:e.txt}; }); return {ex,vol:s?s.vol:0,n:s?1:0}; };
  A2=grab(HV.a); B2=grab(HV.b); const ks=[...new Set([...Object.keys(B2.ex),...Object.keys(A2.ex)])];
  const la=(opts.find(o=>o.id===HV.a)||{}).l||"—", lb=(opts.find(o=>o.id===HV.b)||{}).l||"—";
  HV._cmp={ks,A2,B2,la,lb};
  const sel=(k,v)=>`<select class="inp" data-hsel="${k}">${opts.map(o=>`<option value="${o.id}" ${o.id===v?"selected":""}>${esc(o.l)}</option>`).join("")}</select>`;
  const met=HV.cm;
  return `${cmpModesHTML(H)}
  ${by!=="sem"?`<div class="hchips">${keys.map(k=>`<button class="chip" data-hbk="${esc(k)}" aria-pressed="${HV.bk===k}">${by==="dia"?DAY_N[k]:hLtr(k)}</button>`).join("")||`<span class="muted">Sem treinos ainda.</span>`}</div>`:""}
  ${opts.length<2?`<p class="muted">Precisa de pelo menos 2 ${by==="sem"?"semanas":"treinos"} ${by==="dia"&&HV.bk?"de "+DAY_N[HV.bk]:by==="ltr"&&HV.bk?"do "+hLtr(HV.bk):""} para comparar.</p>`:`
  <div class="hcmpsel"><label>Antes ${sel("a",HV.a)}</label><label>Depois ${sel("b",HV.b)}</label></div>${cmpViewHTML(false)}
  <div class="hcard" id="histcard"><div class="hct">${repLogo()}<div><b>Evolução · ${esc(first(H.m.name))}</b><small>${esc(la)} × ${esc(lb)}</small></div></div>
  ${HV.view==="bar"||HV.view==="line"? (()=>{ const rw=ks.map(k=>({n:(B2.ex[k]||A2.ex[k]).n,a:A2.ex[k]?A2.ex[k][met]:0,b:B2.ex[k]?B2.ex[k][met]:0})); return (HV.view==="bar"? cmpBars(rw,met,"Antes · "+la,"Depois · "+lb) : cmpLine("cln",rw,met,"Antes · "+la,"Depois · "+lb))+`<div class="htot2">Tonelagem total: <b>${nf(A2.vol)}</b> → <b>${nf(B2.vol)}</b> ${hDelta(A2.vol,B2.vol)}</div>`; })() : HV.view==="pie"? cmpPies(ks,A2,B2,met,la,lb) : `<table class="htab hcmp"><thead><tr><th>Exercício</th><th>Antes</th><th>Depois</th><th>Carga</th></tr></thead><tbody>${ks.map(k=>{ const a=A2.ex[k], b=B2.ex[k]; return `<tr><td><b>${esc((b||a).n)}</b></td><td>${a?esc(a.txt):"—"}</td><td>${b?esc(b.txt):"—"}</td><td>${a&&b?hDelta(a.kg,b.kg," kg"):b?'<span class="hdnew">novo</span>':'<span class="hd0">saiu</span>'}</td></tr>`; }).join("")}
  <tr class="htot"><td>Tonelagem total</td><td>${nf(A2.vol)}</td><td>${nf(B2.vol)}</td><td>${hDelta(A2.vol,B2.vol)}</td></tr></tbody></table>`}</div>
  <div class="hsendg"><button class="btn primary hsend" data-hsend="cmp" data-hmode="both">📲 Enviar esta evolução para ${esc(first(H.m.name))}</button><div class="row"><button class="btn small" data-hsend="cmp" data-hmode="img">🖼 Só imagem</button><button class="btn small" data-hsend="cmp" data-hmode="txt">💬 Só texto</button></div></div>`}`; }
function histSesHTML(H){ const ls=[...new Set(H.ses.map(s=>s.ltr).filter(Boolean))].sort(); if(HV.lf&&!ls.includes(HV.lf)) HV.lf="";
  const L=H.ses.filter(s=>!HV.lf||s.ltr===HV.lf).slice().reverse();
  return `<div class="hchips"><button class="chip" data-hlf="" aria-pressed="${!HV.lf}">Todos</button>${ls.map(l=>`<button class="chip" data-hlf="${esc(l)}" aria-pressed="${HV.lf===l}">${esc(hLtr(l))}</button>`).join("")}</div>
  <div class="hcard" id="histcard"><div class="hct">${repLogo()}<div><b>${HV.lf?esc(hLtr(HV.lf)):"Todos os treinos"} · ${esc(first(H.m.name))}</b><small>${L.length} ${L.length===1?"treino":"treinos"}${L.length?` · ${ddmm(L[L.length-1].date)} a ${ddmm(L[0].date)}`:""}</small></div></div>
  ${L.map(s=>`<div class="hses"><div class="hsh"><b>${ddmm(s.date)} · ${DAY_N[s.dy]}</b><span>${esc(hLtr(s.ltr))} · S${s.wn} · ${nf(s.vol)} kg</span></div>${s.ex.map(e=>`<div class="hsr"><span>${esc(e.n)}</span><b>${esc(e.txt)}</b></div>`).join("")}${s.cardio?`<div class="hsr"><span>Cardio</span><b>${s.cardio} min</b></div>`:""}</div>`).join("")||`<p class="muted">Nenhum treino lançado ainda.</p>`}</div>
  ${L.length?`<div class="hsendg"><button class="btn primary hsend" data-hsend="ses" data-hmode="both">📲 Enviar ${HV.lf?"o histórico do "+esc(hLtr(HV.lf)):"todos os treinos"} para ${esc(first(H.m.name))}</button><div class="row"><button class="btn small" data-hsend="ses" data-hmode="img">🖼 Só imagem</button><button class="btn small" data-hsend="ses" data-hmode="txt">💬 Só texto</button></div></div>`:""}`; }
function histHTML(){ const H=histData(HV.sid); HV._H=H; const ms=sesMembers();
  let body="";
  if(HV.tab==="ex"&&HV.ex) body=histExHTML(H);
  else if(HV.tab==="ex"){ const q=noAcc(HV.q).trim(); const L=Object.values(H.exs).filter(e=>!q||e.k.includes(q)).sort((a,b)=>a.list[a.list.length-1].date<b.list[b.list.length-1].date?1:-1);
    body=`<input class="inp hq" data-hq placeholder="🔎 Procurar exercício" value="${esc(HV.q)}">
    <div class="hexl">${L.map(e=>{ const f=e.list[0], l=e.list[e.list.length-1]; return `<button class="hexi" data-hex="${esc(e.k)}"><span><b>${esc(e.n)}</b><small>desde ${ddmm(f.date)} · ${e.list.length}× · último: ${esc(l.txt)}</small></span>${e.list.length>1?hDelta(f.kg,l.kg," kg"):""}<i>›</i></button>`; }).join("")||`<p class="muted">${H.ses.length?"Nenhum exercício com esse nome.":"Nenhum treino lançado ainda."}</p>`}</div>
    ${H.ses.length?`<div class="hsendg"><button class="btn primary hsend" data-hsend="all" data-hmode="both">📲 Enviar o histórico completo para ${esc(first(H.m.name))}</button><div class="row"><button class="btn small" data-hsend="all" data-hmode="img">🖼 Só imagem</button><button class="btn small" data-hsend="all" data-hmode="txt">💬 Só texto</button></div></div>`:""}`; }
  else if(HV.tab==="cmp") body=histCmpHTML(H); else body=histSesHTML(H);
  if(HV.only) return `<div class="hhead"><b>📈 Evolução</b><button class="btn small" data-hx>✕ Fechar</button></div>
  <button class="btn small ghost hback" data-vwopen="${HV.sid}">‹ Voltar ao treino</button>
  ${ms.length>1?`<div class="hchips">${ms.map(m=>`<button class="chip" data-hst="${m.id}" aria-pressed="${m.id===HV.sid}">${esc(first(m.name))}</button>`).join("")}</div>`:""}
  <div id="hsendp" class="sendp" hidden></div>${histCmpHTML(H)}`;
  return `<div class="hhead"><b>📈 Histórico de treino</b><button class="btn small" data-hx>✕ Fechar</button></div>
  ${ms.length>1?`<div class="hchips">${ms.map(m=>`<button class="chip" data-hst="${m.id}" aria-pressed="${m.id===HV.sid}">${esc(first(m.name))}</button>`).join("")}</div>`:""}
  <p class="muted hsub">${esc(H.m?first(H.m.name):"")}: ${H.ses.length} ${H.ses.length===1?"treino":"treinos"}${H.ses.length?` desde ${ddmm(H.ses[0].date)}`:""} · ${Object.keys(H.exs).length} exercícios</p>
  <button class="btn hvwbtn" data-vwopen="${HV.sid}">Visualizar treino do dia ou da semana</button>
  <div class="seg htabs">${[["ex","🏋️ Por exercício"],["cmp","📈 Evolução"],["ses","🗓 Treinos"]].map(([k,n])=>`<button data-htab="${k}" aria-pressed="${HV.tab===k}">${n}</button>`).join("")}</div>
  <div id="hsendp" class="sendp" hidden></div>${body}`; }
function histRender(){ let o=document.getElementById("histOv"); if(!o){ o=document.createElement("div"); o.id="histOv"; document.body.appendChild(o); }
  if(!HV){ o.hidden=true; return; } o.innerHTML=`<div class="hwrap">${histHTML()}</div>`; o.hidden=false; requestAnimationFrame(()=>histDraw(o)); }
function histText(kind){ const H=HV._H, m=H.m, nm=first(m.name); let t="";
  if(kind==="ex"){ const e=H.exs[HV.ex]; const L=e.list, f=L[0], l=L[L.length-1]; t=`📈 *Evolução: ${e.n}*\n${nm}, você começou este exercício em ${ddmm(f.date)}.\n\n`+L.map(x=>`${ddmm(x.date)} (${x.dy}${x.ltr?" · "+hLtr(x.ltr):""}): ${x.txt}`).join("\n")+(L.length>1&&l.kg!==f.kg?`\n\nCarga: ${hKg(f.kg)} → ${hKg(l.kg)} (${l.kg>f.kg?"+":""}${String(Math.round((l.kg-f.kg)*10)/10).replace(".",",")} kg) 💪`:""); }
  else if(kind==="cmpx"){ const C=HV._cx, L=C.L, f=L[0], l=L[L.length-1]; t=`📈 *${C.e.n} · ${nm}*\n${ddmm(HV.de)} a ${ddmm(HV.ate)}\n\n`+L.map(x=>`${ddmm(x.date)} (${x.dy}${x.ltr?" · "+hLtr(x.ltr):""}): ${x.txt}`).join("\n")+(L.length>1&&l.kg!==f.kg?`\n\nCarga: ${hKg(f.kg)} → ${hKg(l.kg)} (${l.kg>f.kg?"+":""}${String(Math.round((l.kg-f.kg)*10)/10).replace(".",",")} kg) 💪`:""); }
  else if(kind==="all"){ t=`📈 *Seu histórico de treino, ${nm}*\n${H.ses.length} treinos desde ${ddmm(H.ses[0].date)}\n\n`+Object.values(H.exs).map(e=>{ const f=e.list[0], l=e.list[e.list.length-1]; return `• ${e.n}: ${e.list.length}× desde ${ddmm(f.date)}${e.list.length>1&&(f.kg||l.kg)?` · ${hKg(f.kg)} → ${hKg(l.kg)}`:` · ${l.txt}`}`; }).join("\n"); }
  else if(kind==="memb"){ const met=HV.cm, f=v=> met==="vol"? nf(v)+" kg" : met==="nr"? nf(v)+" reps" : nf(v)+" séries"; t=`💪 *MMII × MMSS · ${nm}*\n`+({ns:"Séries",nr:"Repetições",vol:"Tonelagem"})[met]+`\n`+HV._memb.map(r=>{ const a=r.t.MMII[met], b=r.t.MMSS[met], tot=a+b, pa=tot?Math.round(a/tot*100):0; return `\n*${r.l}*\nMMII: ${f(a)} (${pa}%)\nMMSS: ${f(b)} (${tot?100-pa:0}%)`; }).join("\n"); }
  else if(kind==="cmp"){ const C=HV._cmp; const da=String(C.la).split(" · ")[0], db=String(C.lb).split(" · ")[0]; t=`📈 *Evolução do treino · ${nm}*\n📅 Antes: ${C.la}\n📅 Depois: ${C.lb}\n`+C.ks.map(k=>{ const a=C.A2.ex[k], b=C.B2.ex[k]; const same=a&&b&&a.txt===b.txt; return `\n*${(b||a).n}*\n${da}: ${a?a.txt:"não fez"}\n${db}: ${b?b.txt:"não fez"}${same?" (igual)":""}`; }).join("\n")+`\n\n*Tonelagem total:* ${nf(C.A2.vol)} kg → ${nf(C.B2.vol)} kg`; }
  else { const L=H.ses.filter(s=>!HV.lf||s.ltr===HV.lf); t=`🗓 *${HV.lf?"Histórico do "+hLtr(HV.lf):"Seus treinos"} · ${nm}*\n`+L.map(s=>`\n*${ddmm(s.date)} · ${DAY_N[s.dy]}${s.ltr?" · "+hLtr(s.ltr):""}*\n`+s.ex.map(e=>`• ${e.n}: ${e.txt}`).join("\n")).join("\n"); }
  return t+`\n\n— ${BR().ass}`; }
async function histSend(kind,mode){ const H=HV._H, m=H.m, nm=esc(first(m.name)); const text=histText(kind); const p=document.getElementById("hsendp"); const card=document.getElementById("histcard"); mode=mode||"both";
  if(mode==="txt"||!card){ waOpen(m,text); return; }
  if(!window.html2canvas){ toast("O gerador de imagem não carregou. Recarregue a página."); waOpen(m,text); return; }
  const fname=`historico-${noAcc(first(m.name)).replace(/[^a-z0-9]/g,"")}.png`; p.hidden=false; p.innerHTML="<b>Preparando a imagem…</b>"; p.scrollIntoView({block:"nearest"});
  let how="fail", blob=null;
  try{ card.classList.add("cap"); const c=await h2cZ(card,{scale:2,backgroundColor:"#ffffff",useCORS:true}); card.classList.remove("cap"); blob=await new Promise(r=>c.toBlob(r,"image/png")); }catch(e){ card.classList.remove("cap"); }
  if(blob){ HSEND={blob,fname,text:mode==="both"?text:""};
    let canSh=false; try{ canSh=!!(navigator.canShare&&navigator.canShare({files:[new File([blob],fname,{type:"image/png"})]})); }catch(_){}
    if(canSh){ const sh=await shareImg(blob,fname,HSEND.text); if(sh==="shared"){ p.innerHTML=`<b>✓ Enviado.</b>${mode==="both"?" No WhatsApp, a imagem vai com o texto junto.":""}`; return; } if(sh==="cancel"){ p.hidden=true; return; }
      p.innerHTML=`<b>A imagem está pronta.</b><button class="btn primary" data-hshare>📲 Enviar imagem${mode==="both"?" e texto":""}</button>`; return; }
    try{ if(await saveImgBlob(blob,fname)) how="saved"; else { showImgs([{src:await blobToUrl(blob),name:fname}],"Salvar a imagem"); how="shown"; } }catch(e){ if(e&&e.code==="declined") how="declined"; else { try{ showImgs([{src:await blobToUrl(blob),name:fname}],"Salvar a imagem"); how="shown"; }catch(_){} } } }
  p.innerHTML=`${how==="saved"?`<b>1. Imagem salva ✓</b>`:how==="shown"?`<b>1. Toque e segure a imagem que abriu e escolha Baixar imagem.</b>`:how==="declined"?`<b>1. Você cancelou o salvamento.</b>`:`<b>1. Não consegui gerar a imagem.</b> Tire um print.`}
    <button class="btn primary" data-hwa="${kind}">2. Abrir WhatsApp de ${nm}${mode==="both"?" com o texto":""}</button>
    <span><b>3.</b> Na conversa: 📎 → <b>Galeria</b> → a primeira foto → enviar.${mode==="both"?" Depois envie o texto, que já está escrito.":""}</span>`; }
let HSEND=null;
document.addEventListener("click",async e=>{ const b=e.target.closest&&e.target.closest("#histOv [data-hshare]"); if(!b||!HSEND) return; const p=document.getElementById("hsendp"); try{ await navigator.share({files:[new File([HSEND.blob],HSEND.fname,{type:"image/png"})],text:HSEND.text}); if(p) p.innerHTML="<b>✓ Enviado.</b>"; }catch(err){ if(!(err&&err.name==="AbortError")){ try{ showImgs([{src:await blobToUrl(HSEND.blob),name:HSEND.fname}],"Salvar a imagem"); }catch(_){} } } });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("#histOv [data-hwa]"); if(!b||!HV) return; const m=HV._H.m; if(b.textContent.includes("com o texto")) waOpen(m,histText(b.dataset.hwa)); else waOpen(m,""); });
document.addEventListener("click",e=>{ const t=e.target.closest&&e.target.closest("[data-histopen],#histOv [data-hx],#histOv [data-htab],#histOv [data-hex],#histOv [data-hback],#histOv [data-hmet],#histOv [data-hby],#histOv [data-hbk],#histOv [data-hlf],#histOv [data-hst],#histOv [data-hsend],#histOv [data-hview],#histOv [data-hcm],#histOv [data-hmg]"); if(!t) return;
  const d=t.dataset; if(d.histopen!=null){ const m0=A(); if(!m0) return; let z=1; try{ z=+localStorage.getItem("rp_vwz")||1; }catch(_){} VW={sid:m0.id,days:[S.day],ltr:"",wid:S.week,z,lay:"h"}; vwRender(); return; } if(d.hx!=null){ histClose(); return; }
  if(d.htab){ HV.tab=d.htab; HV.ex=null; } else if(d.hex){ HV.ex=d.hex; HV.met="kg"; } else if(d.hback!=null) HV.ex=null; else if(d.hmet) HV.met=d.hmet; else if(d.hby){ HV.by=d.hby; HV.bk=""; HV.a=""; HV.b=""; HV.de=""; HV.ate=""; } else if(d.hbk!=null){ HV.bk=d.hbk; HV.a=""; HV.b=""; } else if(d.hlf!=null) HV.lf=d.hlf; else if(d.hst){ HV.sid=d.hst; HV.ex=null; } else if(d.hview){ HV.view=d.hview; } else if(d.hcm){ HV.cm=d.hcm; } else if(d.hmg){ HV.mg=d.hmg; } else if(d.hsend){ histSend(d.hsend,d.hmode); return; }
  histRender(); const o=document.getElementById("histOv"); if(o&&(d.hex||d.hback!=null||d.htab)) o.scrollTop=0; });
document.addEventListener("input",e=>{ if(!e.target.matches||!e.target.matches("#histOv [data-hq]")) return; HV.q=e.target.value; const pos=e.target.selectionStart; histRender(); const q=document.querySelector("#histOv [data-hq]"); if(q){ q.focus(); try{ q.setSelectionRange(pos,pos); }catch(_){} } });
document.addEventListener("change",e=>{ if(!e.target.matches||!e.target.matches("#histOv [data-hsel]")) return; HV[e.target.dataset.hsel]=e.target.value; if(e.target.dataset.hsel==="xk"){ HV.de=""; HV.ate=""; } histRender(); });
/* Visualizar o treino em tamanho grande: o dia, a semana inteira ou uma letra */
let VW=null;
function vwDay(sid,w,dy){ const d=dayOf(w.id,sid,dy); if(!dayHasData(d)) return null; const ex=[]; (d.rows||[]).forEach(r=>{ if(r.cp&&!r.n1.trim()) return; rowLines(r).forEach(l=>{ ex.push({n:l.sub?"":(l.n||""),t:setTxt(l.x,0,l.u),sub:!!l.sub,tec:l.sub?"":(r.tec||""),cp:!!r.cp}); }); }); return {date:addDays(w.start,DAYS.indexOf(dy)),dy,ltr:ltrOf(sid,w.id,dy,d)||"",ex,cardio:d.cardio&&num(d.cardio.t)?d.cardio:null}; }
function vwCard(x){ return `<div class="hses vwses"><div class="hsh"><b>${DAY_N[x.dy]} · ${ddmm(x.date)}</b><span>${esc(hLtr(x.ltr))}</span></div>${x.ex.map(e=>`<div class="hsr ${e.sub?"vwsub":""}"><span>${e.sub?"↳":esc(e.n)}${e.tec?` <i class="vwtec">${esc(e.tec)}</i>`:""}${e.cp?` <i class="vwtec">semana passada</i>`:""}</span><b>${esc(e.t)}</b></div>`).join("")}${x.cardio?`<div class="hsr"><span>❤️ Cardio${x.cardio.tipo?" · "+esc(x.cardio.tipo):""}</span><b>${esc(x.cardio.t)} min${x.cardio.z?" · zona "+esc(x.cardio.z):""}</b></div>`:""}</div>`; }
function vwHTML(){ const m=stById(VW.sid); const L=wkSorted(); let w=L.find(x=>x.id===VW.wid)||S.weeks.find(x=>x.id===S.week); VW.wid=w.id; const wi=L.indexOf(w);
  const all=DAYS.map(dy=>vwDay(m.id,w,dy)); const ls=[...new Set(DAYS.map(dy=>ltrOf(m.id,w.id,dy)).filter(Boolean))].sort();
  let body="";
  if(VW.ltr==="*"){ const seen={}; for(const ww of L.slice(0,wi+1).reverse()) for(const dy of DAYS){ const x=vwDay(m.id,ww,dy); if(x&&x.ltr&&!seen[x.ltr]) seen[x.ltr]=x; } body=Object.keys(seen).sort().map(k=>vwCard(seen[k])).join("")||`<p class="muted">Ainda não tem treino com letra lançado.</p>`; }
  else if(VW.ltr){ let xs=all.filter(x=>x&&x.ltr===VW.ltr); if(!xs.length){ for(const ww of L.slice(0,wi+1).reverse()){ for(const dy of DAYS){ const x=vwDay(m.id,ww,dy); if(x&&x.ltr===VW.ltr){ xs=[x]; break; } } if(xs.length) break; } }
    body=xs.map(vwCard).join("")||`<p class="muted">${esc(hLtr(VW.ltr))} ainda não foi feito.</p>`; }
  else body=DAYS.filter(dy=>VW.days.includes(dy)).map((dy,i)=>{ const x=all[DAYS.indexOf(dy)]; return x? vwCard(x) : `<div class="hses vwses vwnone"><b>${DAY_N[dy]} · ${ddmm(addDays(w.start,DAYS.indexOf(dy)))}</b><span class="muted">sem treino lançado</span></div>`; }).join("")||`<p class="muted">Escolha um ou mais dias.</p>`;
  const allOn=DAYS.every(d=>VW.days.includes(d))&&!VW.ltr;
  const ms=sesMembers();
  return `<div class="hhead"><b>Treino de ${esc(first(m.name))}</b><button class="btn small" data-vwx>✕ Fechar</button></div>
  ${ms.length>1?`<div class="hchips">${ms.map(x=>`<button class="chip" data-vwst="${x.id}" aria-pressed="${x.id===m.id}">${esc(first(x.name))}</button>`).join("")}</div>`:""}
  <button class="btn vwcmpb" data-vwcmp="${m.id}">📈 Evolução</button>
  <div class="vwwk"><button class="icon-btn" data-vwwk="-1" ${wi<=0?"disabled":""} aria-label="Semana anterior">‹</button><b>${ddmm(w.start)} a ${ddmm(addDays(w.start,6))}</b><button class="icon-btn" data-vwwk="1" ${wi>=L.length-1?"disabled":""} aria-label="Próxima semana">›</button></div>
  <span class="vwlab">Dias (toque em um ou mais)</span>
  <div class="vwdays">${DAYS.map((dy,i)=>`<button class="vwd ${VW.days.includes(dy)&&!VW.ltr?"on":""} ${all[i]?"has":""}" data-vwday="${dy}">${dy}<small>${all[i]&&all[i].ltr?esc(all[i].ltr.slice(0,3)):all[i]?"•":""}</small></button>`).join("")}</div>
  <div class="hchips"><button class="chip" data-vwall aria-pressed="${allOn}">Semana inteira</button>${ls.map(l=>`<button class="chip" data-vwltr="${esc(l)}" aria-pressed="${VW.ltr===l}">${esc(hLtr(l))}</button>`).join("")}<span class="vwz"><button class="btn small" data-vwz="-1">A−</button><button class="btn small" data-vwz="1">A+</button></span></div>
  ${(()=>{ VW.lay="h"; const n=Math.max(1,Math.min(5,(body.match(/class="hses vwses/g)||[]).length)); const k={1:1,2:.78,3:.6,4:.5,5:.43}[n]; return `<div class="vwbody ${VW.lay==="h"?"vwh":""}" style="--vwk:${VW.z};--vwn:${n};--vwf:${k}">${body}</div>`; })()}`; }
function vwRender(){ let o=document.getElementById("vwOv"); if(!o){ o=document.createElement("div"); o.id="vwOv"; document.body.appendChild(o); } if(!VW){ o.hidden=true; document.body.style.overflow=""; return; } o.innerHTML=`<div class="hwrap">${vwHTML()}</div>`; o.hidden=false; document.body.style.overflow="hidden"; }
document.addEventListener("click",e=>{ const t=e.target.closest&&e.target.closest("[data-vwopen],[data-vwltrs],#vwOv [data-vwlay],#vwOv [data-vwx],#vwOv [data-vwday],#vwOv [data-vwall],#vwOv [data-vwwk],#vwOv [data-vwltr],#vwOv [data-vwz],#vwOv [data-vwst],#vwOv [data-vwcmp]"); if(!t) return; const d=t.dataset;
  if(d.vwcmp){ VW=null; vwRender(); histOpen(d.vwcmp,true); return; }
  if(d.vwst){ VW.sid=d.vwst; vwRender(); return; }
  if((d.vwopen||d.vwltrs)&&t.closest("#histOv")){ try{ histClose(); }catch(_){} }
  if(d.vwltrs){ let z=1; try{ z=+localStorage.getItem("rp_vwz")||1; }catch(_){} VW={sid:d.vwltrs,days:[],ltr:"*",wid:S.week,z,lay:"h"}; }
  else if(d.vwopen){ let z=1; try{ z=+localStorage.getItem("rp_vwz")||1; }catch(_){} VW={sid:d.vwopen,days:[S.day],ltr:"",wid:S.week,z,lay:"h"}; }
  else if(d.vwlay){ VW.lay=d.vwlay; try{ localStorage.setItem("rp_vwlay",d.vwlay); }catch(_){} }
  else if(d.vwx!=null) VW=null; else if(d.vwday){ if(VW.ltr){ VW.ltr=""; VW.days=[]; } VW.days= VW.days.includes(d.vwday)? VW.days.filter(x=>x!==d.vwday) : VW.days.concat([d.vwday]); } else if(d.vwall!=null){ VW.ltr=""; VW.days= DAYS.every(x=>VW.days.includes(x))? [S.day] : DAYS.slice(); } else if(d.vwwk){ const L=wkSorted(); const i=L.findIndex(x=>x.id===VW.wid); const n=L[i+(+d.vwwk)]; if(n) VW.wid=n.id; } else if(d.vwltr!=null) VW.ltr= VW.ltr===d.vwltr? "" : d.vwltr; else if(d.vwz){ VW.z=Math.max(.8,Math.min(1.8,Math.round((VW.z+(+d.vwz)*.15)*100)/100)); try{ localStorage.setItem("rp_vwz",VW.z); }catch(_){} }
  vwRender(); });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-progpg]"); if(!b) return; S.active=b.dataset.progpg; save(); show("semana"); });
/* Sessão em cartões: um jeito mais simples de ver e lançar o treino do dia (por enquanto só para o dono) */
/* Erros sempre em português, com o que fazer */
function erroPT(e){ const raw=String((e&&(e.code||e.name))||"")+" "+String((e&&e.message)||e||""); const t=raw.toLowerCase();
  if(/abort|assertion|out of memory|memory access|runtimeerror|wasm/.test(t)) return "o leitor travou por falta de memória do celular. Feche outros apps e tente de novo (foto menor ajuda)";
  if(/permission-denied|missing or insufficient permissions/.test(t)) return "sem permissão na nuvem. Saia e entre de novo na conta";
  if(/unauthenticated/.test(t)) return "você saiu da conta. Entre de novo";
  if(/quota|resource-exhausted/.test(t)) return "o espaço está cheio. Apague fotos ou arquivos antigos e tente de novo";
  if(/unavailable|network|failed to fetch|load failed|offline|internet|err_/.test(t)) return "sem internet ou internet fraca. Confira a conexão e tente de novo";
  if(/deadline|timeout|timed out/.test(t)) return "demorou demais para responder. Tente de novo";
  if(/notallowederror|not allowed|denied/.test(t)) return "o celular não deu permissão (câmera, Bluetooth ou arquivo). Toque em Permitir quando pedir";
  if(/notsupported|not supported|não é compatível/.test(t)) return "este celular ou navegador não tem esse recurso. Use o Chrome atualizado";
  if(/securityerror/.test(t)) return "o navegador bloqueou por segurança";
  if(/notfounderror|no device/.test(t)) return "nenhum aparelho encontrado (ou a busca foi cancelada)";
  if(/aborterror|cancel/.test(t)) return "cancelado";
  if(/not-found/.test(t)) return "não encontrei esse registro";
  if(/invalid-argument|invalid/.test(t)) return "algum dado está em formato errado";
  if(/failed-precondition/.test(t)) return "falta configurar algo na nuvem";
  const msg=String((e&&e.message)||e||"").trim(); if(/[ãçõáéíóúâê]|\bnão\b|\bnao\b/i.test(msg)) return msg.replace(/[.\s]+$/,"");
  return "erro inesperado"+(e&&e.code? " (código "+e.code+")" : ""); }
let ERR_T=0;
window.addEventListener("unhandledrejection",ev=>{ const r=ev.reason; const t=String((r&&r.message)||r||""); if(!t||/resizeobserver|script error|extension|chrome-extension/i.test(t)) return; if(Date.now()-ERR_T<8000) return; ERR_T=Date.now(); try{ toast("⚠ Algo deu errado: "+erroPT(r)+". Se repetir, mande um print."); }catch(_){} });
/* ---------- Importar de foto, print, PDF ou Excel (lido no próprio aparelho, sem custo) ---------- */
const IMP_LIB={docx:"https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",xlsx:"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",pdf:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",pdfw:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",tess:"https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
  tw:"https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js",tc:"https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.1",tl:"https://cdn.jsdelivr.net/npm/@tesseract.js-data/por/4.0.0_best_int"};
const impLoaded={};
function impScript(u){ if(impLoaded[u]) return impLoaded[u]; return impLoaded[u]=new Promise((ok,no)=>{ const s=document.createElement("script"); s.src=u; s.onload=ok; s.onerror=()=>{ delete impLoaded[u]; no(new Error("Não consegui abrir o leitor. Confira a internet e tente de novo.")); }; document.head.appendChild(s); }); }
const IMP={area:null,lines:[],busy:"",err:"",sid:null,off:new Set(),opt:{}};
const IMP_T={sessao:"treino do dia",prog:"ficha (Treino A, B, C…)",cad:"alunos",av:"avaliação física",fin:"pagamentos"};
function impBtn(area,lab){ return `<button type="button" class="btn impbtn" data-impopen="${area}">📎 ${lab}</button>`; }
async function impRead(file,onp){ const n=(file.name||"").toLowerCase(), ty=file.type||"";
  if(/\.(xlsx|xlsm|xls|ods|csv)$/.test(n)||/spreadsheet|excel|csv/.test(ty)){ await impScript(IMP_LIB.xlsx); const wb=XLSX.read(await file.arrayBuffer(),{type:"array"}); const out=[];
    wb.SheetNames.forEach(sn=>{ XLSX.utils.sheet_to_json(wb.Sheets[sn],{header:1,raw:false,defval:""}).forEach(r=>{ const c=r.map(x=>String(x).trim()); while(c.length&&!c[c.length-1]) c.pop(); if(c.some(Boolean)) out.push(c.join(" | ")); }); }); return out; }
  if(/\.docx$/.test(n)||/wordprocessingml/.test(ty)){ await impScript(IMP_LIB.docx); const r=await mammoth.convertToHtml({arrayBuffer:await file.arrayBuffer()}); const doc=new DOMParser().parseFromString(r.value,"text/html"); const out=[];
    doc.body.querySelectorAll("p,h1,h2,h3,h4,li,tr").forEach(el=>{ if(el.closest("tr")&&el.tagName!=="TR") return; const t= el.tagName==="TR"? [...el.children].map(c=>c.textContent.trim()).join(" | ") : el.textContent.trim(); if(t.replace(/[|\s]/g,"")) out.push(t); }); return out; }
  if(/\.doc$/.test(n)) throw new Error("Esse Word é do formato antigo (.doc). No Word, salve como .docx ou PDF e tente de novo.");
  if(/\.pdf$/.test(n)||ty==="application/pdf"){ await impScript(IMP_LIB.pdf); pdfjsLib.GlobalWorkerOptions.workerSrc=IMP_LIB.pdfw; const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise; const out=[]; let txt=0;
    for(let p=1;p<=pdf.numPages;p++){ const pg=await pdf.getPage(p); const tc=await pg.getTextContent(); const it=tc.items.filter(i=>String(i.str||"").trim()); txt+=it.length; const rows={};
      it.forEach(i=>{ const y=Math.round(i.transform[5]/4)*4; (rows[y]=rows[y]||[]).push(i); });
      Object.keys(rows).map(Number).sort((a,b)=>b-a).forEach(y=>{ let s="", lx=null; rows[y].sort((a,b)=>a.transform[4]-b.transform[4]).forEach(i=>{ const x=i.transform[4]; if(lx!=null) s+= x-lx>10? " | " : " "; s+=String(i.str).trim(); lx=x+(i.width||0); }); out.push(s.trim()); }); }
    if(txt) return out;
    let all=[]; for(let p=1;p<=Math.min(pdf.numPages,3);p++){ const pg=await pdf.getPage(p); const vp=pg.getViewport({scale:2}); const cv=document.createElement("canvas"); cv.width=vp.width; cv.height=vp.height; await pg.render({canvasContext:cv.getContext("2d"),viewport:vp}).promise; all=all.concat(await impOcr(cv,onp)); } return all; }
  if(/^image\//.test(ty)||/\.(png|jpe?g|webp|gif|bmp)$/.test(n)) return impOcr(await impImg(file),onp);
  throw new Error("Esse tipo de arquivo não dá para ler. Use foto, print, PDF, Excel ou Word."); }
async function impImg(file){ const url=URL.createObjectURL(file); const im=new Image(); await new Promise((ok,no)=>{ im.onload=ok; im.onerror=()=>no(new Error("Não consegui abrir a imagem. Tente um print ou foto em JPG.")); im.src=url; });
  const mx=Math.max(im.width,im.height), sc= mx<1400? 1400/mx : Math.min(1,2600/mx); const cv=document.createElement("canvas"); cv.width=Math.round(im.width*sc); cv.height=Math.round(im.height*sc); const g=cv.getContext("2d"); g.fillStyle="#fff"; g.fillRect(0,0,cv.width,cv.height); g.filter="grayscale(1) contrast(1.35)"; g.drawImage(im,0,0,cv.width,cv.height); URL.revokeObjectURL(url); return cv; }
async function impOcr(cv,onp){ await impScript(IMP_LIB.tess); if(onp) onp(0);
  const w=await Tesseract.createWorker("por",1,{workerPath:IMP_LIB.tw,corePath:IMP_LIB.tc,langPath:IMP_LIB.tl,logger:m=>{ if(onp&&m.status==="recognizing text") onp(Math.round((m.progress||0)*100)); }});
  try{ await w.setParameters({tessedit_pageseg_mode:"3",preserve_interword_spaces:"1"}); const r=await w.recognize(cv); return String(r.data.text||"").split(/\n/).map(x=>x.replace(/\s{3,}/g," | ").replace(/\s+/g," ").trim()).filter(x=>x.length>1); } finally{ try{ await w.terminate(); }catch(_){} } }
/* ---- leitura das linhas ---- */
const impCells=l=>String(l).split(/\s*\|\s*|\t/).map(x=>x.trim());
const impNum=s=>{ const m=String(s||"").match(/\d+(?:[.,]\d+)?/); return m? m[0].replace(".",",") : ""; };
const impInt=s=>{ const m=String(s||"").match(/\d+/); return m? m[0] : ""; };
const IMP_SKIP=/^(exerc[ií]cios?|s[ée]ries?|reps?|repeti[çc][õo]es|carga|kg|peso|descanso|intervalo|obs|observa|m[ée]todo|nome|aluno|data|total|valor)\b/i;
function impHdr(cells){ const f=re=>cells.findIndex(c=>re.test(noAcc(c).toLowerCase())); const m={s:f(/^s[e]?ries?|^ser\b|^sets?/),r:f(/^rep|^repeti/),c:f(/^kg|carga|^peso/)}; return (m.s>=0||m.r>=0)&&cells.some(c=>/exerc|nome/i.test(noAcc(c)))? m : null; }
function impEx(line,map){ const cells=impCells(line); let ni=cells.findIndex(c=>/[a-zà-ú]{3,}/i.test(c)&&!/^\d+\s*(x|kg|s[ée]ries?|reps?)/i.test(c)); if(ni<0) return null;
  let name=cells[ni], tail=cells.filter((_,i)=>i!==ni).join(" ");
  const cut=name.search(/\s(\d+\s*(x|×|de\s+\d|s[ée]ries?)|\d+\s*kg|\d+\s*\/)/i); if(cut>0){ tail=name.slice(cut)+" "+tail; name=name.slice(0,cut); }
  name=name.replace(/^[\d\s.\-–)•*º°]+/,"").replace(/[\s:–\-|]+$/,"").trim(); if(name.length<3||IMP_SKIP.test(noAcc(name))) return null;
  const o={n:name.charAt(0).toUpperCase()+name.slice(1),s:"",r:"",c:""};
  if(map&&cells.length>1){ if(map.s>=0) o.s=impInt(cells[map.s]); if(map.r>=0) o.r=impInt(cells[map.r]); if(map.c>=0) o.c=impNum(cells[map.c]); }
  if(!o.s&&!o.r&&!o.c){ const v=vozParse(tail.replace(/×/g,"x")); o.s=impInt(v.s); o.r=impInt(v.r); o.c=v.c? impNum(v.c) : ""; }
  return o; }
const IMP_LTR=/^\s*(?:treino|ficha|dia|sess[aã]o)?\s*[:\-–]?\s*([A-E]|[1-5])\s*(?:$|[:\-–).]|\s+[-–:]?\s*[a-zà-ú])/i;
const IMP_DAYS=[["Seg",/^seg/],["Ter",/^ter/],["Qua",/^qua/],["Qui",/^qui/],["Sex",/^sex/],["Sáb",/^s[aá]b/],["Dom",/^dom/]];
function impDayOf(t){ const x=noAcc(String(t||"")).toLowerCase().trim(); const d=IMP_DAYS.find(([,re])=>re.test(x)); return d? d[0] : ""; }
function impGroups(lines){ const G=[]; let cur=null, map=null;
  lines.forEach(l=>{ const cells=impCells(l); const h=impHdr(cells); if(h){ map=h; return; }
    const first=noAcc(cells[0]||"").toLowerCase(); const dy=/^(segunda|terca|quarta|quinta|sexta|sabado|domingo)\b/.test(first)&&cells.filter(Boolean).length<=2? impDayOf(first) : "";
    const lm= !dy&&cells.filter(Boolean).length<=2? String(l).match(IMP_LTR) : null;
    if(dy||(lm&&!impEx(l.replace(IMP_LTR,""),null)?.s)){ const L= lm? (/\d/.test(lm[1])? "ABCDE"[+lm[1]-1] : lm[1].toUpperCase()) : ""; cur={L,day:dy,items:[]}; G.push(cur); return; }
    const e=impEx(l,map); if(e){ if(!cur){ cur={L:"",day:"",items:[]}; G.push(cur); } cur.items.push(e); } });
  return G.filter(g=>g.items.length); }
/* ---- alunos ---- */
function impSlots(t){ const x=noAcc(String(t)).toLowerCase(); const ds=[]; const DN={seg:1,ter:2,qua:3,qui:4,sex:5,sab:6,dom:0,"2a":1,"3a":2,"4a":3,"5a":4,"6a":5};
  (x.match(/\b(seg|ter|qua|qui|sex|sab|dom)[a-z-]*|\b[2-6][aª]/g)||[]).forEach(w=>{ const k=w.slice(0,3).replace("ª","a"); const d=DN[k]!=null? DN[k] : DN[w.replace("ª","a").slice(0,2)]; if(d!=null&&!ds.includes(d)) ds.push(d); });
  const hs=[]; (x.match(/\b([01]?\d|2[0-3])\s*(?::|h)\s*([0-5]\d)?\b/g)||[]).forEach(h=>{ const m=h.match(/(\d+)\s*(?::|h)\s*(\d+)?/); hs.push(String(m[1]).padStart(2,"0")+":"+(m[2]||"00")); });
  return ds.map((d,i)=>({d,h:hs[i]||hs[0]||"07:00"})); }
function impAluno(line){ const cells=impCells(line); const all=cells.join(" ");
  if(/^(nome|aluno)\b/i.test(noAcc(cells[0]||""))) return null;
  const nm=(cells.find(c=>/[a-zà-ú]{2,}/i.test(c)&&!/^(seg|ter|qua|qui|sex|s[áa]b|dom)\b/i.test(noAcc(c).toLowerCase())&&!/r\$/i.test(c))||"").replace(/\s*\(?\d.*$/,"").trim(); if(nm.length<3) return null;
  const tm=all.match(/\(?\b\d{2}\)?\s?9?\s?\d{4}[-\s]?\d{4}\b/); const tel= tm? tm[0].trim() : "";
  const rest=all.replace(tm?tm[0]:"",""); const slots=impSlots(rest);
  let val=""; const rv=rest.match(/r\$\s*([\d.]+(?:,\d{1,2})?)/i)||cells.map(c=>c.match(/^\s*([\d.]+,\d{2}|\d{2,4})\s*$/)).find(Boolean); if(rv) val=rv[1].replace(/\.(?=\d{3})/g,"").replace(",",".");
  return {nome:nm.replace(/\b\w/g,c=>c.toUpperCase()).replace(/\b(Da|De|Do|Dos|Das|E)\b/g,s=>s.toLowerCase()),tel,slots,val:+val||0}; }
/* ---- avaliação ---- */
const IMP_AV=[[/peso (da |de )?gordura|massa gorda/,"gord"],[/(%|perc|percentual).*gord|gordura corporal|\bbf\b|^gordura\s*%?$|^% ?gord/,"pg"],[/visceral/,"vis"],[/massa magra.*%|% ?massa magra/,"pmm"],[/massa magra|\blbm\b/,"lbm"],[/musculo esq|massa muscular esq|\bsmm\b/,"mme"],[/musculo|massa muscular/,"mus"],[/idade metab/,"idmet"],[/metabolismo|\btmb\b|taxa metab/,"tmb"],[/agua.*kg|peso da agua/,"aguakg"],[/agua/,"agua"],[/osso/,"ossos"],[/proteina/,"prot"],[/\bimc\b/,"imc"],[/altura|estatura/,"alt"],[/^idade/,"idade"],[/^peso/,"peso"]];
const IMP_PER=[[/pesco/,"p_pesc"],[/ombro/,"p_omb"],[/peito|torax/,"p_peito"],[/cintura/,"p_cint"],[/abd.*sup/,"p_abs"],[/abd.*inf|abdomen|abdominal/,"p_abi"],[/quadril/,"p_quad"],[/antebra.*(esq|\be\b)/,"p_antE"],[/antebra/,"p_antD"],[/bra.*(esq|\be\b)/,"p_bracoE"],[/bra/,"p_bracoD"],[/coxa.*(esq|\be\b)/,"p_coxaE"],[/coxa/,"p_coxaD"],[/pantu.*(esq|\be\b)/,"p_pantE"],[/pantu/,"p_pantD"]];
const IMP_DC=[[/tric/,"tri"],[/bic/,"bic"],[/subesc/,"subesc"],[/peit/,"peit"],[/axil/,"axm"],[/supra/,"supra"],[/abd/,"abd"],[/coxa/,"coxa"],[/pantu/,"pant"]];
const impDates=l=>(String(l).match(/\b\d{1,2}\/\d{1,2}(?:\/\d{2,4})?\b/g)||[]).map(x=>{ const [d,m,y]=x.split("/"); const yy= y? (y.length===2? "20"+y : y) : String(new Date().getFullYear()); return `${yy}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`; });
function impAv(lines){ let dates=[], mode=""; const rows=[];
  lines.forEach(l=>{ const t=noAcc(l).toLowerCase(); const ds=impDates(l); if(ds.length&&!/[a-z]{4,}.*\d+[.,]\d/.test(t.replace(/\d{1,2}\/\d{1,2}(\/\d{2,4})?/g,""))){ dates=ds; return; }
    if(/dobra/.test(t)&&!/\d/.test(t)){ mode="dc"; return; } if(/(perimetr|circunfer|medidas)/.test(t)&&!/\d/.test(t)){ mode="per"; return; }
    const cells=impCells(l); const lab=noAcc(cells[0]&&/[a-z]/i.test(cells[0])? cells[0] : l.replace(/[\d.,]+.*$/,"")).toLowerCase().replace(/\(.*?\)/g,"").trim(); if(!/[a-z]{3}/.test(lab)) return;
    const vals=(cells.length>1? cells.slice(1).join(" ") : l.slice(l.search(/\d/)>=0? l.search(/\d/) : l.length)).replace(/\d{1,2}\/\d{1,2}(\/\d{2,4})?/g,"").match(/\d+(?:[.,]\d+)?/g)||[];
    if(!vals.length) return; let k="";
    const dcMode= mode==="dc"||/dobra/.test(lab);
    if(dcMode){ const f=IMP_DC.find(([re])=>re.test(lab)); if(f) k="d_"+f[1]; }
    if(!k&&mode!=="dc"){ const p= (mode==="per"||/perim|circ|braco|coxa|cintura|quadril|panturr|antebr|ombro|peito|pescoc|abdomen/.test(lab))? IMP_PER.find(([re])=>re.test(lab)) : null; if(p&&!/(gord|massa|agua|imc|peso)/.test(lab)) k=p[1]; }
    if(!k){ const a=IMP_AV.find(([re])=>re.test(lab)); if(a) k=a[1]; }
    if(k) rows.push({k,lab:cells[0]||lab,vals:vals.map(v=>v.replace(",","."))}); });
  if(!dates.length){ const d=impDates(lines.join(" ")); dates=[d[0]||isoD(new Date())]; }
  return {dates,rows}; }
const impAvLab=k=>{ const all=[...AV_F,...BIO_F,...PER_F.map(x=>[x[0],x[1],"cm"]),...DC_S.map(([a,b])=>["d_"+a,"Dobra "+b,"mm"])]; const f=all.find(x=>x[0]===k); return f? f[1]+(f[2]?` (${f[2]})`:"") : k; };
/* ---- pagamentos ---- */
function impPag(line){ const cells=impCells(line); const all=cells.join(" "); if(/^(nome|aluno)\b/i.test(noAcc(cells[0]||""))) return null;
  const nm=(cells.find(c=>/[a-zà-ú]{3,}/i.test(c))||all).replace(/r\$.*$/i,"").replace(/\d.*$/,"").replace(/[\s\-–:,.;]+$/,"").trim(); if(nm.length<3) return null;
  const d=impDates(all)[0]||""; const sem=all.replace(/\b\d{1,2}\/\d{1,2}(\/\d{2,4})?\b/g,"");
  const rv=sem.match(/r\$\s*([\d.]+(?:,\d{1,2})?)/i)||sem.match(/\b(\d{1,3}(?:\.\d{3})*,\d{2}|\d{2,5})\b/); const v= rv? +rv[1].replace(/\.(?=\d{3})/g,"").replace(",",".") : 0;
  const al=impMatch(nm); return {nome:nm,v,d,id:al?al.id:"",an:al?al.nome:""}; }
function impMatch(nm){ const q=noAcc(nm).toLowerCase().split(/\s+/).filter(x=>x.length>1); if(!q.length) return null; let best=null, sc=0;
  (presOn()? PRES.alunos() : []).forEach(a=>{ const t=noAcc(a.nome||"").toLowerCase().split(/\s+/); if(t[0]!==q[0]) return; const s=q.filter(w=>t.includes(w)).length+(a.ativo===false?0:0.5); if(s>sc){ sc=s; best=a; } });
  return best; }
/* ---- montar a prévia ---- */
function impParse(area,lines){ const m=stById(IMP.sid)||A(); const on=i=>!IMP.off.has(i); const ck=i=>`<input type="checkbox" data-impck="${i}" ${on(i)?"checked":""} aria-label="Lançar esta linha">`;
  const exT=L=>`<table class="imptab"><tr><th></th><th>Exercício</th><th>Sér</th><th>Reps</th><th>Kg</th></tr>${L.map(([e,i])=>`<tr class="${on(i)?"":"off"}"><td>${ck(i)}</td><td>${esc(e.n)}</td><td>${esc(e.s||"–")}</td><td>${esc(e.r||"–")}</td><td>${esc(e.c||"–")}</td></tr>`).join("")}</table>`;
  if(area==="sessao"){ let i=0; const L=impGroups(lines).flatMap(g=>g.items).map(e=>[e,i++]); const d=dayOf(S.week,m.id,S.day); const has=d&&dayHasData(d); const n=L.filter(([,j])=>on(j)).length;
    return {n,unit:n===1?"exercício":"exercícios",items:L,html:`${has?`<div class="impmode"><label><input type="radio" name="impm" data-impmode="add" ${IMP.opt.mode!=="rep"?"checked":""}> Acrescentar ao treino de hoje</label><label><input type="radio" name="impm" data-impmode="rep" ${IMP.opt.mode==="rep"?"checked":""}> Substituir o treino de hoje</label></div>`:""}${exT(L)}`}; }
  if(area==="prog"){ let i=0; const G=impGroups(lines).map((g,gi)=>({...g,gi,items:g.items.map(e=>[e,i++])})); const days=(m.days&&m.days.length? m.days : ["Seg","Qua","Sex"]); const pm=progOf(m).map||{};
    G.forEach((g,gi)=>{ const L=g.L||"ABCDE"[gi]; g.L=L; const def= g.day || Object.keys(pm).find(dy=>pm[dy]===L) || days[gi%days.length] || "Seg"; g.dd= (IMP.opt["d"+gi])||def; });
    const n=G.reduce((t,g)=>t+g.items.filter(([,j])=>on(j)).length,0);
    return {n,unit:`exercício${n===1?"":"s"} em ${G.length} treino${G.length===1?"":"s"}`,groups:G,html:G.map(g=>{ const d=dayOf(S.week,m.id,g.dd); return `<div class="impg"><div class="impgh"><b>Treino ${esc(g.L)}</b><span>→</span><select class="inp" data-impday="${g.gi}">${DAYS.map(dy=>`<option ${dy===g.dd?"selected":""}>${dy}</option>`).join("")}</select>${d&&dayHasData(d)?`<small class="neg">substitui o que está em ${esc(g.dd)}</small>`:""}</div>${exT(g.items)}</div>`; }).join("")+`<p class="muted" style="font-size:12px">Entra na semana aberta na Sessão. Nas próximas semanas, cada letra puxa este treino.</p>`}; }
  if(area==="cad"){ const ex=new Set((presOn()? PRES.alunos().map(a=>a.nome) : []).concat(S.students.map(s=>s.name)).map(x=>noAcc(x).toLowerCase().trim()));
    const L=lines.map(impAluno).map((a,i)=>[a,i]).filter(([a])=>a); const n=L.filter(([a,i])=>on(i)&&!ex.has(noAcc(a.nome).toLowerCase())).length;
    return {n,unit:n===1?"aluno":"alunos",items:L,ex,html:`<table class="imptab"><tr><th></th><th>Nome</th><th>Telefone</th><th>Dias</th><th>Valor</th></tr>${L.map(([a,i])=>{ const dup=ex.has(noAcc(a.nome).toLowerCase()); return `<tr class="${on(i)&&!dup?"":"off"}"><td>${dup?"":ck(i)}</td><td>${esc(a.nome)}${dup?` <small class="neg">já cadastrado</small>`:""}</td><td>${esc(a.tel||"–")}</td><td>${a.slots.map(s=>CAD_DN[s.d]+" "+s.h).join(", ")||"–"}</td><td>${a.val?brlS(a.val):"–"}</td></tr>`; }).join("")}</table><p class="muted" style="font-size:12px">Valor acima de R$ 200 com dias marcados entra como mensalidade (dividida pelas aulas do mês). Depois confira cada aluno no Cadastro.</p>`}; }
  if(area==="av"){ const A2=impAv(lines); const L=A2.rows.map((r,i)=>[r,i]); const n=L.filter(([,i])=>on(i)).length;
    return {n,unit:`medida${n===1?"":"s"} em ${A2.dates.length} avaliaç${A2.dates.length===1?"ão":"ões"}`,av:A2,html:`<table class="imptab"><tr><th></th><th>Medida</th>${A2.dates.map(d=>`<th>${ddmm(d)}</th>`).join("")}</tr>${L.map(([r,i])=>`<tr class="${on(i)?"":"off"}"><td>${ck(i)}</td><td>${esc(impAvLab(r.k))}</td>${A2.dates.map((_,j)=>`<td>${esc((r.vals[j]||"–").replace(".",","))}</td>`).join("")}</tr>`).join("")}</table>`}; }
  if(area==="fin"){ const L=lines.map(impPag).map((p,i)=>[p,i]).filter(([p])=>p&&(p.v||p.id)); const al=presOn()? PRES.alunos().filter(a=>a.ativo!==false).sort((a,b)=>a.nome.localeCompare(b.nome)) : [];
    L.forEach(([p,i])=>{ if(IMP.opt["a"+i]!=null){ p.id=IMP.opt["a"+i]; const a=al.find(x=>x.id===p.id); p.an=a?a.nome:""; } });
    const n=L.filter(([p,i])=>on(i)&&p.id).length; const ym=PRES.finMonth();
    return {n,unit:`pagamento${n===1?"":"s"} em ${IMP_MES[+ym.slice(5)-1]}`,items:L,html:`<table class="imptab"><tr><th></th><th>Na foto</th><th>Aluno</th><th>Valor</th><th>Data</th></tr>${L.map(([p,i])=>`<tr class="${on(i)&&p.id?"":"off"}"><td>${ck(i)}</td><td>${esc(p.nome)}</td><td><select class="inp" data-impal="${i}"><option value="">não achei</option>${al.map(a=>`<option value="${a.id}" ${a.id===p.id?"selected":""}>${esc(a.nome)}</option>`).join("")}</select></td><td>${p.v?brlS(p.v):"tudo"}</td><td>${p.d?ddmm(p.d):"hoje"}</td></tr>`).join("")}</table><p class="muted" style="font-size:12px">Marca como pago no mês aberto no Financeiro (${IMP_MES[+ym.slice(5)-1]}). Sem valor: marca o mês todo.</p>`}; }
  return {n:0,html:""}; }
const IMP_MES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const brlS=v=>window.RP_PRIV? "R$ •••" : "R$ "+Number(v).toFixed(2).replace(".",",");
/* ---- lançar ---- */
function impApply(){ const P=impParse(IMP.area,IMP.lines); const m=stById(IMP.sid)||A(); const on=i=>!IMP.off.has(i); let msg="";
  const mk=e=>{ const r=newRow(); r.n1=e.n; r.a=sub(e.s||"",e.r||"",e.c||""); return r; };
  if(IMP.area==="sessao"){ const d=dayOf(S.week,m.id,S.day,true); const nr=P.items.filter(([,i])=>on(i)).map(([e])=>mk(e)); if(IMP.opt.mode==="rep") d.rows=nr; else d.rows=d.rows.filter(r=>r.n1.trim()||subUsed(r.a)).concat(nr); delete d.cp; msg=`${nr.length} exercício${nr.length===1?"":"s"} lançado${nr.length===1?"":"s"} no treino de hoje`; }
  else if(IMP.area==="prog"){ let k=0; P.groups.forEach(g=>{ const nr=g.items.filter(([,i])=>on(i)).map(([e])=>mk(e)); if(!nr.length) return; const d=dayOf(S.week,m.id,g.dd,true); d.rows=nr; d.ltr=g.L; delete d.cp; k+=nr.length; }); msg=`Ficha lançada: ${k} exercícios em ${P.groups.length} treino${P.groups.length===1?"":"s"}`; }
  else if(IMP.area==="cad"){ const keep=cadPull; let k=0; try{ cadPull=()=>{}; P.items.forEach(([a,i])=>{ if(!on(i)||P.ex.has(noAcc(a.nome).toLowerCase())) return; cadOpen(null,null); const nA=a.slots.length*4; const va= a.val>=200&&nA? Math.round(a.val/nA*100)/100 : a.val;
        Object.assign(cadDraft,{nome:a.nome,tel:a.tel,slots:a.slots,valorAula:va?String(va):"",contratadas:nA?String(nA):""}); cadSave(); k++; }); } finally{ cadPull=keep; } msg=`${k} aluno${k===1?"":"s"} cadastrado${k===1?"":"s"}`; }
  else if(IMP.area==="av"){ const {dates,rows}=P.av; let k=0; dates.forEach((dt,j)=>{ const a={id:nid(),date:dt}; rows.forEach((r,i)=>{ if(on(i)&&num(r.vals[j])) a[r.k]=r.vals[j]; }); if(Object.keys(a).length<=2) return;
      const ds=Object.keys(a).filter(x=>x.startsWith("d_")); if(ds.length){ a.dc_p="livre"; a.dc_sum=String(Math.round(ds.reduce((t,x)=>t+num(a[x]),0)*10)/10); }
      const f=avFill(a); if(!a.gord&&f.gord) a.gord=String(f.gord); if(f.mm) a.mm=String(f.mm); m.av=[...(m.av||[]),a]; k++; if(num(a.alt)) m.alt=String(a.alt).replace(".",","); });
    const last=avList(m).slice(-1)[0]; if(last&&num(last.peso)) m.peso=String(last.peso).replace(".",","); msg=`${k} avaliaç${k===1?"ão lançada":"ões lançadas"} para ${first(m.name)}`; }
  else if(IMP.area==="fin"){ const L=P.items.filter(([p,i])=>on(i)&&p.id).map(([p])=>({id:p.id,v:p.v,d:p.d})); PRES.importPag(L); msg=`${L.length} pagamento${L.length===1?"":"s"} marcado${L.length===1?"":"s"}`; }
  save(); IMP.area=null; impRender(); renderAll(); try{ if(CUR_TAB==="corpo") renderCorpo(); }catch(_){} toast("✓ "+msg); }
function impOpen(area){ Object.assign(IMP,{area,lines:[],busy:"",err:"",sid:S.active,off:new Set(),opt:{}}); impRender(); }
function impPrev(){ const box=document.querySelector("#impPop .impres"); if(!box) return; const P=impParse(IMP.area,IMP.lines); box.innerHTML=impResHTML(P); }
const impResHTML=P=>`<div class="impprev">${P.html}</div>${P.n?`<button class="btn primary impgo" data-impgo>✓ Lançar ${P.n} ${P.unit}</button>`:`<p class="muted">Não achei nada para lançar. Confira o texto lido acima e corrija se precisar.</p>`}`;
function impRender(){ let o=document.getElementById("impPop"); if(!IMP.area){ if(o) o.hidden=true; return; }
  if(!o){ o=document.createElement("div"); o.id="impPop"; o.className="scrim"; document.body.appendChild(o); }
  const m=stById(IMP.sid)||A();
  o.innerHTML=`<div class="sheet impbox" role="dialog" aria-modal="true" aria-label="Importar"><div class="sheet-head"><h3>📎 Importar ${IMP_T[IMP.area]}</h3><button class="btn small" data-impx>Fechar</button></div>
    ${["sessao","prog","av"].includes(IMP.area)?`<p class="impwho">Aluno: <b>${esc(m.name)}</b>${IMP.area==="sessao"?` · ${DAY_N[S.day]}`:""}</p>`:""}
    <label class="impfile"><input type="file" accept="image/*,.pdf,.xlsx,.xls,.csv,.ods,.docx,.doc" data-impfile><b>📷 Tirar foto ou escolher arquivo</b><small>Foto, print, PDF, Excel ou Word</small></label>
    <p class="impbusy" ${IMP.busy?"":"hidden"}>⏳ <span>${esc(IMP.busy)}</span></p>${IMP.err?`<p class="neg">${esc(IMP.err)}</p>`:""}
    ${IMP.lines.length?`<details class="imptxt"><summary>Texto lido (toque para corrigir)</summary><textarea class="inp" rows="8" data-imptxt>${esc(IMP.lines.join("\n"))}</textarea></details><div class="impres">${impResHTML(impParse(IMP.area,IMP.lines))}</div>`
      :`<p class="muted impdica">Dica: foto reta, com boa luz e a tabela inteira. Excel, PDF e print saem mais certos que foto de papel. Letra à mão pode sair errada: confira antes de lançar.</p>`}</div>`;
  o.hidden=false; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-impopen],[data-impx],[data-impgo]"); if(!b){ if(e.target&&e.target.id==="impPop"){ IMP.area=null; impRender(); } return; } e.stopPropagation();
  if(b.dataset.impopen) impOpen(b.dataset.impopen); else if(b.hasAttribute("data-impx")){ IMP.area=null; impRender(); } else impApply(); },true);
document.addEventListener("change",async e=>{ const t=e.target; if(!t.closest||!t.closest("#impPop")) return;
  if(t.matches("[data-impck]")){ const i=+t.dataset.impck; if(t.checked) IMP.off.delete(i); else IMP.off.add(i); impPrev(); return; }
  if(t.matches("[data-impmode]")){ IMP.opt.mode=t.dataset.impmode; impPrev(); return; }
  if(t.matches("[data-impday]")){ IMP.opt["d"+t.dataset.impday]=t.value; impPrev(); return; }
  if(t.matches("[data-impal]")){ IMP.opt["a"+t.dataset.impal]=t.value; impPrev(); return; }
  if(t.matches("[data-impfile]")&&t.files&&t.files[0]){ const f=t.files[0]; IMP.err=""; IMP.lines=[]; IMP.off=new Set(); IMP.opt={}; IMP.busy=/image/.test(f.type)? "Lendo a foto… (a primeira vez demora um pouco)" : "Lendo o arquivo…"; impRender();
    try{ const L=await impRead(f,p=>{ const s=document.querySelector("#impPop .impbusy span"); if(s) s.textContent=`Lendo a foto… ${p}%`; }); IMP.lines=L; if(!L.length) IMP.err="Não consegui ler nada. Tente uma foto mais reta e com mais luz, ou o arquivo em Excel/PDF."; }
    catch(err){ IMP.err="Não consegui ler o arquivo: "+erroPT(err)+"."; }
    IMP.busy=""; impRender(); } });
document.addEventListener("input",e=>{ const t=e.target; if(!t.matches||!t.matches("#impPop [data-imptxt]")) return; IMP.lines=t.value.split(/\n/).map(x=>x.trim()).filter(Boolean); IMP.off=new Set(); clearTimeout(IMP._t); IMP._t=setTimeout(impPrev,300); });
/* Aviso de atualização: aparece uma vez a cada versão nova, com o resumo do que mudou */
const RP_AUTORIA="Rotina do Personal · © 2026 Maílson Lopes Silva (Professor Maílson, CREF 055013-G/MG) · RP-MLS-2026"; try{ document.documentElement.dataset.rpa="RP-MLS-2026"; console.log("%c"+RP_AUTORIA+" · Todos os direitos reservados. Cópia proibida (Leis 9.609/98 e 9.610/98).","color:#d4a24c"); }catch(_){}
const APP_VER="2026-11-05e";
const APP_NOVO=["<b>🎵 Músicas para Tabata</b>: no ⏱ Tabata da Sessão, um botão abre a playlist de músicas com o tempo do Tabata, sem sair do site.","<b>📲 Enviar relatório</b> na Sessão manda a <b>imagem e o texto juntos</b>, igual à Agenda: escolha o WhatsApp e o aluno, sem baixar nada. <b>Só texto</b> abre direto a conversa do aluno. Avisos de confirmação agora ficam <b>no meio da tela</b> e maiores.","<b>📊 Relatório do treino</b>: gráfico em <b>colunas</b> com a tonelagem de cada exercício, comparando com o treino anterior; no cardio, o <b>pace</b> grande e colunas de tempo, distância e velocidade.","<b>🏋️ Sessão</b>: setas <b>‹ Anterior</b> e <b>Próximo ›</b> nos alunos do dia, para ver e ajustar o treino de ontem e de amanhã. Exercícios conjugados continuam juntos no próximo treino, e o ↻ Repetir avisa que mantém o conjugado."];
function novoCheck(){ let v=""; try{ v=localStorage.getItem("rp_ver")||""; }catch(_){} if(v===APP_VER) return;
  let bar=document.getElementById("novoBar"); if(!bar){ bar=document.createElement("button"); bar.id="novoBar"; bar.type="button"; bar.innerHTML=`✨ <b>O site foi atualizado</b> <small>toque para ver o que mudou ›</small>`; const pa=document.getElementById("payAlert"); if(pa&&pa.parentNode) pa.parentNode.insertBefore(bar,pa); else document.body.prepend(bar); bar.addEventListener("click",novoShow); } bar.hidden=false; }
function novoShow(){ try{ localStorage.setItem("rp_ver",APP_VER); }catch(_){} const bar=document.getElementById("novoBar"); if(bar) bar.hidden=true;
  let o=document.getElementById("novoPop"); if(!o){ o=document.createElement("div"); o.id="novoPop"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",ev=>{ if(ev.target===o||ev.target.closest("[data-novox]")) o.hidden=true; }); }
  o.innerHTML=`<div class="sheet novobox" role="dialog" aria-modal="true" aria-label="Site atualizado"><h3>✨ O site foi atualizado</h3><ul>${APP_NOVO.map(x=>`<li>${x}</li>`).join("")}</ul><button class="btn primary" data-novox>Entendi</button></div>`; o.hidden=false; }
setTimeout(()=>{ try{ novoCheck(); }catch(_){} },2500);
let CV_EDIT=null, CV_REG=null, CV_IN=null, CV_POP=null;
document.addEventListener("focusin",e=>{ const t=e.target; if(!t.closest||!t.closest(".cvpop")) return; setTimeout(()=>{ try{ t.scrollIntoView({block:"center",behavior:"smooth"}); }catch(_){} },300); });
document.addEventListener("click",e=>{ if(e.target.closest&&e.target.closest("[data-pgclose]")){ e.preventDefault(); show("sessao"); window.scrollTo(0,0); } if(e.target.closest&&e.target.closest("[data-pgx]")){ e.preventDefault(); e.stopPropagation(); if(CUR_TAB==="semana"){ show("sessao"); window.scrollTo(0,0); } else { sesProgOpen=null; renderSessao(); } } },true);
/* Dupla ou trio lado a lado: cartões simplificados; tocar abre o cartão completo numa janela */
function sideOn(){ try{ return localStorage.getItem("rp_side")==="1"; }catch(_){ return false; } }
function cvPopHTML(w,ms){ const m=stById(CV_POP.sid); const d=m&&dayOf(w.id,m.id,S.day); if(!m||!d||!(d.rows||[]).some(r=>r.id===CV_POP.rid)){ CV_POP=null; return ""; } const others=ms.filter(o=>o!==m);
  return `<div class="cvpop" data-cvpopbg><div class="cvpopbox"><div class="cvpoph"><b>${esc(m.name)}</b><button class="btn small" data-cvpopx>✕ Fechar</button></div><div class="col cvcard active" data-col="${m.id}">${cvHTML(m,d,others,CV_POP.rid)}</div></div></div>`; }
document.addEventListener("click",e=>{ const t=e.target; if(!t.closest) return;
  if(t.closest("[data-sidetog]")){ e.stopPropagation(); try{ localStorage.setItem("rp_side",sideOn()?"0":"1"); }catch(_){} CV_POP=null; renderSessao(); return; }
  if(t.closest("[data-cvpopx]")||(t.matches&&t.matches("[data-cvpopbg]"))){ e.stopImmediatePropagation(); CV_POP=null; CV_EDIT=null; CV_IN=null; renderSessao(); return; }
  if(t.closest(".cvpop .cved [data-cvedit]")){ e.stopImmediatePropagation(); CV_POP=null; CV_EDIT=null; renderSessao(); return; }
  const c=t.closest(".cols.side .cvc"); if(!c||t.closest("[data-cvfz],.cvrep,[data-rowrep]")) return; const col=c.closest("[data-col]"); if(!col) return;
  e.stopImmediatePropagation(); e.preventDefault(); CV_POP={sid:col.dataset.col,rid:c.dataset.row}; CV_IN=null; CV_REG=null; CV_JN=null; { const dd=dayOf(S.week,col.dataset.col,S.day); const rr=dd&&dd.rows.find(x=>x.id===c.dataset.row); CV_EDIT= rr&&String(rr.n1||"").trim()? null : c.dataset.row; } renderSessao(); setTimeout(()=>{ const x=document.querySelector(".cvpop .cved input"); if(x&&!x.value) x.focus(); },60); },true);
/* Linhas do método avançado no cartão: cada série extra com séries, reps e kg alinhados embaixo; Rest para Cluster e Rest-pause */
function cvSubsHTML(r,inl){ const t=r.tec||""; const L=subsOf(r); const kf=v=>String(Math.round(v*2)/2).replace(".",",");
  const sug=(j)=>{ if(t!=="Dropset") return ""; const c=num(r.a.c); return c? "~"+kf(c*(1-0.2*(j+1))) : ""; };
  const sn=(j,f,val,sg)=> inl(`sub${j}.${f}`)? `<span class="cvnb cvnbin"><input class="cvni" data-cvni data-x="sub.${j}.${f}" inputmode="${f==="c"?"decimal":"numeric"}" value="${esc(val||"")}" aria-label="${f}"></span>` : `<button class="cvnb" data-cvinl data-cvf="sub${j}.${f}"><b>${val? esc(String(val).replace(".",",")) : sg? `<i class="cvsug">${esc(sg)}</i>` : "–"}</b></button>`;
  const ex=r.exe? '<span class="cvnb"></span>' : "";
  const rows=L.map((x,j)=>`<small class="cvsl">${esc(subLabel(r,j))}<button class="cvsx" data-cvsubrm="${j}" aria-label="Tirar esta linha">✕</button></small><div class="cvnums cvsubn ${r.exe?"cvnums6":""}">${sn(j,"s",x.s)}${sn(j,"r",x.r)}${ex}${sn(j,"c",x.c,sug(j))}${ex}<span class="cvnb cvvol"><b>${vol(x)? nf(vol(x)*uf(r)) : ""}</b></span></div>`).join("");
  const rest= (t==="Cluster set"||t==="Rest-pause")? (inl("tecD")? `<span class="cvrest cvnbin">Rest <input class="cvni" data-cvni data-tecd inputmode="numeric" value="${esc(r.tecD||"")}" aria-label="Segundos de rest">"</span>` : `<button class="cvrest" data-cvinl data-cvf="tecD">⏸ Rest ${esc(r.tecD||"–")}" ${t==="Cluster set"?"entre os blocos":"entre as pausas"}</button>`) : "";
  const add= (L.length||/^Pirâmide|Dropset|Rest-pause/.test(t))? `<button class="cvsadd" data-cvsubadd>+ série</button>` : "";
  return rows+rest+add; }
function cvRowOf(el){ const rEl=el.closest("[data-row]"), cEl=el.closest("[data-col]"); if(!rEl||!cEl) return null; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const r=d.rows.find(x=>x.id===rEl.dataset.row); return r? {r,d,sid:cEl.dataset.col} : null; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cvsubadd],[data-cvsubrm]"); if(!b) return; const o=cvRowOf(b); if(!o) return; e.stopPropagation(); const r=o.r;
  if(b.hasAttribute("data-cvsubadd")){ const L=subsOf(r); const last=L[L.length-1]; r.sub=L.concat([{s:"1",r:"",c: r.tec==="Rest-pause"? (r.a.c||"") : ""}]); }
  else { const L=subsOf(r).slice(); L.splice(+b.dataset.cvsubrm,1); if(L.length) r.sub=L; else delete r.sub; }
  save(); renderSessao(); },true);
document.addEventListener("change",e=>{ const t=e.target; if(!t.matches||!t.matches("[data-tecd]")) return; const o=cvRowOf(t); if(!o) return; o.r.tecD=String(t.value).replace(/\D/g,""); save(); });
/* Método avançado: pergunta antes de aplicar */
function tecAsk(sid,rid,t){ let o=document.getElementById("tecAskPop"); if(!o){ o=document.createElement("div"); o.id="tecAskPop"; o.className="scrim"; document.body.appendChild(o);
    o.addEventListener("click",ev=>{ if(ev.target===o||ev.target.closest("[data-tano]")){ o.hidden=true; return; } const ok=ev.target.closest("[data-taok]"); if(!ok) return; o.hidden=true;
      const [s2,r2,...tt]=ok.dataset.taok.split("|"); const T=tt.join("|"); const d=dayOf(S.week,s2,S.day,true); const i=d.rows.findIndex(x=>x.id===r2); if(i<0) return; const row=d.rows[i];
      let msg=tecApply(row,T);
      if(T==="Bi-set agonista"||T==="Bi-set antagonista"||T==="Tri-set"){ const n=T==="Tri-set"?2:1; let k=0; for(let j=i;j<i+n&&j+1<d.rows.length;j++){ d.rows[j].cj=true; k++; } msg= k? `${T}: conjugado com ${k===1?"o exercício de baixo":"os 2 de baixo"}.` : `${T}: escreva o próximo exercício e toque em Conjugar.`; }
      tecPick=null; save(); renderSessao(); toast(msg); }); }
  const d=dayOf(S.week,sid,S.day); const r=d&&d.rows.find(x=>x.id===rid); const nm=(r&&r.n1.trim())||"este exercício";
  o.innerHTML=`<div class="sheet rdbox" role="dialog" aria-modal="true"><p class="rdq">Usar o método <b>${esc(t)}</b> em <b>${esc(nm)}</b>?</p><div class="rdbt"><button class="btn" data-tano>Cancelar</button><button class="btn primary" data-taok="${sid}|${rid}|${esc(t)}">Usar</button></div></div>`; o.hidden=false; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest(".cvc [data-tecset]"); if(!b||!b.dataset.tecset) return; const o=cvRowOf(b); if(!o) return; e.stopPropagation(); e.preventDefault(); tecAsk(o.sid,o.r.id,b.dataset.tecset); },true);
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cdmed]"); if(!b) return; const cEl=b.closest("[data-col]"); if(!cEl) return; CDM_ED= CDM_ED===cEl.dataset.col? null : cEl.dataset.col; renderSessao(); });
document.addEventListener("change",e=>{ const t=e.target; if(!t.matches||!t.matches("[data-cdm]")) return; const cEl=t.closest("[data-col]"); if(!cEl) return; const m=S.students.find(x=>x.id===cEl.dataset.col); if(!m) return; m.cdMeta=Object.assign({},m.cdMeta||{},{[t.dataset.cdm]:String(t.value||"").replace(",",".")}); save(); renderSessao(); });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cvexe]"); if(!b) return; const rEl=b.closest("[data-row]"), cEl=b.closest("[data-col]"); if(!rEl||!cEl) return; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const r=d.rows.find(x=>x.id===rEl.dataset.row); if(!r) return; r.exe=!r.exe; save(); renderSessao(); setTimeout(()=>{ const x=document.querySelector(`[data-row="${r.id}"] [data-cvin="tex"]`); if(x) x.focus(); },60); });
/* Corrigir séries, reps, kg ou o nome direto no cartão, sem abrir a tela de edição */
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cvinl]"); if(!b) return; const rEl=b.closest("[data-row]"); if(!rEl) return; e.stopPropagation();
  CV_IN={id:rEl.dataset.row,f:b.dataset.cvf}; CV_EDIT=null; renderSessao(); setTimeout(()=>{ const x=document.querySelector(`[data-row="${CV_IN&&CV_IN.id}"] [data-cvni]`); if(x){ x.focus(); try{ x.select(); }catch(_){} } },40); },true);
document.addEventListener("focusout",e=>{ const t=e.target; if(!t.matches||!t.matches("[data-cvni]")) return; const was=CV_IN; setTimeout(()=>{ if(CV_IN&&CV_IN===was){ CV_IN=null; renderSessao(); } },150); });
document.addEventListener("keydown",e=>{ const t=e.target; if(e.key==="Enter"&&t.matches&&t.matches("[data-cvni]")){ e.preventDefault(); t.blur(); } });
/* Lixeira: abre a confirmação no toque (antes do teclado fechar e a tela mexer), sempre com o exercício certo */
let RD_T=0;
document.addEventListener("pointerdown",e=>{ const b=e.target.closest&&e.target.closest(".cvdel"); if(!b) return; const rEl=b.closest("[data-row]"), cEl=b.closest("[data-col]"); if(!rEl||!cEl) return; e.preventDefault(); RD_T=Date.now(); rowDelAsk(cEl.dataset.col,S.week,rEl.dataset.row); },true);
document.addEventListener("click",e=>{ if(Date.now()-RD_T<800&&(e.target.closest&&(e.target.closest(".cvdel")||e.target.id==="rdPop"))){ e.stopPropagation(); e.preventDefault(); } },true);

let CV_REN=null, CV_GSEL={}, CV_CTX=null, CV_MV=null, CV_JN=null, CV_DEL=null;
function exTok(n){ const sw=new Set(["de","da","do","das","dos","com","no","na","em","e","a","o","para","na","no"]);
  return noAcc(n).toLowerCase().replace(/[^a-z0-9 ]/g," ").split(/\s+/).filter(t=>t&&!sw.has(t)).map(t=>t.length>4&&t.endsWith("s")?t.slice(0,-1):t); }
function lev(a,b){ const m=a.length,n=b.length; if(!m) return n; if(!n) return m; let p=[...Array(n+1).keys()]; for(let i=1;i<=m;i++){ const c=[i]; for(let j=1;j<=n;j++) c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1)); p=c; } return p[n]; }
function exSim(a,b){ const ta=exTok(a),tb=exTok(b); if(!ta.length||!tb.length) return false;
  const MOD=new Set(["adutor","adutora","abdutor","abdutora","aducao","abducao","flexora","extensora","flexao","extensao","curto","longo","isometrico","excentrico","maquina","sentado","sentada","db","halter","halteres","barra","polia","cabo","arnold","unilateral","inclinado","declinado","reto","frontal","lateral","livre","smith","banco","deitado","alternado","inverso","pe","bola","elastico","anilha","kettlebell","kb","corda","triangulo","pronado","supinado","neutro","articulado","guiado","fixo"]);
  const isM=t=>MOD.has(t)||/\d/.test(t); const ma=ta.filter(isM).sort().join(),mb=tb.filter(isM).sort().join(); if(ma!==mb) return false;
  const ja=ta.join(""),jb=tb.join(""); if(ja===jb) return true;
  if(ta.length===tb.length){ let ok=true,d=0; for(let i=0;i<ta.length;i++){ if(ta[i]!==tb[i]){ d++; const L=Math.min(ta[i].length,tb[i].length); if(L<4||lev(ta[i],tb[i])>(L>=8?2:1)) ok=false; } } if(ok&&d<=2) return true; }
  return Math.min(ja.length,jb.length)>=6&&lev(ja,jb)<=Math.floor(Math.max(ja.length,jb.length)*0.15); }
function exGroups(names){ const par=names.map((_,i)=>i); const f=i=>par[i]===i?i:(par[i]=f(par[i]));
  for(let i=0;i<names.length;i++) for(let j=i+1;j<names.length;j++) if(exSim(names[i],names[j])) par[f(i)]=f(j);
  const g=new Map(); names.forEach((n,i)=>{ const r=f(i); if(!g.has(r)) g.set(r,[]); g.get(r).push(n); }); return [...g.values()]; }
function cvListHTML(reg){ const names=cvRegNames(reg);
  if(!names.length) return `<div class="cvreglist"><span class="muted">Nenhum exercício ${reg==="Core"?"de abdômen":reg} lançado ainda.</span></div>`;
  const item=n=>{ if(CV_REN===n) return `<div class="cvxi"><input class="inp" data-cvrenin value="${esc(n)}" aria-label="Novo nome"><button class="chip" data-cvrenok="${esc(n)}">Salvar</button><button class="chip" data-cvrenno>Cancelar</button></div>`;
    const mv=CV_MV===n? `<div class="cvmv">Mover para: ${[["MMSS","MMSS"],["MMII","MMII"],["Core","ABD"]].filter(([k])=>k!==reg).map(([k,l])=>`<button class="chip" data-cvmvto="${k}" data-n="${esc(n)}">${l}</button>`).join("")}</div>`:"";
    if(CV_JN) return `<div class="cvxw"><div class="cvxi"><button class="chip cvjsel" data-cvpick="${esc(n)}" aria-pressed="${CV_JN.includes(n)}">${CV_JN.includes(n)?"✓ ":""}${esc(n)}</button></div></div>`;
    const del=CV_DEL===n? `<div class="cvmv">Apagar "${esc(n)}" da lista? Os treinos já feitos continuam como estão. <button class="chip cvdelok" data-cvdelok="${esc(n)}">Apagar</button><button class="chip" data-cvdelno>Cancelar</button></div>`:"";
    return `<div class="cvxw"><div class="cvxi"><button class="cvpen" data-cvren="${esc(n)}" aria-label="Editar nome" title="Editar nome">✏️</button><button class="cvpen" data-cvmv="${esc(n)}" aria-label="Mover de região" title="Mover para outra região">⇄</button><button class="chip" data-cvpick="${esc(n)}">${esc(n)}</button><button class="cvpen" data-cvdel="${esc(n)}" aria-label="Apagar nome" title="Apagar da lista">🗑</button></div>${mv}${del}</div>`; };
  const gs=exGroups(names).sort((a,b)=>a[0].localeCompare(b[0],"pt-BR"));
  return `<div class="cvxl">`+gs.map(g=>{ if(g.length<2) return item(g[0]);
    const k=g.map(noAcc).join("|");
    return `<div class="cvgrp"><div class="cvgbr"></div><div class="cvgin">${g.map(item).join("")}<div class="cvgq"><b>Os ${g.length} são o mesmo exercício?</b><small class="muted">Toque no nome que deve ficar (vale para todos os treinos):</small>${g.map(n=>`<button class="btn small primary" data-cvjoin="${esc(k)}" data-cvto="${esc(n)}">Juntar em: ${esc(n)}</button>`).join("")}</div></div></div>`; }).join("")+`</div>`; }
function cvRenameKeys(keys,nn){ nn=String(nn||"").replace(/\+/g," ").trim(); if(!nn) return 0; const ks=new Set(keys.map(k=>noAcc(k).trim())); let c=0;
  Object.values(S.days||{}).forEach(W=>Object.values(W||{}).forEach(P=>Object.values(P||{}).forEach(d=>((d&&d.rows)||[]).forEach(r=>{ if(!r.n1) return; const ps=String(r.n1).split("+"); let ch=false; const o=ps.map(x=>{ if(ks.has(noAcc(x.trim()).trim())){ ch=true; return nn; } return x; }); if(ch){ r.n1=o.join("+"); c++; } }))));
  if(Array.isArray(S.custom)){ const seen=new Set(); S.custom=S.custom.map(e=>(e&&ks.has(noAcc(String(e.n||"").trim()).trim()))?Object.assign({},e,{n:nn}):e).filter(e=>{ const k=noAcc(String(e&&e.n||"").trim()); if(!k) return true; if(seen.has(k)) return false; seen.add(k); return true; }); }
  save(); return c; }
document.addEventListener("click",e=>{ const t=e.target.closest&&e.target.closest("[data-cvren],[data-cvrenok],[data-cvrenno],[data-cvjoin],[data-cvmv],[data-cvmvto]"); if(!t) return;
  if(t.dataset.cvmv!==undefined){ CV_MV=CV_MV===t.dataset.cvmv?null:t.dataset.cvmv; renderSessao(); return; }
  if(t.dataset.cvmvto!==undefined){ S.exReg=S.exReg||{}; S.exReg[noAcc(t.dataset.n).trim()]=t.dataset.cvmvto; CV_MV=null; save(); toast("Exercício movido"); renderSessao(); return; }
  if(t.dataset.cvren!==undefined){ CV_REN=t.dataset.cvren; renderSessao(); setTimeout(()=>{ const i=document.querySelector("[data-cvrenin]"); if(i){ i.focus(); i.select(); } },40); return; }
  if(t.dataset.cvrenno!==undefined){ CV_REN=null; renderSessao(); return; }
  if(t.dataset.cvrenok!==undefined){ const i=document.querySelector("[data-cvrenin]"); const nn=i?i.value:""; if(nn.trim()){ cvRenameKeys([t.dataset.cvrenok],nn); toast("Nome alterado em todos os treinos"); } CV_REN=null; renderSessao(); return; }
  if(t.dataset.cvjoin!==undefined){ const keys=t.dataset.cvjoin.split("|"); const nn=t.dataset.cvto||""; if(nn){ cvRenameKeys(keys,nn); toast("Exercícios juntados"); } renderSessao(); } });
document.addEventListener("click",e=>{ if(e.target&&e.target.matches&&e.target.matches("[data-grbg]")){ e.stopImmediatePropagation(); SES_GR=false; renderSessao(); return; } if(e.target.closest&&e.target.closest(".grpop [data-dy]")) SES_GR=false; },true);
document.addEventListener("click",e=>{ if(e.target&&e.target.matches&&e.target.matches("[data-sugbg]")){ e.stopImmediatePropagation(); sugOpen=null; SUG_ROW=null; renderSessao(); } },true);
document.addEventListener("change",e=>{ const s=e.target.closest&&e.target.closest("[data-cvgsel]"); if(s) CV_GSEL[s.dataset.cvgsel]=s.value; });
document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.matches&&e.target.matches("[data-cvrenin]")){ e.preventDefault(); const b=document.querySelector("[data-cvrenok]"); if(b) b.click(); } });

function cvPopSync(){ let o=document.getElementById("cvPop"); if(o) o.remove(); if(!CV_REG||!CV_EDIT) return;
  o=document.createElement("div"); o.id="cvPop"; o.className="cvpop"; const nm={MMSS:"MMSS · membros superiores",MMII:"MMII · membros inferiores",Core:"ABD · abdômen"}[CV_REG]||CV_REG;
  o.innerHTML=`<div class="cvpopbox" role="dialog" aria-label="Histórico de exercício"><div class="cvpophd"><b>Histórico · ${nm}</b><div class="cvpoptabs">${[["MMSS","MMSS"],["MMII","MMII"],["Core","ABD"]].map(([k,l])=>`<button class="chip" data-cvreg="${k}" aria-pressed="${CV_REG===k}">${l}</button>`).join("")}</div><button class="chip" data-cvhx aria-label="Fechar">✕ Fechar</button></div>${cvJoinBar()}${cvListHTML(CV_REG)}</div>`;
  const keep=CV_REN; document.body.appendChild(o); }
document.addEventListener("click",e=>{ const t=e.target; if(!t||!t.closest) return; if(t.closest("[data-cvhx]")||t.id==="cvPop"){ e.stopImmediatePropagation(); CV_REG=null; CV_REN=null; CV_MV=null; CV_JN=null; renderSessao(); } },true);
function cvNameCounts(){ const c=new Map(); Object.values(S.days||{}).forEach(W=>Object.values(W||{}).forEach(P=>Object.values(P||{}).forEach(d=>((d&&d.rows)||[]).forEach(r=>String(r.n1||"").split("+").forEach(n=>{ n=String(n||"").trim(); if(!n) return; const k=noAcc(n).trim(); c.set(k,(c.get(k)||0)+1); }))))); return c; }
function cvRegNames(reg){ const set=new Map(); const H=S.exHide||{}; const cnt=Object.keys(H).length? cvNameCounts() : null;
  const add=n=>{ n=String(n||"").trim(); if(!n) return; const k=noAcc(n); if(set.has(k)) return; const hk=k.trim(); if(H[hk]!==undefined&&(!cnt||(cnt.get(hk)||0)<=H[hk])) return; const g=regionOfName(n)||"MMSS"; if(g===reg) set.set(k,n); };
  Object.values(S.days||{}).forEach(W=>Object.values(W||{}).forEach(P=>Object.values(P||{}).forEach(d=>((d&&d.rows)||[]).forEach(r=>String(r.n1||"").split("+").forEach(add))))); (S.custom||[]).forEach(e=>add(e.n));
  return [...set.values()].sort((a,b)=>a.localeCompare(b,"pt-BR")); }
function cvJoinBar(){ if(!CV_JN) return `<div class="cvjbar"><button class="btn small" data-cvjn>🔗 Juntar nomes</button><small class="muted">Toque e escolha os nomes que são o mesmo exercício</small></div>`;
  const n=CV_JN.length; return `<div class="cvjbar on"><b>${n<2?"Toque nos nomes que são o mesmo exercício"+(n?` (${n} escolhido)`:""):`${n} escolhidos · qual nome fica?`}</b>${n>=2?`<div class="cvjto">${CV_JN.map(x=>`<button class="btn small primary" data-cvjnto="${esc(x)}">Deixar: ${esc(x)}</button>`).join("")}</div>`:""}<button class="btn small" data-cvjnx>Cancelar</button></div>`; }
document.addEventListener("click",e=>{ const t=e.target.closest&&e.target.closest("#cvPop [data-cvjn],#cvPop [data-cvjnx],#cvPop [data-cvjnto],#cvPop [data-cvpick],#cvPop [data-cvdel],#cvPop [data-cvdelok],#cvPop [data-cvdelno]"); if(!t) return;
  if(t.dataset.cvpick!==undefined){ if(!CV_JN) return; e.stopImmediatePropagation(); const n=t.dataset.cvpick; CV_JN=CV_JN.includes(n)?CV_JN.filter(x=>x!==n):CV_JN.concat([n]); renderSessao(); return; }
  e.stopImmediatePropagation();
  if(t.dataset.cvjn!==undefined){ CV_JN=[]; CV_REN=null; CV_MV=null; CV_DEL=null; renderSessao(); return; }
  if(t.dataset.cvjnx!==undefined){ CV_JN=null; renderSessao(); return; }
  if(t.dataset.cvjnto!==undefined){ const nn=t.dataset.cvjnto, ks=CV_JN.slice(); const reg=CV_REG; cvRenameKeys(ks,nn); if(reg){ S.exReg=S.exReg||{}; S.exReg[noAcc(nn).trim()]=reg; } if(S.exHide) delete S.exHide[noAcc(nn).trim()]; save(); CV_JN=null; toast(`${ks.length} nomes viraram "${nn}" em todos os treinos`); renderSessao(); return; }
  if(t.dataset.cvdel!==undefined){ CV_DEL=CV_DEL===t.dataset.cvdel?null:t.dataset.cvdel; renderSessao(); return; }
  if(t.dataset.cvdelno!==undefined){ CV_DEL=null; renderSessao(); return; }
  if(t.dataset.cvdelok!==undefined){ const n=t.dataset.cvdelok, k=noAcc(n).trim(); S.exHide=S.exHide||{}; S.exHide[k]=cvNameCounts().get(k)||0; if(Array.isArray(S.custom)) S.custom=S.custom.filter(x=>noAcc(String(x&&x.n||"").trim()).trim()!==k); CV_DEL=null; save(); toast("Nome apagado da lista"); renderSessao(); return; } },true);
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cvreg],[data-cvpick]"); if(!b) return;
  if(b.dataset.cvreg){ CV_REG= CV_REG===b.dataset.cvreg? null : b.dataset.cvreg; CV_REN=null; if(CV_REG){ const r0=b.closest("[data-row]"), c0=b.closest("[data-col]"); if(r0&&c0) CV_CTX={row:r0.dataset.row,col:c0.dataset.col}; } renderSessao(); return; }
  const rEl=b.closest("[data-row]")||(CV_CTX&&{dataset:{row:CV_CTX.row}}), cEl=b.closest("[data-col]")||(CV_CTX&&{dataset:{col:CV_CTX.col}}); if(!rEl||!cEl) return; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const r=d.rows.find(x=>x.id===rEl.dataset.row); if(!r) return;
  r.n1=b.dataset.cvpick; const df=phaseDefaults(stById(cEl.dataset.col)); if(r.a.s==="") r.a.s=df.s; if(r.a.r==="") r.a.r=df.r; CV_REG=null; save(); renderSessao(); try{ markStart(cEl.dataset.col); }catch(_){} });
const cvMode=()=>"card";
/* Conjugado: dia ainda em branco (cópia) segue o conjugado do treino anterior, para os exercícios aparecerem juntos */
function cjSync(d,pr){ if(!d||!d.cp||d.ini||d.done||!pr||!pr.length) return; let ch=false; const blank=r=>!(r&&(String(r.n1||"").trim()||subUsed(r.a)));
  (d.rows||[]).forEach((r,i)=>{ if(r.cjx||!blank(r)) return; const nx=d.rows[i+1]; const want=!!(pr[i]&&pr[i].cj&&pr[i+1]&&nx); if(!!r.cj!==want){ r.cj=want; ch=true; } }); if(ch) try{ save(); }catch(_){} }
function cvHTML(m,d,others,only){ const ref= d&&d.ltrNew? null : prevRef(m.id); const pr=ref&&ref.d? ref.d.rows : []; cjSync(d,pr);
  const rows=(d&&d.rows)||[]; const nm=others.map(o=>first(o.name)).join(" e ");
  const cmp=(cur,old)=>{ const a=num(cur), b=num(old); if(!a||!b) return '<i class="cvsp">&nbsp;</i>'; return a>b?'<i class="cvup">▲</i>':a<b?'<i class="cvdn">▼</i>':'<i class="cveq">=</i>'; };
  const fmt=v=>String(Math.round(v*10)/10).replace(".",",");
  return `<div class="cvlist">${rows.map((r,i)=>{ if(only&&r.id!==only) return ""; const L=rowLines(r).filter(l=>!l.sub); const name=L.map(l=>l.n).filter(Boolean).join(" + ")||r.n1.trim(); const a=r.a;
      const sets=Math.max(1,num(a.s)||0), fz=Math.min(+r.fz||0,sets); let p=pr[i], old=null, novo=false;
      { const p0=p&&(p.n1.trim()||subUsed(p.a)); if(r.n1.trim()&&!(p0&&noAcc(p.n1).trim()===noAcc(r.n1).trim())){ let cd=null; try{ cd=dateOfDay(S.day); }catch(_){} const ld=lastDone(m.id,r.n1,cd||isoD(new Date())); if(ld){ p=ld; old=ld._old; } else { p=null; novo=true; } } }
      const pOk= p&&(p.n1.trim()||subUsed(p.a)); const same= pOk&&!(p&&p._fz)&&noAcc(p.n1).trim()===noAcc(r.n1).trim();
      const pass= pOk? `${!same?`<b>${esc(p.n1.trim())}</b> · `:""}${esc(setTxt(p.a,0,uf(p)))}` : "";
      const isoSo= r.iso&&(a.isoM||"so")==="so"; const v=rowVol(r), pv= same? rowVol(p) : 0;
      const dif=[]; if(same){ const D=(x,y,u,pl)=>{ const k=num(x)-num(y); if(!num(x)||!num(y)||!k) return; dif.push(`${k>0?"+":"−"}${fmt(Math.abs(k))}${u}${pl&&Math.abs(k)!==1?pl:""}`); }; D(a.c,p.a.c," kg"); D(a.r,p.a.r," rep","s"); D(a.s,p.a.s," série","s"); }
      const subs=subsOf(r).filter(subUsed);
      const prevCj= i>0&&rows[i-1].cj;
      const inl=f=>CV_IN&&CV_IN.id===r.id&&CV_IN.f===f;
      const numB=(f,lab,val,c)=> inl(f)? `<span class="cvnb cvnbin">${c}<small>${lab}</small><input class="cvni" data-cvni ${f==="sec"?"data-sec":`data-x="a.${f}"`} inputmode="${f==="c"?"decimal":"numeric"}" value="${esc(f==="sec"?(a.sec||""):(a[f]||""))}" aria-label="${lab}"></span>` : `<button class="cvnb" data-cvinl data-cvf="${f}">${c}<small>${lab}</small><b>${val}</b></button>`;
      return `<div class="cvc ${prevCj?"cvj":""} ${r.cj?"cvjn":""}" data-row="${r.id}"><button class="cvdel" data-rowdel aria-label="Apagar ${esc(name||"exercício")}">🗑</button>
        ${prevCj?`<span class="cvjtag">+ conjugado</span>`:""}
        ${novo?`<div class="cvpass"><span>🆕 Primeira vez deste exercício (sem registro anterior)</span></div>`:""}${pass?`<div class="cvpass"><span>${old?"Feito anteriormente ("+ddmm(old)+"):":"Sem. Pass.:"} ${pass}</span><button class="cvrep" data-rowrep="${esc(JSON.stringify({all:1,n:p.n1,a:p.a,sub:subsOf(p),tec:p.tec||"",cj:!!p.cj}))}" aria-label="Repetir o exercício da semana passada">↻ Repetir</button></div>`:""}
        <div class="cvtop">${inl("n")?`<div class="cvt cvtin"><input class="inp cvni" data-cvni data-n="n1" value="${esc(r.n1)}" aria-label="Exercício"><button class="cvmore" data-cvedit>mais opções</button></div>`:`<button class="cvt" ${name&&!window.RP_LIMPO?`data-cvinl data-cvf="n"`:"data-cvedit"}><b>${name?esc(name):`<span class="muted">Toque para escrever o exercício</span>`}</b>${dif.length?`<small class="cvdif">${dif.join(" · ")} <span>${old?"vs. última vez":"vs. sem. pass."}</span></small>`:same?`<small class="cvdif">${old?"igual à última vez":"igual à semana passada"}</small>`:""}<small>${[r.tec?`<i class="cvtec">${esc(tecLbl(r))}</i>`:"",r.iso?`<i class="cvtec">iso${num(a.sec)?" "+esc(a.sec)+'"':""}</i>`:"",a.f?`<i class="cvtec cvfal">falha</i>`:"",isUni(r)?`<i class="cvtec">uni</i>`:""].filter(Boolean).join(" ")}</small></button>`}
          <div class="cvnumc" style="--nc:${r.exe?6:4}"><div class="cvnums ${r.exe?"cvnums6":""}">${numB("s","SÉR",esc(a.s||"–"),same?cmp(a.s,p.a.s):'<i class="cvsp">&nbsp;</i>')}${(()=>{ const u=isUni(r); const rv= isoSo? (a.sec? (u? `${a.sec}"/${a.sec}"` : a.sec) : "–") : (a.r? (u? `${a.r}/${a.r}` : a.r) : "–"); return numB(isoSo?"sec":"r",isoSo?"SEG":"REPS",esc(rv),same&&!isoSo?cmp(a.r,p.a.r):'<i class="cvsp">&nbsp;</i>'); })()}${r.exe? numB("tex","TEMPO",num(a.tex)?esc(a.tex)+'"':"–",same?cmp(a.tex,p.a.tex):'<i class="cvsp">&nbsp;</i>') : ""}${numB("c","KG",num(a.c)?esc(String(a.c).replace(".",",")):"–",same?cmp(a.c,p.a.c):'<i class="cvsp">&nbsp;</i>')}${r.exe? numB("zn","ZONA",num(a.zn)?esc(a.zn):"–",same?cmp(a.zn,p.a.zn):'<i class="cvsp">&nbsp;</i>') : ""}<span class="cvnb cvvol">${same?cmp(v,pv):'<i class="cvsp">&nbsp;</i>'}<small>TON</small><b>${v?nf(v):"–"}</b></span></div>${cvSubsHTML(r,inl)}</div>
          <div class="cvfzw"><small>contador de séries</small><button class="cvfz ${fz>=sets&&name?"ok":""}" data-cvfz aria-label="Séries feitas">${fz}/${a.s||0}</button></div></div>
        ${r.tec==="Cadência controlada"?`<div class="cvcad"><span>Cadência</span><label>Excêntrica<input class="inp" inputmode="numeric" data-cad="E" value="${esc(r.cadE||"")}" placeholder="seg"></label><label>Concêntrica<input class="inp" inputmode="numeric" data-cad="C" value="${esc(r.cadC||"")}" placeholder="seg"></label></div>`:""}
        ${CV_EDIT===r.id?`<div class="cved"><div class="cvnrow"><div class="cvlab"><small>Histórico de exercícios</small><div class="cvregs">${[["Core","ABD"],["MMSS","MMSS"],["MMII","MMII"]].map(([k,l])=>`<button class="chip" data-cvreg="${k}" aria-pressed="${CV_REG===k}">${l}</button>`).join("")}</div></div><div class="cvlab"><small>ou fale</small><button class="cvmic" data-mic aria-label="Fale o exercício">🎤</button></div><div class="cvinw"><button class="cvsuglnk" data-sug data-sugrow="${r.id}">💡 Sugestões de exercícios</button><input class="inp cvnin" data-n="n1" data-cvparse list="exlist" value="${esc(r.n1)}" placeholder="escreva o exercício" aria-label="Escreva o exercício"></div></div>
          
          <label>Séries<input class="inp" inputmode="numeric" data-x="a.s" data-cvin="s" value="${esc(a.s)}"></label><label>${isoSo?"Segundos":"Reps"}<input class="inp" inputmode="numeric" ${isoSo?'data-sec data-cvin="sec"':'data-x="a.r" data-cvin="r"'} value="${esc(isoSo?(a.sec||""):a.r)}"></label><label>Kg<input class="inp" inputmode="decimal" data-x="a.c" data-cvin="c" value="${esc(a.c)}"></label>
          ${r.exe?`<label>Tempo (seg)<input class="inp" inputmode="numeric" data-x="a.tex" data-cvin="tex" value="${esc(a.tex||"")}" placeholder="ex.: 30"></label><label>Zona<input class="inp" inputmode="numeric" data-x="a.zn" data-cvin="zn" value="${esc(a.zn||"")}" placeholder="1 a 5"></label><span></span>`:""}
          <div class="cvopts"><button class="chip" data-falha="a" aria-pressed="${!!a.f}">Até a falha</button><button class="chip" data-unil aria-pressed="${isUni(r)}">Unilateral</button><button class="chip" data-tecb aria-pressed="${tecPick===r.id||!!r.tec}">Usar método avançado?</button><button class="chip" data-isot aria-pressed="${!!r.iso}">Isometria</button><button class="chip" data-cvexe aria-pressed="${!!r.exe}">Tempo de execução</button></div>
          <div class="cvopts"><button class="btn small primary" data-cvedit>Pronto</button></div></div>`:""}
        ${r.iso?`<div class="cviso"><span>Isometria</span><select class="inp" data-isom aria-label="Onde entra a isometria">${Object.entries(ISO_M).map(([k,t])=>`<option value="${k}" ${(a.isoM||"so")===k?"selected":""}>${t}</option>`).join("")}</select><input class="inp" inputmode="numeric" data-isos placeholder="séries" value="${esc(a.isoS||"")}" aria-label="Séries com isometria"><input class="inp" inputmode="numeric" data-sec placeholder="seg" value="${esc(a.sec||"")}" aria-label="Segundos"></div>`:""}
        ${tecPick===r.id?`<div class="cvtecs">${TEC_PICK.map(t=>`<button class="chip" data-tecset="${esc(t)}" aria-pressed="${r.tec===t}">${esc(t)}</button>`).join("")}${r.tec?`<button class="chip" data-tecset="">Sem método</button>`:""}<button class="chip cvtecall" data-tecall>Entenda os métodos avançados</button></div>`:""}
        ${SUG_ROW===r.id&&sugOpen===m.id? `<div class="sugpop" data-sugbg>${sugHTML(m,d)}</div>` : ""}${CPY_ROW===r.id&&!others.length? cpyPickHTML(m) : ""}${r.cj? "" : `<div class="cvact ${prevCj?"cvact6":""}">${prevCj?`<button data-cvsplit>Desmembrar</button><button data-cjadd>${window.RP_LIMPO?"+<br>Conjugar":"+ Conjugar"}</button>`:(rows[i+1]&&(rows[i+1].n1.trim()||subUsed(rows[i+1].a))?`<button data-cjjoin>Conjugar</button>`:`<button data-cjadd>Conjugar</button>`)}<button data-isot class="${r.iso?"on":""}">Isometria</button><button data-tecb class="${r.tec?"on":""}">${window.RP_LIMPO?"Métodos<br>avançados":"Métodos avançados"}</button>${others.length?`<button data-copyrow="${r.id}">${window.RP_LIMPO?`Repetir<br>p/ ${esc(nm)}`:`Repetir p/ ${esc(nm)}`}</button>`:""}${window.RP_LIMPO?`<button data-cdadd="${r.id}" class="${CD_AT[m.id]===r.id?"on":""}">Adicionar<br>cardio</button>`:""}</div>`}</div>${CD_AT[m.id]===r.id&&CV_CDFN?`<div class="cvcdbox"><button class="pclose" data-cdadd="${r.id}" aria-label="Fechar o cardio">✕ Fechar</button>${CV_CDFN("cardio")}</div>`:""}`; }).join("")}</div>`; }
function tecAllHTML(){ return `<div class="sheet tecall"><div class="sheet-head"><h3>Métodos avançados</h3><button class="btn small" data-thx>Fechar</button></div>${TEC_PICK.map(n=>{ const x=tecByName(n); return x? `<details><summary>${esc(n)}</summary><div class="tec"><p><span>Como:</span> ${x.howG||x.how}</p><p><span>Exemplo:</span> ${x.ex}</p><p><span>Quando:</span> ${x.whenG||x.when}</p><p><span>Ciência:</span> ${x.sci}</p></div></details>` : ""; }).join("")}</div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-tecall]"); if(!b) return; e.stopPropagation(); let o=document.getElementById("tecHelp"); if(!o){ o=document.createElement("div"); o.id="tecHelp"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",ev=>{ if(ev.target===o||ev.target.closest("[data-thx]")) o.hidden=true; }); } o.innerHTML=tecAllHTML(); o.hidden=false; },true);
document.addEventListener("change",e=>{ const t=e.target; if(!t.matches||!t.matches("[data-cad]")) return; const rEl=t.closest("[data-row]"), cEl=t.closest("[data-col]"); if(!rEl||!cEl) return; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const r=d.rows.find(x=>x.id===rEl.dataset.row); if(!r) return; r["cad"+t.dataset.cad]=String(t.value).replace(/\D/g,""); save(); renderSessao(); });
/* Texto ditado pelo teclado (ex.: "supino reto 3 de 10 com 20 kg") vai para séries, repetições e carga */
document.addEventListener("change",e=>{ const t=e.target; if(!t.matches||!t.matches('[data-n="n1"]')) return; const v=t.value||""; if(!/\d/.test(v)) return; const o=vozParse(v); if(!(o.s||o.r||o.c)) return;
  const rEl=t.closest("[data-row]"), cEl=t.closest("[data-col]"); if(!rEl||!cEl) return; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const r=d.rows.find(x=>x.id===rEl.dataset.row); if(!r) return;
  r.n1=o.n||r.n1.replace(/\d.*$/,"").trim(); if(o.s) r.a.s=o.s; if(o.r) r.a.r=o.r; if(o.c) r.a.c=o.c; save(); setTimeout(()=>{ renderSessao(); },0); toast("✓ "+[r.n1,o.s&&o.r?o.s+"×"+o.r:"",o.c?o.c+" kg":""].filter(Boolean).join(" · ")); });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cvsplit]"); if(!b) return; const rEl=b.closest("[data-row]"), cEl=b.closest("[data-col]"); if(!rEl||!cEl) return; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const i=d.rows.findIndex(x=>x.id===rEl.dataset.row); if(i<1) return; for(let k=i-1;k>=0&&d.rows[k].cj;k--){ d.rows[k].cj=false; d.rows[k].cjx=1; } save(); renderSessao(); toast("Conjugado desmembrado"); });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cvmode],[data-cvfz],[data-cvedit]"); if(!b) return;
  if(b.dataset.cvmode){ try{ localStorage.setItem("rp_cv",b.dataset.cvmode); }catch(_){} CV_EDIT=null; renderSessao(); return; }
  const rEl=b.closest("[data-row]"), cEl=b.closest("[data-col]"); if(!rEl||!cEl) return; const d=dayOf(S.week,cEl.dataset.col,S.day,true); const r=d.rows.find(x=>x.id===rEl.dataset.row); if(!r) return;
  if(b.hasAttribute("data-cvfz")){ const n=Math.max(1,num(r.a.s)||0); r.fz=((+r.fz||0)+1)%(n+1); save(); try{ markStart(cEl.dataset.col); }catch(_){} renderSessao(); return; }
  if(b.hasAttribute("data-cvedit")){ const f=b.dataset.cvf; if(CV_EDIT!==r.id){ CV_REG=null; CV_JN=null; } CV_EDIT= (CV_EDIT===r.id&&!f)? null : r.id; renderSessao(); if(CV_EDIT) setTimeout(()=>{ const x=document.querySelector(`[data-row="${r.id}"] .cved ${f?`[data-cvin="${f}"]`:"input"}`); if(x){ x.focus(); try{ x.select(); }catch(_){} } },60); } });
/* Balança Bluetooth (OKOK / Chipsea, só transmite o peso no ar). Teste: lê o peso e põe na avaliação. */
const OK_V20=0x20CA, OK_V11=0x11CA, OK_VF0=0xF0FF;
function okParse(md){ const u16=(dv,i)=>(dv.getUint8(i)<<8)|dv.getUint8(i+1); let out=null;
  md.forEach((dv,key)=>{ if(out) return; try{
    if(key===OK_V20&&dv.byteLength>=13){ const f=dv.getUint8(6); const div=(f&4)?100:10; out={kg:u16(dv,8)/div, imp:u16(dv,10)/10, ok:!!(f&1)}; }
    else if(key===OK_V11&&dv.byteLength>=10){ const pr=dv.getUint8(9); const div=[10,1,100,10][(pr>>1)&3]; const w=u16(dv,3); const un=(pr>>3)&3; out={kg: un===2? w/div/2.204623 : un===1? w/div/2 : w/div, ok:true}; }
    else if(key===OK_VF0&&dv.byteLength>=4){ out={kg:((dv.getUint8(3)<<8)|dv.getUint8(2))/10, ok:true}; }
    else if((key&0xFF)===0xC0&&dv.byteLength>=7){ const at=dv.getUint8(6); const div=[10,1,100,10][(at>>1)&3]; const un=(at>>3)&3; const raw=u16(dv,0); out={kg: un===2? raw/div/2.204623 : un===1? raw/div/2 : raw/div, imp:u16(dv,2)/10, ok:!!(at&1)}; }
  }catch(_){} }); return out; }
let SCALE_AB=null;
async function scaleRead(){ const box=document.getElementById("scaleBox"); const say=h=>{ if(box) box.innerHTML=h; };
  if(!navigator.bluetooth){ say("Este navegador não tem Bluetooth para sites. Use o <b>Chrome no Android</b>."); return; }
  const ids=[OK_V20,OK_V11,OK_VF0]; for(let i=0;i<256;i++) ids.push((i<<8)|0xC0);
  say("1. Suba na balança para ela acender. 2. Escolha ela na lista que vai abrir (pode aparecer como <b>Chipsea-BLE</b>, <b>ADV</b>, <b>Yoda</b> ou sem nome).");
  let dev; try{ dev=await navigator.bluetooth.requestDevice({acceptAllDevices:true, optionalManufacturerData:ids}); }catch(e){ say(e&&e.name==="NotFoundError"? "Nenhuma balança escolhida. Suba na balança e toque de novo." : "Não deu para abrir o Bluetooth: "+esc(erroPT(e))+". Confira se o Bluetooth e a localização estão ligados."); return; }
  if(typeof dev.watchAdvertisements!=="function"){ say(`Achei <b>${esc(dev.name||"a balança")}</b>, mas este Chrome ainda não deixa o site ouvir a balança.<br>Para liberar: abra uma aba e digite <b>chrome://flags</b> → procure <b>Experimental Web Platform features</b> → <b>Enabled</b> → reinicie o Chrome e tente de novo.`); return; }
  try{ if(SCALE_AB) SCALE_AB.abort(); }catch(_){} SCALE_AB=new AbortController(); let done=false, last="", seen=0;
  const stop=()=>{ try{ SCALE_AB.abort(); }catch(_){} };
  dev.addEventListener("advertisementreceived",ev=>{ if(done) return; seen++; const r=okParse(ev.manufacturerData);
    if(!r){ const hex=[]; ev.manufacturerData.forEach((dv,k)=>{ let h=k.toString(16).toUpperCase()+":"; for(let i=0;i<dv.byteLength;i++) h+=dv.getUint8(i).toString(16).padStart(2,"0"); hex.push(h); }); last=hex.join(" "); say(`Recebendo sinal da balança, mas ainda não entendi o formato.<br><small>Mande um print disto: ${esc(last||"(sem dados)")}</small>`); return; }
    const kg=Math.round(r.kg*10)/10;
    if(!r.ok){ say(`⚖️ <b style="font-size:22px">${String(kg).replace(".",",")} kg</b> · fique parado…`); return; }
    done=true; stop(); const i=document.getElementById("av-peso"); if(i){ i.value=String(kg).replace(".",","); i.dispatchEvent(new Event("input",{bubbles:true})); }
    say(`✅ Peso lido: <b style="font-size:22px">${String(kg).replace(".",",")} kg</b>. Já está no campo Peso.${r.imp?` <small>(a balança mandou também a medida elétrica: ${Math.round(r.imp)} Ω)</small>`:""}`); toast("Peso lido da balança"); });
  try{ await dev.watchAdvertisements({signal:SCALE_AB.signal}); say("🔵 Ouvindo a balança… suba e fique parado até o número parar de mudar."); }catch(e){ say("Não consegui ouvir a balança: "+esc(erroPT(e))+". Se pedir, ative a localização do celular."); return; }
  setTimeout(()=>{ if(!done){ stop(); say(seen? `Ouvi a balança, mas não chegou o peso final.${last?`<br><small>Mande um print disto: ${esc(last)}</small>`:""}` : "Não chegou sinal em 60 s. Suba na balança, deixe ela acender e toque de novo."); } },60000); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-scale]"); if(!b) return; scaleRead(); });
function renderSessao(){ try{ cvPopSync(); }catch(_){} try{ applyStuCor(); }catch(_){} setTimeout(()=>{ try{ scRender(); rwRender(); }catch(_){} },0); renderSessao0(); requestAnimationFrame(()=>fitNames()); setTimeout(repAuto,120); }
let sesProgOpen=null;
function sesProgHTML(st){ const ms0=sesMembers(); if(!ms0.length) return ""; const ms=[ms0.includes(st)?st:ms0[0]];
  const btns=ms.map(m=>`<button type="button" class="progtop" data-progpg="${m.id}"><span class="pt-ic">📊</span><span><b>Programação do treino de ${esc(first(m.name))}</b><small>Estruturação do treino do seu aluno: fases, semanas, letras e divisão</small></span><span class="pt-ar">›</span></button>`).join("");
  const o= sesProgOpen&&ms.some(m=>m.id===sesProgOpen)? stById(sesProgOpen) : null;
  return `<div class="sesprog"><div class="row">${btns}</div>${o? semCardHTML(o).replace('data-det="card" ','data-det="card" open ') : ""}</div>`; }
let SES_WK="";
function cliWk(m,w){ const L=wkSorted(); const i=L.indexOf(w); const fw=wkFirst(m); const f=fw? L.indexOf(fw) : -1; if(f<0||i<f) return null; return i-f+1; }
function cliWkLbl(m,w){ const n=cliWk(m,w); if(!n) return ""; const mo=Math.floor(n/4); return `${n}ª semana ${m.own?"do seu treino":"com "+esc(first(m.name))}${mo?` · <b class="wkmo">${mo} ${mo>1?"meses":"mês"}</b>`:""}`; }
let SES_ALL=false, SES_AL=false, SES_GR=false, TM_PAN=false, CV_CDFN=null; const CD_AT={};
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-sesall]"); if(!b) return; SES_ALL=!SES_ALL; renderSessao(); });
let QS_OPEN=false, SES_MT=false;
function sesLTop(st,w,ms,DAYCH){ const k=addDays(w.start,DAYS.indexOf(S.day)); const wi=S.weeks.indexOf(w); const L=(ms.length?ms:[st]).filter(Boolean);
  return `<div class="sesl-wk"><div class="weeknav wkl"><button class="icon-btn" data-wk="-1" ${wi===0?"disabled":""} aria-label="Semana anterior">‹</button>
      <div class="wk-title"><span class="label wkcli">${cliWkLbl(st,w)||("Semana "+(wkNum(w)==null?w.n:wkNum(w)))}${w.nome?` · ${esc(w.nome)}`:""}</span><strong>${ddmm(w.start)} a ${ddmm(addDays(w.start,6))}</strong></div>
      <button class="icon-btn" data-wk="1" ${wi===S.weeks.length-1?"disabled":""} aria-label="Próxima semana">›</button></div>${wkChipsHTML()}</div>
  <div class="sesl-top"><div class="sesl-d"><b>${DAY_N[S.day]||S.day}</b><small>${ddmm(k)}</small></div><button class="btn small sesl-new ${QS_OPEN?"on":""}" data-qsopen>${QS_OPEN?"✕ Fechar":"+ Aluno novo"}</button></div>
  ${QS_OPEN? `<div class="sesl-qs"><button class="pclose" data-qsopen aria-label="Fechar">✕ Fechar</button>${qsHTML()}</div>` : ""}
  <div class="sesl-ms">${L.map(m=>`<div class="sesl-m" data-col="${m.id}" id="sbl-${m.id}">${sesLBar(m)}</div>`).join("")}</div>
  <button class="btn ghost sesl-more sesl-dk ${SES_AL?"on":""}" data-sesal>${SES_AL?"▴ Fechar os alunos do dia":"👥 Ver os alunos do dia"}</button>
  ${SES_AL? `<button class="btn ghost sesl-more sesl-dk" data-sesgr>🗓 Ver grade de horários da semana</button><div class="sesl-al"><button class="pclose" data-sesal aria-label="Fechar">✕ Fechar</button>${todayHTML(st)}</div>` : ""}
  ${SES_GR? `<div class="sugpop grpop" data-grbg><div class="grpopbox"><div class="grpophd"><b>Grade de horários da semana</b><button class="btn small sugx" data-sesgr>✕ Fechar</button></div>${sesGradeHTML(w)}</div></div>` : ""}
  <div class="sesl-hm" data-col="${(L.includes(st)?st:L[0]).id}"><button class="btn small" data-histopen>📈 Histórico de treinos</button>${L.length>1&&sesMode==="lancar"?`<button class="btn small ${sideOn()?"on":""}" data-sidetog>${sideOn()?"👤 Um de cada vez":"👥 Dividir a tela"}</button>`:""}<button class="btn small ${SES_MT?"on":""}" data-sesmt>🎯 Metas e controle da sessão${SES_MT?" ▴":""}</button></div>`; }
/* nome + tempo correndo; embaixo iniciar/zerar/terminar; terminado: relatórios e, na linha de baixo, enviar */
function sesLBar(m){ const w=S.weeks.find(x=>x.id===S.week); const d=w&&dayOf(w.id,m.id,S.day); const nm=esc(first(m.name)); const hoje=sesDateOf()===isoD(new Date());
  const has=d&&dayHasData(d); const t0=d&&d.ini? sesT0(d) : 0;
  const clk= d&&d.done? `<span class="sesl-ok">✔ concluído${sesTimes(d)?` · ${sesTimes(d)}`:""}</span>` : t0&&hoje&&!d.pz? `<span class="sbclock num" data-t0="${t0}">${fmtClk(Date.now()-t0)}</span>` : d&&d.ini? `<span class="sesl-tx">desde ${d.ini}</span>` : "";
  let bt="";
  if(d&&d.done) bt=`<div class="sesl-bt"><button class="btn small" data-report="day">Ver relatório</button><button class="btn small" data-report="week">Relatório da semana</button><button class="btn small ghost" data-reopen>Reabrir</button></div>${m.own?"":`<div class="sesl-bt sesl-env"><button class="btn small primary sbsend" data-sendboth>📲 Enviar relatório para ${nm} (imagem + texto)</button><button class="btn small" data-sendwa>Só texto</button></div>`}`;
  else if(d&&d.ini&&!d.pz) bt=`<div class="sesl-bt"><button class="btn small sbzero" data-seszero>↺ Zerar tempo</button><button class="btn small primary sbstop" data-done>■ Terminar treino</button></div>`;
  else bt=`<div class="sesl-bt"><button class="btn small primary sbgo" data-sesini>▶ Iniciar treino</button>${has?`<button class="btn small sbstop" data-done>■ Terminar treino</button>`:""}</div>`;
  return `<div class="sesl-nm"><b>${nm}</b>${clk}</div>${bt}`; }
function sesGradeHTML(w){ if(!presOn()) return `<p class="muted">Carregando os horários…</p>`;
  const tag=it=>{ const rp=it.repK? ` ${ddmm(it.repK)}${it.repH?" "+it.repH:""}` : ""; if(it.tipo==="rep") return it.status==="f"? ["f","🔁✗"] : it.status==="p"||it.status==="x"? ["p","🔁✓"] : ["r","🔁"];
    if(it.status==="p"||it.status==="x") return ["p","✓"]; if(it.status==="f") return it.destino==="rep"? ["r","✗ 🔁"+rp] : ["f","✗"]; return it.tipo&&it.tipo!=="fixo"? ["r","+"] : ["",""]; };
  const cols=DAYS.map((dy,i)=>{ const k=addDays(w.start,i); let L=[]; try{ L=PRES.agenda(k)||[]; }catch(_){} const off=PRES.isOff(k); const g={};
    L.forEach(it=>{ const h=it.hora||""; const [c,t]=tag(it); (g[h]=g[h]||[]).push(`<span class="sgn ${c}">${esc(first((it.a&&it.a.nome)||""))}${t?` <i>${esc(t)}</i>`:""}</span>`); });
    const hs=Object.keys(g).sort(); return {dy,k,off,hs,g}; }).filter(c=>c.hs.length||!["Sáb","Dom"].includes(c.dy));
  return `<div class="sesgr" style="--n:${cols.length}">${cols.map(c=>`<div class="sgc ${c.dy===S.day?"on":""}"><button class="sgh" data-dy="${c.dy}" aria-label="Abrir ${DAY_N[c.dy]||c.dy}"><b>${c.dy}</b><small>${ddmm(c.k)}</small></button>${c.off?`<div class="sgoff">${esc(String(PRES.offReason(c.k)||"Sem aula"))}</div>`:c.hs.length? c.hs.map(h=>`<div class="sgr"><b>${esc(h)}</b><span>${c.g[h].join(" e ")}</span></div>`).join("") : `<div class="sgoff">—</div>`}</div>`).join("")}</div>
  <small class="muted sglg"><span class="sgn p">✓ veio</span> <span class="sgn f">✗ faltou</span> <span class="sgn r">🔁 reposição</span> · toque no dia para abrir.</small>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-sesal],[data-sesgr],[data-tmpan],[data-cdadd],[data-setdurx],[data-qsopen],[data-sesmt]"); if(!b) return;
  if(b.hasAttribute("data-sesmt")){ SES_MT=!SES_MT; renderSessao(); if(SES_MT) setTimeout(()=>{ const x=document.querySelector(".col .sesctlw"); if(x) x.scrollIntoView({behavior:"smooth",block:"start"}); },60); return; }
  if(b.hasAttribute("data-qsopen")){ QS_OPEN=!QS_OPEN; renderSessao(); if(QS_OPEN) setTimeout(()=>{ const i=document.getElementById("qsName"); if(i) i.focus(); },60); return; }
  if(b.hasAttribute("data-sesal")){ SES_AL=!SES_AL; renderSessao(); return; }
  if(b.hasAttribute("data-sesgr")){ SES_GR=!SES_GR; renderSessao(); return; }
  if(b.hasAttribute("data-tmpan")){ TM_PAN=!TM_PAN; renderSessao(); renderTurnbar(); if(TM_PAN) setTimeout(()=>{ const x=document.querySelector(".tmpanw"); if(x) x.scrollIntoView({behavior:"smooth",block:"start"}); },60); return; }
  if(b.hasAttribute("data-setdurx")){ const inp=document.getElementById("durX"); const v=Math.round(+(inp&&inp.value)||0); if(!(v>=5&&v<=900)){ toast("Escreva de 5 a 900 segundos"); if(inp) inp.focus(); return; } const m=S.students.find(x=>x.id===durOpen); if(m){ m.rest=v; save(); toast(`Descanso de ${first(m.name)}: ${v}"`); } durOpen=null; renderTurnbar(); return; }
  if(b.dataset.cdadd){ const c=b.closest("[data-col]"); const sid=c&&c.dataset.col; if(!sid) return; CD_AT[sid]= CD_AT[sid]===b.dataset.cdadd? null : b.dataset.cdadd; let nb=0; if(CD_AT[sid]){ try{ const d=dayOf(S.week,sid,S.day,true); const C=d.cardio=d.cardio||{}; if(hasCardio(C)){ const N=cardioN(C); const vaz=N>=2&&!CZF.some(f=>C[f+N]!=null&&C[f+N]!==""); if(!vaz){ C.n=N+1; save(); } nb=1; } }catch(_){} } renderSessao(); if(CD_AT[sid]) setTimeout(()=>{ const bx=document.querySelector(`.col[data-col="${sid}"] .cvcdbox`); const ss=bx&&bx.querySelectorAll(".xc2-sec"); const x=nb&&ss&&ss.length? ss[ss.length-1] : bx; if(x){ x.scrollIntoView({behavior:"smooth",block:nb?"center":"start"}); if(nb){ const s2=x.querySelector("select"); if(s2) try{ s2.focus({preventScroll:true}); }catch(_){} } } },60); } });
document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.id==="durX"){ e.preventDefault(); const b=document.querySelector("[data-setdurx]"); if(b) b.click(); } });
function renderSessao0(){
  const SL=!!window.RP_LIMPO&&!SES_ALL;
  ensureWeeks(); try{ if(mirSync()) save(); }catch(_){}
  const st=A(); const ms=sesMembers(); const w=S.weeks.find(x=>x.id===S.week); const wi=S.weeks.indexOf(w);
  const last=S.weeks[S.weeks.length-1];
  { let ch=false; ms.forEach(m=>{ const dd=dayOf(w.id,m.id,S.day); if(dd&&dd.cp===1&&!dd.cdOk&&!dd.ini&&!dd.done&&!dd.presOk&&(hasCardio(dd.cardio)||String((dd.wod||{}).desc||"").trim())){ dd.cardio={t:"",z:"",tipo:"",pse:"",v:""}; dd.wod={tipo:"",t:"",desc:""}; ch=true; } }); if(ch) save(); }
  const used=new Set(); ms.forEach(m=>DAYS.forEach(dy=>{ if(dayHasData(dayOf(w.id,m.id,dy))) used.add(dy); }));
  const names=[...new Set([...LIB.map(e=>e.n),...(S.custom||[]).map(e=>e.n)])];
  const grp={}; [...LIB,...(S.custom||[])].forEach(e=>{ const main=Object.entries(e.m||{}).sort((a,b)=>b[1]-a[1])[0]; const g=main&&MUSCLES[main[0]]?MUSCLES[main[0]].n:"Outros"; (grp[g]=grp[g]||[]).push(e.n); });
  PICK_OPTS=Object.entries(grp).map(([g,l])=>`<optgroup label="${esc(g)}">${l.map(n=>`<option>${esc(n)}</option>`).join("")}</optgroup>`).join("");
  const DAYCH=`<div class="daychips" role="group" aria-label="Dia">${DAYS.map(dy=>{ const kk=addDays(w.start,DAYS.indexOf(dy)); const off=presOn()&&PRES.isOff(kk); const nr=presOn()? sesExtras(dy).filter(x=>x.i.tipo==="rep").length : 0; return `<button data-dy="${dy}" aria-pressed="${dy===S.day}" class="${off?"dyoff":""}">${off?`<i class="dyfer">${(()=>{ const r=String(PRES.offReason(kk)||""); return /^(Viagem|Folga)/.test(r)? r.split(/[ (]/)[0] : "Feriado"; })()}</i>`:""}${nr?`<i class="dyrep" title="Reposição">🔁${nr>1?nr:""}</i>`:""}${dy}<small>${ddmm(addDays(w.start,DAYS.indexOf(dy)))}</small>${used.has(dy)?(()=>{ const L=[...new Set(ms.filter(m=>dayHasData(dayOf(w.id,m.id,dy))&&(progOf(m).by||"letra")!=="dia").map(m=>ltrOf(m.id,w.id,dy)).filter(Boolean))]; return L.length? `<span class="dyltr">${esc(L.join("/"))}</span>` : '<span class="dot"></span>'; })():""}</button>`; }).join("")}</div>`;
  SES_WK=`  <div class="card seswk seswk2">
    <div class="wkgrid">
      <div class="weeknav wkl"><button class="icon-btn" data-wk="-1" ${wi===0?"disabled":""} aria-label="Semana anterior">‹</button>
        <div class="wk-title"><span class="label wkcli">${cliWkLbl(st,w)||("Semana "+(wkNum(w)==null?w.n:wkNum(w)))}${w.nome?` · ${esc(w.nome)}`:""}</span><strong>${ddmm(w.start)} a ${ddmm(addDays(w.start,6))}</strong></div>
        <button class="icon-btn" data-wk="1" ${wi===S.weeks.length-1?"disabled":""} aria-label="Próxima semana">›</button></div>
      <div class="wkrp">${armNewWeek? "" : wkRepOnly()+wkRepTxt()}</div>
      <div class="wkch">${armNewWeek? "" : wkChipsHTML()}</div>
      <div class="wkzr">${armNewWeek? "" : wkZerarBtn()}</div>
    </div>
    ${armNewWeek? `<div class="note" style="display:grid;gap:8px"><span>Criar a semana ${last.n+1} (${ddmm(addDays(last.start,7))})</span>
      <div class="row"><button class="btn primary small" data-nw="copy">Usar a semana ${last.n} como referência (↻ Repetir)</button><button class="btn small" data-nw="blank">Em branco</button><button class="btn small ghost" data-nw="cancel">Cancelar</button></div></div>` : ""}
    ${DAYCH}
    %%CTL%%
  </div>`;
  document.getElementById("view-sessao").innerHTML=`${window.RP_LIMPO? sesLTop(st,w,ms,DAYCH) : ""}${window.RP_LIMPO&&TM_PAN&&ms.length? `<div class="tmpanw" data-col="${(ms.includes(st)?st:ms[0]).id}"><button class="pclose" data-tmpan aria-label="Fechar os timers">✕ Fechar</button><div class="tmpan-h"><b>⏱ Timers</b></div><div class="xcard2">${tmrHTML(ms.includes(st)?st:ms[0])}</div></div>` : ""}${SL? "" : helpBtn("sessao")+slidesBox("sessao")}
  <datalist id="exlist">${names.map(n=>`<option value="${esc(n)}">`).join("")}</datalist>
  <datalist id="cardiolist">${["Caminhada na esteira","Trote na esteira","Corrida na esteira","Caminhada na rua","Trote na rua","Corrida na rua","Escada","Esteira","Bike","Spinning","Elíptico","Remo","Caminhada","Natação"].map(n=>`<option value="${n}">`).join("")}</datalist>
  ${SL? "" : `  ${wkCfgHTML("banner")}
  ${stuHas(st)?`<div class="stutog"><span>${stuShow()?`🎨 Mostrando a cor de <b>${esc(first(st.name))}</b>`:`🙋 Mostrando <b>a sua cor</b>`}</span><button class="btn small" data-stutog>${stuShow()?"Trocar para a minha cor":`Mostrar a cor de ${esc(first(st.name))}`}</button></div>`:""}
  ${boxW("alunos","👥 Alunos do dia",(gradeEdit?"":`<div class="weeknav tdnav"><button class="icon-btn" data-wk="-1" ${wi===0?"disabled":""} aria-label="Semana anterior">‹</button><div class="wk-title"><strong>${ddmm(w.start)} a ${ddmm(addDays(w.start,6))}</strong></div><button class="icon-btn" data-wk="1" ${wi===S.weeks.length-1?"disabled":""} aria-label="Próxima semana">›</button></div><div class="tdays">${DAYCH}</div>`)+todayHTML(st))}
  ${sesMode==="lancar"? "" : boxW("semana","📅 Semana e dia",SES_WK.replace("%%CTL%%",""))}
  ${sesProgHTML(st)}
`}
  ${!SL&&sesMode==="lancar"&&ms.length>1&&sideOn()? `<button class="sidetog on" data-sidetog>👤 Ver um aluno de cada vez</button>` : ""}
  ${sesMode==="lancar"? `<div class="cols ${sideOn()&&ms.length>1?"side":""}" style="--n:${ms.length}">${ms.map(m=>colHTML(m,w,ms)).join("")}</div>` : painelHTML(st,w)}
  ${CV_POP&&sesMode==="lancar"? cvPopHTML(w,ms) : ""}`;
  ms.forEach(m=>paintAlerts(m,dayOf(w.id,m.id,S.day)));
  renderTurnbar();
}
function _afterSes(){ renderTurnbar(); }
function refreshNumbers(sid){
  const m=S.students.find(x=>x.id===sid); const w=S.weeks.find(x=>x.id===S.week); const d=dayOf(w.id,sid,S.day); const T=totDay(d);
  const c=document.getElementById("ctl-"+sid); if(c) c.innerHTML=ctlHTML(m,T);
  const t=document.getElementById("tot-"+sid); if(t) t.innerHTML=totRowsHTML(m,T);
  paintAlerts(m,d);
  if(d) d.rows.forEach(r=>{ ["a","b"].forEach(x=>{ const e=document.getElementById("v"+x+"-"+r.id); if(e) if(e){ const iso=r.iso&&x==="a"&&(r.a.isoM||"so")==="so"; e.innerHTML= iso?"Iso":nf(vol(r[x])*uf(r))+(isUni(r)?`<small class="xvu">2 lados</small>`:""); } });
    const ub=document.querySelector(`[data-col="${sid}"] [data-row="${r.id}"] .xunib`); if(ub){ ub.classList.toggle("on",isUni(r)); ub.setAttribute("aria-pressed",String(isUni(r))); }
    subsOf(r).forEach((x,j)=>{ const e=document.getElementById(`vs${j}-${r.id}`); if(e) e.textContent=vol(x)?nf(vol(x)*uf(r)):"0"; }); arwUpd(r);
    const ri=document.getElementById(`x-${r.id}-ar`); if(ri&&(r.n1.trim()||isUni(r))&&!ri.parentNode.querySelector(".xunib")){ const bt=document.createElement("button"); bt.className="xunib"+(isUni(r)?" on":""); bt.setAttribute("data-unil",""); bt.title="Unilateral: divide as repetições por lado"; bt.textContent="Uni"; ri.parentNode.insertBefore(bt,ri); }
    if(ri&&document.activeElement!==ri){ const u=isUni(r); ri.toggleAttribute("data-ur",u); const v=String(r.a.r||"").trim(); ri.value= u&&v? v+"/"+v : v; }
    const k=rowReg(r,"a"); document.querySelectorAll(`[data-col="${sid}"] [data-row="${r.id}"] .rb[data-setreg]`).forEach(btn=>{ const on=(r.n1.trim()||r.reg) && btn.dataset.setreg===k; btn.classList.toggle("on",!!on); btn.setAttribute("aria-pressed",String(btn.dataset.setreg===k)); }); });
  const wk=document.getElementById("wk-"+sid); if(wk) wk.innerHTML=weekCardHTML(m,w.id);
}
function pullPlan(m){
  const w=S.weeks.find(x=>x.id===S.week); const d=dayOf(w.id,m.id,S.day,true);
  d.rows=[];
  viewOf(m).filter(x=>x.se.day===S.day).forEach(({rows})=>rows.filter(r=>!r.skip).forEach(r=>{
    const e=exById(r.ex); const row=newRow(); row.n1=e.n; row.a=sub(r.sets,r.reps,""); d.rows.push(row);
  }));
  while(d.rows.length<START_ROWS) d.rows.push(newRow());
}
let copyOne=null;
(()=>{ const isField=el=>el&&el.matches&&!(el.closest&&el.closest('#turnbar'))&&el.matches('input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=file]):not([type=date]):not([type=time]),textarea');
  const touch=window.matchMedia&&matchMedia('(pointer:coarse)').matches; if(!touch) return;
  const on=()=>document.body.classList.add('kb'), off=()=>document.body.classList.remove('kb');
  let kbT=null; document.addEventListener('focusin',e=>{ if(isField(e.target)){ clearTimeout(kbT); on(); } });
  document.addEventListener('focusout',e=>{ if(isField(e.target)){ clearTimeout(kbT); kbT=setTimeout(()=>{ if(!isField(document.activeElement)) off(); },150); } });
  const H=()=> window.visualViewport? window.visualViewport.height : window.innerHeight; let h0=H(), sawShrink=false;
  const onRes=()=>{ const h=H(); if(h>h0) h0=h; if(h<h0*0.8){ sawShrink=true; if(isField(document.activeElement)) on(); } else if(h>h0*0.88){ if(sawShrink){ off(); sawShrink=false; } } };
  if(window.visualViewport) window.visualViewport.addEventListener('resize',onRes); window.addEventListener('resize',onRes);
  /* teclado fechado pelo botão voltar: o campo continua focado. Ao tocar fora de um campo, as barras voltam; ao tocar num campo, somem. */
  document.addEventListener('touchstart',e=>{ const t=e.target; if(isField(t)) on(); else if(document.body.classList.contains('kb')&&!t.closest('#tmrbar')){ off(); } },{passive:true});
})();
function fitNames(root){ if(CSS.supports&&CSS.supports("field-sizing","content")) return; (root||document).querySelectorAll("textarea.xn1").forEach(t=>{ if(!t.offsetParent) return; t.style.height="auto"; t.style.height=t.scrollHeight+"px"; }); }
document.addEventListener("input",e=>{ if(e.target.matches&&e.target.matches("textarea.xn1")){ const t=e.target; if(/\n/.test(t.value)){ t.value=t.value.replace(/\n/g," "); } t.style.height="auto"; t.style.height=t.scrollHeight+"px"; } });
document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.matches&&e.target.matches("textarea.xn1")){ e.preventDefault(); e.target.blur(); } });

document.addEventListener("focusin",e=>{ const t=e.target; if(t.hasAttribute&&t.hasAttribute("data-ur")&&t.value.includes("/")) t.value=t.value.split("/")[0]; });
document.addEventListener("focusin",e=>{ const rEl=e.target.closest&&e.target.closest("[data-row]"), cEl=e.target.closest&&e.target.closest("[data-col]"); if(!rEl||!cEl) return;
  const m=stById(cEl.dataset.col), w=S.weeks.find(x=>x.id===S.week), d=m&&w&&dayOf(w.id,m.id,S.day), row=d&&d.rows.find(x=>x.id===rEl.dataset.row);
  if(row&&row.rest&&m.rest!==row.rest&&!REST[m.id]){ m.rest=row.rest; save(); renderTurnbar(); } });
document.addEventListener("focusout",e=>{ const t=e.target; if(t.hasAttribute&&t.hasAttribute("data-ur")){ const v=t.value.split("/")[0].trim(); if(v) t.value=v+"/"+v; } });
function copyRow(fromId,row,toId){
  const w=S.weeks.find(x=>x.id===S.week); const d=dayOf(w.id,toId,S.day,true); const key=noAcc(row.n1).trim();
  let t=d.rows.find(r=>key&&noAcc(r.n1).trim()===key) || d.rows.find(r=>!r.n1.trim()&&!subUsed(r.a)&&!subUsed(r.b));
  if(!t){ t=newRow(); d.rows.push(t); }
  const c=clean(row); const id=t.id; Object.keys(t).forEach(k=>delete t[k]); Object.assign(t,c,{id}); delete d.cp;
  const fm=stById(fromId), tm=stById(toId);
  if(fm&&tm&&fm.phase!==tm.phase&&usesPh(tm)){ const df=phaseDefaults(tm); ["a","b"].forEach(w2=>{ if(subUsed(t[w2])){ t[w2].s=df.s; t[w2].r=df.r; } }); }
}
/* Repetir sempre para o colega: cada exercício lançado ou mudado neste treino vai para a dupla/trio */
function mirSync(){ const w=S.weeks.find(x=>x.id===S.week); if(!w) return false; let ch=false; const ms=sesMembers();
  ms.forEach(m=>{ const d=dayOf(w.id,m.id,S.day); if(!d||!d.mir) return; const others=ms.filter(o=>o!==m); if(!others.length) return;
    d.rows.forEach(r=>{ if(!String(r.n1||"").trim()) return; const c=clean(r); delete c.mh; delete c.id; const h=JSON.stringify(c); if(r.mh===h) return; r.mh=h; others.forEach(o=>{ copyRow(m.id,r,o.id); const t=dayOf(w.id,o.id,S.day); (t.rows||[]).forEach(x=>{ if(x.mh&&!t.mir) delete x.mh; }); }); ch=true; }); });
  return ch; }
function copyDay(fromId,toId){
  const w=S.weeks.find(x=>x.id===S.week); const src=dayOf(w.id,fromId,S.day); if(!src) return;
  const c=cloneDay(src,true,true); delete c.cp; c.rows.forEach((r,i)=>{ if(!(src.rows[i]&&src.rows[i].cp)) delete r.cp; }); c.cardio=Object.assign(JSON.parse(JSON.stringify(src.cardio||{})),{pse:""}); if(src.wod) c.wod=JSON.parse(JSON.stringify(src.wod));
  const fm=S.students.find(x=>x.id===fromId), tm=S.students.find(x=>x.id===toId);
  if(fm&&tm&&fm.phase!==tm.phase){ const df=phaseDefaults(tm); c.rows.forEach(r=>["a","b"].forEach(w2=>{ if(subUsed(r[w2])){ r[w2].s=df.s; r[w2].r=df.r; } })); }
  ((S.days[w.id]||(S.days[w.id]={}))[toId]||(S.days[w.id][toId]={}))[S.day]=c;
}
function sesClick(e){
  const b=e.target.closest("button"); if(!b) return;
  const colEl=b.closest("[data-col]"); const sid=colEl&&colEl.dataset.col; const m=sid&&S.students.find(x=>x.id===sid);
  const w=S.weeks.find(x=>x.id===S.week);
  if(b.dataset.sesprog){ sesProgOpen= sesProgOpen===b.dataset.sesprog? null : b.dataset.sesprog; if(sesProgOpen) semOpen[sesProgOpen+"|card"]=true; renderSessao(); return; }
  if(b.hasAttribute("data-rrest")||b.dataset.rrset!=null){ const rEl=b.closest("[data-row]"); const d=m&&dayOf(w.id,sid,S.day,true); const row=d&&rEl&&d.rows.find(x=>x.id===rEl.dataset.row); if(!row) return;
    if(b.hasAttribute("data-rrest")){ rrOpen= rrOpen===row.id? null : row.id; renderSessao(); return; }
    const v=+b.dataset.rrset; if(v){ row.rest=v; m.rest=v; } else delete row.rest; rrOpen=null; save(); renderSessao();
    toast(v? `Descanso de ${v}" em ${row.n1.trim()||"este exercício"}` : "Descanso volta ao padrão"); return; }
  const rer=()=>{ save(); renderSessao(); };
  if(b.dataset.wk){ const i=S.weeks.indexOf(w)+(+b.dataset.wk); if(S.weeks[i]){ S.week=S.weeks[i].id; armAct=null; rer(); } return; }
  if(b.dataset.nw){ const v=b.dataset.nw;
    if(v==="ask"){ newWeekNow(); renderSessao(); return; }
    if(v==="cancel"){ armNewWeek=false; renderSessao(); return; }
    const last=S.weeks[S.weeks.length-1]; const nw={id:nid(),n:last.n+1,start:addDays(last.start,7)};
    if(v==="copy"){ const src=S.days[last.id]||{}; const dst=S.days[nw.id]={}; Object.keys(src).forEach(s2=>{ dst[s2]={}; Object.keys(src[s2]).forEach(dy=>{ const c=cloneDay(src[s2][dy],true); c.cardio={...c.cardio,pse:""}; dst[s2][dy]=c; }); }); }
    S.weeks.push(nw); S.week=nw.id; armNewWeek=false; rer(); toast(`Semana ${nw.n} criada`); return; }
  if(b.hasAttribute("data-tmnew")){ S.tmMine=tmMineL().concat([{id:nid(),n:"Meu cronômetro",rounds:3,work:0,rest:60}]); const c=S.tmMine[S.tmMine.length-1]; tmrEd={sid,mode:"c_"+c.id}; save(); renderSessao(); setTimeout(()=>{ const x=document.querySelector("[data-tmname]"); if(x){ x.focus(); x.select(); } },60); return; }
  if(b.hasAttribute("data-tmdelmine")){ if(!tmrEd) return; const id=String(tmrEd.mode).slice(2); if(!(armAct&&armAct.k==="tmdel"+id&&armAct.sid===sid)){ armAct={k:"tmdel"+id,sid}; renderSessao(); return; } armAct=null; S.tmMine=tmMineL().filter(c=>c.id!==id); tmrEd=null; save(); renderSessao(); toast("Cronômetro apagado"); return; }
  if(b.dataset.tmopen){ tmrEd= tmrEd&&tmrEd.sid===sid&&tmrEd.mode===b.dataset.tmopen? null : {sid,mode:b.dataset.tmopen}; if(tmrEd&&tmrEd.mode==="tabata"){ S.tmr=S.tmr||{}; S.tmr.tabata=JSON.parse(JSON.stringify(TM_DEF.tabata)); } if(tmrEd) tmCfg(tmrEd.mode); renderSessao(); return; }
  if(b.dataset.tmadd){ const [t,pos]=b.dataset.tmadd.split("|"); const c=tmCfg("mix"); const nb=t==="rest"?{t,sec:60}:Object.assign({t},JSON.parse(JSON.stringify(TM_DEF[t]))); if(pos==="end") c.blocks.push(nb); else c.blocks.splice(+pos,0,nb); save(); renderSessao(); return; }
  if(b.hasAttribute("data-tmwadd")&&tmrEd){ const c=tmCfg(tmrEd.mode); c.works=(c.works||[]).concat([{n:"",s:30}]); save(); renderSessao(); return; }
  if(b.dataset.tmwdel!=null&&tmrEd){ const c=tmCfg(tmrEd.mode); (c.works||[]).splice(+b.dataset.tmwdel,1); save(); renderSessao(); return; }
  if(b.hasAttribute("data-tmmore")){ const c=tmCfg(tmrEd.mode); c.more=c.more||[]; const base=JSON.parse(JSON.stringify(TM_DEF[tmrEd.mode])); base.rb=0; base.reps=1; base.rrest=60; c.more.push(base); save(); renderSessao(); return; }
  if(b.dataset.tmmdel!=null){ const c=tmCfg(tmrEd.mode); (c.more||[]).splice(+b.dataset.tmmdel,1); save(); renderSessao(); return; }
  if(b.dataset.tmdel!=null){ const c=tmCfg("mix"); c.blocks.splice(+b.dataset.tmdel,1); save(); renderSessao(); return; }
  if(b.dataset.tmmv){ const [i,dv]=b.dataset.tmmv.split("|").map(Number); const c=tmCfg("mix"); const j=i+dv; if(c.blocks[j]){ [c.blocks[i],c.blocks[j]]=[c.blocks[j],c.blocks[i]]; save(); renderSessao(); } return; }
  if(b.hasAttribute("data-tmgo")&&tmrEd&&tmrEd.mode==="crono"){ tmStart("crono",sid); return; }
  if(b.hasAttribute("data-tmgo")){ const mode=tmrEd.mode; const d=dayOf(w.id,sid,S.day,true); const W=wodOf(d);
    const TP={amrap:"AMRAP",fortime:"For Time",emom:"EMOM",tabata:"Tabata",mix:"Circuito"}; if(!W.tipo) W.tipo=TP[mode]||"Outro"; if(!String(W.desc||"").trim()||W._auto){ W.desc=tmSummary(mode); W._auto=1; }
    if(!num(d.cardio.t)) d.cardio.t=String(Math.max(1,Math.round(tmTotal(mode)/60))); save(); renderSessao(); tmStart(mode,sid); markStart(sid); autoPres(sid); return; }
  if(b.hasAttribute("data-ltrundo")){ const k=w.id+"|"+sid+"|"+S.day, o=LTR_UNDO[k]; if(o){ S.days[w.id][sid][S.day]=o; delete LTR_UNDO[k]; save(); renderSessao(); toast("Exercícios anteriores de volta"); } return; }
  if(b.hasAttribute("data-ltrundox")){ delete LTR_UNDO[w.id+"|"+sid+"|"+S.day]; renderSessao(); return; }
  if(b.hasAttribute("data-mvopen")){ mvOpen= mvOpen===sid? null : sid; mvWk=null; renderSessao(); return; }
  if(b.dataset.mvwk){ const wk=S.weeks.find(x=>x.id===(mvWk||w.id)); const i=S.weeks.indexOf(wk)+(+b.dataset.mvwk); if(S.weeks[i]) mvWk=S.weeks[i].id; renderSessao(); return; }
  if(b.dataset.mvto){ const to=b.dataset.mvto, twk=mvWk||w.id; const all=document.getElementById("mv-all"); const ids=[sid,...(all&&all.checked? sesMembers().filter(o=>o.id!==sid).map(o=>o.id) : [])];
    let sw=false; ids.forEach(id=>{ const W1=S.days[w.id]=S.days[w.id]||{}, P1=W1[id]=W1[id]||{}; const W2=S.days[twk]=S.days[twk]||{}, P2=W2[id]=W2[id]||{};
      const a=P1[S.day], c=P2[to]; if(c&&dayHasData(normDay(c))) sw=true; if(c) P1[S.day]=c; else delete P1[S.day]; if(a){ delete a.presOk; P2[to]=a; } else delete P2[to]; });
    const twkO=S.weeks.find(x=>x.id===twk); mvOpen=null; mvWk=null; S.week=twk; S.day=to; save(); renderAll();
    toast(`${sw?"Treinos trocados":"Treino movido"} para ${DAY_N[to]} ${ddmm(addDays(twkO.start,DAYS.indexOf(to)))}`); return; }
  if(b.hasAttribute("data-sesadd")){ sesAddOpen=!sesAddOpen; renderSessao(); return; }
  if(b.dataset.xslot){ const sl=xSlots(S.day).find(x=>x.id===b.dataset.xslot); if(sl){ S.slot=sl.id; if(!sl.ids.includes(S.active)) S.active=sl.ids[0]; save(); renderAll(); } return; }
  if(b.hasAttribute("data-xedonly")){ sesEdit= sesEdit===b.dataset.sesed? null : b.dataset.sesed; renderSessao(); return; }
  if(b.dataset.sesrm){ sesDel=b.dataset.sesrm; renderSessao(); return; }
  if(b.hasAttribute("data-sesrmno")){ sesDel=null; renderSessao(); return; }
  if(b.dataset.sesrmok){ const k=dateOfDay(S.day); PRES.rmAula(k,b.dataset.sesrmok); sesDel=null; if(sesEdit===b.dataset.sesrmok) sesEdit=null; toast("Aula apagada da Sessão e da Presença"); setTimeout(renderSessao,50); return; }
  if(b.dataset.sesedok){ const k=dateOfDay(S.day), id=b.dataset.sesedok, nk=document.getElementById("se-k").value||k, h=document.getElementById("se-h").value, t0=document.getElementById("se-tp").value;
    PRES.updAula(k,id,{k:nk,hora:h,tipo:t0==="pac"?"extra":t0}); sesEdit=null; toast(nk!==k?`Aula movida para ${ddmm(nk)}`:"Aula atualizada"); setTimeout(renderSessao,50); return; }
  if(b.hasAttribute("data-sesaddok")){ const pid=document.getElementById("sa-al").value; if(!pid){ toast("Escolha o aluno"); return; }
    let m=byPid(pid); if(!m){ const a=PRES.aluno(pid); if(!a) return; const pl={id:nid(),sessions:[]}; S.plans.push(pl); m={id:nid(),name:a.nome,pid,phase:1,novo:true,coreExtra:false,planId:pl.id,ov:{},log:[]}; S.students.push(m); }
    const sid=m.id, k=document.getElementById("sa-k").value||dateOfDay(S.day), tp0=document.getElementById("sa-tp").value, tp=tp0==="pac"?"extra":tp0, h=document.getElementById("sa-h").value||"07:00";
    const dupK=m.pid+k; if(PRES.agenda(k).some(i=>i.a.id===m.pid&&i.tipo!=="fixo")&&sesDup!==dupK){ sesDup=dupK; toast(`${first(m.name)} já tem aula lançada em ${ddmm(k)}. Toque de novo se for mesmo outra aula.`); return; }
    sesDup=null; PRES.addAula(m.pid,k,h,tp); sesAddOpen=false; S.slot=null; if(k===dateOfDay(S.day)) S.active=sid; save();
    if(k!==dateOfDay(S.day)){ toast(`${tp0==="pac"?"Aula do pacote":XT_LBL[tp]} de ${first(m.name)} marcada para ${ddmm(k)} às ${h}`); renderAll(); return; }
    toast(`${tp0==="pac"?"Aula do pacote":XT_LBL[tp]} de ${first(m.name)} ${tp==="adi"?"lançado":"lançada"} · conta na Presença`); renderAll(); return; }
  if(b.dataset.unit){ if(b.dataset.sesed!=null){ sesEdit= (S.active===b.dataset.unit&&sesEdit===b.dataset.sesed)? null : b.dataset.sesed; } S.active=b.dataset.unit; save(); renderAll(); return; }
  if(b.dataset.sesed!=null){ sesEdit=b.dataset.sesed||null; renderSessao(); return; }
  if(b.dataset.slot){ const sl=slotsMerged(S.day).find(x=>x.id===b.dataset.slot); if(sl&&sl.ids.length){ const fz=rpfSlot(sl); if(fz){ rpfOpen(fz); return; } S.slot=sl.id; S.active=sl.ids[0]; save(); renderAll(); } return; }
  if(b.hasAttribute("data-gopres")){ show("presenca"); return; }
  if(b.hasAttribute("data-gocad")){ show("cadastro"); return; }
  if(b.hasAttribute("data-ownnew")){ const o=ownSt(true); S.active=o.id; S.slot=null; save(); renderAll(); toast("Seu treino: lance como o de um aluno. Não entra na Presença nem no Financeiro."); return; }
  if(b.hasAttribute("data-gedit")){ gradeEdit=!gradeEdit; if(!S.grade) S.grade={}; renderSessao(); return; }
  if(b.hasAttribute("data-gnew")){ (S.grade[S.day]=S.grade[S.day]||[]).push({id:nid(),t:"12:00",ids:[]}); save(); renderSessao(); return; }
  const gs=b.closest("[data-gslot]"); if(gs){ const L=S.grade[S.day]||[]; const sl=L.find(x=>x.id===gs.dataset.gslot); if(!sl) return;
    if(b.dataset.gdel){ sl.ids=sl.ids.filter(x=>x!==b.dataset.gdel); }
    if(b.hasAttribute("data-gslotdel")){ S.grade[S.day]=L.filter(x=>x!==sl); }
    save(); renderSessao(); return; }
  if(b.dataset.dy&&b.closest(".tdays")){ S.day=b.dataset.dy; armAct=null; S.slot=null; save(); rer(); return; }
  if(b.dataset.dy){ const same=S.day===b.dataset.dy&&ltrEdit===S.active; S.day=b.dataset.dy; armAct=null; ltrEdit= same? null : S.active; rer(); setTimeout(()=>{ const x=document.querySelector(".col.active .ltrbox"); if(x) x.scrollIntoView({block:"nearest",behavior:"smooth"}); },60); return; }
  if(b.hasAttribute("data-report")){ if(m) S.active=m.id; repKind=b.dataset.report||"day"; repOpen=true; renderReport(); document.body.style.overflow="hidden"; return; }
  if(b.dataset.mode){ sesMode=b.dataset.mode; renderSessao(); window.scrollTo(0,0); return; }
  if(b.hasAttribute("data-colsel")){ S.active=sid; save(); renderAll(); return; }
  if(!m) return;
  const arm=k=>{ if(armAct&&armAct.k===k&&armAct.sid===sid){ armAct=null; return true; } armAct={k,sid}; renderSessao(); return false; };
  if(b.hasAttribute("data-cz2")){ const d=dayOf(w.id,sid,S.day,true); d.cardio.n=cardioN(d.cardio)+1; save(); renderSessao(); return; }
  if(b.dataset.czrm){ const d=dayOf(w.id,sid,S.day,true), C=d.cardio, k=+b.dataset.czrm, N=cardioN(C);
    for(let j=k;j<N;j++) CZF.forEach(f=>{ const v=C[f+(j+1)]; if(v==null) delete C[f+j]; else C[f+j]=v; }); CZF.forEach(f=>delete C[f+N]); C.n=N-1; save(); renderSessao(); return; }
  if(b.hasAttribute("data-ltrx")){ LTR_HIDE[sid+"|"+S.week+"|"+S.day]=1; ltrEdit=null; renderSessao(); return; }
  if(b.hasAttribute("data-ltredit")){ ltrEdit= ltrEdit===sid? null : sid; renderSessao(); return; }
  if(b.dataset.ltrdel){ S.brand=Object.assign({},S.brand||{},{ltrMine:ltrMine().filter(x=>x!==b.dataset.ltrdel)}); save(); renderSessao(); toast("Tirado da lista. Os treinos já feitos continuam salvos."); return; }
  if(b.dataset.ltrby){ const pr=pgMat(m); if(b.dataset.ltrby==="dia") pr.by="dia"; else delete pr.by; save(); renderSessao(); toast(b.dataset.ltrby==="dia"? `${first(m.name)}: treino repetido por dia da semana` : `${first(m.name)}: treino repetido por letra`); return; }
  if(b.dataset.ltrnew){ ltrEdit=null; const X=b.dataset.ltrnew; const W=S.days[w.id]=S.days[w.id]||{}, P=W[sid]=W[sid]||{}; const d0=P[S.day]; if(d0&&dayHasData(d0)) LTR_UNDO[w.id+"|"+sid+"|"+S.day]=JSON.parse(JSON.stringify(d0));
    const c=emptyDay(); c.ltr=X; c.ltrNew=1; P[S.day]=c; save(); renderSessao(); toast(`${first(m.name)}: Treino ${X} novo, em branco. O Treino ${X} antigo continua no Histórico.`); return; }
  if(b.dataset.setltr){ ltrEdit=null; const d=dayOf(w.id,sid,S.day,true); const cur=ltrOf(sid,w.id,S.day,d); if(cur===b.dataset.setltr){ renderSessao(); return; } d.ltr= b.dataset.setltr; if(d.ltr===progLtr(sid,S.day)&&!dayHasData(d)) delete d.ltr; const r=fillByLtr(sid,w.id,S.day,true); { const u=LTR_UNDO[w.id+"|"+sid+"|"+S.day]; if(u&&cur) u.ltr=cur; } save(); renderSessao(); toast(r? `${first(m.name)}: Treino ${b.dataset.setltr} · exercícios de ${ddmm(r.date)} carregados` : `${first(m.name)}: Treino ${b.dataset.setltr} · exercícios zerados (primeiro Treino ${b.dataset.setltr})`); return; }
  if(b.dataset.setph!=null){ if(+b.dataset.setph===m.phase) return; m.phase=+b.dataset.setph; save(); renderAll(); toast(`${first(m.name)}: ${phT(m)} · ${phaseOf(m).n}`); return; }
  if(b.hasAttribute("data-done")){ const d=dayOf(w.id,sid,S.day); if(!d) return; SES_DONE_TS=Date.now(); d.done=1; if(d.ini&&sesDateOf()===isoD(new Date())) d.fim=hmNow(); delete REST[sid]; save(); renderSessao(); renderTurnbar(); toast(`Treino de ${first(m.name)} concluído 💪 Envie o relatório quando quiser.`); return; }
  if(b.hasAttribute("data-seszero")){ const d=dayOf(w.id,sid,S.day,true); delete d.ini; delete d.iniTs; delete d.fim; d.pz=1; save(); renderSessao(); toast("Tempo zerado. Toque em ▶ Iniciar treino para contar de novo."); return; }
  if(b.hasAttribute("data-sesini")){ const d=dayOf(w.id,sid,S.day,true); delete d.pz; if(!d.ini){ d.ini=hmNow(); d.iniTs=Date.now(); } delete d.done; delete d.fim; save(); try{ autoPres(sid); }catch(_){} renderSessao(); toast(`Treino de ${first(m.name)} iniciado às ${d.ini}`); return; }
  if(b.hasAttribute("data-reopen")){ const d=dayOf(w.id,sid,S.day); if(d){ delete d.done; delete d.fim; } save(); renderSessao(); return; }
  if((b.hasAttribute("data-sendboth")||b.hasAttribute("data-sendimg")||b.hasAttribute("data-sendwa")||b.hasAttribute("data-senddir"))&&Date.now()-SES_DONE_TS<1500) return;
  if(b.hasAttribute("data-senddir")){ S.active=sid; repKind="day"; repOpen=true; renderReport(); document.body.style.overflow="hidden"; sendDirect(); return; }
  if(b.hasAttribute("data-sendboth")){ S.active=sid; repKind="day"; repOpen=true; renderReport(); document.body.style.overflow="hidden"; sendBoth(); return; }
  if(b.hasAttribute("data-sendimg")){ S.active=sid; repKind="day"; repOpen=true; renderReport(); document.body.style.overflow="hidden"; setTimeout(reportImage,60); return; }
  if(b.hasAttribute("data-sendwa")){ S.active=sid; repKind="day"; waOpen(m, reportText(m)); return; }
  if(b.hasAttribute("data-tgsave")){ const box=b.closest(".metas"); if(box){ box.querySelectorAll("input[data-tg]").forEach(i=>{ if(i.type==="checkbox"||i.disabled) return; const v=parseInt(i.value,10); const ps=i.dataset.tg.split("."); if(!m.tgCustom){ const wasR=usesPh(m); m.tg=clean(tg(m)); m.tg.useR=wasR; m.tg.useE=wasR; m.tgCustom=1; } const g=tg(m);
      if(ps[0]==="ex"){ g.ex=g.ex||{}; const cur=(g.ex[ps[1]]||(ps[1]==="Core"?[1,3]:EXM.slice())).slice(); if(!isNaN(v)) cur[+ps[2]]=Math.max(0,v); g.ex[ps[1]]=cur; } else if(ps[0]==="sz"){ if(!isNaN(v)) szOf(g)[ps[1]][ps[2]][+ps[3]]=Math.max(0,v); } else if(ps[0]==="cardioDia") g.cardioDia=Math.max(0,v||0); else if(ps.length===1) g.cardio=Math.max(0,v||0); else if(!isNaN(v)) g[ps[0]][ps[1]][+ps[2]]=Math.max(0,v); }); }
    metasOpen=null; ctlOv=null; save(); rer(); toast(`Metas de ${first(m.name)} salvas`); return; }
  if(b.hasAttribute("data-tgcopy")){ const others=[...new Set([...sesMembers(),...membersOf(m)])].filter(o=>o!==m); others.forEach(o=>{ if(m.tgCustom){ o.tg=clean(tg(m)); o.tgCustom=1; } else { delete o.tgCustom; } }); save(); rer(); toast(`Metas copiadas para ${others.map(o=>first(o.name)).join(" e ")}`); return; }
  if(b.hasAttribute("data-tgreset")){ delete m.tgCustom; rer(); toast("Metas da "+phT(m).toLowerCase()); return; }
  if(b.hasAttribute("data-metas")){ const on=!(ctlOv&&ctlOv.sid===sid&&ctlOv.k==="met"); ctlOv= on? {sid,k:"met"} : null; metasOpen= on? sid : null; renderSessao(); return; }
  if(b.dataset.ctlov){ ctlOv= b.dataset.ctlov==="x"||(ctlOv&&ctlOv.sid===sid&&ctlOv.k===b.dataset.ctlov)? null : {sid,k:b.dataset.ctlov}; if(!ctlOv) metasOpen=null; renderSessao(); return; }
  if(b.dataset.ctlv){ S.ui=S.ui||{}; S.ui.ctlV=b.dataset.ctlv; save(); renderSessao(); return; }
  if(b.dataset.ctlz){ S.ui=S.ui||{}; const Z=[0.8,0.9,1,1.12,1.25]; let i=Z.indexOf(ctlZoom()); if(i<0) i=2; i=Math.max(0,Math.min(Z.length-1,i+(+b.dataset.ctlz))); S.ui.ctlZ=Z[i]; save(); renderSessao(); return; }
  if(b.dataset.semmode){ semV.mode=b.dataset.semmode; renderSessao(); return; }
  if(b.hasAttribute("data-pull")){ const d=dayOf(w.id,sid,S.day); if(dayHasData(d) && !arm("pull")) return; pullPlan(m); rer(); toast("Treino planejado carregado. Coloque as cargas."); return; }
  if(b.dataset.copyfrom){ copyDay(b.dataset.copyfrom,sid); rer(); toast("Treino copiado com as cargas. Ajuste o que mudar."); return; }
  if(b.hasAttribute("data-copyone")){ copyOne= copyOne===sid? null : sid; renderSessao(); return; }
  if(b.hasAttribute("data-repcardio")){ const src=prevCardio(sid,w.id,S.day);
    if(!src){ toast("Não achei cardio na semana passada."); return; } const d=dayOf(w.id,sid,S.day,true); d.cardio=Object.assign(JSON.parse(JSON.stringify(src.d.cardio)),{pse:""}); delete d.cp; d.cdOk=1; if(src.d.wod) d.wod=JSON.parse(JSON.stringify(src.d.wod)); save(); rer(); try{ markStart(sid); autoPres(sid); }catch(_){} toast(`Cardio de ${ddmm(src.date)} repetido: ${src.d.cardio.tipo||"cardio"} ${src.d.cardio.t||""} min`); return; }
  if(b.hasAttribute("data-copycardio")){ const d0=dayOf(w.id,sid,S.day); if(!d0||!(d0.cardio&&(d0.cardio.tipo||d0.cardio.t||d0.cardio.z))){ toast("Preencha o cardio antes de copiar."); return; } const others=sesMembers().filter(o=>o!==m); others.forEach(o=>{ const dd=dayOf(w.id,o.id,S.day,true); dd.cardio=Object.assign({},clean(d0.cardio),{pse:""}); }); save(); rer(); toast(`Cardio copiado para ${others.map(o=>first(o.name)).join(" e ")} (a PSE fica para cada um)`); return; }
  if(b.hasAttribute("data-copyrow")){ const d0=dayOf(w.id,sid,S.day); const r0=d0&&d0.rows.find(x=>x.id===b.dataset.copyrow); if(!r0) return; if(!r0.n1.trim()){ toast("Escreva o exercício primeiro"); return; } const others=sesMembers().filter(o=>o!==m); others.forEach(o=>copyRow(sid,r0,o.id)); rer(); toast(`${r0.n1.trim()} copiado para ${others.map(o=>first(o.name)).join(" e ")}`); return; }
  if(b.hasAttribute("data-copyto")){ if(!dayHasData(dayOf(w.id,sid,S.day))){ toast(`Lance o treino de ${first(m.name)} primeiro`); return; } const others=sesMembers().filter(o=>o!==m); const filled=others.some(o=>dayHasData(dayOf(w.id,o.id,S.day))); if(filled && !arm("copyto")) return; others.forEach(o=>copyDay(sid,o.id)); rer(); toast("Copiado com as cargas. Ajuste o que mudar."); return; }
  if(b.hasAttribute("data-clear")){ if(!arm("clear")) return; const P=(S.days[w.id]||{})[sid]; if(P) delete P[S.day]; rer(); return; }
  if(b.hasAttribute("data-tecpop")){ tecPop= tecPop===sid? null : sid; renderSessao(); return; }
  if(b.dataset.repask){ repAskDo(sid,b.dataset.repask); renderSessao(); return; }
  if(b.hasAttribute("data-tecmode")){ TEC_MODE=!TEC_MODE; if(!TEC_MODE) tecPick=null; renderSessao(); return; }
  if(b.hasAttribute("data-sug")){ const rw=b.dataset.sugrow||null; if(sugOpen===sid&&(!rw||SUG_ROW===rw)){ sugOpen=null; SUG_ROW=null; } else { sugOpen=sid; SUG_ROW=rw; } renderSessao(); return; }
  if(b.dataset.sugex){ const d=dayOf(w.id,sid,S.day,true); let row=null; const sr=SUG_ROW&&d.rows.find(r=>r.id===SUG_ROW); if(sr){ if(!sr.n1.trim()&&!subUsed(sr.a)) row=sr; sugOpen=null; SUG_ROW=null; } if(!row) row=d.rows.find(r=>!r.n1.trim()&&!subUsed(r.a)&&!subUsed(r.b)); if(!row){ row=newRow(); d.rows.push(row); }
    row.n1=b.dataset.sugex; const df=phaseDefaults(m); if(row.a.s==="") row.a.s=df.s; if(row.a.r==="") row.a.r=df.r; rer(); markStart(sid); autoPres(sid); toast(`${b.dataset.sugex} incluído. Coloque a carga.`); return; }
  if(b.hasAttribute("data-addiso")){ const d=dayOf(w.id,sid,S.day,true); const r=newRow(); r.iso=true; r.a.isoM="so"; const ix=d.rows.findIndex(x=>!x.n1.trim()&&!subUsed(x.a)); if(ix>=0) d.rows[ix]=Object.assign(r,{id:d.rows[ix].id}); else d.rows.push(r); save(); rer(); return; }
  if(b.hasAttribute("data-insrow")){ const d=dayOf(w.id,sid,S.day,true); const i=d.rows.findIndex(x=>x.id===b.dataset.after); if(i<0) return; const nr=newRow(); d.rows.splice(i+1,0,nr); rer(); setTimeout(()=>{ const t=document.getElementById("n1-"+nr.id); if(t) t.focus(); },50); toast("Exercício inserido abaixo. Toque em Conj para conjugar."); return; }
  if(b.hasAttribute("data-addrow")){ const d=dayOf(w.id,sid,S.day,true); d.rows.push(newRow()); rer(); return; }
  const rowEl=b.closest("[data-row]"); if(!rowEl) return;
  const d=dayOf(w.id,sid,S.day,true); const row=d.rows.find(x=>x.id===rowEl.dataset.row); if(!row) return;
  if(b.hasAttribute("data-rowrep")&&b.dataset.rowrep){ let v={}; try{ v=JSON.parse(b.dataset.rowrep); }catch(_){} if((!row.n1.trim()||v.all)&&v.n) row.n1=v.n; if(v.all){ if(v.tec) row.tec=v.tec; else delete row.tec; if(!(v.sub&&v.sub.length)) delete row.sub; if(v.cj!=null) row.cj=!!v.cj; } if(v.a) row.a=Object.assign(sub(),JSON.parse(JSON.stringify(v.a))); else ["s","r","c","sec"].forEach(k=>{ if(v[k]!=null&&v[k]!=="") row.a[k]=v[k]; }); if(v.sub&&v.sub.length) row.sub=JSON.parse(JSON.stringify(v.sub)); delete row.cp; delete d.cp; save(); rer(); markStart(sid); autoPres(sid); toast(`${row.n1.trim()||"Exercício"}: igual à semana passada`); return; }
  if(b.hasAttribute("data-rowrep")){ delete row.cp; delete d.cp; save(); rer(); markStart(sid); autoPres(sid); toast(`${row.n1.trim()||"Exercício"}: repetido igual, já conta no gráfico`); return; }
  if(b.hasAttribute("data-rowdel")){ rowDelAsk(sid,w.id,row.id); return; }
  if(b.dataset.cpyopen){ CPY_ROW= CPY_ROW===row.id? null : row.id; renderSessao(); return; }
  if(b.dataset.cpyto){ if(!row.n1.trim()){ toast("Escreva o exercício primeiro"); return; } const to=stById(b.dataset.cpyto); copyRow(sid,row,b.dataset.cpyto); CPY_ROW=null; rer(); toast(`${row.n1.trim()} copiado para ${to?first(to.name):"o aluno"}`); return; }
  if(b.dataset.cyc){ cycPick={id:row.id,w:b.dataset.cyc}; renderSessao(); return; }
  if(b.dataset.pkreg){ if(cycPick&&cycPick.w==="b") row.regB=b.dataset.pkreg; else row.reg=b.dataset.pkreg; cycPick=null; rer(); return; }
  if(b.dataset.setreg){ const det=regionOfName(row.n1); const v=b.dataset.setreg; row.reg= v===det? null : v; save(); refreshNumbers(sid); return; }
  if(b.dataset.sugok){ const v=JSON.parse(b.dataset.sugok); row.a.s=String(v.s); row.a.r=String(v.r); if(v.c!=="") row.a.c=String(v.c); rer(); markStart(sid); autoPres(sid); return; }
  if(b.hasAttribute("data-isot")){ if(row.iso){ delete row.iso; delete row.a.sec; delete row.a.isoM; } else { row.iso=true; row.a.isoM= row.n1.trim()&&num(row.a.r)? "fim":"so"; row.a.isoS=""; if(row.a.isoM==="so") row.a.r=""; } save(); rer(); return; }
  if(b.hasAttribute("data-mic")){ vozStart(row); return; }
  if(b.hasAttribute("data-cjjoin")){ row.cj=true; delete row.cjx; CJ_ASK=null; const nx=d.rows[d.rows.indexOf(row)+1]; rer(); toast(`Conjugado com ${nx&&nx.n1.trim()?nx.n1.trim():"o exercício de baixo"}`); return; }
  if(b.hasAttribute("data-cjx")){ CJ_ASK=null; rer(); return; }
  if(b.hasAttribute("data-cjt")&&!row.cj&&!b.hasAttribute("data-cjnew")){ const nx=d.rows[d.rows.indexOf(row)+1]; if(nx&&(nx.n1.trim()||subUsed(nx.a))){ CJ_ASK= CJ_ASK===row.id? null : row.id; rer(); return; } }
  if(b.hasAttribute("data-cjnew")) CJ_ASK=null;
  if(b.hasAttribute("data-cjt")||b.hasAttribute("data-cjadd")){ const i=d.rows.indexOf(row);
    if(row.cj&&b.hasAttribute("data-cjt")){ row.cj=false; const nx=d.rows[i+1]; if(nx&&!nx.n1.trim()&&!subUsed(nx.a)){ const keep=nx.cj; d.rows.splice(i+1,1); if(keep) row.cj=false; } rer(); toast("Conjugado desfeito"); return; }
    const nr=newRow(); if(row.cj){ nr.cj=true; } row.cj=true; d.rows.splice(i+1,0,nr); rer(); setTimeout(()=>{ const t=document.getElementById("n1-"+nr.id); if(t) t.focus(); },60); toast("Escreva o exercício conjugado na linha de baixo"); return; }
  if(b.hasAttribute("data-cjrm")){ const i=d.rows.indexOf(row); const pr=d.rows[i-1];
    if(row.n1.trim()||subUsed(row.a)){ if(pr) pr.cj=false; rer(); toast("Separado do conjugado. Para juntar de novo, toque em Conj no exercício de cima."); return; }
    if(pr) pr.cj=!!row.cj; d.rows.splice(i,1); rer(); toast("Linha vazia do conjugado removida"); return; }
  if(b.dataset.techelp){ const x=tecByName(b.dataset.techelp); let o=document.getElementById("tecHelp"); if(!o){ o=document.createElement("div"); o.id="tecHelp"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",ev=>{ if(ev.target===o||ev.target.closest("[data-thx]")) o.hidden=true; }); }
    o.innerHTML=x? `<div class="sheet"><div class="sheet-head"><h3>${esc(x.t)}</h3><button class="btn small" data-thx>Fechar</button></div><div class="tec"><p><span>Como:</span> ${x.howG||x.how}</p><p><span>Exemplo:</span> ${x.ex}</p><p><span>Quando:</span> ${x.whenG||x.when}</p><p><span>Ciência:</span> ${x.sci}</p></div></div>` : `<div class="sheet"><p>Sem explicação para este método.</p><button class="btn small" data-thx>Fechar</button></div>`; o.hidden=false; return; }
  if(b.hasAttribute("data-tecb")){ tecPick= tecPick===row.id? null : row.id; regPick=null; renderSessao(); return; }
  if(b.dataset.tecset!==undefined){ const msg=tecApply(row,b.dataset.tecset); tecPick=null; tecNew=null; save(); rer(); toast(msg); return; }
  if(b.hasAttribute("data-tecnew")){ tecNew= tecNew===row.id? null : row.id; renderSessao(); setTimeout(()=>{ const x=document.getElementById("tn-n"); if(x) x.focus(); },50); return; }
  if(b.hasAttribute("data-tecnewx")){ tecNew=null; renderSessao(); return; }
  if(b.hasAttribute("data-tecnewok")){ const g=id=>String((document.getElementById(id)||{}).value||"").trim(); const n=g("tn-n"), r=g("tn-r").replace(/\D/g,""), dd=g("tn-d").replace(/\D/g,"");
    if(!n){ toast("Dê um nome ao método"); return; } if(TEC_PICK.includes(n)){ toast("Esse nome já existe na lista"); return; }
    S.tecMine=tecMine().filter(x=>x.n!==n).concat([{n,r,d:dd}]).sort((a,b2)=>a.n.localeCompare(b2.n,"pt-BR"));
    const msg=tecApply(row,n); tecPick=null; tecNew=null; save(); rer(); toast("Método salvo: "+msg); return; }
  if(b.dataset.tecdel){ const n=b.dataset.tecdel; S.tecMine=tecMine().filter(x=>x.n!==n); save(); renderSessao(); toast(n+" apagado da lista (os treinos já lançados ficam como estão)"); return; }
  if(b.hasAttribute("data-addl")){ row.sub=subsOf(row).slice(); const last=row.sub[row.sub.length-1]||row.a; row.sub.push({s:"1",r:last.r||"",c:last.c||""}); if(row.sub.length===1&&num(row.a.s)>1&&!row.tec) row.a.s=String(num(row.a.s)-1); save(); rer(); toast("Linha adicionada: ajuste séries, repetições e carga dela."); return; }
  if(b.dataset.dell!==undefined){ const j=+b.dataset.dell; row.sub=subsOf(row).filter((_,k)=>k!==j); if(!row.sub.length) delete row.sub; save(); rer(); toast("Linha apagada"); return; }
  if(b.dataset.falha){ const k=b.dataset.falha; const x= k==="a"? row.a : (subsOf(row)[+k.split(".")[1]]); if(x){ if(x.f) delete x.f; else x.f=1; save(); rer(); toast(x.f?"Até a falha":"Falha tirada"); } return; }
  if(b.hasAttribute("data-unil")&&row.iso&&(row.a.isoM||"so")==="so"){ row.uni=!isUni(row); save(); rer(); toast(row.uni?`Unilateral: ${num(row.a.sec)?row.a.sec+'"':"isometria"} de cada lado.`:"Isometria bilateral."); return; }
  if(b.hasAttribute("data-unil")){ const on=!isUni(row); const r0=num(row.a.r);
    if(r0){ if(on&&r0%2===0&&r0>=2) row.a.r=String(r0/2); else if(!on) row.a.r=String(r0*2); }
    row.uni=on; save(); rer(); toast(on?`Unilateral: ${row.a.r||"?"}/${row.a.r||"?"} (cada lado). As séries contam uma vez.`:`Bilateral: ${row.a.r||""} repetições no total.`); return; }
  if(b.hasAttribute("data-reg")){ regPick= regPick===row.id? null : row.id; renderSessao(); return; }
  if(b.dataset.regset){ const [R,sz]=b.dataset.regset.split("|"); const det=regionOfName(row.n1); row.reg= R===det? null : R; const k0=mainMuscle(row.n1); const autoSz= k0&&MUSCLES[k0].r===R? MUSCLES[k0].c : null;
    if(sz&&sz!==autoSz) row.sz=sz; else delete row.sz; if(R==="Core") delete row.sz; regPick=null; save(); renderSessao(); return; }
}
function sesInput(e){
  const t=e.target;
  const gs=t.closest("[data-gslot]"); if(gs){ if(e.type!=="change") return; const sl=(S.grade[S.day]||[]).find(x=>x.id===gs.dataset.gslot); if(!sl) return;
    if(t.hasAttribute("data-gtime")) sl.t=t.value||sl.t; if(t.hasAttribute("data-gadd")&&t.value&&sl.ids.length<3) sl.ids.push(t.value); save(); renderSessao(); return; } const colEl=t.closest("[data-col]"); if(!colEl) return; const sid=colEl.dataset.col; const m=S.students.find(x=>x.id===sid);
  const w=S.weeks.find(x=>x.id===S.week);
  if(t.dataset.tg){ if(!m.tgCustom){ const wasR=usesPh(m); m.tg=clean(tg(m)); m.tg.useR=wasR; m.tg.useE=wasR; m.tgCustom=1; } const g=tg(m); const v=Math.max(0,parseInt(t.value,10)||0); const ps=t.dataset.tg.split(".");
    if(ps[0]==="useR"){ g.useR=t.checked; save(); renderSessao(); return; }
    if(ps[0]==="useZ"){ g.useZ=t.checked; szOf(g); save(); renderSessao(); return; }
    if(ps[0]==="sz"){ szOf(g)[ps[1]][ps[2]][+ps[3]]=v; save(); refreshNumbers(sid); return; }
    if(ps[0]==="useE"){ g.useE=t.checked; if(t.checked&&!g.ex) g.ex={}; save(); renderSessao(); return; }
    if(ps[0]==="ex"){ g.ex=g.ex||{}; const cur=(g.ex[ps[1]]||(ps[1]==="Core"?[1,3]:EXM.slice())).slice(); cur[+ps[2]]=v; g.ex[ps[1]]=cur; save(); refreshNumbers(sid); return; }
    if(ps[0]==="cardioDia"){ g.cardioDia=v||0; save(); refreshNumbers(sid); return; }
    if(ps.length===1) g.cardio=v; else g[ps[0]][ps[1]][+ps[2]]=v; save(); refreshNumbers(sid); return; }
  if(t.dataset.cf){ const d=dayOf(w.id,sid,S.day,true); d.cardio[t.dataset.cf]=t.value; save(); refreshNumbers(sid); return; }
  if(t.dataset.wf){ const d=dayOf(w.id,sid,S.day,true); wodOf(d)[t.dataset.wf]=t.value; save(); refreshNumbers(sid); return; }
  if(t.hasAttribute("data-ltrtxt")){ if(e.type!=="change") return; ltrEdit=null; const d=dayOf(w.id,sid,S.day,true); const v=t.value.trim().slice(0,14); if(v){ d.ltr=v; ltrAddMine(v); } else delete d.ltr; save(); renderSessao(); if(v) toast(`Treino ${v} salvo: da próxima vez é só tocar no botão`); return; }
  const rowEl=t.closest("[data-row]"); if(!rowEl) return;
  const d=dayOf(w.id,sid,S.day,true); const row=d.rows.find(x=>x.id===rowEl.dataset.row); if(!row) return;
  if(t.hasAttribute("data-conj")){ if(e.type!=="change") return; row.conj=t.checked; 
    if(row.conj && row.n1.trim()){ const df=phaseDefaults(m); if(row.b.s==="") row.b.s=df.s; if(row.b.r==="") row.b.r=df.r; ["s","r"].forEach(f=>{ const i=document.getElementById(`x-${row.id}-b${f}`); if(i) i.value=row.b[f]; }); }
    if(!row.conj) delete row.regB; save(); renderSessao(); return; }
  if(t.dataset.pick){ if(e.type!=="change"||!t.value) return; const nk=t.dataset.pick; const inp=document.getElementById(nk+"-"+row.id); if(inp) inp.value=t.value; t.value="";
    row[nk]=inp?inp.value:row[nk]; const df=phaseDefaults(m); const x= nk==="n1"? row.a : row.b; const w2= nk==="n1"?"a":"b";
    if(x.s===""){ x.s=df.s; } if(x.r===""){ x.r=df.r; } ["s","r"].forEach(f=>{ const i=document.getElementById(`x-${row.id}-${w2}${f}`); if(i) i.value=x[f]; });
    save(); refreshNumbers(sid); return; }
  if(t.dataset.n){ row[t.dataset.n]=t.value;
    if(e.type==="change" && t.value.trim() && t.dataset.n==="n1" && row.conj && t.value.includes("+")){ const df=phaseDefaults(m); let ch=false; if(row.b.s===""){row.b.s=df.s;ch=true;} if(row.b.r===""){row.b.r=df.r;ch=true;} if(ch) ["s","r"].forEach(f=>{ const i=document.getElementById(`x-${row.id}-b${f}`); if(i) i.value=row.b[f]; }); }
    if(e.type==="change" && t.value.trim()){ const df=phaseDefaults(m); const x= t.dataset.n==="n1"? row.a : row.b;
      if(t.dataset.n==="n1"||row.conj){ let changed=false; if(x.s===""){ x.s=df.s; changed=true; } if(x.r===""){ x.r=df.r; changed=true; }
        if(changed){ const w2= t.dataset.n==="n1"?"a":"b"; ["s","r"].forEach(f=>{ const i=document.getElementById(`x-${row.id}-${w2}${f}`); if(i) i.value=x[f]; }); } } }
    save(); refreshNumbers(sid);
    if(e.type==="change"&&t.dataset.n==="n1"){ const el=t.closest("[data-row]"); if(false) setTimeout(()=>{ const fid=document.activeElement&&document.activeElement.id; renderSessao(); if(fid){ const x=document.getElementById(fid); if(x) x.focus(); } },0); }
    return; }
  if(t.hasAttribute("data-sec")){ if(e.type!=="change") return; const v=String(t.value).replace(/\D/g,""); row.a.sec= v&&+v>0? String(+v) : ""; save(); renderSessao(); return; }
  if(t.hasAttribute("data-isos")){ row.a.isoS=t.value; save(); return; }
  if(t.hasAttribute("data-isom")){ if(e.type!=="change") return; row.a.isoM=t.value; if(t.value==="so") row.a.r=""; save(); renderSessao(); return; }
  if(t.dataset.x){ const P=t.dataset.x.split("."); let v=t.value; if(P[P.length-1]==="r"&&v.includes("/")) v=v.split("/")[0].trim();
    if(P[0]==="sub"){ const x=subsOf(row)[+P[1]]; if(x) x[P[2]]=v; } else row[P[0]][P[1]]=v; save(); refreshNumbers(sid); }
}
const hmNow=()=>{ const n=new Date(); return String(n.getHours()).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0"); };
function sesDateOf(){ const w=S.weeks.find(x=>x.id===S.week); return w? addDays(w.start,DAYS.indexOf(S.day)) : ""; }
function markStart(sid){
  const w=S.weeks.find(x=>x.id===S.week); if(!w) return; const d=dayOf(w.id,sid,S.day); if(!d||!dayHasData(d)) return; if(freezeLtr(sid,w.id,S.day)) save();
  if(!d.ini && !d.done && !d.pz && sesDateOf()===isoD(new Date())){ d.ini=hmNow(); d.iniTs=Date.now(); save(); const m=S.students.find(x=>x.id===sid); if(m) toast(`Treino de ${first(m.name)} iniciado às ${d.ini}`); }
  const el=document.getElementById("sb-"+sid); const m=S.students.find(x=>x.id===sid); if(el&&m) el.innerHTML=sbarInner(m); const el2=document.getElementById("sbl-"+sid); if(el2&&m) el2.innerHTML=sesLBar(m);
}
function sesT0(d){ if(!d||!d.ini) return 0; if(d.iniTs) return d.iniTs; const [h,mi]=d.ini.split(":").map(Number); const x=new Date(); x.setHours(h,mi,0,0); return x.getTime(); }
const fmtClk=ms=>{ const s=Math.max(0,Math.floor(ms/1000)), h=Math.floor(s/3600), m=Math.floor(s%3600/60), ss=s%60; return (h?h+":"+String(m).padStart(2,"0"):String(m))+":"+String(ss).padStart(2,"0"); };
setInterval(()=>{ document.querySelectorAll(".sbclock[data-t0]").forEach(e=>{ e.textContent=fmtClk(Date.now()-(+e.dataset.t0)); }); },1000);
let SES_DONE_TS=0;
function sbarInner(m){
  const w=S.weeks.find(x=>x.id===S.week); const d=w&&dayOf(w.id,m.id,S.day); const nm=esc(first(m.name));
  const hoje=sesDateOf()===isoD(new Date());
  const envB=dayHasData(d||{})&&!m.own? `<button class="btn small sbsend" data-sendboth>📲 Enviar relatório para ${nm}</button>` : "";
  if(d&&d.pz&&!d.done&&!d.ini) return `<span class="sb-t muted">⏸ Tempo zerado</span><span class="sbclock num">0:00</span><button class="btn primary sbgo" data-sesini>▶ Iniciar treino</button>${dayHasData(d)?`<button class="btn primary sbstop" data-done>■ Terminar treino</button>`:""}${envB}`;
  if(!d||(!dayHasData(d)&&!d.ini)) return `<span class="sb-t muted">O treino começa sozinho quando você lançar o primeiro exercício, ou toque em iniciar.</span><button class="btn primary sbgo" data-sesini>▶ Iniciar treino</button>`;
  if(d.done) return `<span class="sb-t ok">✔ Treino concluído${sesTimes(d)?` · ${sesTimes(d)}`:""}</span>
    ${m.own?"":`<button class="btn small primary sbsend" data-sendboth>📲 Enviar relatório para ${nm} (imagem + texto)</button>
    <button class="btn small" data-sendwa>Só texto</button>`}
    <button class="btn small" data-report="day">Ver relatório</button><button class="btn small" data-report="week">Relatório da semana</button><button class="btn small ghost" data-reopen>Reabrir</button>`;
  const t0=sesT0(d); if(!d.ini) return `<span class="sb-t muted">Treino lançado, tempo não iniciado.</span><button class="btn primary sbgo" data-sesini>▶ Iniciar treino</button><button class="btn primary sbstop" data-done>■ Terminar treino</button>${envB}`;
  return `<span class="sb-t run">▶ Em andamento${d.ini?` desde ${d.ini}`:""}</span>${t0&&hoje?`<span class="sbclock num" data-t0="${t0}">${fmtClk(Date.now()-t0)}</span>`:""}<button class="btn small sbzero" data-seszero title="Zerar e esperar você iniciar de novo">↺ Zerar tempo</button><button class="btn primary sbstop" data-done>■ Terminar treino</button>${envB}`;
}
function autoPres(sid){
  if(!presOn()) return; const m=S.students.find(x=>x.id===sid); if(!m||!m.pid) return;
  const w=S.weeks.find(x=>x.id===S.week); if(!w) return; const d=dayOf(w.id,sid,S.day); if(!d||d.presOk||!dayHasData(d)) return;
  const k=addDays(w.start,DAYS.indexOf(S.day)); if(k>isoD(new Date())) return;
  const r=PRES.markPresent(m.pid,k); d.presOk=1; save();
  if(r==="ok") toast(`Presença de ${first(m.name)} marcada ✓`);
  else if(r==="noslot") toast(`${first(m.name)} não tem horário neste dia. Use “+ Aluno fora da grade” no topo para contar a aula.`);
  else if(r==="off") toast(`Dia marcado como sem aula na Presença.`);
}
document.getElementById("view-sessao").addEventListener("change",()=>{ setTimeout(()=>{ try{ if(mirSync()) save(); }catch(_){} },0); });
["input","change"].forEach(ev=>document.getElementById("view-sessao").addEventListener(ev,e=>{ if(e.target.closest(".ltrbox,.seswk,.ldrule,.repask,[data-box=semana],[data-box=controle]")) return; const c=e.target.closest("[data-col]"); if(c){ const dd=dayOf(S.week,c.dataset.col,S.day); if(dd&&dd.cp) delete dd.cp; const re=e.target.closest("[data-row]"); if(dd&&re&&!e.target.closest("[data-rowrep]")){ const rr=dd.rows.find(x=>x.id===re.dataset.row); if(rr&&rr.cp&&e.target.matches("input,textarea,select")){ delete rr.cp; re.classList.remove("xr-cp"); const rb=re.querySelector("[data-rowrep]"); if(rb) rb.remove(); } } if(dd&&dd.ltr==null){ const pl=progLtr(c.dataset.col,S.day); if(pl) dd.ltr=pl; } } if(c) setTimeout(()=>{ markStart(c.dataset.col); autoPres(c.dataset.col); },0); }));
document.getElementById("view-sessao").addEventListener("click",e=>{ if(e.target.classList&&e.target.classList.contains("ctlov")){ ctlOv=null; metasOpen=null; renderSessao(); } },true);
document.getElementById("view-sessao").addEventListener("click",sesClick);
document.getElementById("view-sessao").addEventListener("change",e=>{ const t=e.target;
  if(t.hasAttribute("data-semf")||t.hasAttribute("data-semt")||t.hasAttribute("data-cmpa")||t.hasAttribute("data-cmpb")){ if(t.hasAttribute("data-semf")) semV.from=t.value; if(t.hasAttribute("data-semt")) semV.to=t.value; if(t.hasAttribute("data-cmpa")) semV.a=t.value; if(t.hasAttribute("data-cmpb")) semV.b=t.value; renderSessao(); return; }
  if(tmrEd&&t.hasAttribute("data-tmprot")){ tmCfg(tmrEd.mode).prot=t.value; save(); return; }
  if(tmrEd&&t.dataset.tmm!=null){ const c=tmCfg(tmrEd.mode); const bb=(c.more||[])[+t.dataset.tmm]; if(bb){ bb[t.dataset.k]=tmN(t.value); save(); renderSessao(); } return; }
  if(tmrEd&&t.dataset.tmwn!=null){ const c=tmCfg(tmrEd.mode), i=+t.dataset.tmwn; if(i<0) c.wn=t.value.trim(); else if(c.works&&c.works[i]) c.works[i].n=t.value.trim(); save(); renderSessao(); return; }
  if(tmrEd&&t.dataset.tmws!=null){ const c=tmCfg(tmrEd.mode), i=+t.dataset.tmws; if(c.works&&c.works[i]) c.works[i].s=tmN(t.value); save(); renderSessao(); return; }
  if(tmrEd&&t.hasAttribute("data-tmname")){ if(e.type!=="change") return; const c=tmCfg(tmrEd.mode); c.n=String(t.value).trim()||"Meu cronômetro"; save(); renderSessao(); return; }
  if(tmrEd&&(t.dataset.tmk||t.dataset.tmb!=null||t.dataset.tmbt!=null||t.hasAttribute("data-tmprep"))){ const c=tmCfg(tmrEd.mode);
    if(t.hasAttribute("data-tmprep")) S.tmr.prep=tmN(t.value);
    else if(t.dataset.tmk) c[t.dataset.tmk]=tmN(t.value);
    else if(t.dataset.tmbt!=null){ const i=+t.dataset.tmbt, nt=t.value; c.blocks[i]= nt==="rest"? {t:"rest",sec:60} : Object.assign({t:nt},JSON.parse(JSON.stringify(TM_DEF[nt]))); }
    else { c.blocks[+t.dataset.tmb][t.dataset.k]=tmN(t.value); }
    save(); renderSessao(); return; }
  if(t.id==="sa-jt"){ if(t.value){ const h=document.getElementById("sa-h"); if(h) h.value=t.value; } return; } if(t.id!=="sa-al"&&t.id!=="sa-tp") return;
  if(false){}
  const al=document.getElementById("sa-al"), tp=document.getElementById("sa-tp"), hp=document.getElementById("sa-help"); const o=al.selectedOptions[0];
  if(t.id==="sa-al"&&o&&o.value){ const k=o.dataset.tp, sd=+o.dataset.sd; tp.value= k==="pacote"? "pac" : k==="avulsa"? "extra" : sd>0? "rep" : "adi"; }
  const k=o&&o.dataset.tp, v=tp.value;
  hp.textContent= v==="rep"? "Repõe uma falta: abate 1 do saldo de reposição. Não cobra a mais." : v==="adi"? "Adianta uma aula: fica 1 aula de crédito. Depois, na falta do dia fixo, escolha “Repor” e o saldo zera." : v==="pac"&&k!=="pacote"? "Este aluno não é de pacote: vai contar como aula extra." : k==="pacote"? "Conta como 1 aula do pacote." : k==="avulsa"? "Aula avulsa: entra na cobrança do mês." : "Aula a mais: conta como presença, não mexe no saldo de reposição.";
});
document.addEventListener("click",e=>{ const b=e.target.closest("#weektabs [data-wtab], .wkrow [data-wtab]"); if(!b) return; if(b.dataset.wtab==="cfg"){ WKCFG_OPEN=!WKCFG_OPEN; renderTurnbar(); return; } if(b.dataset.wtab==="new"){ newWeekNow(); renderAll(); window.scrollTo(0,0); return; } S.week=b.dataset.wtab; armAct=null; save(); renderSessao(); });
document.getElementById("turnbar").addEventListener("click",e=>{
  const r=e.target.closest("[data-rest]"); if(r){ const id=r.dataset.rest; const m=S.students.find(x=>x.id===id);
    try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(err){}
    if(REST[id]){ delete REST[id]; delete FIRED[id]; } else { REST[id]=Date.now()+restSec(m)*1000; delete FIRED[id]; keepAwake(); autoPres(id); rwXset(false); scAuto(); }
    renderTurnbar(); rwRender(); return; }
  const sd=e.target.closest("[data-setdur]"); if(sd){ const m=S.students.find(x=>x.id===durOpen); if(m){ m.rest=+sd.dataset.setdur; save(); } durOpen=null; renderTurnbar(); return; }
  const d=e.target.closest("[data-rdur]"); if(d){ durOpen= durOpen===d.dataset.rdur? null : d.dataset.rdur; renderTurnbar(); return; }
  const b=e.target.closest("[data-turn]"); if(!b||b.dataset.turn===S.active) return; const y=window.scrollY; S.active=b.dataset.turn; save(); renderAll(); window.scrollTo(0,y); });
document.getElementById("view-sessao").addEventListener("input",sesInput);
document.getElementById("view-sessao").addEventListener("change",sesInput);

function seedSessions(){
  S.weeks=[]; S.days={}; const cur=mondayOf(new Date());
  const w1={id:nid(),n:1,start:addDays(cur,-7)}, w2={id:nid(),n:2,start:cur}; S.weeks.push(w1,w2); S.week=w2.id; S.day="Seg";
  const loads={agach:40,legpress:90,extensora:30,hipthrust:60,flexsent:25,supincl:16,supreto:30,elevlat:6,puxada:35,remadab:35,pallof:10};
  S.students.filter(s=>membersOf(s).length>1).forEach(m=>{
    const k=/Marina/.test(m.name)?0.7:1;
    [[w1,0.95],[w2,1]].forEach(([w,f])=>["Seg","Ter"].forEach(dy=>{
      const d=dayOf(w.id,m.id,dy,true); d.rows=[];
      viewOf(m).filter(x=>x.se.day===dy).forEach(({rows})=>rows.filter(r=>!r.skip).forEach(r=>{ const e=exById(r.ex); const row=newRow(); row.n1=e.n; row.a=sub(r.sets,r.reps,Math.round((loads[r.ex]||10)*k*f)); d.rows.push(row); }));
      if(dy==="Seg" && d.rows.length>=4){ const A1=d.rows[2], B1=d.rows[3]; A1.conj=true; A1.n2=B1.n1; A1.b=B1.a; d.rows.splice(3,1); d.cardio={t:20,z:2,tipo:"Esteira",pse:4}; }
      while(d.rows.length<START_ROWS) d.rows.push(newRow());
    }));
  });
}


/* ---------- Corpo: peso e composição corporal ---------- */
const AV_F=[["peso","Peso","kg"],["pg","Gordura","%"],["gord","Peso da gordura","kg"],["pmm","Massa magra","%"],["mus","Músculo","kg"],["vis","Gordura visceral",""]];
const AV_GOOD={peso:0,pg:-1,gord:-1,mm:1,pmm:1,mus:1,vis:-1};
const AV_EXP={
 peso:"É o total: músculo, gordura, água e ossos. Sozinho não mostra se você melhorou.",
 pg:"Quanto do seu peso é gordura. É o número que mais mostra o resultado do treino junto com a alimentação.",
 gord:"Quantos quilos de gordura você carrega. É esse número que a gente quer ver caindo.",
 pmm:"Tudo no seu corpo que não é gordura: músculos, ossos, água e órgãos. Quanto maior, melhor.",
 mus:"O motor do corpo. Mais músculo é mais força, mais disposição e mais energia gasta até parado.",
 vis:"A gordura que fica por dentro da barriga, em volta dos órgãos. Quanto menor, melhor para a saúde."};
function visTag(v){ v=num(v); if(!v) return ""; return v<=9? "saudável" : v<=14? "atenção" : "alta"; }
function imcOf(m,peso){ const a=num(m.alt)/100, p=num(peso||m.peso); return a>0.5&&p? Math.round(p/(a*a)*10)/10 : 0; }
const n1=v=> (Math.round(v*10)/10).toLocaleString("pt-BR");
function avList(m){ return (m.av||[]).slice().sort((a,b)=>a.date<b.date?-1:1); }
function avFill(a){ const o={...a}; const p=num(o.peso), pg=num(o.pg);
  if(p&&pg){ if(!num(o.gord)) o.gord=Math.round(p*pg/10)/10; if(!num(o.mm)) o.mm=Math.round((p-p*pg/100)*10)/10; }
  else if(p&&num(o.gord)&&!pg){ o.pg=Math.round(num(o.gord)/p*1000)/10; if(!num(o.mm)) o.mm=Math.round((p-num(o.gord))*10)/10; }
  if(!num(o.pmm)&&num(o.pg)) o.pmm=Math.round((100-num(o.pg))*10)/10;
  return o; }
function avDelta(k,cur,prev){ const a=num(cur[k]), b=num(prev&&prev[k]); if(!a||!b) return null; const d=Math.round((a-b)*10)/10; if(!d) return {d,cls:"eq",txt:"="};
  const good=AV_GOOD[k]; const cls= good===0? "eq" : (d*good>0? "good":"meh"); return {d,cls,txt:(d>0?"+":"−")+n1(Math.abs(d))}; }
let avArm=null;
/* Métricas extras da bioimpedância (opcionais) */
const BIO_F=[["imc","IMC",""],["mme","Massa muscular esquelética","%"],["regmm","Registro de massa muscular","%"],["mm2","Peso da massa muscular","kg"],["agua","Água","%"],["aguakg","Peso da água","kg"],["ossos","Ossos","kg"],["tmb","Metabolismo","kcal"],["prot","Proteína","%"],["obes","Obesidade","%"],["idmet","Idade metabólica","anos"],["lbm","Massa magra (LBM)","kg"],["idade","Idade real","anos"],["alt","Altura","cm"]];
let bioOpen=false, bioView=false, perOpen=false;
/* Perímetros (fita métrica). Figuras próprias: silhueta simples com a faixa medida em destaque. */
const PSH={
 torso:"M18 3V8Q18 13 11 14Q5 15.5 5 23V45M30 3V8Q30 13 37 14Q43 15.5 43 23V45M12 25Q13.5 35 12 45M36 25Q34.5 35 36 45",
 waist:"M14 3Q21 15 17 24Q12 34 11 45M34 3Q27 15 31 24Q36 34 37 45M24 22V26",
 arm:"M3 41H25Q40 41 41.5 30Q42.5 22 38.5 14M3 29H8Q12 15 23 20Q27 22 29.5 19L30 14M30 14Q25.5 8.5 29.5 5Q34 1.5 39.5 5Q43 8.5 38.5 14M32.5 8.5Q35 9.5 36.5 7.5M14 27Q18 30 23 28",
 thigh:"M8 3Q5 24 11 45M40 3Q43 24 37 45M16 15Q24 9 32 15M21 17Q22.5 31 22 45M27 17Q25.5 31 26 45",
 calf:"M4 6H33Q42 7 40.5 17L38 40Q38 45 32 45M4 15H21Q31 16 31.5 25Q31.5 32 28.5 38L28.5 44",
 hip:"M13 3Q6 17 9.5 30Q11.5 40 13 45M35 3Q42 17 38.5 30Q36.5 40 35 45M12 34Q18 41 24 34Q30 41 36 34M24 21V34"};
const PER_F=[["p_pesc","Pescoço","torso",[16,2,16,8]],["p_omb","Ombro","torso",[3,11,42,10]],["p_peito","Peito","torso",[10,25,28,8]],["p_cint","Cintura","waist",[8,19,32,9]],
 ["p_bracoE","Braço (esquerdo)","arm",[5,24,10,18]],["p_bracoD","Braço (direito)","arm",[5,24,10,18],1],["p_antE","Antebraço (esquerdo)","arm",[27,17,17,9]],["p_antD","Antebraço (direito)","arm",[27,17,17,9],1],
 ["p_abs","Abdômen superior","waist",[8,6,32,9]],["p_abi","Abdômen inferior","waist",[8,31,32,9]],["p_coxaE","Coxa (esquerda)","thigh",[4,27,20,8]],["p_coxaD","Coxa (direita)","thigh",[24,27,20,8]],
 ["p_pantE","Panturrilha (esquerda)","calf",[25,23,19,9]],["p_pantD","Panturrilha (direita)","calf",[25,23,19,9],1],["p_quad","Quadril","hip",[5,12,38,22]]];
let picN=0;
function perIcon(sh,b,fl){ const [x,y,w,h]=b, id="pic"+(++picN), d=PSH[sh];
  return `<svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true" class="pico"><defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs><g ${fl?'transform="translate(48 0) scale(-1 1)"':""} fill="none" stroke-linecap="round" stroke-linejoin="round">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#C9A46A" opacity=".3" clip-path="url(#${id})" style="clip-path:none"/>
  <path d="${d}" stroke="currentColor" stroke-width="2.6"/><path d="${d}" stroke="#B07D2B" stroke-width="3.4" clip-path="url(#${id})"/></g></svg>`; }

/* Dobras cutâneas: protocolos com fórmula (densidade → % gordura por Siri) e opção livre (só soma). */
const DC_S=[["tri","Tríceps"],["bic","Bíceps"],["subesc","Subescapular"],["peit","Peitoral"],["axm","Axilar média"],["supra","Suprailíaca"],["abd","Abdominal"],["coxa","Coxa"],["pant","Panturrilha medial"]];
const DC_P={jp3:{n:"Jackson & Pollock · 3 dobras",s:{M:["peit","abd","coxa"],F:["tri","supra","coxa"]}},
 jp7:{n:"Jackson & Pollock · 7 dobras",s:["peit","axm","tri","subesc","abd","supra","coxa"]},
 gue:{n:"Guedes · 3 dobras",s:{M:["tri","supra","abd"],F:["coxa","supra","subesc"]}},
 dw:{n:"Durnin & Womersley · 4 dobras",s:["bic","tri","subesc","supra"]},
 livre:{n:"Livre · escolho as dobras (só soma)",s:DC_S.map(x=>x[0])}};
function dcSites(p,sx){ const s=(DC_P[p]||DC_P.livre).s; return Array.isArray(s)? s : (s[sx]||[...new Set([...s.F,...s.M])]); }
function dcCalc(p,sx,id,v){ const ks=dcSites(p,sx), vals=ks.map(k=>num(v[k])).filter(Boolean); const S=Math.round(vals.reduce((a,b)=>a+b,0)*10)/10;
  if(!vals.length) return {S:0}; if(p==="livre"||!sx||vals.length<ks.length) return {S,why:p==="livre"?"":(!sx?"Informe o sexo para calcular o % de gordura.":"Preencha todas as dobras do protocolo para calcular o % de gordura.")};
  const L=Math.log10(S); let D=null;
  if(p==="jp7"){ if(!id) return {S,why:"Informe a idade para calcular."}; D= sx==="M"? 1.112-0.00043499*S+0.00000055*S*S-0.00028826*id : 1.097-0.00046971*S+0.00000056*S*S-0.00012828*id; }
  if(p==="jp3"){ if(!id) return {S,why:"Informe a idade para calcular."}; D= sx==="M"? 1.10938-0.0008267*S+0.0000016*S*S-0.0002574*id : 1.0994921-0.0009929*S+0.0000023*S*S-0.0001392*id; }
  if(p==="gue") D= sx==="M"? 1.17136-0.06706*L : 1.16650-0.07063*L;
  if(p==="dw"){ if(!id) return {S,why:"Informe a idade para calcular."}; const T= sx==="M"? [[19,1.1620,.0630],[29,1.1631,.0632],[39,1.1422,.0544],[49,1.1620,.0700],[999,1.1715,.0779]] : [[19,1.1549,.0678],[29,1.1599,.0717],[39,1.1423,.0632],[49,1.1333,.0612],[999,1.1339,.0645]];
    const r=T.find(t=>id<=t[0]); D=r[1]-r[2]*L; }
  if(!D) return {S}; return {S, pg:Math.round((495/D-450)*10)/10}; }
let formTab=null, avDraft={};
/* Classificação: só onde há referência reconhecida. lo = abaixo, ok = adequado, mid = atenção, hi = alto/risco */
function clsOf(k,v,m,a){ if(k==="pgd") k="pg"; v=num(v); if(!v) return null; const sx=(m&&m.sexo)||""; const r=(t,c)=>({t,c});
  if(k==="imc") return v<18.5?r("Abaixo","lo"):v<25?r("Adequado","ok"):v<30?r("Sobrepeso","mid"):r("Obesidade","hi");
  if(k==="vis") return v<=9?r("Saudável","ok"):v<=14?r("Atenção","mid"):r("Alto","hi");
  if(k==="pg"){ if(!sx) return r("Informe o sexo","na"); return sx==="F"? (v<14?r("Muito baixo","lo"):v<21?r("Excelente","ok"):v<25?r("Bom","ok"):v<32?r("Médio","mid"):r("Alto","hi")) : (v<6?r("Muito baixo","lo"):v<14?r("Excelente","ok"):v<18?r("Bom","ok"):v<25?r("Médio","mid"):r("Alto","hi")); }
  if(k==="agua"){ if(!sx) return r("Informe o sexo","na"); const [lo,hi]=sx==="F"?[45,60]:[50,65]; return v<lo?r("Abaixo","lo"):v<=hi?r("Adequado","ok"):r("Acima","mid"); }
  if(k==="p_cint"){ if(!sx) return r("Informe o sexo","na"); const [a1,a2]=sx==="F"?[80,88]:[94,102]; return v<a1?r("Adequado","ok"):v<a2?r("Risco aumentado","mid"):r("Risco alto","hi"); }
  if(k==="rcq"){ if(!sx) return r("Informe o sexo","na"); return v<(sx==="F"?0.85:0.90)?r("Adequado","ok"):r("Risco aumentado","hi"); }
  if(k==="idmet"){ const id=num(a&&a.idade); if(!id) return null; return v<=id?r("Igual ou abaixo da idade","ok"):r("Acima da idade","mid"); }
  return null; }
const BIO_EXP={
 pg:"Quanto do peso é gordura. É o principal número para acompanhar o resultado do treino junto com a alimentação. A faixa ideal muda entre homens e mulheres.",
 gord:"Quantos quilos de gordura o corpo carrega. É o número que a gente quer ver caindo.",
 vis:"Gordura que fica por dentro da barriga, em volta dos órgãos. Quanto menor, melhor para a saúde. Até 9 é considerado saudável pela maioria das balanças.",
 imc:"Peso dividido pela altura ao quadrado. Serve como triagem, mas não separa músculo de gordura: quem tem muito músculo pode dar \"sobrepeso\" sem ter excesso de gordura. Abaixo de 18,5 abaixo; 18,5 a 24,9 adequado; 25 a 29,9 sobrepeso; 30 ou mais obesidade.",
 mme:"Quanto do peso é músculo esquelético, o músculo que a gente treina. Subir esse número é sinal de que o treino está construindo músculo.",
 regmm:"Percentual de massa muscular calculado pela balança. Cada aparelho calcula de um jeito: compare sempre na mesma balança.",
 mm2:"Quilos de massa muscular (inclui músculos que não são treinados diretamente). Acompanhe a tendência, não o número isolado.",
 agua:"Quanto do corpo é água. Muda com hidratação, horário e o que a pessoa comeu: pese sempre nas mesmas condições. Faixa usual: mulheres 45 a 60%, homens 50 a 65%.",
 aguakg:"Quilos de água no corpo. Variações de um dia para o outro costumam ser hidratação, não gordura.",
 ossos:"Estimativa do peso dos ossos feita pela balança. Muda muito pouco: não é um número para acompanhar mês a mês.",
 tmb:"Calorias que o corpo gasta em repouso, só para funcionar. Quanto mais músculo, maior tende a ser. É uma estimativa da balança.",
 prot:"Estimativa de proteína no corpo feita pela balança, ligada à quantidade de músculo. Não tem faixa de referência científica única: use para comparar com a própria pessoa.",
 obes:"Índice que a balança calcula comparando o peso com um peso \"ideal\" dela. Cada fabricante usa uma fórmula: prefira olhar o percentual de gordura.",
 idmet:"Número criado pela balança comparando o metabolismo com o de pessoas de várias idades. Não é uma medida científica padronizada, mas ajuda a motivar: abaixo da idade real é bom sinal.",
 lbm:"Massa magra: tudo que não é gordura (músculo, ossos, órgãos e água). Subir ou manter enquanto a gordura cai é o cenário ideal.",
 idade:"Idade real do aluno, usada para comparar com a idade metabólica.",
 alt:"Altura em centímetros, usada no IMC.",
 p_cint:"Medida no ponto mais estreito do tronco, entre a última costela e o umbigo. É um dos melhores indicadores de gordura abdominal e risco para a saúde. Referência: mulheres risco aumentado a partir de 80 cm e alto a partir de 88 cm; homens 94 e 102 cm.",
 rcq:"Relação cintura/quadril: cintura dividida pelo quadril. Mostra como a gordura está distribuída. Risco aumentado a partir de 0,85 nas mulheres e 0,90 nos homens.",
 pgd:"Percentual de gordura calculado pelas dobras cutâneas, com a fórmula do protocolo escolhido. Só compare com avaliações feitas no mesmo protocolo. A faixa ideal muda entre homens e mulheres.",
 dc_sum:"Soma das dobras do protocolo, em milímetros. É o número mais confiável das dobras, porque não depende de fórmula: se a soma cai, a gordura sob a pele caiu. Só compare somas do mesmo protocolo.",
 dc:"Espessura da dobra de pele e gordura nesse ponto, em milímetros, medida com adipômetro. Caindo, é sinal de menos gordura naquela região.",
 per:"Medida com fita métrica, sempre no mesmo ponto, com a fita firme mas sem apertar. Em quem treina, braço e coxa subindo enquanto cintura e abdômen descem é o retrato do resultado."};
let corpoPanel=null, bmOpen=null;
function histOf(L,k){ return L.filter(a=>num(a[k])).map(a=>({date:a.date,v:num(a[k])})); }
function metricRows(m,L,list,unitOf){
  return list.map(([k,lab,u,ic])=>{ const h=histOf(L,k); if(!h.length) return ""; const cur=h[h.length-1], pv=h[h.length-2]; const lastA=L.filter(a=>num(a[k])).slice(-1)[0];
    const c=clsOf(k,cur.v,m,lastA); const d=pv? Math.round((cur.v-pv.v)*100)/100 : 0; const op=bmOpen===k;
    return `<div class="bm ${op?"on":""}"><button class="bm-h" data-bm="${k}" aria-expanded="${op}">${ic||""}<span class="bm-l">${lab}</span><span class="bm-v"><b class="num">${k==="rcq"?cur.v.toFixed(2).replace(".",","):n1(cur.v)}${u==="%"?"%":u?` <small>${u}</small>`:""}</b>${c?`<em class="cl-${c.c}">${c.t}</em>`:""}${d?`<small class="bm-d">${d>0?"+":"−"}${k==="rcq"?Math.abs(d).toFixed(2).replace(".",","):n1(Math.abs(d))} vs ${ddmm(pv.date)}</small>`:""}</span></button>
      ${op?`<div class="bm-x"><p>${BIO_EXP[k]||(k.startsWith("d_")?BIO_EXP.dc:BIO_EXP.per)}</p>${h.length>1?lineSVG(h,u):`<p class="muted" style="font-size:12px">O gráfico aparece a partir da 2ª medida.</p>`}</div>`:""}</div>`; }).join(""); }
function rcqHist(L){ return L.filter(a=>num(a.p_cint)&&num(a.p_quad)).map(a=>({...a,rcq:Math.round(num(a.p_cint)/num(a.p_quad)*100)/100})); }
const AVI={
 bio:`<rect x="4" y="4" width="24" height="24" rx="5"/><rect x="11" y="7.5" width="10" height="5" rx="1.5"/><path d="M14 10h4" stroke-width="1.4"/><ellipse cx="11.5" cy="20" rx="2.8" ry="4.2"/><ellipse cx="20.5" cy="20" rx="2.8" ry="4.2"/>`,
 per:`<circle cx="12" cy="13" r="9"/><circle cx="12" cy="13" r="2.6"/><path d="M12 22H30V17H20.3"/><path d="M23 22v-2.2M26 22v-2.8M29 22v-2.2" stroke-width="1.4"/>`,
 dc:`<circle cx="5.5" cy="27" r="2.5"/><path d="M6.8 24.7L12.5 3H18.5V5.8"/><path d="M7.8 28.6L22.5 15.5L24.3 5.2Q24.6 3.4 22.8 3.4H21.8"/><path d="M11.6 9.6Q24 10.5 29.5 22.5"/><path d="M15.5 10.3l-.3 1.7M19.5 11.2l-.5 1.6M23.2 13l-.8 1.4M26.4 16l-1 1.1" stroke-width="1.3"/>`};
function aviSvg(k){ return `<svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${AVI[k]}</svg>`; }
const AVB={bio:{i:"📋",t:"Bioimpedância",s:"dados da balança",x:"<b>Bioimpedância</b> é a balança que passa uma corrente elétrica fraquinha pelo corpo e estima gordura, músculo e água. É prática, mas sensível ao estado do corpo no dia."},
 per:{i:"📏",t:"Medidas",s:"fita métrica",x:"<b>Medidas (perímetros)</b> são as circunferências do corpo, medidas com fita métrica. Mostram onde o corpo está mudando: cintura descendo, braço e coxa subindo. Meça sempre no mesmo ponto, com a fita firme mas sem apertar."},
 dc:{i:"📐",t:"Dobras",s:"adipômetro",x:"<b>Dobras cutâneas</b> medem, com adipômetro, a espessura da pele com a gordura logo abaixo dela, em pontos fixos do corpo. Com a soma das dobras, o protocolo calcula o % de gordura. Use sempre o mesmo protocolo e o mesmo lado do corpo (normalmente o direito)."}};
const BIO_WARN="⏰ <b>Para o resultado ser confiável:</b> pese sempre no <b>mesmo horário</b> e nas mesmas condições: de preferência pela manhã, em jejum, depois de ir ao banheiro, sem ter treinado antes e sempre na mesma balança. Mudar o horário muda a água do corpo, e a balança confunde isso com gordura ou músculo.";
const DC_PX={jp3:"3 dobras, rápido. Mulheres: tríceps, suprailíaca e coxa. Homens: peitoral, abdominal e coxa. Usa idade e sexo.",
 jp7:"7 dobras, mais completo: peitoral, axilar média, tríceps, subescapular, abdominal, suprailíaca e coxa. Usa idade e sexo.",
 gue:"Protocolo brasileiro de 3 dobras. Mulheres: coxa, suprailíaca e subescapular. Homens: tríceps, suprailíaca e abdominal.",
 dw:"4 dobras: bíceps, tríceps, subescapular e suprailíaca. Usa idade e sexo. Bom para quem tem mais gordura, porque evita dobras difíceis de pinçar.",
 livre:"Você escolhe quais dobras medir e preenche só elas. Não calcula % de gordura: acompanha a soma e cada dobra ao longo do tempo, o que já mostra se a gordura está caindo."};
function dcResTxt(r){ return r.S? `<span>Soma: <b class="num">${n1(r.S)} mm</b></span>${r.pg?`<span>Gordura: <b class="num">${n1(r.pg)}%</b></span>`:""}${r.why?`<small>${r.why}</small>`:""}` : `<small>Preencha as dobras para ver a soma${"" }.</small>`; }
function avBtns(attr,cur,show){ const ks=Object.keys(AVB).filter(k=>show[k]); return `<div class="avbtns" style="grid-template-columns:repeat(${ks.length},1fr)">${ks.map(k=>`<button class="avbt ${cur===k?"on":""}" data-${attr}="${k}" aria-expanded="${cur===k}"><span class="avbt-i">${aviSvg(k)}</span><b>${AVB[k].t}</b><small>${AVB[k].s}</small></button>`).join("")}</div>`; }
function renderCorpo(){
  const m=A(); const L=avList(m).map(avFill); const last=L[L.length-1], prev=L[L.length-2], firstAv=L[0];
  const today=isoD(new Date()); const imc=imcOf(m, last&&num(last.peso)?last.peso:m.peso);
  const val=(a,k)=> num(a[k])? n1(num(a[k])) : "—";
  document.getElementById("view-corpo").innerHTML=`${helpBtn("corpo")}${slidesBox("corpo")}
  <div class="card"><span class="label">Composição corporal</span><h2>${esc(m.name)}</h2>
    ${impBtn("av","Importar avaliação (foto, PDF, Excel ou Word)")}
    <div class="row" style="align-items:end;gap:10px">
      <div class="field" style="width:110px"><label class="label" for="cp-alt">Altura (cm)</label><input class="inp" id="cp-alt" inputmode="numeric" value="${esc(m.alt||"")}" placeholder="ex.: 165"></div>
      <div class="field" style="width:96px"><label class="label" for="cp-sx">Sexo</label><select class="inp" id="cp-sx"><option value="">–</option><option value="F" ${m.sexo==="F"?"selected":""}>Feminino</option><option value="M" ${m.sexo==="M"?"selected":""}>Masculino</option></select></div>
      <div class="field" style="width:110px"><label class="label" for="cp-peso">Peso atual (kg)</label><input class="inp" id="cp-peso" inputmode="decimal" value="${esc(m.peso||"")}" placeholder="kg"></div>
      ${imc?`<div class="imcbox"><span>IMC</span><b class="num">${n1(imc)}</b></div>`:""}
    </div>
    ${imc>=30?`<p class="note" style="margin:0">IMC ${n1(imc)}: pode entrar na <b>linha para obesos</b>. Confirme pela cintura (mulheres ≥ 88 cm, homens ≥ 102 cm) e marque em Alunos.</p>`:""}
    <span class="muted" style="font-size:12px">O peso é usado no gasto calórico e muda sozinho quando você salva uma avaliação. O IMC fica só aqui, não vai para o aluno.</span></div>
  ${last? `<div class="card"><span class="label">Última avaliação · ${ddmm(last.date)}/${last.date.slice(2,4)}</span>
    <div class="avgrid">${AV_F.map(([k,lab,u])=>{ const dP=avDelta(k,last,prev), dF=L.length>2?avDelta(k,last,firstAv):null; return `<div class="avt"><span>${lab}</span><b class="num">${val(last,k)}<small>${u==="%"?"%":u?" "+u:""}</small></b>
      ${k==="vis"&&num(last.vis)?`<em class="${num(last.vis)<=9?"good":"meh"}">${visTag(last.vis)}</em>`:""}${k==="pg"&&clsOf("pg",last.pg,m)?`<em class="cl-${clsOf("pg",last.pg,m).c}">${clsOf("pg",last.pg,m).t}</em>`:""}
      ${dP?`<em class="${dP.cls}">${dP.txt} vs anterior</em>`:""}${dF?`<em class="${dF.cls}">${dF.txt} desde o início</em>`:""}</div>`; }).join("")}</div>
    ${(()=>{ const hasB=L.some(a=>BIO_F.some(([k])=>num(a[k]))||num(a.pg)||num(a.vis)), hasP=L.some(a=>PER_F.some(([k])=>num(a[k]))), hasD=L.some(a=>num(a.dc_sum)); if(!hasB&&!hasP&&!hasD) return "";
      const R=rcqHist(L), lastD=L.filter(a=>num(a.dc_sum)).slice(-1)[0], LD=lastD? L.filter(a=>a.dc_p===lastD.dc_p) : [];
      return `<span class="label" style="margin-top:10px;display:block">Relatório e comparação</span>${avBtns("cpanel",corpoPanel,{bio:hasB,per:hasP,dc:hasD})}
      ${corpoPanel?"":`<p class="muted" style="font-size:12px;margin:4px 0 0">Toque num botão para ver cada métrica com cor, evolução em gráfico e explicação.</p>`}
      ${corpoPanel==="bio"&&hasB?`<div class="bmlist"><p class="tipx">${AVB.bio.x}</p><p class="tipw">${BIO_WARN}</p><p class="muted" style="font-size:12px;margin:0">Toque em cada métrica para ver o que ela significa e a evolução. Cores só onde existe referência reconhecida.${m.sexo?"":" <b>Informe o sexo</b> lá em cima para classificar gordura e água."}</p>${metricRows(m,L,[["pg","Gordura","%"],["gord","Peso da gordura","kg"],["vis","Gordura visceral",""],...BIO_F])}</div>`:""}
      ${corpoPanel==="dc"&&hasD?`<div class="bmlist"><p class="tipx">${AVB.dc.x}</p><p class="muted" style="font-size:12px;margin:0">Protocolo da última avaliação: <b>${esc((DC_P[lastD.dc_p]||DC_P.livre).n)}</b>. Soma e % de gordura comparam só avaliações do mesmo protocolo.${m.sexo?"":" <b>Informe o sexo</b> para classificar."}</p>${metricRows(m,LD,[["pgd","Gordura pelas dobras","%"],["dc_sum","Soma das dobras","mm"]])}${metricRows(m,L,DC_S.map(([k,lab])=>["d_"+k,lab,"mm"]))}</div>`:""}
      ${corpoPanel==="per"&&hasP?`<div class="bmlist"><p class="tipx">${AVB.per.x}</p>${metricRows(m,L,PER_F.map(([k,lab,sh,b,fl])=>[k,lab,"cm",perIcon(sh,b,fl)]))}${R.length?metricRows(m,R,[["rcq","Relação cintura/quadril",""]]):""}</div>`:""}`; })()}</div>` : ""}
  <div class="card"><span class="label">Nova avaliação</span>
    <div class="scalebx"><button class="btn small" data-scale>⚖️ Ler peso da balança (teste)</button><div id="scaleBox" class="muted"></div></div>
    <div class="avform">
      <label>Data<input class="inp" type="date" id="av-date" value="${today}"></label>
      <label>Peso (kg)<input class="inp" inputmode="decimal" id="av-peso" placeholder="${esc(m.peso||"")}"></label>
      <label>Gordura (%)<input class="inp" inputmode="decimal" id="av-pg"></label>
      <label>Peso da gordura (kg)<input class="inp" inputmode="decimal" id="av-gord" placeholder="automático"></label>
      <label>Massa magra (%)<input class="inp" inputmode="decimal" id="av-pmm" placeholder="automático"></label>
      <label>Músculo esquelético (kg)<input class="inp" inputmode="decimal" id="av-mus" placeholder="ex.: 25,8"></label>
      <label>Gordura visceral (nível)<input class="inp" inputmode="decimal" id="av-vis" placeholder="ex.: 8"></label>
    </div>
    <p class="muted" style="font-size:12px">Na sua balança: <b>Gordura (%)</b>, <b>Peso da gordura (kg)</b>, <b>Peso da massa muscular esquelética (kg)</b> e <b>Gordura visceral</b>. Peso da gordura e massa magra (%) em branco são calculados pela gordura (%). Use sempre a mesma balança.</p>
    <span class="label" style="margin-top:6px;display:block">Avaliação completa (opcional)</span>
    ${avBtns("ftab",formTab,{bio:1,per:1,dc:1})}
    ${formTab?"":`<p class="muted" style="font-size:12px;margin:4px 0 0">Escolha o que você mede. Pode preencher mais de um: o que você digitar fica guardado ao trocar de botão.</p>`}
    ${formTab==="bio"?`<p class="tipx">${AVB.bio.x}</p><p class="tipw">${BIO_WARN}</p><div class="avform">${BIO_F.map(([k,lab,u])=>`<label>${lab}${u?` (${u})`:""}<input class="inp" inputmode="decimal" id="av-b-${k}" ${k==="alt"&&m.alt?`placeholder="${esc(m.alt)}"`:""}></label>`).join("")}</div>
      <p class="muted" style="font-size:12px;margin:0">Copie da sua balança só o que quiser acompanhar. Campo vazio não é salvo.</p>`:""}
    ${formTab==="per"?`<p class="tipx">${AVB.per.x}</p><div class="pergrid">${PER_F.map(([k,lab,sh,b,fl])=>`<label class="perc"><span>${lab}</span>${perIcon(sh,b,fl)}<input class="inp" inputmode="decimal" id="av-p-${k}" placeholder="cm"></label>`).join("")}</div>`:""}
    ${formTab==="dc"?(()=>{ const pr=avDraft["av-dc-p"]||(L.filter(a=>a.dc_p).slice(-1)[0]||{}).dc_p||"jp3", sx=m.sexo||"", ks=dcSites(pr,sx), idd=avDraft["av-dc-id"]||avDraft["av-b-idade"]||(L.filter(a=>num(a.idade)).slice(-1)[0]||{}).idade||"";
      const r=dcCalc(pr,sx,num(idd),Object.fromEntries(ks.map(k=>[k,avDraft["av-d-"+k]])));
      return `<p class="tipx">${AVB.dc.x}</p>
      <div class="avform"><label style="grid-column:1/-1">Protocolo<select class="inp" id="av-dc-p">${Object.entries(DC_P).map(([k,o])=>`<option value="${k}" ${k===pr?"selected":""}>${o.n}</option>`).join("")}</select></label>
      ${pr!=="livre"&&pr!=="gue"?`<label>Idade (anos)<input class="inp" inputmode="numeric" id="av-dc-id" value="${esc(idd)}"></label>`:""}
      ${ks.map(k=>`<label>${DC_S.find(x=>x[0]===k)[1]} (mm)<input class="inp" inputmode="decimal" id="av-d-${k}"></label>`).join("")}</div>
      ${!sx&&pr!=="livre"?`<p class="tipw">Informe o <b>sexo</b> lá em cima: as dobras e a fórmula mudam entre homens e mulheres.${DC_P[pr]&&!Array.isArray(DC_P[pr].s)?" Enquanto isso, aparecem todas as dobras dos dois.":""}</p>`:""}
      <p class="muted" style="font-size:12px;margin:0">${DC_PX[pr]}</p>
      <div class="dcres" id="dc-res">${dcResTxt(r)}</div>`; })():""}
    <button class="btn primary" id="av-save">Salvar avaliação</button></div>
  ${L.length? `<div class="card"><div class="phase-head"><span class="label">Histórico</span><button class="btn small primary" data-evo="">📈 Relatório de evolução</button></div>
    <p class="muted" style="font-size:12px;margin:0">Toque numa data para ver o relatório até aquela avaliação.</p>
    <div class="avtab"><div class="avr avh"><span>Data</span><span>Peso</span><span>%G</span><span>Gord.</span><span>%MM</span><span>Músc.</span><span>Visc.</span><span></span></div>
    ${L.slice().reverse().map(a=>`<div class="avr"><button class="avd" data-evo="${a.date}">${ddmm(a.date)}/${a.date.slice(2,4)}</button><span>${val(a,"peso")}</span><span>${val(a,"pg")}</span><span>${val(a,"gord")}</span><span>${val(a,"pmm")}</span><span>${val(a,"mus")}</span><span>${val(a,"vis")}</span><button class="icon-btn" data-avdel="${a.id}" aria-label="Apagar avaliação">${avArm===a.id?"?":"✕"}</button></div>`).join("")}</div>
    ${avArm?`<p class="muted" style="font-size:12px">Toque de novo no "?" para apagar.</p>`:""}</div>`:""}`;
  const v=document.getElementById("view-corpo");
  v.querySelector("#cp-peso").oninput=e=>{ m.peso=e.target.value.trim(); save(); };
  v.querySelector("#cp-peso").onchange=()=>renderCorpo();
  v.querySelector("#cp-alt").oninput=e=>{ m.alt=e.target.value.trim(); save(); };
  v.querySelector("#cp-alt").onchange=()=>renderCorpo();
  v.querySelector("#cp-sx").onchange=e=>{ m.sexo=e.target.value; save(); renderCorpo(); };
  const grab=()=>{ v.querySelectorAll('[id^="av-"]').forEach(i=>{ if(i.id!=="av-date") avDraft[i.id]=i.value; }); };
  const reopen=fn=>{ grab(); fn(); renderCorpo(); Object.entries(avDraft).forEach(([id,x])=>{ const i=document.getElementById(id); if(i&&i.tagName!=="SELECT"&&x) i.value=x; }); };
  v.querySelectorAll("[data-ftab]").forEach(b=>b.onclick=()=>reopen(()=>{ formTab= formTab===b.dataset.ftab? null : b.dataset.ftab; }));
  const dp=v.querySelector("#av-dc-p"); if(dp) dp.onchange=()=>reopen(()=>{});
  v.querySelectorAll('[id^="av-d-"],#av-dc-id').forEach(i=>i.oninput=()=>{ grab(); const pr=avDraft["av-dc-p"]||"jp3", ks=dcSites(pr,m.sexo||""); const r=dcCalc(pr,m.sexo||"",num(avDraft["av-dc-id"]),Object.fromEntries(ks.map(k=>[k,(avDraft["av-d-"+k]||"").replace(",",".")]))); const o=document.getElementById("dc-res"); if(o) o.innerHTML=dcResTxt(r); });
  v.querySelector("#av-save").onclick=()=>{ grab(); const g=id=>{ const el=v.querySelector("#"+id); return (el?el.value:(avDraft[id]||"")).trim().replace(",","."); }; const D=k=>(avDraft[k]||"").trim().replace(",","."); const a={id:nid(),date:g("av-date")||today,peso:g("av-peso")||String(m.peso||"").replace(",","."),pg:g("av-pg"),gord:g("av-gord"),pmm:g("av-pmm"),mus:g("av-mus"),vis:g("av-vis")};
    if(!num(a.pg)&&!num(a.mus)&&!num(a.vis)&&!g("av-peso")&&!BIO_F.some(([k])=>num(D("av-b-"+k)))&&!PER_F.some(([k])=>num(D("av-p-"+k)))&&!DC_S.some(([k])=>num(D("av-d-"+k)))){ toast("Preencha pelo menos um valor"); return; }
    PER_F.forEach(([k])=>{ const x=D("av-p-"+k); if(num(x)) a[k]=x; });
    BIO_F.forEach(([k])=>{ const x=D("av-b-"+k); if(num(x)) a[k]=x; });
    { const pr=D("av-dc-p")||"jp3", ks=dcSites(pr,m.sexo||""), dv={}; ks.forEach(k=>{ const x=D("av-d-"+k); if(num(x)){ a["d_"+k]=x; dv[k]=x; } });
      if(Object.keys(dv).length){ const id=D("av-dc-id")||D("av-b-idade"); const r=dcCalc(pr,m.sexo||"",num(id),dv); a.dc_p=pr; a.dc_sum=String(r.S); if(r.pg) a.pgd=String(r.pg); if(num(id)&&!num(a.idade)) a.idade=id; } }
    const hasBio=BIO_F.some(([k])=>num(a[k]));
    const f=avFill(a); Object.assign(a,{gord:a.gord||String(f.gord||""),mm:String(f.mm||"")});
    if(num(a.alt)) m.alt=String(a.alt).replace(".",","); bioOpen=false; perOpen=false; formTab=null; avDraft={};
    m.av=[...(m.av||[]),a]; if(num(a.peso) && a.date>=((avList(m).slice(-1)[0]||{}).date||"")) m.peso=String(a.peso).replace(".",","); save(); renderCorpo(); toast("Avaliação salva"); };
  v.querySelectorAll("[data-cpanel]").forEach(b=>b.onclick=()=>{ corpoPanel= corpoPanel===b.dataset.cpanel? null : b.dataset.cpanel; bmOpen=null; renderCorpo(); });
  v.querySelectorAll("[data-bm]").forEach(b=>b.onclick=()=>{ bmOpen= bmOpen===b.dataset.bm? null : b.dataset.bm; const y=window.scrollY; renderCorpo(); window.scrollTo(0,y); });
  v.querySelectorAll("[data-evo]").forEach(b=>b.onclick=()=>{ evoUpTo=b.dataset.evo||null; evoOpen=true; renderEvo(); });
  v.querySelectorAll("[data-avdel]").forEach(b=>b.onclick=()=>{ const id=b.dataset.avdel; if(avArm!==id){ avArm=id; renderCorpo(); return; } m.av=(m.av||[]).filter(x=>x.id!==id); avArm=null; save(); renderCorpo(); });
}

/* ---------- Evolução corporal (gráficos) ---------- */
let evoOpen=false, evoUpTo=null;
const EVO_K=[["peso","Peso","kg"],["pg","Gordura","%"],["gord","Peso da gordura","kg"],["pmm","Massa magra","%"],["mus","Músculo","kg"],["vis","Gordura visceral",""]];
function lineSVG(pts,u){
  const W=320,H=128,pl=8,pr=8,pt=26,pb=22; const vs=pts.map(p=>p.v); let lo=Math.min(...vs), hi=Math.max(...vs);
  if(hi-lo<0.001){ lo-=1; hi+=1; } const pad=(hi-lo)*0.15; lo-=pad; hi+=pad;
  const n=pts.length; const X=i=> n===1? W/2 : pl+12+(W-pl-pr-24)*i/(n-1); const Y=v=> pt+(H-pt-pb)*(1-(v-lo)/(hi-lo));
  const col="#9A6B00"; const fmtv=v=>n1(v)+(u==="%"?"%":"");
  const path=pts.map((p,i)=>`${i?"L":"M"}${X(i).toFixed(1)},${Y(p.v).toFixed(1)}`).join("");
  const lab=(i,anchor)=>`<text x="${X(i)}" y="${Y(pts[i].v)-10}" text-anchor="${anchor}" font-size="13" font-weight="700" fill="#141414">${fmtv(pts[i].v)}</text>`;
  const dlab=(i,anchor)=>`<text x="${X(i)}" y="${H-5}" text-anchor="${anchor}" font-size="11" fill="#6B6F76">${ddmm(pts[i].date)}</text>`;
  const aF=n===1?"middle":"start", aL=n===1?"middle":"end";
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Evolução">
    <line x1="${pl}" x2="${W-pr}" y1="${H-pb}" y2="${H-pb}" stroke="#E2E4E8" stroke-width="1"/>
    <line x1="${pl}" x2="${W-pr}" y1="${pt+(H-pt-pb)/2}" y2="${pt+(H-pt-pb)/2}" stroke="#EEF0F3" stroke-width="1"/>
    ${n>1?`<path d="${path}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`:""}
    ${pts.map((p,i)=>`<circle cx="${X(i)}" cy="${Y(p.v)}" r="${i===n-1?5.5:4.5}" fill="${col}" stroke="#FFFFFF" stroke-width="2"><title>${ddmm(p.date)}: ${fmtv(p.v)}</title></circle>`).join("")}
    ${lab(0,aF)}${n>1?lab(n-1,aL):""}${dlab(0,aF)}${n>1?dlab(n-1,aL):""}
  </svg>`;
}
function evoCardHTML(m){
  const all=avList(m).map(avFill); const L=all.filter(a=>!evoUpTo||a.date<=evoUpTo); if(!L.length) return "";
  const first0=L[0], last=L[L.length-1];
  const charts=EVO_K.map(([k,lab,u])=>{ const pts=L.filter(a=>num(a[k])).map(a=>({date:a.date,v:num(a[k])})); if(!pts.length) return "";
    const d=pts.length>1? avDelta(k,{[k]:pts[pts.length-1].v},{[k]:pts[0].v}) : null;
    return `<div class="evo-ch"><div class="evo-h"><b>${lab}${k==="vis"&&num(last.vis)?` · ${visTag(last.vis)}`:""}</b>${d&&d.d?`<span class="${d.cls}">${d.d<0?"▼":"▲"} ${d.txt.replace(/^[+−]/,"")}${u==="%"?"%":u?" "+u:""}</span>`:""}</div>
      ${lineSVG(pts,u)}<p>${AV_EXP[k]}</p></div>`; }).join("");
  const g=avDelta("gord",last,first0), mu=avDelta("mus",last,first0); const parts=[];
  if(L.length>1&&g&&g.d<0) parts.push(`${n1(-g.d)} kg de gordura a menos`); if(L.length>1&&mu&&mu.d>0) parts.push(`${n1(mu.d)} kg de músculo a mais`);
  return `<div class="repcard" id="evocard">
    <div class="rep-brand">${repLogo()}<span>${esc(BR().nome).toUpperCase()} <small>${esc(BR().sub)}</small></span></div>
    <div class="rep-head"><div><h2>${esc(m.name)}</h2><p>Evolução corporal · ${L.length>1?`${ddmm(first0.date)}/${first0.date.slice(2,4)} a ${ddmm(last.date)}/${last.date.slice(2,4)} · ${L.length} avaliações`:`avaliação de ${ddmm(last.date)}/${last.date.slice(2,4)}`}</p></div></div>
    ${parts.length?`<p class="bmsg">🎉 ${parts.join(" e ")} desde o início! O treino está funcionando.</p>`:""}
    <div class="evo-grid">${charts}</div>
    ${MOTTO_H()}
  </div>`;
}
function evoText(m){
  const L=avList(m).map(avFill).filter(a=>!evoUpTo||a.date<=evoUpTo); if(!L.length) return ""; const f=L[0], l=L[L.length-1];
  let t=`*Evolução corporal de ${first(m.name)}*\n${L.length>1?`${ddmm(f.date)} → ${ddmm(l.date)} (${L.length} avaliações)`:`Avaliação de ${ddmm(l.date)}`}\n`;
  EVO_K.forEach(([k,lab,u])=>{ if(!num(l[k])) return; const d=L.length>1? avDelta(k,l,f):null; const uu=u==="%"?"%":u?" "+u:"";
    t+=`\n• ${lab}: ${n1(num(l[k]))}${uu}${k==="vis"?` (${visTag(l.vis)})`:""}${d&&d.d?` (${d.txt}${uu} desde o início)`:""}\n   _${AV_EXP[k]}_`; });
  t+=`\n\n— ${BR().ass}${MOTTO_T()}`; return t;
}
function renderEvo(){
  const el=document.getElementById("evo"); if(!evoOpen){ el.hidden=true; document.body.style.overflow=""; return; }
  const m=A(); el.hidden=false; document.body.style.overflow="hidden";
  el.innerHTML=`<div class="rep-wrap">
    <div class="rep-actions"><button class="btn small" data-eclose>✕ Fechar</button><span class="sp"></span><button class="btn small" data-eimg>🖼 Baixar imagem</button><button class="btn small primary" data-eboth>📲 Texto + imagem</button></div>
    <div id="evoPanel" class="sendpanel" hidden></div>
    ${evoUpTo?`<p class="muted" style="font-size:13px;margin:0">Mostrando até ${ddmm(evoUpTo)}/${evoUpTo.slice(2,4)}. <button class="linkbtn" data-eall>Ver até a última</button></p>`:""}
    ${evoCardHTML(m)}
  </div>`;
}
document.addEventListener("click",async e=>{
  const b=e.target.closest("#evo button"); if(!b) return; const m=A();
  if(b.hasAttribute("data-eclose")){ evoOpen=false; renderEvo(); return; }
  if(b.hasAttribute("data-eall")){ evoUpTo=null; renderEvo(); return; }
  if(b.hasAttribute("data-eimg")){ try{ const blob=await repImageBlob("evocard"); await saveImgBlob(blob,`evolucao-${noAcc(first(m.name)).replace(/[^a-z0-9]/g,"")}.png`); toast("Imagem salva"); }catch(err){ if(!(err&&err.code==="declined")) toast("Não consegui gerar a imagem. Tire um print."); } return; }
  if(b.hasAttribute("data-eboth")){ sendFlow("evoPanel","evocard",`evolucao-${noAcc(first(m.name)).replace(/[^a-z0-9]/g,"")}.png`,"data-ego"); return; }
  if(b.hasAttribute("data-ego")){ waOpen(m,evoText(m)); return; }
});
function bodyBoxHTML(m,onlyDate){
  const L=avList(m).map(avFill); if(!L.length) return ""; const last=L[L.length-1]; if(onlyDate && last.date!==onlyDate) return "";
  const prev=L[L.length-2], f0=L[0]; const keys=[["peso","Peso"," kg"],["pg","Gordura","%"],["gord","Peso da gordura"," kg"],["pmm","Massa magra","%"],["mus","Músculo"," kg"],["vis","Gordura visceral",""]].filter(([k])=>num(last[k]));
  const cmp=prev||null;
  return `<div class="rep-box"><h3>Sua evolução corporal</h3><p class="rep-sub">Avaliação de ${ddmm(last.date)}${cmp?` comparada com ${ddmm(cmp.date)}`:""}</p>
    <div class="bgrid">${keys.map(([k,lab,u])=>{ const d=avDelta(k,last,cmp); const d0=L.length>2?avDelta(k,last,f0):null;
      return `<div class="bt"><span>${lab}</span><b class="num">${n1(num(last[k]))}<small>${u}</small></b>${k==="vis"?`<em class="${num(last.vis)<=9?"good":"meh"}">${visTag(last.vis)}</em>`:""}${d?`<em class="${d.cls}">${d.txt}${u}</em>`:""}${d0?`<em class="${d0.cls} s">${d0.txt}${u} desde o início</em>`:""}</div>`; }).join("")}</div>
    <div class="bexp">${keys.map(([k,lab])=>`<p><b>${lab}:</b> ${AV_EXP[k]}</p>`).join("")}</div>
    ${(()=>{ const g=cmp&&avDelta("gord",last,cmp), mu=cmp&&avDelta("mus",last,cmp); const parts=[]; if(g&&g.d<0) parts.push(`${n1(-g.d)} kg de gordura a menos`); if(mu&&mu.d>0) parts.push(`${n1(mu.d)} kg de músculo a mais`); return parts.length?`<p class="bmsg">🎉 ${parts.join(" e ")}! O treino está funcionando.</p>`:""; })()}
  </div>`;
}
function bodyText(m){ const L=avList(m).map(avFill); if(!L.length) return ""; const last=L[L.length-1], prev=L[L.length-2];
  const ks=[["peso","Peso"," kg"],["pg","Gordura","%"],["gord","Peso da gordura"," kg"],["pmm","Massa magra","%"],["mus","Músculo"," kg"],["vis","Gordura visceral",""]].filter(([k])=>num(last[k]));
  let t=`\n📏 *Avaliação ${ddmm(last.date)}*\n`+ks.map(([k,l,u])=>{ const d=avDelta(k,last,prev); return `• ${l}: ${n1(num(last[k]))}${u}${k==="vis"?` (${visTag(last.vis)})`:""}${d&&d.d?` (${d.txt}${u})`:""}\n   _${AV_EXP[k]}_`; }).join("\n");
  return t; }

/* ---------- Presença e Financeiro (antigo Diário) ---------- */
const PRES=(()=>{

const DIAS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const DC=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
// Feriados nacionais (Carnaval e Corpus Christi são ponto facultativo — dá para desmarcar no dia)
const FERIADOS={'2026-10-12':'N. Sra. Aparecida','2026-11-02':'Finados','2026-11-20':'Consciência Negra','2026-12-25':'Natal',
'2027-01-01':'Confraternização Universal','2027-02-08':'Carnaval','2027-02-09':'Carnaval','2027-03-26':'Sexta-feira Santa','2027-04-21':'Tiradentes',
'2027-05-01':'Dia do Trabalho','2027-05-27':'Corpus Christi','2027-09-07':'Independência','2027-10-12':'N. Sra. Aparecida','2027-11-02':'Finados',
'2027-11-15':'Proclamação da República','2027-11-20':'Consciência Negra','2027-12-25':'Natal'};
const DEST={rep:'Repor',abt:'Abater valor',nao:'Não repor'};
// Início do controle: antes desta data as aulas contam como dadas; a partir dela, chamada não marcada vira falta no dia seguinte
let INICIO=keyOf(new Date()); let PB='';

let db=null, online=false, localMode=false;
const alunos=new Map(); const dias=new Map(); const pags=new Map(); const hist=new Map();
let loadedA=false, loadedD=false;
const st={aTab:'ativos',advId:null,delId:null,view:'hoje',date:keyOf(new Date()),month:null,editId:null,addOpen:false,offOpen:false,delConfirm:false};
st.month=st.date.slice(0,7);

function keyOf(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dOf(k){const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d)}
function addDays(k,n){const d=dOf(k);d.setDate(d.getDate()+n);return keyOf(d)}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function brl(v){if(window.RP_PRIV)return 'R$ •••';return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function rid(){return Math.random().toString(36).slice(2,10)}
function today(){return keyOf(new Date())}

/* ---------- regras ---------- */
function dayData(k){return dias.get(k)||{}}
function isOff(k){const d=dayData(k);if(typeof d.off==='boolean')return d.off;return !!FERIADOS[k]}
function offReason(k){const d=dayData(k);if(typeof d.off==='boolean')return d.motivo||'Sem aula';return FERIADOS[k]||''}
function ativos(){return [...alunos.values()].filter(a=>a.ativo!==false).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'))}
function rk(a,h){return a.id+'_'+h.replace(':','')}
/* Registro da aula pelo horário; se o horário do aluno mudou depois de marcar, acha a marca que ficou no horário antigo */
function slotRec(recs,a,sl){const key=rk(a,sl.h);if(recs[key])return [key,recs[key]];const pre=a.id+'_',mine=(a.slots||[]).filter(x=>x.d===sl.d),own=new Set(mine.map(x=>rk(a,x.h)));
  const orph=Object.keys(recs).filter(k=>k.startsWith(pre)&&!own.has(k)&&/^\d{3,4}$/.test(k.slice(pre.length))&&recs[k]&&recs[k].status).sort();if(!orph.length)return [key,{}];
  const miss=mine.filter(x=>!recs[rk(a,x.h)]).sort((x,y)=>x.h.localeCompare(y.h)),i=miss.findIndex(x=>x.h===sl.h);return (i>=0&&orph[i])?[orph[i],recs[orph[i]]]:[key,{}]}
function contratadas(a){return a.contratadas>0?a.contratadas:(a.slots||[]).length*4}
function valorAula(a){if(a.valorAula>0)return a.valorAula;const c=contratadas(a);return (a.mensalidade>0&&c>0)?a.mensalidade/c:0}
function isFicha(a){return a.tipo==='ficha'||a.tipo==='consultoria'}
function mensal(a){if(a.tipo==='pacote'||a.tipo==='avulsa'||a.forma==='poraula')return 0;return isFicha(a)?(a.valorFicha||0):valorAula(a)*contratadas(a)}
function mDiff(a,b){const [ay,am]=a.split('-').map(Number),[by,bm]=b.split('-').map(Number);return (by-ay)*12+(bm-am)}
const PAC_STEP={mensal:1,bimestral:2,trimestral:3,semestral:6,anual:12};
function pacBase(p){return (p.mesCob||p.inicio).slice(0,7)}
function pacSched(p){const f=p.forma||((+p.parc||1)>1?'parcelas':'avista');const span=p.validade&&p.inicio?Math.max(1,mDiff(p.inicio.slice(0,7),p.validade.slice(0,7))+1):0;
  if(f==='parcelas'){const n=Math.max(1,+p.parc||1);return [...Array(n)].map((_,i)=>i)}
  const st=PAC_STEP[f];if(st){const n=span?Math.ceil(span/st):1;return [...Array(n)].map((_,i)=>i*st)}return [0]}
function pacoteDoMes(a,ym){for(const p of [a.pacote,...(a.pacHist||[])]){if(!p||!p.inicio)continue;const M=pacSched(p),idx=M.indexOf(mDiff(pacBase(p),ym));if(idx>=0)return Object.assign({},p,{_i:idx,_n:M.length})}return null}
// Pacote: conta aulas dadas desde o início do pacote (presente, falta "não repor" e aulas extras feitas)
function pacUso(a){const p=a.pacote;if(a.tipo!=='pacote'||!p||!(+p.total))return null;const hoje=today();let used=0,pend=0;
  for(let k=p.inicio||hoje;k<=hoje;k=addDays(k,1)){const dd=dayData(k);
    for(const e of (dd.extras||[])) if(e.alunoId===a.id&&(e.status==='f'?e.destino==='nao':(e.status||k<hoje))) used++;
    if(isOff(k))continue;const wd=dOf(k).getDay(),recs=dd.registros||{};
    for(const sl of (a.slots||[])) if(sl.d===wd){const r=slotRec(recs,a,sl)[1];
      if(r.status==='p'||(r.status==='f'&&r.destino==='nao')||(!r.status&&k<INICIO))used++;else if(!r.status&&k<hoje)pend++;}}
  const val=p.validade||'',dv=val?Math.round((dOf(val)-dOf(hoje))/864e5):null,perd=+p.perdidas||0;
  return {used,total:+p.total,rest:+p.total-used-perd,perdidas:perd,pend,inicio:p.inicio,validade:val,dias:dv,vencido:val?dv<0:false};}
function pacTagP(a){return pacTagHTML(pacUso(a))}
const FORMAS={mensal:'Mensal',poraula:'Por aula feita',parcelas:'Em 2+ vezes',semanal:'Semanal',trimestral:'Trimestral',semestral:'Semestral',anual:'Anual',outra:'Outra'};

function agendaDoDia(k){
  const wd=dOf(k).getDay(), recs=dayData(k).registros||{}, out=[];
  for(const a of ativos()) for(const s of (a.slots||[])) if(s.d===wd&&!(a.inicio&&k<a.inicio)){
    const [key,r]=slotRec(recs,a,s);
    out.push({tipo:'fixo',a,key,orig:s.h,hora:r.hora||s.h,status:r.status||'',destino:r.destino||'',repK:r.repK||'',repH:r.repH||''});
  }
  for(const x of (dayData(k).extras||[])){const a=alunos.get(x.alunoId);if(a)out.push({tipo:x.tipo,a,key:x.id,orig:x.hora,hora:x.hora,status:x.status||'',destino:x.destino||''})}
  return out.sort((p,q)=>p.hora.localeCompare(q.hora)||p.a.nome.localeCompare(q.a.nome,'pt-BR'));
}

function diasDoMes(ym){const [y,m]=ym.split('-').map(Number);const n=new Date(y,m,0).getDate();const r=[];for(let i=1;i<=n;i++)r.push(ym+'-'+String(i).padStart(2,'0'));return r}

function statsMes(ym){
  const ks=diasDoMes(ym), hoje=today(), por=new Map();
  for(const a of ativos()) por.set(a.id,{a,contr:contratadas(a),bruto:0,agenda:0,feriado:0,pres:0,falta:0,rep:0,abt:0,nao:0,pend:0,auto:0,antes:0,reposFeitas:0,extras:0,fut:0});
  for(const k of ks){
    const wd=dOf(k).getDay(), off=isOff(k), recs=dayData(k).registros||{};
    for(const a of ativos()) for(const s of (a.slots||[])) if(s.d===wd&&!(a.inicio&&k<a.inicio)){
      const x=por.get(a.id); x.bruto++;
      if(off){x.feriado++;continue}
      x.agenda++;
      const r=slotRec(recs,a,s)[1];
      if(r.status==='p')x.pres++;
      else if(r.status==='f'){x.falta++; if(r.destino==='abt')x.abt++; else if(r.destino==='nao')x.nao++; else x.rep++;}
      else if(k<INICIO){x.pres++;x.antes++}
      else if(k<hoje){x.falta++;x.rep++;x.auto++}
      else if(k===hoje)x.pend++;
      else x.fut++;
    }
    for(const e of (dayData(k).extras||[])){const x=por.get(e.alunoId);if(!x)continue;
      if(e.status==='f')continue;
      if(!e.status&&k>hoje){x.fut++;continue}
      if(e.tipo==='rep'){x.reposFeitas++;x.pres++}else if(e.tipo==='adi'){x.adi=(x.adi||0)+1;x.pres++}else{x.extras++;x.pres++}}
  }
  for(const x of por.values()){x.quinta=Math.max(0,x.bruto-x.contr);x.valorAula=valorAula(x.a);x.desconto=x.abt*x.valorAula}
  return por;
}
// saldo de reposição acumulado (todas as datas até hoje)
function saldoRepos(){
  const s=new Map(),hoje=today(),inc=(id,n)=>s.set(id,(s.get(id)||0)+n);
  // faltas a repor (marcadas ou automáticas) do início do controle até hoje
  for(let k=INICIO;k<=hoje;k=addDays(k,1)){
    if(isOff(k))continue;
    const wd=dOf(k).getDay(),recs=dayData(k).registros||{};
    for(const a of ativos()) if(a.forma!=='poraula') for(const sl of (a.slots||[])) if(sl.d===wd){
      const r=slotRec(recs,a,sl)[1];
      if(r.status==='f'?(r.destino||'rep')==='rep':(!r.status&&k<hoje)) inc(a.id,1);
    }
  }
  for(const [k,d] of dias) for(const e of (d.extras||[])) if((e.tipo==='rep'||e.tipo==='adi')&&e.status!=='f') inc(e.alunoId,-1);
  return s;
}

// Horas: cada horário ocupado conta 1 hora, seja individual, dupla ou trio
function efStatus(i,k){if(i.status)return i.status;if(i.tipo!=='fixo')return k<today()?'p':'';if(k<INICIO)return 'p';return k<today()?'f':''}
function horasDia(k){
  const r={prev:0,dadas:0,nao:0,pend:0,grupos:{}};
  if(isOff(k))return r;
  const g={};for(const i of agendaDoDia(k)){if(isFicha(i.a))continue;(g[i.hora]=g[i.hora]||[]).push(efStatus(i,k))}
  for(const [h,ss] of Object.entries(g)){r.prev++;const e=ss.includes('p')?'dada':ss.every(x=>x==='f')?'nao':'pend';r.grupos[h]=e;if(e==='dada')r.dadas++;else if(e==='nao')r.nao++;else r.pend++}
  return r;
}
function horasMes(ym){const t={prev:0,dadas:0,nao:0,pend:0};for(const k of diasDoMes(ym)){const r=horasDia(k);t.prev+=r.prev;t.dadas+=r.dadas;t.nao+=r.nao;t.pend+=r.pend}return t}
function hfmt(n){return n+'h'}

/* ---------- relatórios PDF ---------- */
let dl=null;
function mesNome(ym){const [y,m]=ym.split('-').map(Number);return MESES[m-1][0].toUpperCase()+MESES[m-1].slice(1)+' de '+y}
function dadosRel(a,ym){
  const hv=histDe(a.id,ym),x=statsMes(ym).get(a.id),cur=today().slice(0,7);
  const lista=aulasDoAluno(a,ym);
  const offs=[...new Set(lista.filter(l=>l.st==='off').map(l=>l.k))].map(k=>({k,mot:offReason(k)}));
  return {hv,x,lista,offs,saldo:saldoRepos().get(a.id)||0,cur};
}
function pdfBase(titulo,sub){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:'mm',format:'a4'});
  doc.setFillColor(14,106,86);doc.rect(0,0,210,30,'F');
  doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(18);doc.text(titulo,18,15);
  doc.setFont('helvetica','normal');doc.setFontSize(11);doc.text(sub,18,23);
  doc.setFontSize(9);doc.text(BR().nome+' · '+BR().sub,192,23,{align:'right'});
  doc.setTextColor(22,32,28);return {doc,y:42};
}
function pdfKpis(P,items){
  const w=(174-(items.length-1)*4)/items.length;
  items.forEach((it,i)=>{const x=18+i*(w+4);P.doc.setDrawColor(215,223,219);P.doc.setFillColor(238,242,240);P.doc.roundedRect(x,P.y,w,22,2,2,'FD');
    P.doc.setFont('helvetica','bold');P.doc.setFontSize(18);P.doc.setTextColor(...(it.c||[22,32,28]));P.doc.text(String(it.v),x+w/2,P.y+11,{align:'center'});
    P.doc.setFont('helvetica','normal');P.doc.setFontSize(8.5);P.doc.setTextColor(91,105,100);P.doc.text(it.l,x+w/2,P.y+17.5,{align:'center'});});
  P.doc.setTextColor(22,32,28);P.y+=30;
}
function pdfH(P,t){pdfPage(P,14);P.doc.setFont('helvetica','bold');P.doc.setFontSize(12.5);P.doc.text(t,18,P.y);P.y+=6.5}
function pdfP(P,t,opt){opt=opt||{};P.doc.setFont('helvetica',opt.bold?'bold':'normal');P.doc.setFontSize(opt.size||10.5);
  const lines=P.doc.splitTextToSize(t,opt.w||174);pdfPage(P,lines.length*5+2);
  if(opt.box){const hgt=lines.length*5+6;P.doc.setFillColor(...opt.box);P.doc.roundedRect(18,P.y-4.5,174,hgt,2,2,'F')}
  P.doc.text(lines,opt.box?22:18,P.y+(opt.box?0.5:0));P.y+=lines.length*5+(opt.box?6:3)}
function pdfPage(P,need){if(P.y+need>280){P.doc.addPage();P.y=20}}
function pdfDias(P,linhas){
  P.doc.setFontSize(10);
  for(const l of linhas){pdfPage(P,7);P.doc.setDrawColor(215,223,219);P.doc.line(18,P.y+2,192,P.y+2);
    P.doc.setFont('helvetica','bold');P.doc.setTextColor(22,32,28);P.doc.text(l[0],18,P.y);
    P.doc.setFont('helvetica','normal');P.doc.setTextColor(91,105,100);P.doc.text(l[1]||'',50,P.y);
    P.doc.setTextColor(...(l[3]||[22,32,28]));P.doc.text(l[2]||'',75,P.y);P.y+=7}
  P.doc.setTextColor(22,32,28);P.y+=3;
}
function dtxt(k){const d=dOf(k);return DC[d.getDay()]+' '+String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')}
function pdfRodape(P){const n=P.doc.getNumberOfPages();for(let i=1;i<=n;i++){P.doc.setPage(i);P.doc.setFontSize(8);P.doc.setTextColor(140,150,146);P.doc.text('Gerado em '+dOf(today()).toLocaleDateString('pt-BR')+' · coachmailson.com',105,290,{align:'center'})}}
const VERDE=[27,122,69],VERM=[179,50,43],CINZA=[120,130,126];
function pdfFechamento(a,ym){ return cardPdf(fechCardHTML(a,ym)); }
/* Planejamento do mês: cartão escuro e dourado, gerado como imagem e colocado no PDF */
const DIAS_L=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
const fillT=(t,nome,n)=> String(t||"").replace(/\{nome\}/g,nome).replace(/\{n\}/g,n);
const paras=(t,nome,n)=> String(t||"").split(/\n\s*\n|\n/).map(x=>x.trim()).filter(Boolean).map((x,i)=>`<p class="pc-p ${i?'pc-w':''}">${esc(fillT(x,nome,n))}</p>`).join('');
/* html2canvas desmonta o texto quando a página está com zoom (A+): gera sempre sem zoom */

function BRc(){ const b=BR(); return b.frases==="nao"? Object.assign({},b,{pMsg:"",pGold:"",pFim:"",lema:"",fOk:"",fNo:""}) : b; }
function cardPdf(html,bg){ return (async()=>{ const box=document.createElement('div'); box.style.cssText='position:fixed;left:-10000px;top:0;width:600px;z-index:-1'; box.innerHTML=html; document.body.appendChild(box);
  try{ const c=await h2cZ(box.firstElementChild,{scale:2,backgroundColor:bg||TH().bg,useCORS:true});
    const W=150,H=W*c.height/c.width; const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'mm',format:[W,H]});
    const im=c.toDataURL('image/jpeg',0.92); doc.addImage(im,'JPEG',0,0,W,H); doc._img=im; return doc; } finally{ box.remove(); } })(); }
/* Aulas a mais no mês (5ª semana): a regra geral vale, mas cada aluno pode ter a sua escolha no mês */
function q5Of(a,ym){ const o=a&&a.q5m&&a.q5m[ym]; return o||BR().q5||'gratis'; }
function q5Msg(n,mode){ const br=BR(), au=n+' aula'+(n>1?'s':''); if(br.q5Txt&&mode!=="cortesia") return esc(br.q5Txt.replace(/\{aulas\}/g,au).replace(/\{n\}/g,n)); return mode==="cortesia"? `Este mês você tem ${au} a mais, sem custo: é uma cortesia.` : `Este mês você tem ${au} a mais, sem custo. Em contrapartida, ${n>1?'elas compensam':'ela compensa'} os dias de feriado e de viagem.`; }
const pcSoc=br=>{ const L=[]; if(br.insta) L.push('📷 '+esc(br.insta)); if(br.whats) L.push('📱 '+esc(br.whats)); if(br.site) L.push('🌐 '+esc(br.site)); if(br.rede2) L.push(esc(br.rede2)); return (L.length||br.cref)? `<div class="pc-soc">${L.length?`<span>${L.join(' · ')}</span>`:''}${br.cref?`<span>Registro profissional: <b>${esc(br.cref)}</b></span>`:''}</div>` : ''; };
const pcAviso=br=> br.avOn==="sim"&&String(br.avTempo||"").trim()? `<div class="pc-box" style="border-color:#E5534B"><b style="color:#FF6B5E">AVISO DE FALTA</b><p>Avise com pelo menos <b style="color:#fff">${esc(br.avTempo)}</b> de antecedência. Sem esse aviso, a aula é considerada dada.</p></div>` : '';
function fechCardHTML(a,ym){
  const R0=dadosRel(a,ym), br=BRc(), G=TH().g, RED='#E5534B'; const [y,m]=ym.split('-').map(Number);
  const nome=a.nome.replace(/\s*\(.*\)\s*$/,'').split(' ')[0];
  let feitas,contr,faltas,repos,pres=new Set(),falt=[],off=new Set(),fut=new Set();
  if(R0.hv){ feitas=R0.hv.feitas; contr=R0.hv.contr; faltas=Math.max(0,contr-feitas); repos=0; (R0.hv.dias||[]).forEach(k=>pres.add(k)); }
  else { const x=R0.x||{pres:0,contr:contratadas(a),falta:0,reposFeitas:0}; feitas=x.pres; contr=x.contr; faltas=x.falta; repos=x.reposFeitas;
    R0.lista.forEach(l=>{ if(l.st==='p'||l.st==='x') pres.add(l.k); else if(l.st==='f'&&!/^Reposição|^Aula extra|^Adiantamento/.test(l.lbl)) falt.push(l); else if(l.st==='off') off.add(l.k); else fut.add(l.k); }); }
  const aberto= !R0.hv && ym>=R0.cur; const ok= feitas>=contr;
  const msg= aberto? `Até agora, em ${MESES[m-1]}, você fez ${feitas} aula${feitas!==1?'s':''}.` : fillT(ok?br.fOk:br.fNo,nome,feitas);
  const first=new Date(y,m-1,1).getDay(), nd=new Date(y,m,0).getDate(); const fk=new Set(falt.map(l=>l.k));
  let cal=''; for(let i=0;i<first;i++) cal+='<span></span>';
  for(let d=1;d<=nd;d++){ const k=ym+'-'+String(d).padStart(2,'0');
    cal+= pres.has(k)? `<span><i style="background:${G};color:#111;font-weight:800">${d}</i></span>` : fk.has(k)? `<span><i style="border:1.5px solid ${RED};color:${RED};font-weight:700">${d}</i></span>` : off.has(k)? `<span><i style="border:1.5px dashed ${G};color:#E8D2A6">${d}</i></span>` : fut.has(k)? `<span><i style="border:1px solid #555;color:#CFC8BC">${d}</i></span>` : `<span><i>${d}</i></span>`; }
  const tile=(v,l,c)=>`<div class="pc-t"><b ${c?`style="color:${c}"`:''}>${v}</b><span>${l}</span></div>`;
  const fd=falt.map(l=>{ const dd=dOf(l.k); return `${DC[dd.getDay()]} ${String(dd.getDate()).padStart(2,'0')}/${String(m).padStart(2,'0')}`; });
  const fdet=falt.map((l,i)=>{ const why=l.mot||l.obs||(l.auto?'chamada não marcada':''); const out= l.dest==='abt'? 'desconto no valor' : l.dest==='nao'? 'considerada aula dada' : 'vai ter reposição'; return `<li><b>${fd[i]}</b> · ${out}${l.dest==='nao'&&why?` <span>(motivo: ${esc(why.charAt(0).toLowerCase()+why.slice(1))})</span>`:''}</li>`; }).join('');
  const desde= a.inicio&&a.inicio.slice(0,7)===ym&&a.inicio.slice(8)!=='01'? `Desde ${a.inicio.slice(8)}/${a.inicio.slice(5,7)}, quando você começou.` : '';
  return `<div class="pcard" style="${thVars()}">
    <div class="pc-logo">${logoHTML()}<span class="pc-n">${esc(br.nome).toUpperCase()}</span><span class="pc-s">${esc(br.sub).toUpperCase()}</span></div>
    <p class="pc-k">RELATÓRIO DE ${MESES[m-1].toUpperCase()} · ${y}</p>
    <h1 class="pc-h">${esc(nome)}</h1>
    <div class="pc-tiles">${tile(feitas,'aulas feitas',G)}${tile(contr,'do seu plano')}${tile(faltas,faltas===1?'falta':'faltas',faltas?RED:'')}${tile(repos,repos===1?'reposição':'reposições')}</div>
    ${msg?`<h2 class="pc-t2">${ok&&!aberto?'Mês completo!':'Seu mês'}</h2><p class="pc-p pc-w">${esc(msg)}</p>`:''}
    ${desde?`<p class="pc-d">${desde}</p>`:''}
    ${fd.length?`<div class="pc-box" style="border-color:${RED}"><b style="color:${RED}">AULAS QUE FALTARAM</b><ul class="pc-fl">${fdet}</ul>${falt.some(l=>l.dest==='rep')?`<p>As reposições são marcadas conforme a disponibilidade da agenda.</p>`:''}</div>`:''}
    ${R0.saldo>0&&!R0.hv?`<p class="pc-p">Saldo para repor: <b style="color:#fff">${R0.saldo} aula${R0.saldo>1?'s':''}</b>.</p>`:''}
    ${(fd.length||R0.saldo>0)&&br.regra?`<p class="pc-red">${esc(br.regra)}</p>`:''}
    ${!R0.hv&&R0.x&&R0.x.quinta>0&&q5Of(a,ym)!=="cobra"?`<div class="pc-box"><b>AULAS A MAIS, SEM CUSTO</b><p>${q5Msg(R0.x.quinta,q5Of(a,ym))}</p></div>`:''}
    ${pcAviso(br)}
    <p class="pc-k" style="margin-top:6px">SEU MÊS</p>
    <div class="pc-cal">${['D','S','T','Q','Q','S','S'].map(d=>`<span class="pc-wd">${d}</span>`).join('')}${cal}</div>
    <div class="pc-leg"><span><i style="background:${G}"></i>treino feito</span>${fd.length?`<span><i style="border:1.5px solid ${RED}"></i>falta</span>`:''}${off.size?`<span><i style="border:1.5px dashed ${G}"></i>sem treino</span>`:''}</div>
    ${br.pFim?`<h2 class="pc-t2" style="margin-top:14px">${esc(fillT(br.pFim,nome,feitas))}</h2>`:''}
    ${br.lema?`<p class="pc-gold">“${esc(br.lema)}”</p>`:''}
    <p class="pc-sig">— ${esc(br.ass)}</p>${pcSoc(br)}
    <div class="pc-bar"></div></div>`; }
function planCardHTML(a,ym){
  const R0=dadosRel(a,ym); const x=R0.x||{contr:contratadas(a),quinta:0};
  const fix=R0.lista.filter(l=>l.st!=='off'&&!/^Reposição|^Aula extra|^Adiantamento/.test(l.lbl));
  const offDays=R0.lista.filter(l=>l.st==='off').map(l=>l.k);
  const n=fix.length, nOff=R0.offs.length, br=BRc(), G=TH().g;
  const nome=a.nome.replace(/\s*\(.*\)\s*$/,'').split(' ')[0];
  const byH={}; (a.slots||[]).slice().sort((p,q)=>(p.d||7)-(q.d||7)).forEach(sl=>{(byH[sl.h]=byH[sl.h]||[]).push(DIAS_L[sl.d])});
  const lst=arr=>arr.length>1? arr.slice(0,-1).join(', ')+' e '+arr[arr.length-1] : arr[0]||'';
  const dias=Object.entries(byH).map(([h,ds])=>lst(ds)+' às '+h).join(' · ');
  const [y,m]=ym.split('-').map(Number); const first=new Date(y,m-1,1).getDay(), nd=new Date(y,m,0).getDate();
  const mine=new Set(fix.map(l=>l.k)), off=new Set(offDays);
  let cal=''; for(let i=0;i<first;i++) cal+='<span></span>';
  for(let d=1;d<=nd;d++){ const k=ym+'-'+String(d).padStart(2,'0');
    cal+= mine.has(k)? `<span><i style="background:${G};color:#111;font-weight:800">${d}</i></span>` : off.has(k)? `<span><i style="border:1.5px dashed ${G};color:#E8D2A6">${d}</i></span>` : `<span><i>${d}</i></span>`; }
  const offTxt=R0.offs.map(o=>{const dd=dOf(o.k);return `${DIAS[dd.getDay()]}, ${String(dd.getDate()).padStart(2,'0')}/${String(m).padStart(2,'0')}, é ${FERIADOS[o.k]?'feriado de '+o.mot:o.mot.toLowerCase()}`}).join('; ');
  const tile=(v,l)=>`<div class="pc-t"><b>${v}</b><span>${l}</span></div>`;
  const ferOk=fix.filter(l=>FERIADOS[l.k]).map(l=>{ const dd=dOf(l.k); return `${DIAS[dd.getDay()]}, ${String(dd.getDate()).padStart(2,'0')}/${String(m).padStart(2,'0')}, é feriado de ${FERIADOS[l.k]}`; });
  return `<div class="pcard" style="${thVars()}">
    <div class="pc-logo">${logoHTML()}<span class="pc-n">${esc(br.nome).toUpperCase()}</span><span class="pc-s">${esc(br.sub).toUpperCase()}</span></div>
    <p class="pc-k">PLANEJAMENTO DE ${MESES[m-1].toUpperCase()} · ${y}</p>
    <h1 class="pc-h">${esc(nome)}</h1>
    <p class="pc-d">Seus treinos: ${esc(dias||'a combinar')}</p>
    <div class="pc-tiles">${tile(n,`treino${n!==1?'s':''} no mês`)}${tile(x.contr,'do seu plano')}${tile(nOff,nOff===1?'dia sem treino':'dias sem treino')}${tile(n+'h','com '+esc(br.ass))}</div>
    ${br.pMsg||br.pGold?`<h2 class="pc-t2">Um novo mês começou!</h2>`:''}
    ${paras(br.pMsg,nome,n)}
    ${br.pGold?`<p class="pc-gold">${esc(fillT(br.pGold,nome,n))}</p>`:''}
    ${nOff?`<div class="pc-box"><b>${nOff>1?'DIAS SEM TREINO NO MÊS':(FERIADOS[R0.offs[0].k]?'FERIADO NO MÊS':'DIA SEM TREINO NO MÊS')}</b><p>${esc(offTxt)}, e não teremos treino.${(q5Of(a,ym)!=="cobra"&&q5Of(a,ym)!=="cortesia")?" Sem preocupação: os meses de 5 semanas trazem aulas extras sem custo, e é assim que esse dia de descanso se compensa.":""}</p></div>`:''}
    ${ferOk.length?`<div class="pc-box"><b>FERIADO COM TREINO</b><p>${esc(ferOk.join('; '))}: o treino está mantido.</p></div>`:''}
    ${x.quinta>0?`<div class="pc-box"><b>MÊS DE 5 SEMANAS</b><p>${q5Of(a,ym)==="cobra"?`Este mês tem ${x.quinta} aula${x.quinta>1?'s':''} a mais, cobrada${x.quinta>1?'s':''} pelo valor da aula.`:q5Msg(x.quinta,q5Of(a,ym))}</p></div>`:''}
    ${pcAviso(br)}
    ${br.regra?`<p class="pc-red">${esc(br.regra)}</p>`:''}
    <p class="pc-k" style="margin-top:6px">SEU MÊS</p>
    <div class="pc-cal">${['D','S','T','Q','Q','S','S'].map(d=>`<span class="pc-wd">${d}</span>`).join('')}${cal}</div>
    <div class="pc-leg"><span><i style="background:${G}"></i>seu treino</span>${offDays.length?`<span><i style="border:1.5px dashed ${G}"></i>sem treino</span>`:''}</div>
    ${br.pFim?`<h2 class="pc-t2" style="margin-top:14px">${esc(fillT(br.pFim,nome,n))}</h2>`:''}
    ${br.lema?`<p class="pc-gold">“${esc(br.lema)}”</p>`:''}
    <p class="pc-sig">— ${esc(br.ass)}</p>${pcSoc(br)}
    <div class="pc-bar"></div></div>`;
}
function pdfPlanejamento(a,ym){ return cardPdf(planCardHTML(a,ym)); }
function arq(a,tipo,ym){return (tipo==='fech'?'Relatorio':'Planejamento')+'-'+ym+'-'+a.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'')}
async function salvarArquivo(nome,blob,imgs){
  if(!window.jspdf){toast('O gerador de PDF não carregou. Recarregue a página.');return}
  if(!dl){ if(imgs&&imgs.length){ showImgs(imgs, imgs.length>1?'Salvar as imagens':'Salvar a imagem'); return; } toast('Baixar arquivo não está disponível aqui.');return}
  try{await dl.save({filename:nome,data:blob});toast('Arquivo pronto')}catch(e){if(e&&e.code!=='declined')toast('Não deu para baixar ('+erroPT(e)+').')}
}
async function gerarPdf(id,tipo,ym){const a=alunos.get(id);if(!a)return;
  if(!window.jspdf){toast('O gerador de PDF não carregou. Recarregue a página.');return}
  if(!window.html2canvas){toast('O gerador de imagem não carregou. Recarregue a página.');return}
  toast('Gerando o PDF…');
  try{ const doc=tipo==='fech'?await pdfFechamento(a,ym):await pdfPlanejamento(a,ym);const nome=arq(a,tipo,ym)+'.pdf';
    await offerFile(doc.output('blob'),nome,{imgs:[{src:doc._img,name:nome.replace(/\.pdf$/,'.jpg')}],text:(tipo==='fech'?'Relatório':'Planejamento')+' de '+mesCurto(ym)+' · '+a.nome.replace(/\s*\(.*\)\s*$/,'')});
  }catch(e){ toast('Não consegui gerar o PDF ('+erroPT(e)+').'); }}
async function gerarTodos(tipo,ym){
  if(!window.JSZip){toast('O compactador não carregou. Recarregue a página.');return}
  const zip=new JSZip();let n=0;
  const lista=tipo==='fech'&&ym<INICIO.slice(0,7)?[...alunos.values()].filter(a=>histDe(a.id,ym)):ativos().filter(a=>!isFicha(a));
  const imgs=[];
  if(!lista.length){toast('Nenhum aluno para gerar');return}
  toast('Gerando '+lista.length+' PDFs…');
  try{ for(const a of lista){const doc=tipo==='fech'?await pdfFechamento(a,ym):await pdfPlanejamento(a,ym);zip.file(arq(a,tipo,ym)+'.pdf',doc.output('arraybuffer'));imgs.push({src:doc._img,name:arq(a,tipo,ym)+'.jpg'});n++}
    const blob=await zip.generateAsync({type:'blob'});
    await offerFile(blob,(tipo==='fech'?'Relatorios-':'Planejamentos-')+ym+'.zip',{share:false,imgs});
  }catch(e){ toast('Não consegui gerar os PDFs ('+erroPT(e)+').'); }
}

/* ---------- gravação ---------- */
const q={};
function saveDay(k){
  if(!db){toast('Sem conexão: abra pelo Claude para salvar.');return}
  const data=JSON.parse(JSON.stringify(dayData(k)));
  q[k]=(q[k]||Promise.resolve()).then(()=>db.doc(PB+'dias/'+k).set(data)).catch(e=>toast('Não salvou ('+erroPT(e)+'). Tente de novo.'));
}
function saveAluno(a){
  if(!db){toast('Sem conexão: abra pelo Claude para salvar.');return Promise.resolve()}
  const {id,...d0}=a;let data;try{data=JSON.parse(JSON.stringify(d0))}catch(e){data=d0}
  try{return db.doc(PB+'alunos/'+id).set(data).catch(e=>toast('Não salvou o aluno ('+erroPT(e)+'). Mande um print.'))}catch(e){toast('Não salvou o aluno ('+erroPT(e)+'). Mande um print.');return Promise.resolve()}
}
const pq={};
function mutPag(ym,fn){const d=JSON.parse(JSON.stringify(pags.get(ym)||{}));fn(d);pags.set(ym,d);render();
  if(!db){toast('Sem conexão: abra pelo Claude para salvar.');return}
  pq[ym]=(pq[ym]||Promise.resolve()).then(()=>db.doc(PB+'pagamentos/'+ym).set(d)).catch(e=>toast('Não salvou o pagamento ('+erroPT(e)+').'));}
function mutDay(k,fn){const d=JSON.parse(JSON.stringify(dayData(k)));d.registros=d.registros||{};d.extras=d.extras||[];fn(d);dias.set(k,d);render();saveDay(k)}

/* ---------- render ---------- */
const main=document.getElementById('pmain');
function render(){
  setTimeout(()=>window.__presHook&&window.__presHook(),0);
  document.querySelectorAll('#pnav button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===st.view));
  document.getElementById('psync').textContent=db?(loadedA&&loadedD?(localMode?'Salvo neste aparelho':navigator.onLine===false?'📴 Sem internet · salvo no aparelho, envia quando voltar':'Salvo na nuvem'):'Carregando…'):(online?'':'Sem conexão — nada será salvo');
  if(st.view==='hoje')renderHoje();else if(st.view==='mes')renderMes();else if(st.view==='pag')renderPag();else renderAlunos();
  try{ rpSrch(); }catch(_){}
}
var RPQ={q:""};
function rpSrch(){ if(!(st.view==='hoje'||st.view==='mes'||st.view==='pag')) return; let b=document.getElementById('rpSrchBox'); if(b) b.remove();
  b=document.createElement('label'); b.id='rpSrchBox'; b.className='cbusca'; b.innerHTML='🔍<input class="inp" id="rpSrchIn" type="search" placeholder="Procurar aluno pelo nome" autocomplete="off"><button type="button" class="btn small rpsx" data-rpsx hidden>✕ Fechar</button>';
  const f=main.firstElementChild; if(f) f.after(b); else main.prepend(b);
  const inp=b.querySelector('input'); inp.value=RPQ.q;
  const ap=()=>{ const q=noAcc(RPQ.q).toLowerCase().trim(); main.querySelectorAll('.p[data-s],.paycard,.mc').forEach(el=>{ const n=el.querySelector('.p-name,.paytop b,.mc-n'); const t=n?noAcc(n.textContent).toLowerCase():''; el.hidden=!!q&&!t.includes(q); }); };
  const bx=b.querySelector('[data-rpsx]'); const tg=()=>{ bx.hidden=!RPQ.q.trim(); };
  inp.addEventListener('input',()=>{ RPQ.q=inp.value; ap(); tg(); }); bx.addEventListener('click',e=>{ e.preventDefault(); RPQ.q=''; inp.value=''; ap(); tg(); inp.blur(); }); ap(); tg(); }

function renderHoje(){
  const k=st.date,d=dOf(k),off=isOff(k),items=agendaDoDia(k),saldo=saldoRepos();
  const isT=k===today();
  let h=`<div class="daybar"><button class="iconbtn" data-act="prev" aria-label="Dia anterior">‹</button>
    <div class="t"><h2>${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}</h2><small>${isT?'Hoje':`<button class="chipbtn" data-act="hoje">Voltar para hoje</button>`}</small></div>
    <button class="iconbtn" data-act="next" aria-label="Próximo dia">›</button></div>`;
  if(off){
    h+=`<div class="banner off"><div class="grow"><b>Sem aula:</b> ${esc(offReason(k))}. As aulas deste dia não contam e não são repostas.</div><button class="ghost" data-act="on">Atendi neste dia</button></div>`;
  }else if(st.offOpen){
    h+=`<div class="card"><h3>Marcar dia sem aula</h3><div class="form"><label for="offm">Motivo<select id="offm"><option>Feriado</option><option>Viagem</option><option>Folga</option><option>Outro</option></select></label>
    <div class="row-actions"><button class="primary" data-act="offok">Confirmar</button><button class="ghost" data-act="offcancel">Cancelar</button></div></div></div>`;
  }
  if(!loadedA){h+=`<div class="empty">Carregando seus alunos…</div>`;main.innerHTML=h;return}
  if(!off) h+=confHTML(k,items);
  if(!alunos.size){h+=`<div class="empty">Nenhum aluno cadastrado. Cadastre na aba Alunos.</div>`;main.innerHTML=h;return}
  if(!off){
    const pend=items.filter(i=>!i.status).length;
    h+=`<div class="row-actions">${pend?`<button class="primary" data-act="todos">Marcar ${pend} restante${pend>1?'s':''} como presente</button>`:''}
    <button class="ghost" data-act="add">+ Reposição ou aula extra</button>${!st.offOpen?`<button class="ghost" data-act="off">Dia sem aula</button>`:''}</div>`;
    if(st.addOpen){
      const opts=ativos().filter(a=>!isFicha(a)).map(a=>{const s=saldo.get(a.id)||0;return `<option value="${a.id}">${esc(a.nome)}${s>0?` — deve ${s}`:''}</option>`}).join('');
      h+=`<div class="card"><h3>Adicionar aula no dia</h3><div class="form">
      <label for="xa">Aluno<select id="xa">${opts}</select></label>
      <div class="two"><label for="xh">Horário<input id="xh" type="time" value="10:30" step="300"></label>
      <label for="xt">Tipo<select id="xt"><option value="rep">Reposição</option><option value="adi">Adiantamento de aula</option><option value="extra">Aula extra, avulsa ou do pacote</option></select></label></div>
      <div class="row-actions"><button class="primary" data-act="addok">Adicionar</button><button class="ghost" data-act="addcancel">Cancelar</button></div></div></div>`;
    }
  }
  { const pk=ativos().map(a=>({a,u:pacUso(a)})).filter(x=>x.u&&(x.u.rest<=3||(x.u.dias!=null&&x.u.dias<=14)));
    if(pk.length)h+=`<div class="banner pacb"><div class="grow"><b>Pacotes:</b> ${pk.map(x=>`${esc(x.a.nome)} ${x.u.rest<=0?`<b class="neg">encerrado${x.u.rest<0?` (${-x.u.rest} a mais)`:''}</b>`:x.u.vencido?`<b class="neg">vencido com ${x.u.rest} sobrando: reagendar ou perdidas?</b>`:`<b>falta${x.u.rest>1?'m':''} ${x.u.rest}${x.u.dias!=null&&x.u.dias<=14?`, vence ${x.u.dias===0?'hoje':x.u.dias===1?'amanhã':`em ${x.u.dias} dias`}`:''}</b>`}`).join(' · ')}. Resolva na aba Alunos.</div></div>`; }
  if(!items.length){h+=`<div class="empty">Nenhum aluno agendado para ${DIAS[d.getDay()].toLowerCase()}.</div>`;main.innerHTML=h;return}
  const HD=horasDia(k);
  if(!off)h+=`<div class="hbar"><div><b>${hfmt(HD.prev)}</b><span>previstas</span></div><div><b class="pos">${hfmt(HD.dadas)}</b><span>dadas</span></div><div><b class="${HD.nao?'neg':''}">${hfmt(HD.nao)}</b><span>não dadas</span></div><div><b class="${HD.pend?'wrn':''}">${hfmt(HD.pend)}</b><span>${k>today()?'a dar':'sem marcar'}</span></div></div>`;
  const groups={};items.forEach(i=>(groups[i.hora]=groups[i.hora]||[]).push(i));
  h+=`<div class="card" style="padding-block:4px">`;
  for(const [hr,list] of Object.entries(groups)){
    const gs=HD.grupos[hr];
    h+=`<div class="pslot"><div class="hour">${hr}${gs&&!off?`<span class="hst ${gs}">${gs==='dada'?'dada':gs==='nao'?'não dada':''}</span>`:''}</div><div class="people">`;
    for(const i of list){
      const tag=i.tipo==='rep'?'<span class="tag">Reposição</span>':i.tipo==='adi'?'<span class="tag">Adiantamento</span>':i.tipo==='extra'?'<span class="tag">Extra</span>':(i.hora!==i.orig?`<span class="tag moved">era ${i.orig}</span>`:'');
      const dis=off?'disabled':'';
      const auto=!off&&i.tipo==='fixo'&&!i.status&&k<today()&&k>=INICIO;
      h+=`<div class="p" data-s="${off?'':(auto?'f':i.status)}" data-tp="${i.tipo}"><div class="p-top"><button class="p-name rpfname" data-rpfm="${i.key}" data-k="${k}" ${off?'disabled':''}>${esc(i.a.nome)} <span class="rpfed" aria-hidden="true">✎</span></button>${tag}${pacTagP(i.a)}${auto?'<span class="tag moved">falta automática</span>':''}
        <input class="tm" type="time" step="300" value="${i.hora}" aria-label="Horário de ${esc(i.a.nome)}" data-k="${i.key}" data-t="${i.tipo}" ${dis}></div>
        <div class="seg"><button data-st="p" data-k="${i.key}" data-t="${i.tipo}" class="${i.status==='p'?'on-p':''}" ${dis}>Presente</button>
        <button data-st="f" data-k="${i.key}" data-t="${i.tipo}" class="${i.status==='f'?'on-f':''}" ${dis}>Faltou</button>
        ${i.status?`<button data-st="" data-k="${i.key}" data-t="${i.tipo}" ${dis}>Limpar</button>`:''}
        ${i.tipo!=='fixo'?`<button data-act="rmx" data-k="${i.key}">Remover</button>`:''}</div>
        ${i.status==='f'&&(i.tipo==='fixo'||i.a.tipo==='pacote')?(i.a.tipo==='pacote'?`<div class="seg"><span class="lbl">Falta no pacote:</span>${[['rep','Reagendar · avisou a tempo'],['nao','Perdeu · não avisou']].map(([v,l])=>`<button data-dest="${v}" data-k="${i.key}" data-t="${i.tipo}" class="${(i.destino||'rep')===v?'on-d':''}">${l}</button>`).join('')}</div><p class="pkrule">${(i.destino||'rep')==='nao'?'Aula perdida: conta como dada no pacote.':'Não gasta aula do pacote. Lance a reposição como "+ Reposição" no dia combinado.'}</p>`:`<div class="seg"><span class="lbl">Essa falta:</span>${Object.entries(DEST).map(([v,l])=>`<button data-dest="${v}" data-k="${i.key}" class="${(i.destino||'rep')===v?'on-d':''}">${l}</button>`).join('')}</div>`)+((i.destino||'rep')==='rep'?`<button class="rpfbtn" data-rpfm="${i.key}" data-k="${k}">${i.repK?`📅 Reposição: ${DC[dOf(i.repK).getDay()]} ${dOf(i.repK).getDate()}/${dOf(i.repK).getMonth()+1} às ${i.repH} · mudar`:'📅 Marcar data da reposição'}</button>`:''):''}
      </div>`;
    }
    h+=`</div></div>`;
  }
  h+=`</div>`;
  main.innerHTML=h;
}

/* Mensagens de confirmação de aula pelo WhatsApp (um toque por aluno) */
const CONF_DEF="Olá, {nome}! Confirmando sua aula {dia} às {hora}. Posso contar com você? 💪";
let confOpen=false;
function confTel(a){ let d=String(a.tel||"").replace(/\D/g,""); if(!d) return ""; if(d.length<=11) d="55"+d.replace(/^0+/,""); return d; }
function confDia(k){ const t=today(); if(k===t) return "hoje"; if(k===addDays(t,1)) return "amanhã"; const d=dOf(k); return DIAS[d.getDay()].toLowerCase()+" ("+d.getDate()+"/"+(d.getMonth()+1)+")"; }
function confHTML(k,items){ const tpl=String((BR().confMsg)||"").trim()||CONF_DEF; const L=items.filter(i=>i.status!=='f'&&i.a&&!isFicha(i.a)).sort((x,y)=>x.hora.localeCompare(y.hora));
  if(!L.length) return "";
  const txt=i=>tpl.replace(/\{nome\}/g,first(i.a.nome)).replace(/\{hora\}/g,i.hora).replace(/\{dia\}/g,confDia(k));
  return `<details class="card confbox" ${confOpen?"open":""} data-confd><summary><b>📲 Confirmar as aulas de ${confDia(k)} pelo WhatsApp</b> <span class="muted">· ${L.length}</span></summary>
    ${soonHTML()}${(()=>{ const sent=confSent(k), C=L.filter(i=>confTel(i.a)), nx=C.find(i=>!sent[i.key]), feitos=C.filter(i=>sent[i.key]).length;
      return C.length? `<div class="confseq">${nx?`<a class="btn primary confnext" data-confsend="${esc(nx.key)}" data-confk="${k}" href="https://wa.me/${confTel(nx.a)}?text=${encodeURIComponent(txt(nx))}" target="_blank" rel="noopener">📲 ${feitos?"Próximo":"Começar"}: ${esc(first(nx.a.nome))} (${nx.hora}) ➜</a>`:`<b class="pos">✓ Todas enviadas</b>`}<small class="muted">${feitos} de ${C.length} enviadas. Mande e volte aqui: o próximo já fica pronto.</small></div>` : ""; })()}
    <div class="confl">${L.map(i=>{ const t=confTel(i.a), sent=confSent(k)[i.key]; return `<div class="confr ${sent?"sent":""}"><b>${i.hora}</b><span>${esc(i.a.nome)}${sent?` <small class="pos">✓ enviada</small>`:""}</span>${t?`<a class="btn small ${sent?"":"primary"}" data-confsend="${esc(i.key)}" data-confk="${k}" href="https://wa.me/${t}?text=${encodeURIComponent(txt(i))}" target="_blank" rel="noopener">${sent?"De novo":"Enviar"}</a>`:`<small class="muted">sem WhatsApp</small>`}</div>`; }).join("")}</div>
    <label class="confm">Mensagem (use {nome}, {dia} e {hora})<textarea class="inp" id="confMsg" rows="3">${esc(tpl)}</textarea></label>
    <small class="muted">Use as setas ‹ › do dia para mandar as de amanhã. Cada toque abre a conversa do aluno com o texto pronto: é só enviar.</small></details>`; }
main.addEventListener('toggle',e=>{ if(e.target.matches&&e.target.matches('[data-confd]')) confOpen=e.target.open; },true);
/* Envio em sequência: marca quem já recebeu (neste aparelho) e deixa o próximo pronto quando você volta do WhatsApp */
function confSent(k){ try{ return JSON.parse(localStorage.getItem('rp_conf_'+k)||'{}'); }catch(_){ return {}; } }
main.addEventListener('click',e=>{ const a=e.target.closest&&e.target.closest('[data-confsend]'); if(!a) return; const k=a.dataset.confk, m=confSent(k); m[a.dataset.confsend]=Date.now(); try{ localStorage.setItem('rp_conf_'+k,JSON.stringify(m)); }catch(_){} setTimeout(()=>{ try{ render(); }catch(_){} },400); });
document.addEventListener('visibilitychange',()=>{ if(!document.hidden&&confOpen) try{ render(); }catch(_){} });
main.addEventListener('change',e=>{ const t=e.target; if(!t.matches||!t.matches('[data-rpmot],[data-rpobs]')) return; const key=t.dataset.key, f=t.hasAttribute('data-rpmot')?'motivo':'obs', v=t.value.trim().slice(0,120);
  mutDay(t.dataset.k,d=>{ const r=Object.assign(d.registros[key]||{},{status:'f'}); r.destino=r.destino||'rep'; if(v) r[f]=v; else delete r[f]; d.registros[key]=r; }); toast('Motivo guardado'); });
main.addEventListener('change',e=>{ if(e.target.id!=='confMsg') return; S.brand=Object.assign({},S.brand||{},{confMsg:e.target.value}); save(); render(); toast('Mensagem guardada'); });
function renderMes(){
  const ym=st.month,[y,m]=ym.split('-').map(Number),ks=diasDoMes(ym);
  const cnt=[0,0,0,0,0,0,0];ks.forEach(k=>cnt[dOf(k).getDay()]++);
  const cinco=[1,2,3,4,5].filter(w=>cnt[w]===5).map(w=>DIAS[w].toLowerCase());
  const offs=ks.filter(k=>isOff(k)&&dOf(k).getDay()>0&&dOf(k).getDay()<6);
  const S=[...statsMes(ym).values()].filter(x=>!isFicha(x.a)),saldo=saldoRepos();
  const tot=S.reduce((t,x)=>({ag:t.ag+x.agenda,pr:t.pr+x.pres,rep:t.rep+x.rep,desc:t.desc+x.desconto,q:t.q+x.quinta,pend:t.pend+x.pend}),{ag:0,pr:0,rep:0,desc:0,q:0,pend:0});
  let h=`<div class="daybar"><button class="iconbtn" data-act="mprev" aria-label="Mês anterior">‹</button>
    <div class="t"><h2>${MESES[m-1][0].toUpperCase()+MESES[m-1].slice(1)} ${y}</h2>
    <small>${cinco.length?`5 vezes no mês: ${cinco.join(', ')}`:'Nenhum dia útil com 5 ocorrências'}</small></div>
    <button class="iconbtn" data-act="mnext" aria-label="Próximo mês">›</button></div>`;
  if(!loadedA){main.innerHTML=h+`<div class="empty">Carregando…</div>`;return}
  if(ym<INICIO.slice(0,7)){const H=hist.get(ym);
    if(!H||!H.alunos){main.innerHTML=h+`<div class="empty">Sem registro deste mês. O controle começou em ${mesCurto(INICIO.slice(0,7))}.</div>`;return}
    const rows=Object.entries(H.alunos).map(([id,v])=>({id,a:alunos.get(id),v})).filter(r=>r.a).sort((p,q)=>p.a.nome.localeCompare(q.a.nome,'pt-BR'));
    const tc=rows.reduce((t,r)=>t+r.v.contr,0),tf=rows.reduce((t,r)=>t+r.v.feitas,0);
    h+=`<div class="kpis"><div class="kpi"><b>${tc}</b><span>aulas contratadas</span></div><div class="kpi"><b class="pos">${tf}</b><span>aulas feitas</span></div><div class="kpi"><b class="neg">${tc-tf}</b><span>não feitas</span></div><div class="kpi"><b>${rows.length}</b><span>alunos</span></div></div>
    <div class="tablewrap"><table><thead><tr><th>Aluno</th><th>Contrat.</th><th>Feitas</th><th>Não feitas</th><th>Diferença</th></tr></thead><tbody>`+rows.map(r=>{const dd=r.v.feitas-r.v.contr;return `<tr><td><button class="linkbtn" data-ver="${r.id}">${esc(r.a.nome)}</button>${r.a.ativo===false?'<span class="sub">inativo</span>':''}</td><td>${r.v.contr}</td><td>${r.v.feitas}</td><td>${Math.max(0,-dd)||'–'}</td><td>${dd>0?`<span class="pos">+${dd}</span>`:dd<0?`<span class="neg">${dd}</span>`:'0'}</td></tr>`}).join('')+`</tbody></table></div>
    <p class="note">Mês importado da sua planilha antiga.</p>
    `;
    main.innerHTML=h;return}
  const HM=horasMes(ym),fat=ativos().reduce((s,a)=>s+(r_perm(a)?0:mensal(a)),0);
  h+=`<div class="card" style="margin-block:8px 0"><h3>Horas trabalhadas</h3><div class="hbar" style="margin:0"><div><b>${hfmt(HM.prev)}</b><span>previstas</span></div><div><b class="pos">${hfmt(HM.dadas)}</b><span>dadas</span></div><div><b class="${HM.nao?'neg':''}">${hfmt(HM.nao)}</b><span>não dadas</span></div><div><b>${hfmt(HM.pend)}</b><span>a dar</span></div></div>
  ${fat&&HM.prev?`<p class="note" style="margin-bottom:0">Faturamento previsto ${brl(fat)} ÷ ${HM.prev}h previstas = <b>${brl(fat/HM.prev)} por hora</b>${HM.dadas?`. Até agora: ${HM.dadas}h dadas.`:''}</p>`:''}</div>`;
  h+=`<div class="kpis"><div class="kpi"><b>${tot.ag}</b><span>aulas na agenda</span></div>
    <div class="kpi"><b>${tot.pr}</b><span>presenças registradas</span></div>
    <div class="kpi"><b>${tot.q}</b><span>aulas de 5ª semana (${BR().q5==="cobra"?"cobradas":"sem cobrar"})</span></div>
    <div class="kpi"><b>${brl(tot.desc)}</b><span>a abater em valor</span></div></div>`;
  h+=`<p class="note">Dias sem aula no mês: ${offs.length?offs.map(k=>`${dOf(k).getDate()}/${m} (${esc(offReason(k))})`).join(', '):'nenhum'}. ${tot.pend?`<span class="wrn">${tot.pend} chamada${tot.pend>1?'s':''} de hoje sem marcar — vira falta amanhã.</span>`:''}</p>`;
  if(!S.length){main.innerHTML=h+`<div class="empty">Nenhum aluno cadastrado.</div>`;return}
  { const dv=S.filter(x=>(saldo.get(x.a.id)||0)>0).length;
  h+=`<div class="mc-leg"><span><i class="g"></i>veio</span><span><i class="r"></i>faltou</span><span><i class="y"></i>hoje, sem marcar</span><span><i class="c"></i>ainda vai acontecer</span></div>
  ${dv?`<button class="mc-sum mc-sumb" data-repall>🔁 <b>${dv} aluno${dv>1?"s":""}</b> com aula para repor <span class="muted">· ${REP_OPEN==='all'?'fechar ▴':'ver quem ▾'}</span></button>`:`<p class="mc-sum ok">✅ Ninguém deve reposição</p>`}
  ${REP_OPEN==='all'?`<div class="card reppan"><div class="rp-h"><b>🔁 Quem tem aula para repor</b><button class="iconbtn" data-repx aria-label="Fechar">✕</button></div>${S.map(x=>({x,sr:saldo.get(x.a.id)||0})).filter(o=>o.sr>0).sort((p,q)=>q.sr-p.sr).map(o=>`<button class="rp-al" data-repal="${o.x.a.id}"><span>${esc(o.x.a.nome)}</span><b>Repor ${o.sr} aula${o.sr>1?'s':''} ›</b></button>`).join('')}<p class="note" style="margin:6px 0 0">Toque no aluno para ver os dias que ele faltou e decidir se repõe.</p></div>`:''}
  <div class="mc-list">`;
  for(const x of S){
    const sr=saldo.get(x.a.id)||0, vAg=Math.max(0,x.pres-x.reposFeitas-x.extras-(x.adi||0)), T=Math.max(1,x.agenda);
    const seg=(n,c)=>n?`<i class="${c}" style="flex:${n}"></i>`:"";
    const chip= sr>0?`<button class="mc-chip dev" data-repal="${x.a.id}">Repor ${sr} aula${sr>1?"s":""} ›</button>`: sr<0?`<span class="mc-chip adi">${-sr} adiantada${sr<-1?"s":""}</span>`:`<span class="mc-chip ok">Em dia</span>`;
    const extra=[x.reposFeitas?`🔁 ${x.reposFeitas} reposição feita${x.reposFeitas>1?"s":""}`:"", x.auto?`⚠ ${x.auto} falta${x.auto>1?"s":""} porque a chamada não foi marcada`:"", x.abt?`💲 ${x.abt} a abater${x.valorAula?" ("+brl(x.desconto)+")":""}`:"", x.nao?`${x.nao} falta${x.nao>1?"s":""} sem repor`:"", x.quinta?`+${x.quinta} da 5ª semana`:"", x.feriado?`${x.feriado} sem aula (feriado/viagem)`:"", x.extras?`+${x.extras} aula extra`:""].filter(Boolean);
    h+=`<div class="mc"><div class="mc-h"><button class="linkbtn mc-n" data-ver="${x.a.id}">${esc(x.a.nome)}</button>${chip}</div>
      <span class="mc-hr">${(x.a.slots||[]).map(s=>DC[s.d]+' '+s.h).join(' · ')}</span>
      ${x.agenda?`<div class="mc-bar">${seg(vAg,"g")}${seg(x.falta,"r")}${seg(x.pend,"y")}${seg(x.fut,"c")}</div>`:""}
      <p class="mc-n2"><b class="g">✅ Veio ${vAg}</b><b class="r">❌ Faltou ${x.falta}</b>${x.pend?`<b class="y">⏳ ${x.pend} hoje</b>`:""}<span>de ${x.agenda} aula${x.agenda!==1?"s":""} no mês${x.fut?` · faltam ${x.fut}`:""}</span></p>
      ${extra.length?`<p class="mc-x">${extra.join(" · ")}</p>`:""}</div>${REP_OPEN===x.a.id?repAlHTML(x.a,sr):""}`;
  }
  h+=`</div><details class="mc-tab"><summary>Ver tabela completa</summary>`; }
  h+=`<div class="tablewrap"><table><thead><tr><th>Aluno</th><th>Contrat.</th><th>Agenda</th><th>A mais</th><th>Sem aula</th><th>Presente</th><th>Faltas</th><th>A repor</th><th>Abater</th><th>Saldo repos.</th></tr></thead><tbody>`;
  for(const x of S){
    const sr=saldo.get(x.a.id)||0;
    h+=`<tr><td><button class="linkbtn" data-ver="${x.a.id}">${esc(x.a.nome)}</button><span class="sub">${(x.a.slots||[]).map(s=>DC[s.d]+' '+s.h).join(' · ')}</span></td>
    <td>${x.contr}</td><td>${x.agenda}</td><td>${x.quinta?`<span class="pos">+${x.quinta}</span>`:'–'}</td><td>${x.feriado||'–'}</td>
    <td>${x.pres}${x.reposFeitas?`<span class="sub">${x.reposFeitas} reposição</span>`:''}${x.pend?`<span class="sub wrn">${x.pend} hoje sem marcar</span>`:''}</td>
    <td>${x.falta||'–'}${x.auto?`<span class="sub">${x.auto} automática${x.auto>1?'s':''}</span>`:''}${x.nao?`<span class="sub">${x.nao} sem repor</span>`:''}</td>
    <td>${x.rep?`<span class="wrn">${x.rep}</span>`:'–'}</td>
    <td>${x.abt?`<span class="neg">${x.abt} aula${x.abt>1?'s':''}</span>${x.valorAula?`<span class="sub">${brl(x.desconto)}</span>`:'<span class="sub">sem valor cadastrado</span>'}`:'–'}</td>
    <td>${sr>0?`<span class="wrn">deve ${sr}</span>`:sr<0?`<span class="pos">+${-sr} adiantada</span>`:'em dia'}</td></tr>`;
  }
  h+=`</tbody></table></div></details>
  <p class="note">Contratadas = aulas por semana × 4. Agenda = ocorrências reais no mês menos os dias sem aula. A mais = aulas acima do contratado neste mês (5ª semana), ${BR().q5==="cobra"?"cobradas pelo valor da aula":"sem cobrar"}. Chamada não marcada conta como falta a repor a partir do dia seguinte; antes de 7/10 as aulas contam como dadas. Saldo de reposição soma todos os meses: faltas marcadas "Repor" menos reposições dadas.</p>`;
  main.innerHTML=h;
}

function r_perm(a){return a.permuta===true}
function coberto(a,ym){const d=a.adiantado;return !!(d&&d.ate&&ym>=(d.desde||'0000-00')&&ym<=d.ate)}
function mesCurto(ym){const [y,m]=ym.split('-').map(Number);return MESES[m-1].slice(0,3)+'/'+String(y).slice(2)}
function addMes(ym,n){const [y,m]=ym.split('-').map(Number);const d=new Date(y,m-1+n,1);return keyOf(d).slice(0,7)}
const pad2=n=>String(n).padStart(2,'0');
/* Por aula feita: o mês é dividido em ciclos (semana, quinzena, mês ou datas escolhidas); cada ciclo cobra as aulas feitas nele */
const CICLOS={semanal:'Toda semana',quinzenal:'Por quinzena (dia 15 e fim do mês)',mensal:'Uma vez no fim do mês',datas:'Nas datas que eu escolher'};
function ciclosDe(a,ym){ const [y,m]=ym.split('-').map(Number), last=new Date(y,m,0).getDate(), D=n=>ym+'-'+pad2(n), c=a.ciclo||'quinzenal', out=[];
  const fx=(i,f,l)=>out.push({k:'c'+(out.length+1),ini:D(i),fim:D(f),l});
  if(c==='mensal') fx(1,last,'Mês todo');
  else if(c==='semanal'){ let i=1; while(i<=last){ const wd=new Date(y,m-1,i).getDay(); const f=Math.min(last,i+((7-wd)%7)); fx(i,f,'Semana '+pad2(i)+' a '+pad2(f)); i=f+1; } }
  else if(c==='datas'){ let ds=[...new Set((a.cicloDias||[]).map(x=>Math.min(last,Math.max(1,+x||0))).filter(Boolean))].sort((p,q)=>p-q); if(!ds.length) ds=[15];
    let i=1; ds.forEach(d=>{ if(d>=i){ fx(i,d,pad2(i)+' a '+pad2(d)); i=d+1; } }); if(i<=last) fx(i,last,pad2(i)+' a '+pad2(last)+' (fim do mês)'); }
  else { fx(1,Math.min(15,last),'1ª quinzena (01 a 15)'); fx(16,last,'2ª quinzena (16 a '+pad2(last)+')'); }
  return out; }
function aulasDias(a,ini,fim){ const hoje=today(), out=[]; for(let k=ini;k<=fim&&k<=hoje;k=addDia(k)) for(const i of agendaDoDia(k)) if(i.a.id===a.id&&(i.status==='p'||i.status==='x')) out.push(k); return out; }
function aulasFeitas(a,ini,fim){ const hoje=today(); let n=0; for(let k=ini;k<=fim&&k<=hoje;k=addDia(k)) for(const i of agendaDoDia(k)) if(i.a.id===a.id&&(i.status==='p'||i.status==='x')) n++; return n; }
function addDia(k){ const d=dOf(k); d.setDate(d.getDate()+1); return isoD2(d); }
function isoD2(d){ return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate()); }
function diasTxt(L){ L=(L||[]).map(k=>k.slice(8,10)); if(!L.length) return ""; return L.length>1? L.slice(0,-1).join(", ")+" e "+L[L.length-1] : L[0]; }
function diaVenc(a){ return Math.min(31,Math.max(1,+a.diaVenc||10)); }
function prazoDe(a,ym,pp){ pp=pp||{}; if(pp.ate) return pp.ate; if(pp.venc) return pp.venc; const [y,m]=ym.split('-').map(Number); const last=new Date(y,m,0).getDate(); return ym+'-'+pad2(Math.min(diaVenc(a),last)); }
/* cada parte com sua data de vencimento; o que já foi pago cobre as partes em ordem */
function dueParts(r,ym){ const pp=r.pp||{}, last=new Date(+ym.slice(0,4),+ym.slice(5,7),0).getDate();
  if(r.pa) return (r.partes.length?r.partes:[{v:0,l:'',k:'',due:ym+'-'+pad2(last)}]).map(t=>({v:t.v,l:t.l,k:t.k,due:t.due,cob:pp[t.k]?t.v:0,resta:(pp[t.k]||t.mv)?0:t.v}));
  const L=(r.a.forma==='parcelas'&&r.partes&&r.partes.length>1&&r.partes[0].dia)? r.partes.map(t=>({v:t.v,l:t.l,k:t.k,due:ym+'-'+pad2(Math.min(t.dia,last))})) : [{v:r.valor,l:'',k:'',due:prazoDe(r.a,ym,{})}];
  if(pp.ate||pp.venc){ const d=pp.ate||pp.venc; L.forEach(t=>{ if(t.due<d) t.due=d; }); }
  let cob=r.pago; return L.map(t=>{ const c=Math.min(t.v,Math.max(0,cob)); cob-=c; return {...t,cob:c,resta:Math.max(0,t.v-c)}; }); }
function proxPrazo(r,ym){ const L=dueParts(r,ym), t=L.find(x=>x.resta>0.005); return t? t.due : L[L.length-1].due; }
function vencidos(){ if(!loadedA) return []; const hoje=today(), out=new Map(); const ini=(INICIO||hoje).slice(0,7);
  for(let k=2;k>=0;k--){ const ym=addMes(hoje.slice(0,7),-k); if(ym<ini) continue; let F; try{ F=finCalc(ym); }catch(e){ continue; }
    F.rows.forEach(r=>{ if(r.stt!=='no'&&r.stt!=='part') return; const L=dueParts(r,ym).filter(t=>t.resta>0.005&&hoje>t.due); if(!L.length) return;
      const falta=L.reduce((t,x)=>t+x.resta,0);
      if(!out.has(r.a.id)) out.set(r.a.id,{a:r.a,ym,prazo:L[0].due,prometido:!!(r.pp&&r.pp.ate),falta}); else out.get(r.a.id).falta+=falta; }); }
  return [...out.values()]; }
function prazoHTML(r){ if(r.pa||(r.stt!=='no'&&r.stt!=='part')) return ''; const pp=r.pp||{}, pz=proxPrazo(r,st.month), atras=today()>pz, multi=r.a.forma==='parcelas'&&r.partes.length>1&&r.partes[0].dia;
  const dias=atras? Math.round((dOf(today())-dOf(pz))/864e5) : 0;
  return `<div class="prazo ${atras?'atras':''}">${atras?`<b>⚠ Vencido há ${dias} dia${dias>1?'s':''}</b> (${pp.ate?'prometeu':'venceu'} ${pz.slice(8,10)}/${pz.slice(5,7)})`:`<b>📅 ${pp.ate?'Prometeu pagar até':'Vence'} ${pz.slice(8,10)}/${pz.slice(5,7)}</b>`}
    ${multi?`<div class="prz-p">${dueParts(r,st.month).map((t,i)=>`<label class="${t.resta<=0.005?'ok':today()>t.due?'atras':''}"><span>${i+1}ª · ${brl(t.v)} · ${t.resta<=0.005?'✓ paga':today()>t.due?'vencida':'a pagar'}</span>${t.resta>0.005&&r.partes[i]&&!(r.pp||{})[r.partes[i].k]?`<button class="przpay" data-pay="${r.partes[i].k}" data-id="${r.a.id}">✓ Pagou</button>`:''}<span>dia <input type="number" inputmode="numeric" min="1" max="31" data-pdia="${i}" data-id="${r.a.id}" value="${r.partes[i].dia}"></span></label>`).join('')}</div>`:''}
    ${!multi&&r.partes.length===1&&!pp[r.partes[0].k]?`<button class="przpay przpay1" data-pay="${r.partes[0].k}" data-id="${r.a.id}">✓ Pagou</button>`:''}<div class="prz-g">${multi?'':`<label>Vence todo dia<input type="number" inputmode="numeric" min="1" max="31" data-diavenc="${r.a.id}" value="${diaVenc(r.a)}"></label>`}
    <label>Neste mês vence em<input type="date" data-pvenc="${r.a.id}" value="${pp.venc||''}"></label>
    <label>Pendente até (combinado)<input type="date" data-pate="${r.a.id}" value="${pp.ate||''}"></label></div></div>`; }
function payDateHTML(id,k,v){ const d=typeof v==='string'&&/^\d{4}-/.test(v)? v : ''; return `<label class="pdate">pago em <input type="date" data-paydate="${k}" data-id="${id}" value="${d}"></label>`; }
const AJ_MOT=['Abateu aula','Desconto','Combinado diferente','Feriado / viagem','Outros'];
const AV_EXTRA=['Aula avulsa','Aula extra','Reposição paga'];
const AV_MOT=['Aula avulsa','Aula extra','Reposição paga','Diferença / ajuste','Pagou a mais','Outros'];
function partesDe(a,valor){
  const f=a.forma||'mensal';
  if(f==='parcelas'){ const va=valorAula(a); return parcSplit(parcList(a),valor).map((p,i)=>({k:'p'+(i+1),l:(i+1)+'ª · dia '+p.dia,v:p.v,dia:p.dia})).map(t=>va>0?{...t,aulas:Math.round(t.v/va)}:t); }
  if(f==='semanal'){ const spw=Math.max(1,(a.slots||[]).length), va=valorAula(a);
    if(va>0){ const perW=va*spw, n=Math.max(1,Math.round(valor/perW)); return Array.from({length:n},(_,i)=>{ const v= i<n-1? perW : Math.max(0,valor-perW*(n-1)); return {k:'s'+(i+1),l:(i+1)+'ª semana',v,aulas:Math.round(v/va)}; }); }
    return [1,2,3,4].map(i=>({k:'s'+i,l:i+'ª semana',v:valor/4})); }
  return [{k:'pago',l:'Pago',v:valor}];
}
function advForm(a){
  const d=a.adiantado||{},hoje=today().slice(0,7);
  const rec=d.recebidoEm||st.month,desde=d.desde||st.month,ate=d.ate||addMes(desde,2);
  const opt=(base,from,to,sel)=>{const o=[];for(let i=from;i<=to;i++){const m=addMes(base,i);o.push(`<option value="${m}" ${m===sel?'selected':''}>${MESES[+m.slice(5)-1]} de ${m.slice(0,4)}</option>`)}return o.join('')};
  return `<div class="form" style="border-top:1px solid var(--line);padding-top:10px">
    <div class="two"><label for="adv-rec">Recebi em<select id="adv-rec">${opt(hoje,-12,1,rec)}</select></label>
    <label for="adv-v">Valor total recebido (R$)<input id="adv-v" type="number" inputmode="decimal" min="0" step="10" value="${d.valor||''}" placeholder="ex.: ${Math.round(mensal(a)*3)||1500}"></label></div>
    <div class="two"><label for="adv-desde">Cobre de<select id="adv-desde">${opt(hoje,-12,12,desde)}</select></label>
    <label for="adv-ate">Até<select id="adv-ate">${opt(hoje,-12,24,ate)}</select></label></div>
    <p class="note">O valor entra como recebido só no mês em que você recebeu. Nos meses cobertos o aluno aparece pago, sem cobrança e sem somar no recebido. Depois do último mês, a cobrança volta ao normal.</p>
    <div class="row-actions"><button class="primary" data-advok="${a.id}">Salvar adiantamento</button><button class="ghost" data-act="advno">Cancelar</button></div></div>`;
}
function kpiPanel(rows,ym){
  if(!st.kpi)return '';
  const nm=r=>`<button class="kname" data-goto="${r.a.id}">${esc(r.a.nome)}</button>`;
  if(st.kpi==='rec'){
    const L=rows.filter(r=>r.stt!=='adv'&&r.stt!=='perm'&&(r.pago+(r.avX||0))>0.005);
    const A=ativos().filter(a=>a.adiantado&&a.adiantado.recebidoEm===ym&&+a.adiantado.valor>0);
    const tot=L.reduce((t,r)=>t+Math.min(r.pago,r.valor)+(r.avX||0),0)+A.reduce((t,a)=>t+ +a.adiantado.valor,0);
    return `<div class="card kpanel"><h3>Já pagaram em ${mesCurto(ym)}</h3>${L.length||A.length?`<div class="klist">${L.map(r=>`<div class="krow ok">${nm(r)}<span>${brl(Math.min(r.pago,r.valor)+(r.avX||0))}${r.pago>r.valor+0.005?` <small class="neg">+${brl(r.pago-r.valor)} a mais</small>`:''}${r.stt==='part'?` <small>de ${brl(r.valor)}</small>`:''}${r.avX?` <small>inclui ${brl(r.avX)} extra</small>`:''}</span></div>`).join('')}${A.map(a=>`<div class="krow ok"><button class="kname" data-goto="${a.id}">${esc(a.nome)}</button><span>${brl(+a.adiantado.valor)} <small>adiantado até ${mesCurto(a.adiantado.ate)}</small></span></div>`).join('')}</div><div class="ktot">Total recebido <b>${brl(tot)}</b></div>`:'<p class="note">Ninguém pagou ainda neste mês.</p>'}</div>`;
  }
  if(st.kpi==='pend'){
    const L=rows.filter(r=>r.stt==='no'||r.stt==='part');
    const tot=L.reduce((t,r)=>t+Math.max(0,r.valor-r.pago),0);
    return `<div class="card kpanel"><h3>Falta receber em ${mesCurto(ym)}</h3>${L.length?`<div class="klist">${L.map(r=>`<div class="krow no">${nm(r)}<span>${brl(r.valor-r.pago)}${r.stt==='part'?` <small>pagou ${brl(r.pago)}</small>`:''}</span></div>`).join('')}</div><div class="ktot">Total a receber <b class="neg">${brl(tot)}</b></div>`:'<p class="note">Todo mundo pagou. 🎉</p>'}</div>`;
  }
  const ok=rows.filter(r=>r.stt==='ok'||r.stt==='adv'||r.stt==='pac'),no=rows.filter(r=>r.stt==='no'||r.stt==='part'),pm=rows.filter(r=>r.stt==='perm');
  const col=(c,t,L,x)=>`<div class="kcol ${c}"><b>${t} · ${L.length}</b>${L.length?L.map(r=>`<button class="kname" data-goto="${r.a.id}">${esc(r.a.nome)}${x?x(r):''}</button>`).join(''):'<small>ninguém</small>'}</div>`;
  return `<div class="card kpanel"><h3>Situação de ${mesCurto(ym)}</h3><div class="kcols">
    ${col('ok','Pagaram',ok,r=>r.stt==='adv'?' <small>adiantado</small>':r.stt==='pac'?' <small>pacote</small>':'')}${col('no','Não pagaram',no,r=>r.stt==='part'?' <small>parcial</small>':'')}${col('pm','Permutas',pm)}</div>
    <p class="note" style="margin:8px 0 0">Toque no nome para ir ao pagamento do aluno.</p></div>`;
}
function finCardHTML(f){ const [y,m]=f.ym.split('-').map(Number), br=BR(), G=TH().g, RED='#E5534B';
  const ok=f.rows.filter(r=>r.stt==='ok'||r.stt==='adv'||r.stt==='pac'), no=f.rows.filter(r=>r.stt==='no'||r.stt==='part'), pm=f.rows.filter(r=>r.stt==='perm');
  const li=(r,v,c)=>`<div style="display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid #2A2A2A;font-size:13px"><span style="color:#EDE6DA;text-align:left">${esc(r.a.nome)}</span><b style="color:${c||'#EDE6DA'};white-space:nowrap">${v}</b></div>`;
  const tile=(v,l,c)=>`<div class="pc-t"><b style="font-size:22px;${c?`color:${c}`:''}">${v}</b><span>${l}</span></div>`;
  return `<div class="pcard" style="${thVars()}">
    <div class="pc-logo">${logoHTML()}<span class="pc-n">${esc(br.nome).toUpperCase()}</span><span class="pc-s">${esc(br.sub).toUpperCase()}</span></div>
    <p class="pc-k">FINANCEIRO · ${MESES[m-1].toUpperCase()} ${y}</p>
    <div class="pc-tiles" style="grid-template-columns:repeat(3,1fr)">${tile(brl(f.prev),'previsto')}${tile(brl(f.rec),'recebido',G)}${tile(brl(f.pend!=null?f.pend:Math.max(0,f.prev-f.rec)),'a receber',(f.pend!=null?f.pend:f.prev-f.rec)>0.005?RED:'')}</div>
    <p class="pc-k" style="margin-top:6px">PAGARAM · ${ok.length}</p><div>${ok.map(r=>li(r,r.stt==='adv'?'adiantado':r.stt==='pac'?'pacote':brl(Math.min(r.pago,r.valor)),G)).join('')||'<p class="pc-p">Ninguém ainda.</p>'}</div>
    <p class="pc-k" style="margin-top:6px">FALTA RECEBER · ${no.length}</p><div>${no.map(r=>li(r,brl(Math.max(0,r.valor-r.pago))+(r.stt==='part'?' (parcial)':''),RED)).join('')||'<p class="pc-p">Todos pagaram.</p>'}</div>
    ${pm.length?`<p class="pc-k" style="margin-top:6px">PERMUTAS · ${pm.length}</p><div>${pm.map(r=>li(r,'permuta')).join('')}</div>`:''}
    ${f.advNovo?`<p class="pc-p">O recebido inclui ${brl(f.advNovo)} de pagamentos adiantados recebidos neste mês.</p>`:''}
    <p class="pc-sig">Gerado em ${dOf(today()).toLocaleDateString('pt-BR')} · uso interno</p><div class="pc-bar"></div></div>`; }
async function finPdf(){ const f=st._fin; if(!f){toast('Abra o Financeiro de novo.');return}
  if(!window.jspdf||!window.html2canvas){toast('O gerador de PDF não carregou. Recarregue a página.');return}
  toast('Gerando o PDF…');
  try{ const doc=await cardPdf(finCardHTML(f)); const nome='Financeiro-'+f.ym+'.pdf';
    await offerFile(doc.output('blob'),nome,{share:false,imgs:[{src:doc._img,name:nome.replace(/\.pdf$/,'.jpg')}]}); }
  catch(e){ toast('Não consegui gerar o PDF ('+erroPT(e)+').'); } }
function finCalc(ym){
  const S=statsMes(ym),P=pags.get(ym)||{};
  let prev=0,rec=0,advNovo=0,advCob=0;const rows=[];
  for(const a of ativos()){
    if(a.cobraMes&&ym<a.cobraMes){ rows.push({a,bruto:0,desc:0,valor:0,partes:[],pp:P[a.id]||{},pago:0,stt:'na',cobraMes:a.cobraMes}); continue; }
    if(a.tipo==='pacote'){const pp=Object.assign({},P[a.id]||{}),pk=pacoteDoMes(a,ym),u=pacUso(a);
      if(!pk){rows.push({a,bruto:1,desc:0,valor:0,partes:[],pp,pago:0,stt:r_perm(a)?'perm':'pac',u});continue}
      const tot=+pk.valor||0,n=pk._n,base=Math.floor(tot/n*100)/100,v=n>1?(pk._i===n-1?Math.round((tot-base*(n-1))*100)/100:base):tot;
      const leg=Object.keys(pp).find(x=>/^pac\d{8}$/.test(x)&&pp[x]); if(leg&&pp.pac==null){ pp.pac=pp[leg]; }
      const partes=[{k:'pac',l:n>1?`Parcela ${pk._i+1} de ${n}`:'Pacote',v}],av=(pp.avulsos||[]);
      const pago=partes.filter(t=>pp[t.k]).reduce((s2,t)=>s2+t.v,0)+av.reduce((s2,t)=>s2+(+t.v||0),0);
      const stt=r_perm(a)?'perm':!v?'na':pago>=v-0.005?'ok':pago>0?'part':'no';
      if(stt==='perm'){rows.push({a,bruto:v,desc:0,valor:v,partes,pp,pago:0,stt,pk,u});continue}
      prev+=v;rec+=pago;rows.push({a,bruto:v,desc:0,valor:v,partes,pp,pago,stt,pk,u});continue}
    if((a.forma==='poraula'||a.tipo==='avulsa')&&!isFicha(a)){ const pp=P[a.id]||{}, va=valorAula(a), hoje=today(), av=(pp.avulsos||[]);
      const mv=pp.mv||{};
      const partes=ciclosDe(a,ym).map(c=>{ const n=aulasFeitas(a,c.ini,c.fim); const m2=!pp[c.k]&&mv[c.k]; return {k:c.k,l:c.l,v:n*va,aulas:n,due:c.fim,dias:aulasDias(a,c.ini,c.fim),mv:m2||"",venc:!m2&&hoje>c.fim&&n>0&&!pp[c.k],aberto:hoje<=c.fim}; }).filter(t=>t.aulas>0||pp[t.k]);
      /* aulas não pagas do mês anterior que foram passadas para este mês */
      { const pym=addMes(ym,-1), PP=(pags.get(pym)||{})[a.id]||{}; const M=PP.mv||{}; Object.keys(M).filter(k=>M[k]===ym&&!PP[k]).forEach(k=>{ const c=ciclosDe(a,pym).find(x=>x.k===k); if(!c) return; const n=aulasFeitas(a,c.ini,c.fim); if(!n) return; const key='ant_'+pym+'_'+k, due=ym+'-'+pad2(Math.min(diaVenc(a),28));
        partes.unshift({k:key,l:`Mês anterior (${mesCurto(pym)})`,v:n*va,aulas:n,due,dias:aulasDias(a,c.ini,c.fim),dm:pym,ant:true,venc:hoje>due&&!pp[key],aberto:hoje<=due}); }); }
      const vivas=partes.filter(t=>!t.mv);
      const valor=vivas.reduce((t,x)=>t+x.v,0), pago=vivas.filter(t=>pp[t.k]).reduce((t,x)=>t+x.v,0)+av.reduce((t,x)=>t+(+x.v||0),0);
      const antAb=partes.filter(t=>t.ant&&!pp[t.k]).reduce((t,x)=>t+x.v,0);
      const stt=r_perm(a)?'perm':!(valor>0.005)?(partes.some(t=>t.mv)?'ok':'na'):vivas.some(t=>t.venc)?'no':vivas.every(t=>pp[t.k])?'ok':'pa';
      if(stt!=='perm'){ prev+=pago+antAb; rec+=pago; }
      rows.push({a,bruto:valor||1,desc:0,valor,partes,pp,pago:stt==='perm'?0:pago,stt,pa:true,va,antAb:stt==='perm'?0:antAb}); continue; }
    const x=S.get(a.id),bruto=(a.tipo==='avulsa'?valorAula(a)*(x?x.extras:0):0)+mensal(a)+(q5Of(a,ym)==="cobra"&&x&&!isFicha(a)?x.quinta*valorAula(a):0),desc=x?x.desconto:0,pp=P[a.id]||{}; let valor=Math.max(0,bruto-desc);
    const valor0=valor; const aj=pp.aj&&num(pp.aj.v)>=0&&pp.aj.v!==''? pp.aj : null; if(aj) valor=+aj.v;
    const partes=partesDe(a,valor),av=(pp.avulsos||[]);
    const avX=av.filter(t=>AV_EXTRA.includes(t.m)).reduce((s,t)=>s+(+t.v||0),0);
    const pago=partes.filter(t=>pp[t.k]).reduce((s,t)=>s+t.v,0)+av.filter(t=>!AV_EXTRA.includes(t.m)).reduce((s,t)=>s+(+t.v||0),0);
    const n=partes.filter(t=>pp[t.k]).length;
    const adv=!r_perm(a)&&coberto(a,ym);
    const stt=r_perm(a)?'perm':adv?'adv':!(valor>0.005)?'na':(n===partes.length||pago>=valor-0.005)?'ok':pago>0?'part':'no';
    if(adv){advCob++;rows.push({a,bruto,desc,valor,partes,pp,pago:valor,stt});continue}
    if(stt==='perm'){rows.push({a,bruto,desc,valor,partes,pp,pago:0,stt});continue}
    prev+=valor+avX;rec+=pago+avX;rows.push({a,bruto,desc,valor,partes,pp,pago,stt,avX,aj,valor0});
  }
  // adiantamentos recebidos neste mês entram como dinheiro recebido agora
  for(const a of ativos()){const d=a.adiantado;if(d&&d.recebidoEm===ym&&+d.valor>0){prev+= +d.valor;rec+= +d.valor;advNovo+= +d.valor}}
  /* a receber = soma do que cada aluno ainda deve (quem pagou a mais não abate a dívida dos outros) */
  const pend=rows.filter(r=>!r.pa&&(r.stt==='no'||r.stt==='part')).reduce((t,r)=>t+Math.max(0,r.valor-r.pago),0)+rows.filter(r=>r.pa).reduce((t,r)=>t+(r.antAb||0),0);
  /* quem pagou mais que o valor do mês: o excesso não entra no recebido (senão previsto ≠ recebido + a receber) e aparece em aviso */
  const mais=rows.filter(r=>!r.pa&&r.stt!=='adv'&&r.stt!=='perm'&&r.pago>r.valor+0.005).map(r=>({a:r.a,v:r.pago-r.valor}));
  const excesso=mais.reduce((t,x)=>t+x.v,0); rec-=excesso;
  return {prev,rec,rows,advNovo,advCob,pend,mais,excesso};
}
/* Comparar meses: previsto, recebido, hora-aula, aulas dadas, alunos e diferença por aluno */
function finMet(ym){ const F=finCalc(ym), H=horasMes(ym); const pag=F.rows.filter(r=>r.valor>0.005&&r.stt!=='na'&&r.stt!=='perm'); const quit=F.rows.filter(r=>r.stt==='ok'||r.stt==='adv'||r.stt==='pac').length;
  return {ym,prev:F.prev,rec:F.rec,pend:F.pend,dadas:H.dadas,alunos:pag.length,quit,ha:H.dadas?F.rec/H.dadas:0,tk:pag.length?F.prev/pag.length:0,rows:F.rows}; }
function finCmpHTML(){ const cur=keyOf(new Date()).slice(0,7); const ini=String(INICIO||cur).slice(0,7); const L=[]; for(let ym=cur,i=0;i<24&&ym>=addMes(ini,-1);i++,ym=addMes(ym,-1)) L.push(ym);
  if(!st.cmpB||!L.includes(st.cmpB)) st.cmpB=st.month<=cur?st.month:cur; if(!st.cmpA||!L.includes(st.cmpA)) st.cmpA=addMes(st.cmpB,-1);
  const A=finMet(st.cmpA), B=finMet(st.cmpB);
  const pc=(a,b)=>{ if(!a&&!b) return '<span class="fcz">=</span>'; if(!a) return '<span class="fcup">novo</span>'; const p=(b-a)/a*100; const r=Math.round(p*10)/10; return !r?'<span class="fcz">=</span>':`<span class="${r>0?'fcup':'fcdn'}">${r>0?'▲ +':'▼ −'}${String(Math.abs(r)).replace('.',',')}%</span>`; };
  const dif=(a,b,f)=>{ const d=b-a; return Math.abs(d)<0.005?'':`<small class="${d>0?'fcup':'fcdn'}">${d>0?'+':'−'}${f(Math.abs(d))}</small>`; };
  const n=v=>String(Math.round(v)); const line=(t,k,f)=>`<div class="fcrow"><b>${t}</b><div class="fcv3"><span><small>${mesCurto(st.cmpA)}</small>${f(A[k])}</span><span><small>${mesCurto(st.cmpB)}</small>${f(B[k])}</span><span><small>diferença</small>${pc(A[k],B[k])}${dif(A[k],B[k],f)}</span></div></div>`;
  const ch=L.slice(0,6).reverse(); const M=ch.map(finMet); const mx=Math.max(1,...M.map(x=>Math.max(x.prev,x.rec)));
  const bars=`<div class="fcbars">${M.map(x=>`<div class="fcb ${x.ym===st.cmpA||x.ym===st.cmpB?'sel':''}"><span class="fcv">${x.rec>=1000?(Math.round(x.rec/100)/10).toString().replace('.',',')+' mil':Math.round(x.rec)}</span><div class="fcbt"><i class="fcp" style="height:${x.prev/mx*100}%"></i><i class="fcr" style="height:${x.rec/mx*100}%"></i></div><small>${mesCurto(x.ym)}</small></div>`).join('')}</div><p class="fclg"><i class="fcr"></i> recebido <i class="fcp"></i> previsto</p>`;
  const ids=[...new Set([...B.rows,...A.rows].map(r=>r.a.id))]; const vA=id=>{ const r=A.rows.find(x=>x.a.id===id); return r&&r.stt!=='perm'?r.valor:0; }, vB=id=>{ const r=B.rows.find(x=>x.a.id===id); return r&&r.stt!=='perm'?r.valor:0; };
  const al=ids.map(id=>({a:(B.rows.find(x=>x.a.id===id)||A.rows.find(x=>x.a.id===id)).a,x:vA(id),y:vB(id)})).filter(o=>Math.abs(o.y-o.x)>0.005).sort((p,q)=>Math.abs(q.y-q.x)-Math.abs(p.y-p.x));
  const sel=(k,v)=>`<select data-fcmp="${k}">${L.map(ym=>`<option value="${ym}" ${ym===v?'selected':''}>${IMP_MES[+ym.slice(5)-1]} ${ym.slice(0,4)}</option>`).join('')}</select>`;
  return `<div class="card fcmp"><div class="fch"><h3>📊 Comparar meses</h3><button class="iconbtn" data-fcmpopen aria-label="Fechar">✕</button></div>
  <div class="fcsel"><label>Mês 1 ${sel('cmpA',st.cmpA)}</label><label>Mês 2 ${sel('cmpB',st.cmpB)}</label></div>
  ${bars}
  <div class="fctab">
  ${line('Recebido','rec',brl)}${line('Previsto','prev',brl)}${line('A receber','pend',brl)}${line('Hora-aula (recebido ÷ horas dadas)','ha',brl)}${line('Horas de aula dadas','dadas',n)}${line('Alunos pagantes','alunos',n)}${line('Valor médio por aluno','tk',brl)}</div>
  ${al.length?`<details class="fcal"><summary>Quem mudou de valor (${al.length})</summary>${al.map(o=>`<div class="fcar"><span>${esc(o.a.nome)}</span><span>${brl(o.x)} → ${brl(o.y)}</span>${pc(o.x,o.y)}</div>`).join('')}</details>`:''}
  <p class="note" style="margin:0">Conta só os alunos ativos hoje. Mês ainda em andamento muda até o fim.</p></div>`; }
document.addEventListener('change',e=>{ const t=e.target; if(!t.matches||!t.matches('[data-fcmp]')) return; st[t.dataset.fcmp]=t.value; render(); });
/* Por que o previsto mudou em relação ao mês anterior */
function finDiffHTML(ym){ const pv=addMes(ym,-1); if(String(INICIO||"").slice(0,7)>pv) return ""; let F0,F1; try{ F0=finCalc(pv); F1=finCalc(ym); }catch(_){ return ""; }
  const d=F1.prev-F0.prev; const S0=statsMes(pv), S1=statsMes(ym); const advIn=(a,m)=>{ const d=a&&a.adiantado; return d&&d.recebidoEm===m&&+d.valor>0? +d.valor : 0; };
  const val=(r,m)=>{ if(!r) return 0; const ad=advIn(r.a,m); if(r.stt==='perm'||r.stt==='adv') return ad; if(r.pa) return (r.pago||0)+(r.antAb||0)+ad; if(r.stt==='pac') return r.pk? r.valor+ad : ad; return r.valor+(r.avX||0)+ad; };
  const it=[];
  for(const a of [...alunos.values()]){ if(a.ativo===false&&a.inativoDesde&&a.inativoDesde>pv&&a.inativoDesde<=ym){ const r0=F0.rows.find(r=>r.a.id===a.id); const v=r0?val(r0,pv):mensal(a); it.push({v:-v,saiu:1,t:`<b>${esc(first(a.nome))}</b> saiu`}); } }
  const ids=new Set([...F0.rows,...F1.rows].map(r=>r.a.id));
  for(const id of ids){ const r0=F0.rows.find(r=>r.a.id===id), r1=F1.rows.find(r=>r.a.id===id); const a=(r1||r0).a, nm=esc(first(a.nome)); const v0=val(r0,pv), v1=val(r1,ym); if(Math.abs(v1-v0)<0.005) continue;
    const why=[]; const x0=S0.get(id), x1=S1.get(id);
    if(r1&&r1.stt==='adv') why.push('já pagou este mês adiantado antes: o dinheiro entrou no mês em que pagou, por isso não entra no previsto agora'); else if(r0&&r0.stt==='adv') why.push('no mês anterior estava pago adiantado');
    if(advIn(a,ym)&&!advIn(a,pv)) why.push(`pagou adiantado neste mês (${brl(advIn(a,ym))} entram agora)`); else if(advIn(a,pv)&&!advIn(a,ym)) why.push(`no mês anterior pagou adiantado (${brl(advIn(a,pv))} entraram lá)`);
    if(r1&&r1.pa||r0&&r0.pa) why.push('cobra por aula feita: entra só o que foi pago');
    if(r1&&r1.stt==='perm') why.push('permuta');
    if(r1&&r1.cobraMes) why.push('começa a pagar depois'); else if(r0&&r0.stt==='na'&&r0.cobraMes) why.push('começou a pagar');
    if(r1&&r1.aj) why.push('valor ajustado neste mês'); if(r0&&r0.aj&&!(r1&&r1.aj)) why.push('mês anterior tinha valor ajustado');
    if(x0&&x1&&x0.agenda!==x1.agenda&&((r1&&r1.pa)||(r0&&r0.pa)||!why.length)){ const k=x1.agenda-x0.agenda; why.push(`${Math.abs(k)} ${Math.abs(k)===1?'aula':'aulas'} a ${k>0?'mais':'menos'} no mês (${x0.agenda} → ${x1.agenda})${x1.feriado?`, ${x1.feriado} em feriado`:''}`); }
    if(x0&&x1&&(x0.extras!==x1.extras)) why.push(`aulas extras: ${x0.extras} → ${x1.extras}`);
    if(!r0&&r1) why.push('entrou neste mês');
    it.push({v:v1-v0,t:`<b>${nm}</b>: ${brl(v0)} → ${brl(v1)}${why.length?` <small>(${why.join('; ')})</small>`:''}`}); }
  const saiu=it.reduce((t,x)=>t+(x.saiu?-x.v:0),0); const base0=F0.prev+saiu; const d2=F1.prev-base0;
  if(Math.abs(d2)<0.005&&!it.length) return `<p class="note findiff">📊 Previsto igual a ${mesCurto(pv)}: ${brl(F1.prev)}.</p>`;
  it.sort((p,q)=>p.v-q.v); const rest=d2-it.reduce((t,x)=>t+x.v,0); if(Math.abs(rest)>=0.5) it.push({v:rest,t:`outros valores que não deu para ligar a um aluno (aula extra ou valor lançado a mais)`});
  const nS=it.filter(x=>x.saiu).length, vS=it.filter(x=>x.saiu).reduce((t,x)=>t+x.v,0);
  return `<details class="note findiff" open><summary>${Math.abs(d2)<0.005?`📊 Previsto igual a ${MESES[+pv.slice(5)-1]} (${brl(F1.prev)}), mas teve mudanças:`:`${d2<0?'📉':'📈'} Em relação a ${MESES[+pv.slice(5)-1]}: <b class="${d2<0?'neg':'pos'}">${d2<0?'−':'+'}${brl(Math.abs(d2))}</b> no previsto (${brl(base0)} → ${brl(F1.prev)})`}</summary>${nS?`<p class="fdx">${MESES[+pv.slice(5)-1]} teve <b>${brl(base0)}</b> previstos, contando ${nS===1?'quem saiu':`os ${nS} que saíram`} (${brl(Math.abs(vS))}).</p>`:''}<ul>${it.map(x=>`<li><span class="${x.v<0?'neg':'pos'}">${x.v<0?'−':'+'}${brl(Math.abs(x.v))}</span> ${x.t}</li>`).join('')}</ul>
  <p class="fdx fdconta">Conta: ${brl(base0)} ${it.map(x=>`${x.v<0?'−':'+'} ${brl(Math.abs(x.v))}`).join(' ')} = <b>${brl(F1.prev)}</b></p></details>`; }
function renderPag(){
  const ym=st.month,[y,m]=ym.split('-').map(Number);
  let h=`<div class="daybar"><button class="iconbtn" data-act="mprev" aria-label="Mês anterior">‹</button>
    <div class="t"><h2>Pagamentos · ${MESES[m-1]} ${y} ${qtip("fin")}</h2><small>Toque na parcela paga ou lance o valor que o aluno pagou</small></div>
    <button class="iconbtn" data-act="mnext" aria-label="Próximo mês">›</button></div>`; const H0=h; h+=impBtn("fin","Importar pagamentos (foto, PDF, Excel ou Word)");
  if(!loadedA){main.innerHTML=h+`<div class="empty">Carregando…</div>`;return}
  const F=finCalc(ym); const {prev,rec,rows,advNovo,advCob,pend,mais,excesso}=F;
  st._fin={ym,prev,rec,rows,advNovo,pend,excesso};
  const ord={no:0,part:1,pa:1,ok:2,adv:3,pac:3,na:4,perm:5};rows.sort((p,q)=>ord[p.stt]-ord[q.stt]||p.a.nome.localeCompare(q.a.nome,'pt-BR'));
  h+=`<div class="row-actions" style="margin:0 0 6px"><button class="ghost" data-finpdf>📄 Relatório financeiro de ${mesCurto(ym)} (PDF)</button><button class="ghost fcopen ${st.cmpOpen?'on':''}" data-fcmpopen>📊 Comparar meses</button><button class="privbtn privstk" data-priv aria-label="Ocultar ou mostrar os valores">${privInner()}</button></div>${st.cmpOpen?finCmpHTML():''}
  <div class="kpis"><div class="kpi"><b class="kprev">${brl(prev)}</b><span>previsto no mês</span></div>
    <button class="kpi kbtn ${st.kpi==='rec'?'on':''}" data-kpi="rec" aria-expanded="${st.kpi==='rec'}"><b class="pos">${brl(rec)}</b><span>recebido <i>${st.kpi==='rec'?'▴':'▾'} quem pagou</i></span></button>
    <button class="kpi kbtn ${st.kpi==='pend'?'on':''}" data-kpi="pend" aria-expanded="${st.kpi==='pend'}"><b class="${pend>0.005?'neg':''}">${brl(pend)}</b><span>a receber <i>${st.kpi==='pend'?'▴':'▾'} quem falta</i></span></button>
    <button class="kpi kbtn ${st.kpi==='quit'?'on':''}" data-kpi="quit" aria-expanded="${st.kpi==='quit'}"><b>${rows.filter(r=>r.stt==='ok'||r.stt==='adv'||r.stt==='pac').length}/${rows.filter(r=>r.stt!=='na'&&r.stt!=='perm').length}</b><span>alunos quitados <i>${st.kpi==='quit'?'▴':'▾'} ver lista</i></span></button></div>
  ${mais.length?`<div class="maisal"><b>⚠ ${brl(excesso)} lançados a mais</b> (fora do recebido): ${mais.map(x=>`<button class="kname" data-goto="${x.a.id}">${esc(first(x.a.nome))} +${brl(x.v)}</button>`).join(' ')}<br><small>Pagaram mais que o valor do mês. Confira se não marcou duas vezes (parcela + "outro valor"). Se foi aula extra, lance em "+ outro valor" como Aula extra.</small></div>`:''}
  ${kpiPanel(rows,ym)}
  ${(()=>{ const L=ativos().filter(a=>!isFicha(a)&&!r_perm(a)&&mensal(a)>0); const tot=L.reduce((t,a)=>t+mensal(a),0), au=L.reduce((t,a)=>t+contratadas(a),0); const H=horasMes(ym);
    return tot&&au?`<div class="card" style="margin-block:8px 0"><h3>Média do seu trabalho</h3><div class="kpis" style="margin:0"><div class="kpi"><b>${brl(tot/au)}</b><span>média por aula (${brl(tot)} ÷ ${au} aulas)</span></div>${H.prev?`<div class="kpi"><b>${brl(tot/H.prev)}</b><span>média por hora (${H.prev}h no mês)</span></div>`:''}</div><p class="note" style="margin:8px 0 0">Soma das mensalidades dos alunos de aula, sem ficha nem permuta. Não é o previsto: o previsto tira quem já pagou adiantado e, de quem paga por aula, conta só as aulas feitas. Por hora: dupla ou trio no mesmo horário conta 1 hora.</p></div>`:''; })()}
  ${advCob||advNovo?`<p class="note">${advCob?`${advCob} aluno${advCob>1?'s':''} com mês pago adiantado: aparece${advCob>1?'m':''} como quitado${advCob>1?'s':''}, mas não soma${advCob>1?'m':''} no previsto nem no recebido.`:''}${advNovo?` O recebido inclui ${brl(advNovo)} de adiantamentos recebidos neste mês.`:''}</p>`:''}${finDiffHTML(ym)}`; const H1=h.length;
  const lbl={pac:'Pacote',adv:'Adiantado',ok:'Pago',part:'Parcial',no:'Pendente',na:'Sem valor',perm:'Permuta',pa:'Em aberto'};
  const paR=rows.filter(r=>r.pa&&r.stt!=='perm'), paRec=paR.reduce((t,r)=>t+r.pago,0), paVenc=paR.reduce((t,r)=>t+r.partes.filter(x=>x.venc).reduce((s2,x)=>s2+x.v,0),0);
  if(paR.length){ const L=paR.map(r=>({r,ab:r.partes.filter(t=>!t.mv&&!r.pp[t.k]&&t.aulas>0)})).filter(x=>x.ab.length); const tot=L.reduce((t,x)=>t+x.ab.reduce((s2,y)=>s2+y.v,0),0);
    h+= tot>0.005? `<div class="avbox"><div class="avbox-h"><span>💵 Aulas avulsas não pagas</span><b>${brl(tot)}</b></div>
      ${L.map(({r,ab})=>`<div class="avln"><button class="kname" data-goto="${r.a.id}">${esc(r.a.nome)}</button>${ab.map(t=>`<div class="avit ${t.venc?'venc':''}"><span>${t.l}${t.dias&&t.dias.length?` · dias ${diasTxt(t.dias)}`:''}${t.venc?' · <b>⚠ vencido</b>':''}</span><b>${brl(t.v)}</b><span class="avbt"><button class="btn small primary" data-pay="${t.k}" data-id="${r.a.id}">✓ Pagou</button>${!t.ant&&!t.aberto?`<button class="btn small" data-mvnext="${t.k}" data-id="${r.a.id}">➡ Passar para ${mesCurto(addMes(st.month,1))}</button>`:''}</span></div>`).join('')}</div>`).join('')}
      <small>Passou para o mês seguinte? Lá aparece como “Mês anterior”, com os dias das aulas, e soma no previsto e no a receber. Só avisa como vencido depois do dia ${'do vencimento'}.</small></div>`
      : `<p class="note pa-note">💵 <b>Por aula feita</b> (${paR.length} aluno${paR.length>1?'s':''}): tudo pago. Recebido <b class="pos">${brl(paRec)}</b>.</p>`; }
  h+=`<div class="alist">`+rows.map(r=>`<div class="paycard" id="pc-${r.a.id}" data-st="${r.stt}"><div class="paytop"><b>${esc(r.a.nome)}</b>
    <span class="chip ${r.stt}">${r.cobraMes?"Começa depois":lbl[r.stt]}</span><span class="payval">${r.stt==='adv'||r.stt==='pac'?'—':r.bruto?brl(r.valor):'—'}</span>${r.stt!=='perm'&&r.stt!=='adv'&&r.stt!=='pac'?`<span class="ovbs"><button class="chipbtn ovb ${st.ajOpen===r.a.id?'on':''}" data-ajopen="${r.a.id}">✎ ajustar valor</button><button class="chipbtn ovb ${st.avOpen===r.a.id?'on':''}" data-avopen2="${r.a.id}">+ outro valor</button></span>`:''}<span class="ovbs"><button class="chipbtn ovb" data-edcad="${r.a.id}">✎ editar</button></span></div>
    ${r.aj?`<div class="ajnote">Valor ajustado neste mês: <b>${brl(r.valor)}</b> <s>${brl(r.valor0)}</s> · ${esc(r.aj.m||'Ajuste')}${r.aj.d?` <small>(${esc(r.aj.d)})</small>`:''} <button class="iconbtn" data-ajrm="${r.a.id}" aria-label="Desfazer ajuste">×</button></div>`:''}
    ${st.ajOpen===r.a.id?`<div class="ovform"><b style="font-size:13px">Ajustar o valor de ${esc(r.a.nome.split(' ')[0])} só em ${mesCurto(st.month)}</b><div class="paygrid"><input type="number" inputmode="decimal" min="0" step="5" id="aj-${r.a.id}" value="${r.aj?r.aj.v:''}" placeholder="Novo valor (era ${brl(r.valor0||r.valor)})">
      <select id="ajm-${r.a.id}">${AJ_MOT.map(x=>`<option ${r.aj&&r.aj.m===x?'selected':''}>${x}</option>`).join('')}</select></div>
      <input id="ajd-${r.a.id}" value="${esc(r.aj&&r.aj.d||'')}" placeholder="Detalhe (opcional): ex.: abateu 2 aulas de setembro">
      <div class="row-actions" style="margin:0"><button class="primary" data-ajsave="${r.a.id}">Salvar ajuste</button><button class="ghost" data-ajopen="${r.a.id}">Cancelar</button></div>
      <p class="note" style="margin:0">Vale só para este mês. No mês seguinte volta ao valor normal.</p></div>`:''}
    <div class="note">${r.pa?`Cobra só as aulas feitas. Toque no período quando ${esc(first(r.a.nome))} pagar.${r.partes.some(t=>t.venc)?` <b class="neg">⚠ Tem período vencido.</b>`:''}`:r.stt==='pac'?(r.u?`Pacote de ${r.u.total} aulas, início em ${mesCurto(r.u.inicio.slice(0,7))} · ${r.u.used} feitas · <b class="${r.u.rest<=3?'neg':'pos'}">${r.u.rest>0?`faltam ${r.u.rest}`:'encerrado'}</b>`:'Pacote sem quantidade de aulas: complete no Cadastro'):r.pk?`Pacote de ${r.pk.total||'?'} aulas${r.pk._n>1?` · ${brl(+r.pk.valor||0)} em ${r.pk._n}x`:''}${r.pago?` · recebido <b class="pos">${brl(r.pago)}</b>`:''}${r.pago&&r.pago<r.valor-0.005?` · falta <b class="neg">${brl(r.valor-r.pago)}</b>`:''}`:r.stt==='adv'?`Pago adiantado até <b>${mesCurto(r.a.adiantado.ate)}</b>${r.a.adiantado.valor?` · ${brl(+r.a.adiantado.valor)} pagos`:''}${r.a.adiantado.desde?` (cobre ${mesCurto(r.a.adiantado.desde)} a ${mesCurto(r.a.adiantado.ate)})`:''}${r.a.adiantado.recebidoEm?` · recebido em ${mesCurto(r.a.adiantado.recebidoEm)}`:''}`:r.stt==='perm'?'Paga em permuta, sem cobrança em dinheiro':r.bruto?`${isFicha(r.a)?'Ficha de treino':r.a.tipo==='avulsa'?`${brl(valorAula(r.a))}/aula × ${Math.round(r.bruto/(valorAula(r.a)||1))} aulas avulsas no mês`:`${brl(valorAula(r.a))}/aula × ${contratadas(r.a)} aulas`}${r.a.forma==='outra'&&r.a.formaObs?` · <b>${esc(r.a.formaObs)}</b>`:''}${['trimestral','semestral','anual'].includes(r.a.forma)?` · ${FORMAS[r.a.forma]}: ao receber, use "Pagou adiantado"`:''}${r.desc?` · <span class="neg">−${brl(r.desc)} abatido</span>`:''}${r.pago?` · recebido <b class="pos">${brl(r.pago)}</b>`:''}${r.pago&&r.pago<r.valor-0.005?` · falta <b class="neg">${brl(r.valor-r.pago)}</b>`:''}`:(r.cobraMes?`💰 Começa a pagar em ${MESES[+r.cobraMes.slice(5,7)-1]}/${r.cobraMes.slice(0,4)}`:r.a.tipo==='avulsa'?(valorAula(r.a)?'Nenhuma aula avulsa dada neste mês':'Cadastre o valor da aula no Cadastro'):'Cadastre o valor na aba Alunos')}</div>
    ${st.advId===r.a.id?advForm(r.a):r.stt==='adv'?`<div class="parts"><button data-advopen="${r.a.id}">Editar adiantamento</button><button data-advrm="${r.a.id}">Remover adiantamento</button></div>`:''}
    ${prazoHTML(r)}
    ${r.bruto&&r.stt!=='perm'&&r.stt!=='adv'&&r.stt!=='pac'?`<div class="paygrid">${r.pk?'':`<select data-forma="${r.a.id}" aria-label="Forma de pagamento de ${esc(r.a.nome)}">${Object.entries(FORMAS).map(([v,l])=>`<option value="${v}" ${(r.a.forma||'mensal')===v?'selected':''}>${l}</option>`).join('')}</select>`}
      ${r.pa?`<div class="partlist"><p class="partsum">Cobra <b>por aula feita</b> · ${brl(r.va)} por aula · <select data-ciclo="${r.a.id}" aria-label="Quando cobra">${Object.entries(CICLOS).map(([v,l])=>`<option value="${v}" ${(r.a.ciclo||'quinzenal')===v?'selected':''}>${l}</option>`).join('')}</select></p>
        ${r.partes.length?r.partes.map(t=>t.mv? `<div class="partwrap"><div class="partrow mvd"><span>${t.l} <small>· ${t.aulas} aula${t.aulas!==1?'s':''} · dias ${diasTxt(t.dias)}</small></span><b>${brl(t.v)}</b><em>➡ passado para ${mesCurto(t.mv)}</em></div><button class="lk" data-mvundo="${t.k}" data-id="${r.a.id}">↩ desfazer</button></div>` : `<div class="partwrap"><button class="partrow ${r.pp[t.k]?'on':''} ${t.venc?'venc':''} ${t.ant?'antp':''}" data-pay="${t.k}" data-id="${r.a.id}" aria-pressed="${!!r.pp[t.k]}"><span>${t.l} <small>· ${t.aulas} aula${t.aulas!==1?'s':''}${t.dias&&t.dias.length?` · dias ${diasTxt(t.dias)}`:''}</small></span><b>${brl(t.v)}</b><em>${r.pp[t.k]?'✓ pago':t.venc?'⚠ vencido':t.ant?'a receber':t.aberto?'em andamento':'toque se pagou'}</em></button>${r.pp[t.k]?payDateHTML(r.a.id,t.k,r.pp[t.k]):(!t.ant&&!t.aberto?`<button class="lk mvbtn2" data-mvnext="${t.k}" data-id="${r.a.id}">➡ Passar para ${mesCurto(addMes(st.month,1))}</button>`:'')}</div>`).join(''):`<p class="partsum">Nenhuma aula feita ainda neste mês.</p>`}
        ${r.partes.length?`<p class="partsum">Aulas no mês: <b>${r.partes.reduce((s2,t)=>s2+t.aulas,0)}</b> · pagas: <b class="pos">${r.partes.filter(t=>r.pp[t.k]).reduce((s2,t)=>s2+t.aulas,0)}</b></p>`:''}</div>`
      :r.partes.length>1?`<div class="partlist"><p class="partsum">${(r.a.forma==='parcelas')?`Paga em <b>${r.partes.length} vezes</b>: ${r.partes.map(t=>brl(t.v)).join(' + ')}`:`Paga <b>por semana</b>: ${r.partes.length} pagamentos${r.partes[0].aulas?` de ${r.partes[0].aulas} aula${r.partes[0].aulas>1?'s':''}`:''}`}</p>
        ${r.partes.map(t=>`<div class="partwrap"><button class="partrow ${r.pp[t.k]?'on':''}" data-pay="${t.k}" data-id="${r.a.id}" aria-pressed="${!!r.pp[t.k]}"><span>${t.l}${t.aulas?` <small>· ${t.aulas} aula${t.aulas>1?'s':''}</small>`:''}</span><b>${brl(t.v)}</b><em>${r.pp[t.k]?'✓ pago':'toque se pagou'}</em></button>${r.pp[t.k]?payDateHTML(r.a.id,t.k,r.pp[t.k]):''}</div>`).join('')}
        ${r.partes.some(t=>t.aulas)?(()=>{ const tot=r.partes.reduce((s2,t)=>s2+(t.aulas||0),0), pg=r.partes.filter(t=>r.pp[t.k]).reduce((s2,t)=>s2+(t.aulas||0),0); return `<p class="partsum">Aulas pagas: <b class="${pg>=tot?'pos':''}">${pg} de ${tot}</b></p>`; })():''}</div>`
      :`<div class="parts">${r.partes.map(t=>`<button data-pay="${t.k}" data-id="${r.a.id}" class="${r.pp[t.k]?'on':''}" aria-pressed="${!!r.pp[t.k]}">${r.pp[t.k]?'✓ ':''}${t.l}</button>${r.pp[t.k]?payDateHTML(r.a.id,t.k,r.pp[t.k]):''}`).join('')}</div>`}</div>
    ${st.avOpen===r.a.id?`<div class="ovform"><div class="paygrid"><input type="number" inputmode="decimal" min="0" step="5" id="av-${r.a.id}" placeholder="Valor (R$)" aria-label="Outro valor pago por ${esc(r.a.nome)}">
      <select id="avm-${r.a.id}" aria-label="Motivo">${AV_MOT.map(x=>`<option>${x}</option>`).join('')}</select></div>
      <input id="avd-${r.a.id}" placeholder="Detalhe (opcional): ex.: aula de sábado, diferença do mês passado" aria-label="Detalhe">
      <label class="pdate">Data do pagamento <input type="date" id="avdt-${r.a.id}" value="${today()}"></label>
      <div class="row-actions" style="margin:0"><button class="primary" data-avadd="${r.a.id}">Lançar valor</button><button class="ghost" data-avopen2="${r.a.id}">Cancelar</button></div></div>`:''}
    ${(r.pp.avulsos||[]).length?`<div class="avlist">${r.pp.avulsos.map(t=>`<div class="avrow"><span><b>${brl(+t.v)}</b> · ${esc(t.m||'Outro valor')}${t.d?` <small>(${esc(t.d)})</small>`:''}${t.dt?` <small>· ${t.dt.slice(8,10)}/${t.dt.slice(5,7)}</small>`:''}${AV_EXTRA.includes(t.m)?' <small>· extra, fora da mensalidade</small>':' <small>· conta na mensalidade</small>'}</span><button class="iconbtn" data-avrm="${t.id}" data-id="${r.a.id}" aria-label="Remover ${brl(+t.v)}">×</button></div>`).join('')}</div>`:''}
    ${st.advId!==r.a.id&&!r.pk&&r.a.tipo!=='avulsa'?`<div><button class="chipbtn" data-advopen="${r.a.id}">Pagou adiantado (trimestral, vários meses)</button></div>`:''}`:''}
  </div>`).join('')+`</div>`;
  if(window.RP_LIMPO) h=h.slice(0,H1)+`<button class="btn fl-al ${st.fAl?'on':''}" data-fal aria-expanded="${!!st.fAl}">${st.fAl?'▴ Fechar alunos':`▾ Abrir alunos <small>(${rows.length}) lançar pagamento, ajustar valor, avulsas</small>`}</button>`+(st.fAl? `<div class="fl-detbox"><button class="pclose" data-fal aria-label="Fechar alunos">✕ Fechar</button>${h.slice(H1)}</div>` : '');
  main.innerHTML=h;
}


const MOTIVOS=['Faltou sem avisar','Não avisou com antecedência','Eu precisei cancelar','Outro'];
let REP_OPEN=null;
function faltasDe(a){ const hoje=today(), out=[]; if(a.forma==='poraula') return out;
  for(let k=INICIO;k<=hoje;k=addDays(k,1)){ if(isOff(k)) continue; const wd=dOf(k).getDay(), recs=dayData(k).registros||{};
    for(const sl of (a.slots||[])) if(sl.d===wd){ const [key,r]=slotRec(recs,a,sl); if(r.status==='f'||(!r.status&&k<hoje)) out.push({k,key,hora:r.hora||sl.h,auto:!r.status,destino:r.destino||'rep',motivo:r.motivo||'',obs:r.obs||'',repK:r.repK||'',repH:r.repH||''}); } }
  return out.reverse(); }
function repAlHTML(a,sr){ const F=faltasDe(a); const fe=(()=>{ let n=0; for(const [k,d] of dias) for(const e of (d.extras||[])) if(e.alunoId===a.id&&(e.tipo==='rep'||e.tipo==='adi')&&e.status!=='f') n++; return n; })();
  return `<div class="card reppan" id="rpp-${a.id}"><div class="rp-h"><b>🔁 ${esc(a.nome)} · ${sr>0?`repor ${sr} aula${sr>1?'s':''}`:'em dia'}</b><button class="iconbtn" data-repx aria-label="Fechar">✕</button></div>
    <p class="note" style="margin:0 0 6px">Faltas desde o início do controle${fe?` · ${fe} reposição${fe>1?'ões':''} já feita${fe>1?'s':''}`:''}. Escolha em cada falta se vai repor e o motivo.</p>
    ${F.length?F.map(f=>{ const d=dOf(f.k); return `<div class="rp-f ${f.destino}"><div class="rp-d"><b>${DC[d.getDay()]} ${d.getDate()}/${d.getMonth()+1} · ${f.hora}</b><small>${f.auto?'Falta automática (chamada não marcada)':'Falta'}</small></div>
      <div class="seg rp-seg">${[['rep','🔁 Repor'],['nao','✖ Não repor'],['abt','💲 Abater']].map(([v,l])=>`<button data-rpdest="${v}" data-k="${f.k}" data-key="${esc(f.key)}" class="${f.destino===v?'on':''}">${l}</button>`).join('')}</div>
      <div class="rp-m"><select class="rp-sel" data-rpmot data-k="${f.k}" data-key="${esc(f.key)}" aria-label="Motivo"><option value="">Motivo…</option>${MOTIVOS.map(m=>`<option ${f.motivo===m?'selected':''}>${m}</option>`).join('')}</select>
      <input class="rp-obs" data-rpobs data-k="${f.k}" data-key="${esc(f.key)}" value="${esc(f.obs)}" placeholder="Escreva o motivo (opcional)"></div>${f.destino==='rep'?`<button class="rpfbtn" data-rpfm="${esc(f.key)}" data-k="${f.k}">${f.repK?`📅 Reposição: ${DC[dOf(f.repK).getDay()]} ${dOf(f.repK).getDate()}/${dOf(f.repK).getMonth()+1} às ${f.repH} · mudar`:'📅 Marcar data da reposição'}</button>`:''}</div>`; }).join(''):'<div class="empty">Nenhuma falta registrada.</div>'}</div>`; }
function aulasDoAluno(a,ym){
  const hoje=today(),out=[];
  for(const k of diasDoMes(ym)){
    const wd=dOf(k).getDay(),off=isOff(k),recs=dayData(k).registros||{};
    if(a.inicio&&k<a.inicio) continue;
    for(const s of (a.slots||[])) if(s.d===wd){
      const r=slotRec(recs,a,s)[1],hora=r.hora||s.h;let st2,lbl;
      if(off){st2='off';lbl='Sem aula · '+offReason(k)}
      else if(r.status==='p'){st2='p';lbl='Presente'}
      else if(r.status==='f'){st2='f';lbl='Faltou · '+DEST[r.destino||'rep']+(r.motivo?' · '+r.motivo:'')+(r.obs?' ('+r.obs+')':'')}
      else if(k<INICIO){st2='p';lbl='Dada (antes do controle)'}
      else if(k<hoje){st2='f';lbl='Falta automática'}
      else if(k===hoje){st2='hoje';lbl='Hoje, sem marcar'}
      else {st2='fut';lbl='Agendada'}
      out.push({k,hora,st:st2,lbl,moved:r.hora&&r.hora!==s.h?s.h:'',fixo:true,dest:r.destino||'rep',mot:r.motivo||'',obs:r.obs||'',auto:st2==='f'&&!r.status});
    }
    for(const e of (dayData(k).extras||[])) if(e.alunoId===a.id){
      const t=e.tipo==='rep'?'Reposição':e.tipo==='adi'?'Adiantamento':'Aula extra';
      const st2=e.status==='f'?'f':(!e.status&&k>hoje)?'fut':'x';
      out.push({k,hora:e.hora,st:st2,lbl:t+(e.status==='f'?' · faltou':st2==='fut'?' · agendada':'')});
    }
  }
  { const F=out.filter(l=>l.fixo); const q=Math.max(0,F.length-contratadas(a)); F.filter(l=>l.st!=='off').slice(-q||F.length).forEach(l=>{ if(q) l.mais=true; }); }
  return out.sort((p,q)=>p.k.localeCompare(q.k)||p.hora.localeCompare(q.hora));
}
function histDe(id,ym){const h=hist.get(ym);return h&&h.alunos&&h.alunos[id]||null}
function linhaHist(a,mm,cur){
  const hv=histDe(a.id,mm);
  if(hv){const dd=hv.feitas-hv.contr;return `<tr><td><button class="chipbtn" data-mes="${mm}">${mesCurto(mm)}</button><span class="sub">planilha</span></td><td>${hv.contr}</td><td>${hv.feitas}</td><td>${Math.max(0,hv.contr-hv.feitas)||'–'}</td><td>–</td><td>${dd>0?`<span class="pos">+${dd}</span>`:dd<0?`<span class="neg">${dd}</span>`:'0'}</td></tr>`}
  if(mm<INICIO.slice(0,7))return '';
  const z=statsMes(mm).get(a.id);if(!z)return '';const dd=(mm<cur?z.pres:z.pres+z.fut+z.pend)-z.contr;
  return `<tr><td><button class="chipbtn" data-mes="${mm}">${mesCurto(mm)}</button>${mm===cur?'<span class="sub">em andamento</span>':''}</td><td>${z.contr}</td><td>${z.pres}</td><td>${z.falta||'–'}</td><td>${z.reposFeitas||'–'}</td><td>${dd>0?`<span class="pos">+${dd}</span>`:dd<0?`<span class="neg">${dd}</span>`:'0'}</td></tr>`;
}
function histCard(a){
  const cur=today().slice(0,7),ks=[...hist.keys()].sort();let ini=INICIO.slice(0,7);if(ks.length&&ks[0]<ini)ini=ks[0];
  const meses=[];for(let mm=cur;mm>=ini;mm=addMes(mm,-1))meses.push(mm);
  return `<div class="card"><h3>Histórico</h3><div class="tablewrap" style="border:0"><table><thead><tr><th>Mês</th><th>Contrat.</th><th>Feitas</th><th>Não feitas</th><th>Repos.</th><th>Diferença</th></tr></thead><tbody>`+
    meses.map(mm=>linhaHist(a,mm,cur)).join('')+
    `</tbody></table></div><p class="note" style="margin-bottom:0">Meses marcados "planilha" vieram da sua planilha antiga. A partir de ${mesCurto(INICIO.slice(0,7))}, cada mês entra aqui sozinho. Diferença = feitas menos contratadas.</p></div>`;
}
function renderAluno(){
  const a=alunos.get(st.alunoId);if(!a){st.alunoId=null;renderAlunos();return}
  const ym=st.month,[y,m]=ym.split('-').map(Number),hoje=today(),cur=hoje.slice(0,7);
  const x=statsMes(ym).get(a.id)||{contr:contratadas(a),pres:0,falta:0,fut:0,pend:0,quinta:0,feriado:0,reposFeitas:0,extras:0,agenda:0};
  const saldo=saldoRepos().get(a.id)||0,lista=aulasDoAluno(a,ym);
  const proj=x.pres+x.fut+x.pend,dif=(ym<cur?x.pres:proj)-x.contr;
  let h=`<button class="alclose" data-act="alback">✕ Fechar e voltar para os alunos</button><div class="daybar"><button class="iconbtn" data-act="alback" aria-label="Voltar">‹</button>
    <div class="t"><h2>${esc(a.nome)}</h2><small>${a.tipo==='consultoria'?'Consultoria online':isFicha(a)?'Ficha de treino':(a.slots||[]).map(s=>DC[s.d]+' '+s.h).join(' · ')}${r_perm(a)?' · Permuta':''}</small></div>
    <div class="row-actions" style="margin:0;flex-wrap:nowrap"><button class="ghost" data-act="aledit">Editar</button><button class="ghost ${a.ativo===false?'':'danger'}" data-act="altoggle">${a.ativo===false?'Reativar':'Inativar'}</button></div></div>
    ${a.ativo===false?`<div class="banner off"><div class="grow"><b>Aluno inativo</b>${a.inativoDesde?` desde ${mesCurto(a.inativoDesde)}`:''}. Não aparece na chamada nem nos pagamentos; o histórico fica guardado.</div></div>`:''}
    <div class="daybar" style="margin-top:0"><button class="iconbtn" data-act="mprev" aria-label="Mês anterior">‹</button>
    <div class="t"><b>${MESES[m-1][0].toUpperCase()+MESES[m-1].slice(1)} ${y}</b>${ym===cur?' <small>(mês atual)</small>':ym<cur?' <small>(fechado)</small>':' <small>(futuro)</small>'}</div>
    <button class="iconbtn" data-act="mnext" aria-label="Próximo mês">›</button></div>`;
  if(isFicha(a)){main.innerHTML=h+`<div class="empty">Aluno de ficha não tem aulas agendadas.</div>`;return}
  const hv=histDe(a.id,ym);
  if(hv||(ym<INICIO.slice(0,7))){
    if(hv){const dd=hv.feitas-hv.contr;
      h+=`<div class="kpis"><div class="kpi"><b class="pos">${hv.feitas}</b><span>aulas feitas</span></div><div class="kpi"><b class="${hv.contr>hv.feitas?'neg':''}">${Math.max(0,hv.contr-hv.feitas)}</b><span>não feitas</span></div><div class="kpi"><b>${hv.contr}</b><span>contratadas</span></div><div class="kpi"><b class="${dd>0?'pos':dd<0?'neg':''}">${dd>0?'+':''}${dd}</b><span>diferença</span></div></div>
      <div class="card"><h3>Relatório do mês</h3><p style="margin:0">Fez <b>${hv.feitas}</b> de ${hv.contr} aulas contratadas${dd<0?`: <span class="neg">${-dd} a menos</span>`:dd>0?`: <span class="pos">+${dd} a mais</span>`:''}.</p><p class="note" style="margin-bottom:0">Importado da sua planilha.</p></div>
      <div class="card" style="padding-block:6px"><h3 style="margin-top:8px">Aulas feitas</h3>${(hv.dias||[]).map(k=>{const d=dOf(k);return `<div class="lrow" data-s="p"><span class="ld">${DC[d.getDay()]} ${d.getDate()}/${d.getMonth()+1}</span><span class="lh"></span><span class="ls">Presente</span></div>`}).join('')||'<div class="empty">Nenhuma aula registrada.</div>'}</div>`;
    }else h+=`<div class="empty">Sem registro deste mês.</div>`;
    main.innerHTML=h+histCard(a);return;
  }
  h+=`<div class="kpis"><div class="kpi"><b class="pos">${x.pres}</b><span>aulas feitas${ym===cur?' até hoje':''}</span></div>
    <div class="kpi"><b>${x.fut+x.pend}</b><span>${ym<cur?'—':'ainda vai fazer no mês'}</span></div>
    <div class="kpi"><b class="${x.falta?'neg':''}">${x.falta}</b><span>faltas</span></div>
    <div class="kpi"><b>${x.contr}</b><span>contratadas</span></div></div>`;
  const rel=dif>0?`<span class="pos">+${dif} aula${dif>1?'s':''} a mais</span> que o contratado`:dif<0?`<span class="neg">${-dif} aula${dif<-1?'s':''} a menos</span> que o contratado`:'exatamente o contratado';
  h+=`<div class="card"><h3>${ym<cur?'Relatório do mês':ym===cur?'Previsão do mês':'Planejado'}</h3>
    <p style="margin:0">${ym<cur?`Fez <b>${x.pres}</b> de ${x.contr} aulas contratadas: ${rel}.`:`Se fizer tudo o que falta: <b>${proj}</b> de ${x.contr} contratadas, ${rel}.`}</p>
    <p class="note" style="margin-bottom:0">${x.quinta?`5ª semana: +${x.quinta} aula${x.quinta>1?'s':''} ${q5Of(a,ym)==="cobra"?"cobrada"+(x.quinta>1?"s":""):"sem cobrar"}. `:''}${x.feriado?`${x.feriado} aula${x.feriado>1?'s':''} sem aula (feriado/viagem). `:''}${x.reposFeitas?`${x.reposFeitas} reposição${x.reposFeitas>1?'ões':''} dada${x.reposFeitas>1?'s':''}. `:''}${x.extras?`${x.extras} aula${x.extras>1?'s':''} extra. `:''}Saldo de reposição acumulado: ${saldo>0?`<b class="wrn">deve ${saldo}</b>`:saldo<0?`<b class="pos">${-saldo} adiantada${-saldo>1?'s':''}</b>`:'em dia'}.</p></div>`;
  if(x.quinta>0&&!isFicha(a)&&a.forma!=='poraula'){ const cob=q5Of(a,ym)==='cobra', va=valorAula(a);
    h+=`<div class="card q5card"><b>➕ ${x.quinta} aula${x.quinta>1?'s':''} a mais no plano de ${esc(first(a.nome))} em ${mesCurto(ym)}</b><p class="note" style="margin:2px 0 8px">O mês tem mais dias de aula do que as ${x.contr} contratadas. Os dias a mais estão marcados na lista abaixo.</p>
      <div class="seg q5seg"><span class="lbl">Será cobrado?</span><button data-q5set="cobra" data-id="${a.id}" class="${cob?'on':''}">💲 Sim, cobrar${va?` (+${brl(va*x.quinta)})`:''}</button><button data-q5set="gratis" data-id="${a.id}" class="${!cob?'on':''}">🎁 Não, sem custo</button></div></div>`; }
  h+=`<div class="card" style="padding-block:6px"><h3 style="margin-top:8px">Aulas do mês</h3>`+(lista.length?lista.map(l=>{const d=dOf(l.k);return `<div class="lrow ${l.mais?'lmais':''}" data-s="${l.st}"><span class="ld">${DC[d.getDay()]} ${d.getDate()}/${d.getMonth()+1}</span><span class="lh">${l.hora}${l.moved?` <small>(era ${l.moved})</small>`:''}</span><span class="ls">${esc(l.lbl)}${l.mais?` <b class="maistag">a mais no plano</b>`:''}</span></div>`}).join(''):'<div class="empty">Nenhuma aula neste mês.</div>')+`</div>`;
  h+=histCard(a);
  main.innerHTML=h;
}

function renderAlunos(){
  if(st.editId){renderEditor();return}
  if(st.alunoId){renderAluno();return}
  let h=`<div class="row-actions" style="margin-top:14px"><button class="primary" data-act="novo">+ Novo aluno</button></div>`;
  if(!loadedA){main.innerHTML=h+`<div class="empty">Carregando…</div>`;return}
  const nAt=[...alunos.values()].filter(a=>a.ativo!==false).length,nIn=alunos.size-nAt;
  h+=`<nav class="subtabs" aria-label="Filtro de alunos"><button data-atab="ativos" aria-selected="${st.aTab==='ativos'}">Ativos (${nAt})</button><button data-atab="inativos" aria-selected="${st.aTab==='inativos'}">Inativos (${nIn})</button></nav>`;
  const all=[...alunos.values()].filter(a=>st.aTab==='inativos'?a.ativo===false:a.ativo!==false).sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
  if(!all.length){main.innerHTML=h+`<div class="empty">${st.aTab==='inativos'?'Nenhum aluno inativo. Para inativar, abra o aluno e toque em "Inativar".':'Nenhum aluno ativo. Toque em "Novo aluno" para começar.'}</div>`;return}
  const S=statsMes(today().slice(0,7)),mn=MESES[dOf(today()).getMonth()];
  h+=`<div class="alist">`+all.map(a=>{const x=S.get(a.id);const mais=x&&x.quinta?`<br><span class="pos">+${x.quinta} a mais em ${mn}</span>`:'';return `<div class="arow-wrap"><button class="arow ${a.ativo===false?'inativo':''}" data-ver="${a.id}"><div class="grow"><b>${esc(a.nome)}</b>
    <div class="sl">${a.tipo==='consultoria'?'Consultoria online':isFicha(a)?'Ficha de treino':a.tipo==='avulsa'?'Aula avulsa, sem dias fixos':((a.slots||[]).map(s=>DC[s.d]+' '+s.h).join(' · ')||'sem horário')}</div></div>
    <div class="sl" style="text-align:right">${a.tipo==='consultoria'?'Online':isFicha(a)?'Ficha':a.tipo==='pacote'?pacTagP(a)||'Pacote':a.tipo==='avulsa'?'Avulsa':contratadas(a)+' aulas/mês'}${a.adiantado&&a.adiantado.ate>=today().slice(0,7)?`<br><span class="pos">pago até ${mesCurto(a.adiantado.ate)}</span>`:''}${a.permuta?'<br>Permuta':mensal(a)?`<br>${brl(mensal(a))}/mês`:''}${mais}</div></button>
    ${st.delId===a.id?`<span class="confirm"><button class="ghost danger" data-act="rowdelok" data-id="${a.id}">Excluir</button><button class="ghost" data-act="rowdelno">Não</button></span>`:`<button class="iconbtn" data-act="rowdel" data-id="${a.id}" aria-label="Excluir ${esc(a.nome)}">×</button>`}</div>`}).join('')+`</div>`;
  main.innerHTML=h;
}

let draft=null;
function renderEditor(){
  const a=draft;
  let h=`<div class="card"><h3>${alunos.has(a.id)?'Editar aluno':'Novo aluno'}</h3><div class="form">
  <label for="en">Nome<input id="en" value="${esc(a.nome)}" autocomplete="off"></label>
  <label for="ew">WhatsApp do aluno<input id="ew" type="tel" inputmode="tel" value="${esc(a.tel||'')}" placeholder="(DDD) 9 9999-9999" autocomplete="off"></label>
  <label for="et">Tipo<select id="et"><option value="aula" ${(a.tipo||'aula')==='aula'?'selected':''}>Aulas (personal)</option><option value="pacote" ${a.tipo==='pacote'?'selected':''}>Pacote de aulas</option><option value="avulsa" ${a.tipo==='avulsa'?'selected':''}>Aula avulsa</option><option value="ficha" ${a.tipo==='ficha'?'selected':''}>Ficha de treino (valor mensal)</option><option value="consultoria" ${a.tipo==='consultoria'?'selected':''}>Consultoria online (valor mensal)</option></select></label>
  ${a.tipo==='pacote'||a.tipo==='avulsa'?`<p class="note">Quantidade de aulas, valor e início do pacote ficam na aba Cadastro.</p>`:''}
  ${isFicha(a)?`<label for="evf">Valor mensal ${a.tipo==='consultoria'?'da consultoria':'da ficha'} (R$)<input id="evf" type="number" inputmode="decimal" min="0" step="10" value="${a.valorFicha||''}" placeholder="ex.: 100"></label>`:`<div class="two"><label for="ev">Valor por aula (R$)<input id="ev" type="number" inputmode="decimal" min="0" step="5" value="${valorAula(a)||''}" placeholder="ex.: 45"></label>
  <label for="ec">Aulas contratadas/mês<input id="ec" type="number" min="0" value="${a.contratadas||''}" placeholder="${(a.slots||[]).length*4} (automático)"></label></div>
  <div><div class="note" style="margin-bottom:6px">Horários fixos na semana — cada dia pode ter um horário diferente</div><div class="form" id="slots">`+
  a.slots.map((s,i)=>`<div class="slotrow"><select data-sd="${i}" aria-label="Dia">${[1,2,3,4,5,6,0].map(w=>`<option value="${w}" ${s.d===w?'selected':''}>${DIAS[w]}</option>`).join('')}</select>
  <input type="time" step="300" data-sh="${i}" value="${s.h}" aria-label="Horário"><button class="iconbtn" data-rms="${i}" aria-label="Remover horário">×</button></div>`).join('')+
  `</div><button class="ghost" data-act="adds" style="margin-top:8px">+ Horário</button></div>`}
  <label for="ef">Forma de pagamento<select id="ef">${Object.entries(FORMAS).map(([v,l])=>`<option value="${v}" ${(a.forma||'mensal')===v?'selected':''}>${l}</option>`).join('')}</select></label>
  ${isFicha(a)?'':`<p class="note" id="etot">${mensal(a)?`Mensalidade: <b>${brl(mensal(a))}</b> (${brl(valorAula(a))} × ${contratadas(a)} aulas)`:'Mensalidade calculada = valor da aula × aulas contratadas'}</p>`}
  <label style="display:flex;gap:8px;align-items:center;color:var(--ink)"><input type="checkbox" id="ep" ${a.permuta?'checked':''} style="width:auto"> Permuta (não paga em dinheiro)</label>
  <label style="display:flex;gap:8px;align-items:center;color:var(--ink)"><input type="checkbox" id="ea" ${a.ativo!==false?'checked':''} style="width:auto"> Aluno ativo</label>
  <div class="row-actions"><button class="primary" data-act="salvar">Salvar</button><button class="ghost" data-act="voltar">Cancelar</button>
  ${alunos.has(a.id)?(st.delConfirm?`<span class="confirm">Excluir de vez? <button class="ghost danger" data-act="delok">Sim, excluir</button><button class="ghost" data-act="delno">Não</button></span>`:`<button class="ghost danger" data-act="del">Excluir</button>`):''}</div>
  <p class="note">Mudar o horário fixo vale daqui pra frente e para os dias ainda não marcados. Para mudar só um dia, ajuste o horário direto na Chamada.</p>
  </div></div>`;
  main.innerHTML=h;
}
function pullDraft(){
  draft.nome=document.getElementById('en').value.trim();
  { const w=document.getElementById('ew'); if(w){ const v=w.value.trim(); if(v) draft.tel=v; else delete draft.tel; } }
  draft.forma=document.getElementById('ef').value;
  draft.ativo=document.getElementById('ea').checked;draft.permuta=document.getElementById('ep').checked;
  if(isFicha(draft)){draft.valorFicha=parseFloat(document.getElementById('evf').value)||0;draft.slots=[];return}
  draft.valorAula=parseFloat(document.getElementById('ev').value)||0;delete draft.mensalidade;
  draft.contratadas=parseInt(document.getElementById('ec').value)||0;
  draft.slots=draft.slots.map((s,i)=>({d:parseInt(document.querySelector(`[data-sd="${i}"]`).value),h:document.querySelector(`[data-sh="${i}"]`).value||s.h}));
}
function slug(n){return (n.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'aluno')+'-'+rid().slice(0,4)}

/* ---------- eventos ---------- */
document.getElementById('pnav').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;st.view=b.dataset.v;st.editId=null;st.alunoId=null;render()});
main.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const k=st.date,act=b.dataset.act;
  if(b.dataset.st!==undefined){const key=b.dataset.k,t=b.dataset.t,v=b.dataset.st;
    mutDay(k,d=>{if(t==='fixo'){const it=agendaDoDia(k).find(i=>i.key===key);const r=d.registros[key]||{};r.status=v;if(v!=='f')delete r.destino;else r.destino=r.destino||'rep';if(it&&!r.hora&&it.hora!==it.orig)r.hora=it.hora;if(!v&&!r.hora)delete d.registros[key];else d.registros[key]=r}
      else{const x=d.extras.find(x=>x.id===key);if(x)x.status=v}});return}
  if(b.dataset.q5set){const a=alunos.get(b.dataset.id);if(a){const n=Object.assign({},a,{q5m:Object.assign({},a.q5m||{},{[st.month]:b.dataset.q5set})});alunos.set(a.id,n);saveAluno(n);render();toast(b.dataset.q5set==='cobra'?'Aulas a mais: serão cobradas no Financeiro':'Aulas a mais: sem custo');}return}
  if(b.dataset.repall!==undefined){REP_OPEN=REP_OPEN==='all'?null:'all';render();return}
  if(b.dataset.repal){REP_OPEN=REP_OPEN===b.dataset.repal?null:b.dataset.repal;render();setTimeout(()=>{const el=document.getElementById('rpp-'+b.dataset.repal);if(el)el.scrollIntoView({block:'start',behavior:'smooth'})},60);return}
  if(b.dataset.repx!==undefined){REP_OPEN=null;render();return}
  if(b.dataset.rpdest){const key=b.dataset.key,v=b.dataset.rpdest;mutDay(b.dataset.k,d=>{d.registros[key]=Object.assign(d.registros[key]||{},{status:'f',destino:v})});toast(v==='rep'?'Vai repor':v==='nao'?'Não vai repor':'Vai abater no valor');return}
  if(b.dataset.dest){const key=b.dataset.k;if(b.dataset.t&&b.dataset.t!=='fixo'){mutDay(k,d=>{const x=(d.extras||[]).find(x=>x.id===key);if(x){x.status='f';x.destino=b.dataset.dest}});return}mutDay(k,d=>{d.registros[key]=Object.assign(d.registros[key]||{},{status:'f',destino:b.dataset.dest})});return}
  if(b.hasAttribute('data-fal')){st.fAl=!st.fAl;render();return}
  if(b.hasAttribute('data-finpdf')){finPdf();return}
  if(b.hasAttribute('data-fcmpopen')){st.cmpOpen=!st.cmpOpen;render();return}
  if(b.dataset.kpi){st.kpi=st.kpi===b.dataset.kpi?null:b.dataset.kpi;render();return}
  if(b.dataset.goto){if(window.RP_LIMPO&&!st.fAl){st.fAl=true;render();}const el=document.getElementById('pc-'+b.dataset.goto);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),1400)}return}
  if(b.dataset.advopen){st.advId=b.dataset.advopen;render();return}
  if(b.dataset.advok){const a=alunos.get(b.dataset.advok);if(!a)return;const ate=document.getElementById('adv-ate').value,v=parseFloat(document.getElementById('adv-v').value)||0,desde=document.getElementById('adv-desde').value,recebidoEm=document.getElementById('adv-rec').value;
    if(ate<desde){toast('O mês final tem que ser depois do inicial');return}
    const n=Object.assign({},a,{adiantado:{desde,ate,valor:v,recebidoEm}});alunos.set(a.id,n);st.advId=null;saveAluno(n);render();toast('Pago até '+mesCurto(ate));return}
  if(b.dataset.advrm){const a=alunos.get(b.dataset.advrm);if(!a)return;const n=Object.assign({},a);delete n.adiantado;alunos.set(a.id,n);saveAluno(n);render();toast('Adiantamento removido');return}
  if(b.dataset.avopen2){st.avOpen=st.avOpen===b.dataset.avopen2?null:b.dataset.avopen2;render();if(st.avOpen)setTimeout(()=>{const i=document.getElementById('av-'+st.avOpen);if(i)i.focus()},50);return}
  if(b.dataset.avadd){const id=b.dataset.avadd,inp=document.getElementById('av-'+id),v=parseFloat(inp&&inp.value),mm=(document.getElementById('avm-'+id)||{}).value||'Outros',dd=((document.getElementById('avd-'+id)||{}).value||'').trim(),dt=(document.getElementById('avdt-'+id)||{}).value||today();
    if(!(v>0)){toast('Digite o valor pago');return}
    st.avOpen=null;mutPag(st.month,d=>{d[id]=d[id]||{};d[id].avulsos=(d[id].avulsos||[]).concat([Object.assign({id:rid(),v,m:mm,dt},dd?{d:dd}:{})])});toast(brl(v)+' lançado · '+mm);return}
  if(b.dataset.avrm){const id=b.dataset.id;mutPag(st.month,d=>{d[id]=d[id]||{};d[id].avulsos=(d[id].avulsos||[]).filter(t=>t.id!==b.dataset.avrm)});return}
  if(b.dataset.mvnext){const id=b.dataset.id,kk=b.dataset.mvnext,to=addMes(st.month,1);mutPag(st.month,d=>{d[id]=d[id]||{};d[id].mv=Object.assign({},d[id].mv||{},{[kk]:to})});toast('Passado para '+mesCurto(to)+'. Lá soma no previsto e no a receber.');return}
  if(b.dataset.mvundo){const id=b.dataset.id,kk=b.dataset.mvundo;mutPag(st.month,d=>{d[id]=d[id]||{};const m=Object.assign({},d[id].mv||{});delete m[kk];d[id].mv=m});toast('Voltou para este mês');return}
  if(b.dataset.pay){const id=b.dataset.id,kk=b.dataset.pay;mutPag(st.month,d=>{d[id]=d[id]||{};const x=d[id];
    if(kk==='pac'){const leg=Object.keys(x).filter(z=>/^pac\d{8}$/.test(z));const cur=x.pac!=null?x.pac:(leg.map(z=>x[z]).find(Boolean)||false);leg.forEach(z=>delete x[z]);x.pac=cur?false:today();return}
    x[kk]=x[kk]?false:today()});return}
  if(b.dataset.edcad){ if(typeof rpEditAluno==='function') rpEditAluno(b.dataset.edcad); return; }
  if(b.dataset.ajopen){st.ajOpen=st.ajOpen===b.dataset.ajopen?null:b.dataset.ajopen;st.avOpen=null;render();return}
  if(b.dataset.ajsave){const id=b.dataset.ajsave,v=parseFloat((document.getElementById('aj-'+id)||{}).value);if(!(v>=0)){toast('Digite o novo valor do mês');return}
    const m2=(document.getElementById('ajm-'+id)||{}).value||'Outros',d2=((document.getElementById('ajd-'+id)||{}).value||'').trim();st.ajOpen=null;
    mutPag(st.month,d=>{d[id]=d[id]||{};d[id].aj=Object.assign({v,m:m2},d2?{d:d2}:{})});toast('Valor de '+mesCurto(st.month)+' ajustado para '+brl(v));return}
  if(b.dataset.ajrm){const id=b.dataset.ajrm;mutPag(st.month,d=>{if(d[id])delete d[id].aj});toast('Ajuste desfeito: volta ao valor normal');return}
  if(b.dataset.pdf){gerarPdf(b.dataset.id,b.dataset.pdf,st.month);return}
  if(b.dataset.pdfall){gerarTodos(b.dataset.pdfall,st.month);return}
  if(b.dataset.atab){st.aTab=b.dataset.atab;render();return}
  if(b.dataset.ver){st.view='alunos';st.alunoId=b.dataset.ver;st.editId=null;render();window.scrollTo(0,0);return}
  if(b.dataset.mes){st.month=b.dataset.mes;render();return}
  if(b.dataset.edit){const a=alunos.get(b.dataset.edit);draft=JSON.parse(JSON.stringify(a));draft.slots=draft.slots||[];st.editId=a.id;st.delConfirm=false;render();return}
  if(b.dataset.rms!==undefined){pullDraft();draft.slots.splice(+b.dataset.rms,1);renderEditor();return}
  switch(act){
    case 'prev':st.date=addDays(k,-1);st.addOpen=st.offOpen=false;break;
    case 'next':st.date=addDays(k,1);st.addOpen=st.offOpen=false;break;
    case 'hoje':st.date=today();break;
    case 'todos':mutDay(k,d=>{for(const i of agendaDoDia(k)) if(!i.status){if(i.tipo==='fixo'){d.registros[i.key]=Object.assign(d.registros[i.key]||{},{status:'p'})}else{const x=d.extras.find(x=>x.id===i.key);if(x)x.status='p'}}});toast('Chamada completa');return;
    case 'add':st.addOpen=!st.addOpen;break;
    case 'addcancel':st.addOpen=false;break;
    case 'addok':{const aid=document.getElementById('xa').value,hr=document.getElementById('xh').value||'10:30',tp=document.getElementById('xt').value;st.addOpen=false;
      mutDay(k,d=>d.extras.push({id:'x'+rid(),alunoId:aid,hora:hr,tipo:tp,status:''}));toast(tp==='rep'?'Reposição adicionada':tp==='adi'?'Adiantamento adicionado':'Aula extra adicionada');return}
    case 'rmx':mutDay(k,d=>{d.extras=d.extras.filter(x=>x.id!==b.dataset.k)});return;
    case 'off':st.offOpen=true;break;
    case 'offcancel':st.offOpen=false;break;
    case 'offok':{const mo=document.getElementById('offm').value;st.offOpen=false;mutDay(k,d=>{d.off=true;d.motivo=mo});return}
    case 'on':mutDay(k,d=>{d.off=false;delete d.motivo});return;
    case 'mprev':case 'mnext':{const [y,m]=st.month.split('-').map(Number);const dt=new Date(y,m-1+(act==='mnext'?1:-1),1);st.month=keyOf(dt).slice(0,7);break}
    case 'advno':st.advId=null;break;
    case 'rowdel':st.delId=b.dataset.id;break;
    case 'rowdelno':st.delId=null;break;
    case 'rowdelok':{const id=b.dataset.id;alunos.delete(id);st.delId=null;if(db)db.doc(PB+'alunos/'+id).delete().catch(()=>toast('Não excluiu.'));toast('Aluno excluído');break}
    case 'novo':draft={id:null,nome:'',valorAula:0,forma:'mensal',contratadas:0,ativo:true,slots:[{d:1,h:'07:00'}]};st.editId='new';st.delConfirm=false;break;
    case 'adds':pullDraft();draft.slots.push({d:1,h:'07:00'});renderEditor();return;
    case 'voltar':st.editId=null;break;
    case 'alback':st.alunoId=null;break;
    case 'altoggle':{const a=alunos.get(st.alunoId);if(!a)break;const n=Object.assign({},a);if(a.ativo===false){n.ativo=true;delete n.inativoDesde;toast('Aluno reativado')}else{n.ativo=false;n.inativoDesde=today().slice(0,7);toast('Aluno inativado')}alunos.set(a.id,n);saveAluno(n);break}
    case 'aledit':{const a=alunos.get(st.alunoId);if(a){draft=JSON.parse(JSON.stringify(a));draft.slots=draft.slots||[];st.editId=a.id;st.delConfirm=false}break}
    case 'salvar':{pullDraft();if(!draft.nome){toast('Coloque o nome do aluno');return}
      if(!draft.id)draft.id=slug(draft.nome);
      const a=JSON.parse(JSON.stringify(draft));alunos.set(a.id,a);saveAluno(a);st.editId=null;toast('Aluno salvo');break}
    case 'del':st.delConfirm=true;renderEditor();return;
    case 'delno':st.delConfirm=false;renderEditor();return;
    case 'delok':{const id=draft.id;alunos.delete(id);if(db)db.doc(PB+'alunos/'+id).delete().catch(()=>toast('Não excluiu.'));st.editId=null;toast('Aluno excluído');break}
  }
  render();
});
main.addEventListener('input',e=>{if(!['ev','ec'].includes(e.target.id)||!draft)return;
  const v=parseFloat(document.getElementById('ev').value)||0,c=parseInt(document.getElementById('ec').value)||(draft.slots||[]).length*4;
  document.getElementById('etot').innerHTML=v?`Mensalidade: <b>${brl(v*c)}</b> (${brl(v)} × ${c} aulas)`:'Mensalidade calculada = valor da aula × aulas contratadas';});
main.addEventListener('change',e=>{
  if(e.target.dataset&&e.target.dataset.paydate&&e.target.dataset.paydate==='pac'){const id=e.target.dataset.id,v=e.target.value||today(),nm=v.slice(0,7),a=alunos.get(id);
    const pk=a&&a.tipo==='pacote'&&pacoteDoMes(a,st.month);
    if(pk&&nm!==st.month&&pk._i===0&&a.pacote&&pacBase(a.pacote)===st.month){
      mutPag(st.month,d=>{if(d[id]){Object.keys(d[id]).filter(z=>z==='pac'||/^pac\d{8}$/.test(z)).forEach(z=>delete d[id][z])}});
      mutPag(nm,d=>{d[id]=d[id]||{};d[id].pac=v});
      const n=JSON.parse(JSON.stringify(a));n.pacote.mesCob=nm;alunos.set(id,n);saveAluno(n);render();
      toast(`Pagamento do pacote passou para ${mesCurto(nm)}`);return}
  }
  if(e.target.dataset&&e.target.dataset.pdia!=null&&e.target.dataset.id){const a=alunos.get(e.target.dataset.id);if(!a)return;const i=+e.target.dataset.pdia,v=Math.min(31,Math.max(1,parseInt(e.target.value,10)||10));const L=parcList(a);L[i].dia=v;const n=Object.assign({},a,{parc:L.map(p=>p.v?{dia:p.dia,v:p.v}:{dia:p.dia}),nParc:L.length});alunos.set(a.id,n);saveAluno(n);render();toast(`${i+1}ª parcela vence dia ${v}`);return}
  if(e.target.dataset&&e.target.dataset.diavenc){const id=e.target.dataset.diavenc,a=alunos.get(id);if(!a)return;const v=Math.min(31,Math.max(1,parseInt(e.target.value,10)||10));const n=Object.assign({},a,{diaVenc:v});alunos.set(id,n);saveAluno(n);render();toast('Vence todo dia '+v);return}
  if(e.target.dataset&&(e.target.dataset.pvenc||e.target.dataset.pate)){const id=e.target.dataset.pvenc||e.target.dataset.pate,f=e.target.dataset.pvenc?'venc':'ate',v=e.target.value;mutPag(st.month,d=>{d[id]=d[id]||{};if(v)d[id][f]=v;else delete d[id][f]});toast(v?(f==='ate'?'Pendente até ':'Vence em ')+v.slice(8,10)+'/'+v.slice(5,7):'Data removida');return}
  if(e.target.dataset&&e.target.dataset.paydate){const id=e.target.dataset.id,k=e.target.dataset.paydate,v=e.target.value||today();mutPag(st.month,d=>{d[id]=d[id]||{};d[id][k]=v});toast('Data do pagamento: '+v.slice(8,10)+'/'+v.slice(5,7));return}
  if(e.target.id==='et'&&draft){pullDraft();draft.tipo=e.target.value;if(draft.tipo==='aula'&&!(draft.slots||[]).length)draft.slots=[{d:1,h:'07:00'}];renderEditor();return}
  if(e.target.dataset.ciclo){const a=alunos.get(e.target.dataset.ciclo);if(a){const n=Object.assign({},a,{ciclo:e.target.value});alunos.set(a.id,n);saveAluno(n);render();toast('Cobrança: '+CICLOS[e.target.value]);}return}
  if(e.target.dataset.forma){const a=alunos.get(e.target.dataset.forma);if(a){const n=Object.assign({},a,{forma:e.target.value});alunos.set(a.id,n);saveAluno(n);render();toast('Forma de pagamento: '+FORMAS[e.target.value])}return}
  const t=e.target;if(!t.classList.contains('tm'))return;
  const key=t.dataset.k,tp=t.dataset.t,v=t.value;if(!v)return;
  mutDay(st.date,d=>{if(tp==='fixo'){const it=agendaDoDia(st.date).find(i=>i.key===key);const r=d.registros[key]||{};if(it&&v===it.orig)delete r.hora;else r.hora=v;if(!r.status&&!r.hora)delete d.registros[key];else d.registros[key]=r}
    else{const x=d.extras.find(x=>x.id===key);if(x)x.hora=v}});
  toast('Horário alterado só neste dia');
});

/* ---------- conexão ---------- */
render(); window.addEventListener('online',()=>render()); window.addEventListener('offline',()=>render());
(async()=>{
  try{dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null}catch(e){dl=null}
  online=true;
  const w=await DBW;
  if(w){ db=w.db; PB='data/users/'+w.uid+'/pres/'; } else { db=localDB('sf_pres_local'); PB=''; localMode=true; }
  try{ const cf=db.doc(PB+'cfg/geral'); const g=await cf.get(); const v=g&&(g.exists===undefined? g.data&&g.data() : (g.exists? g.data():null));
    if(v&&v.inicio) INICIO=v.inicio; else await cf.set({inicio:INICIO}); }catch(e){}
  db.collection(PB+'alunos').onSnapshot(s=>{alunos.clear();s.docs.forEach(d=>alunos.set(d.id,Object.assign({id:d.id},d.data())));loadedA=true;if(!(st.view==='alunos'&&st.editId))render()},()=>{toast('Perdeu a conexão com os alunos. Recarregue a página.')});
  db.collection(PB+'dias').onSnapshot(s=>{dias.clear();s.docs.forEach(d=>dias.set(d.id,d.data()));loadedD=true;if(!(st.view==='alunos'&&st.editId)&&!st.addOpen&&!st.offOpen)render()},()=>{toast('Perdeu a conexão com a chamada. Recarregue a página.')});
  db.collection(PB+'historico').onSnapshot(s=>{hist.clear();s.docs.forEach(d=>hist.set(d.id,d.data()));render()},()=>{});
  db.collection(PB+'pagamentos').onSnapshot(s=>{pags.clear();s.docs.forEach(d=>pags.set(d.id,d.data()));if(st.view==='pag')render()},()=>{toast('Perdeu a conexão com os pagamentos. Recarregue a página.')});
  render();
})();

function setMode(m){ const nav=document.getElementById('pnav'); if(m==='fin'){ st.view='pag'; nav.hidden=true; } else { if(st.view==='pag') st.view='hoje'; nav.hidden=false; } st.editId=null; render(); }
function markPresent(pid,k){
  if(isOff(k)) return 'off';
  const items=agendaDoDia(k).filter(i=>i.a.id===pid); if(!items.length) return 'noslot';
  if(items.some(i=>i.status==='p')) return 'already';
  const it=items.find(i=>!i.status)||items[0];
  mutDay(k,d=>{ if(it.tipo==='fixo'){ const r=d.registros[it.key]||{}; r.status='p'; delete r.destino; d.registros[it.key]=r; } else { const x=d.extras.find(x=>x.id===it.key); if(x){ x.status='p'; delete x.destino; } } });
  return 'ok';
}
function addAula(pid,k,hora,tipo){ const id='x'+rid(); mutDay(k,d=>d.extras.push({id,alunoId:pid,hora,tipo,status:k<today()?'p':''})); return id; }
function rmAula(k,id){ mutDay(k,d=>{d.extras=(d.extras||[]).filter(x=>x.id!==id)}); }
function regOf(k,key){ return ((dayData(k).registros)||{})[key]||{}; }
function setDest(k,key,v){ const r=regOf(k,key); if(v!=='rep'&&r.repX&&r.repK) rmAula(r.repK,r.repX);
  mutDay(k,d=>{ const x=Object.assign(d.registros[key]||{},{status:'f',destino:v}); if(v!=='rep'){ delete x.repK; delete x.repH; delete x.repX; } d.registros[key]=x; }); }
function marcaRep(pid,kf,key,kr,hr){ const r=regOf(kf,key); if(r.repX&&r.repK) rmAula(r.repK,r.repX); const id=addAula(pid,kr,hr,'rep');
  mutDay(kf,d=>{ d.registros[key]=Object.assign(d.registros[key]||{},{status:'f',destino:'rep',repK:kr,repH:hr,repX:id}); }); return id; }
function setSt(k,key,v){ const it=agendaDoDia(k).find(i=>i.key===key); if(!it) return;
  if(it.tipo==='fixo'){ const r0=regOf(k,key); if(v!=='f'&&r0.repX&&r0.repK) rmAula(r0.repK,r0.repX);
    mutDay(k,d=>{ const r=d.registros[key]||{}; if(v) r.status=v; else delete r.status; if(v!=='f'){ delete r.destino; delete r.repK; delete r.repH; delete r.repX; } else r.destino=r.destino||'rep'; if(!r.hora&&it.hora!==it.orig) r.hora=it.hora; if(!v&&!r.hora&&!r.motivo&&!r.obs) delete d.registros[key]; else d.registros[key]=r; }); }
  else mutDay(k,d=>{ const x=(d.extras||[]).find(x=>x.id===key); if(x){ x.status=v; if(v!=='f') delete x.destino; } }); }
function desmarcaRep(kf,key){ const r=regOf(kf,key); if(r.repX&&r.repK) rmAula(r.repK,r.repX); mutDay(kf,d=>{ const x=d.registros[key]; if(x){ delete x.repK; delete x.repH; delete x.repX; } }); }
function getAula(k,id){ return ((dayData(k).extras)||[]).find(x=>x.id===id)||null; }
function updAula(k,id,o){ const x=getAula(k,id); if(!x) return;
  if(o.k&&o.k!==k){ const nx=Object.assign({},x,o.hora?{hora:o.hora}:{},o.tipo?{tipo:o.tipo}:{}); delete nx.k; if(o.k<today()) nx.status=nx.status||'p'; rmAula(k,id); mutDay(o.k,d=>d.extras.push(nx)); return; }
  mutDay(k,d=>{ const y=d.extras.find(z=>z.id===id); if(y){ if(o.hora) y.hora=o.hora; if(o.tipo) y.tipo=o.tipo; } }); }
function importPag(L){ const ym=st.month||today().slice(0,7); const F=finCalc(ym);
  mutPag(ym,d=>{ L.forEach(p=>{ const r=F.rows.find(x=>x.a.id===p.id); if(!r) return; d[p.id]=d[p.id]||{}; const x=d[p.id]; const dt=p.d||today(); let left=+p.v||0; const all=!left;
    let part=false; (r.partes||[]).forEach(t=>{ if(x[t.k]||part) return; if(all||left>=t.v-0.01){ x[t.k]=dt; left-=t.v; } else part=true; });
    if(!all&&part&&left>0.009){ x.avulsos=(x.avulsos||[]).concat([{id:rid(),v:Math.round(left*100)/100,m:'Diferença / ajuste',dt,d:'Importado'}]); } }); }); }
return {_t:{mutDay,rk,alunos}, gerar:(id,tipo,ym)=>gerarPdf(id,tipo,ym), gerarTodos:(tipo,ym)=>gerarTodos(tipo,ym), listaAt:()=>ativos().filter(a=>!isFicha(a)).map(a=>({id:a.id,nome:a.nome,tel:a.tel||''})), sendHTML:async(html,nome)=>{ if(!window.jspdf||!window.html2canvas){ toast('O gerador de imagem não carregou. Recarregue a página.'); return; } toast('Gerando…'); try{ const doc=await cardPdf(html); await offerFile(doc.output('blob'),nome+'.pdf',{imgs:[{src:doc._img,name:nome+'.jpg'}],text:nome}); }catch(e){ toast('Não consegui gerar ('+erroPT(e)+').'); } }, importPag, finMonth:()=>st.month||today().slice(0,7), vencidos, CICLOS, goPag:(id,ym)=>{ if(ym) st.month=ym; st.kpi=null; if(window.RP_LIMPO) st.fAl=true; setMode('fin'); setTimeout(()=>{ const el=document.getElementById('pc-'+id); if(el){ el.scrollIntoView({behavior:'smooth',block:'center'}); el.classList.add('flash'); setTimeout(()=>el.classList.remove('flash'),1600); } },120); }, pacSched, addAula, rmAula, updAula, getAula, saldo:pid=>saldoRepos().get(pid)||0, tipoAluno:pid=>{ const a=alunos.get(pid); return a? a.tipo||'aula' : ''; }, finCard:()=>st._fin? finCardHTML(st._fin):'', planCard:(id,ym)=>{ const a=alunos.get(id); return a? planCardHTML(a,ym) : ""; }, fechCard:(id,ym)=>{ const a=alunos.get(id); return a? fechCardHTML(a,ym) : ""; }, pacUso:id=>{ const a=alunos.get(id); return a? pacUso(a) : null; }, remove:id=>{ alunos.delete(id); if(db) db.doc(PB+'alunos/'+id).delete().catch(()=>toast('Não excluiu.')); render(); }, upsert:a=>{ if(!a.id) a.id=slug(a.nome); alunos.set(a.id,a); saveAluno(a); render(); return a.id; }, aluno:id=>{ const a=alunos.get(id); return a? JSON.parse(JSON.stringify(a)) : null; }, dump:()=>{ const cl=v=>JSON.parse(JSON.stringify(v)); const o={v:2,inicio:INICIO,alunos:{},dias:{},pagamentos:{},historico:{}};
    alunos.forEach((v,k)=>{ const x=cl(v); delete x.id; o.alunos[k]=x; }); dias.forEach((v,k)=>o.dias[k]=cl(v)); pags.forEach((v,k)=>o.pagamentos[k]=cl(v)); hist.forEach((v,k)=>o.historico[k]=cl(v)); return o; },
  load:o=>{ if(!o||!db) return; const W=[];
    if(o.v===2){ if(o.inicio){ INICIO=o.inicio; W.push(db.doc(PB+'cfg/geral').set({inicio:o.inicio})); }
      [["alunos",alunos],["dias",dias],["pagamentos",pags],["historico",hist]].forEach(([c,M])=>[...M.keys()].forEach(k=>{ if(!(o[c]&&k in o[c])) W.push(db.doc(PB+c+'/'+k).delete()); }));
      ["alunos","dias","pagamentos","historico"].forEach(c=>Object.entries(o[c]||{}).forEach(([k,v])=>W.push(db.doc(PB+c+'/'+k).set(v)))); }
    else Object.entries(o).forEach(([k,v])=>{ if(!/^(alunos|dias|pagamentos|historico|cfg)\//.test(k)) return; if(k==='cfg/geral'&&v&&v.inicio) INICIO=v.inicio; W.push(db.doc(PB+k).set(v)); });
    Promise.all(W).then(()=>toast('Presença e financeiro restaurados')).catch(e=>toast('Parte da presença não restaurou ('+erroPT(e)+'). Tente de novo.')); }, isLocal:()=>localMode, fin:ym=>finCalc(ym), curMonth:()=>st.month, setMode, markPresent, isReady:()=>loadedA&&loadedD, agenda:k=>agendaDoDia(k), efst:(i,k)=>efStatus(i,k), alunos:()=>[...alunos.values()], isOff, offReason, render, regOf, setDest, setSt, marcaRep, desmarcaRep};
})();

const NAME_MAP={};
function syncStudents(){
  if(!presOn()) return false; const L=PRES.alunos(); const ids=new Set(L.map(a=>a.id)); let ch=false;
  S.students.forEach(m=>{ if(m.pid&&!ids.has(m.pid)){ delete m.pid; ch=true; } });
  S.students.forEach(m=>{ if(!m.pid) return; const a=L.find(x=>x.id===m.pid); if(a&&a.nome&&a.nome!==m.name){ m.name=a.nome; ch=true; } });
  S.students.forEach(m=>{ if(m.pid||m.noLink) return; const n=noAcc(m.name).trim();
    let pid=NAME_MAP[n]; if(pid&&!ids.has(pid)) pid=null;
    if(!pid){ const a=L.find(a=>noAcc(a.nome).trim()===n); if(a) pid=a.id; }
    if(pid&&!byPid(pid)){ m.pid=pid; ch=true; } });
  L.filter(a=>a.ativo!==false&&(a.slots||[]).length&&!byPid(a.id)).forEach(a=>{
    const pl={id:nid(),sessions:[]}; S.plans.push(pl);
    S.students.push({id:nid(),name:a.nome,pid:a.id,phase:1,novo:true,coreExtra:false,planId:pl.id,ov:{},log:[]}); ch=true; });
  return ch;
}
let PRES_FIRST=true, PRES_SIG="";
let PAY_SIG="", PAY_HIDE=null;
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible"&&PAY_HIDE!==null){ PAY_HIDE=null; PAY_SIG=""; try{ renderPayAlert(); }catch(e){} } }); const hojeK=()=>{ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
function bdayList(){ const out=[], seen=new Set(); const L=[]; try{ if(presOn()) PRES.alunos().filter(a=>a.ativo!==false&&a.nasc).forEach(a=>L.push({n:a.nome,d:a.nasc})); }catch(_){} S.students.forEach(x=>{ if(x.nasc&&!x.own) L.push({n:x.name,d:x.nasc}); });
  const t=new Date(); t.setHours(0,0,0,0);
  L.forEach(x=>{ const k=noAcc(first(x.n)); if(seen.has(k)) return; seen.add(k); const [y,mo,da]=String(x.d).split("-").map(Number); if(!mo||!da) return; let b=new Date(t.getFullYear(),mo-1,da); if(b<t) b=new Date(t.getFullYear()+1,mo-1,da); const dd=Math.round((b-t)/864e5); if(dd<=7) out.push({n:x.n,dd,b,age:y? b.getFullYear()-y : 0}); });
  return out.sort((a,b)=>a.dd-b.dd); }
function renderBday(){ let el=document.getElementById("bdayAlert"); const pa=document.getElementById("payAlert"); if(!pa) return; if(!el){ el=document.createElement("div"); el.id="bdayAlert"; pa.after(el);
    el.addEventListener("click",e=>{ if(e.target.closest("[data-bdx]")){ try{ localStorage.setItem("rp_bday_x",isoD(new Date())); }catch(_){} el.hidden=true; } }); }
  let x=""; try{ x=localStorage.getItem("rp_bday_x")||""; }catch(_){} const L=bdayList(); if(!L.length||x===isoD(new Date())){ el.hidden=true; return; }
  const DN=["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
  el.hidden=false; el.innerHTML=`<span class="bd-ic">🎂</span><span class="bd-t">${L.map(o=>o.dd===0?`<b>Hoje é aniversário de ${esc(first(o.n))}!</b>${o.age?` (${o.age} anos)`:""}`:o.dd===1?`Amanhã: <b>${esc(first(o.n))}</b>`:`${DN[o.b.getDay()]} ${ddmm(isoD(o.b))}: <b>${esc(first(o.n))}</b>`).join(" · ")}</span><button class="bd-x" data-bdx aria-label="Fechar hoje">✕</button>`; }
function renderPayAlert(){ try{ renderBday(); }catch(_){} const el=document.getElementById("payAlert"); if(!el) return; if(!presOn()){ el.hidden=true; return; }
  let off=""; try{ off=localStorage.getItem("rp_payoff")||""; }catch(_){} if(off===isoD(new Date())){ el.hidden=true; el.innerHTML=""; return; }
  let L=[]; try{ L=PRES.vencidos(); }catch(e){ L=[]; }
  const sig=JSON.stringify(L.map(v=>[v.a.id,v.prazo,Math.round(v.falta)])); const hid=PAY_HIDE||"";
  if(!L.length||hid===sig){ el.hidden=true; el.innerHTML=""; PAY_SIG=sig; return; }
  if(sig===PAY_SIG&&!el.hidden) return; PAY_SIG=sig;
  el.innerHTML=`<div class="payal payal-s"><button class="payal-go" data-payalgo>⚠ Pagamento vencido <small>ver no Financeiro ›</small></button><button class="payal-x" data-payalx aria-label="Ocultar">×</button></div>`;
  el.hidden=false; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-payoff]"); if(!b) return; const pa=document.getElementById("payAlert"); if(b.dataset.payoff==="1"){ try{ localStorage.setItem("rp_payoff",isoD(new Date())); }catch(_){} toast("Certo. O aviso de pagamento volta amanhã."); } PAY_HIDE=PAY_SIG; pa.hidden=true; pa.innerHTML=""; });
document.addEventListener("click",e=>{ const g=e.target.closest("[data-payalgo]"); if(g){ show("financeiro",true); window.scrollTo(0,0); try{ const v=PRES.vencidos(); if(v.length) setTimeout(()=>PRES.goPag(v[0].a.id,v[0].ym),80); }catch(_){} return; } });
document.addEventListener("click",e=>{ const b=e.target.closest("[data-payal],[data-payalx]"); if(!b) return;
  if(b.hasAttribute("data-payalx")){ const hj=isoD(new Date()); let c={d:hj,n:0}; try{ const o=JSON.parse(localStorage.getItem("rp_payx")||"{}"); if(o.d===hj) c=o; }catch(_){} c.n++; try{ localStorage.setItem("rp_payx",JSON.stringify(c)); }catch(_){}
    const pa=document.getElementById("payAlert");
    if(c.n>=3){ pa.innerHTML=`<div class="payal payal-ask"><span>Você já fechou ${c.n}x hoje. Não mostrar mais hoje?</span><button class="btn small" data-payoff="1">Sim, só amanhã</button><button class="btn small ghost" data-payoff="0">Não</button></div>`; pa.hidden=false; return; }
    PAY_HIDE=PAY_SIG; pa.hidden=true; toast("Aviso fechado. Volta a aparecer quando você sair e entrar de novo."); return; }
  const [id,ym]=b.dataset.payal.split("|"); show("financeiro"); PRES.goPag(id,ym); window.scrollTo(0,0); });
window.__presHook=function(){
  try{ renderPayAlert(); }catch(e){}
  if(!presOn()) return; try{ if(S&&S.agenda) agSync(); if(AG_OPEN) agRender(); }catch(e){}
  const ch=syncStudents(); if(ch) save();
  const sig=JSON.stringify(PRES.alunos().map(a=>[a.id,a.ativo]))+"|"+(dateOfDay(S.day)||"")+"|"+PRES.isOff(dateOfDay(S.day)||"x");
  if(PRES_FIRST){ PRES_FIRST=false; PRES_SIG=sig; autoToday(); save(); renderAll(); return; }
  if(ch||sig!==PRES_SIG){ PRES_SIG=sig; renderTop(); renderSessao(); return; }
  const c=document.querySelector("#view-sessao .card.today"); if(c&&CUR_TAB==="sessao"){ const tmp=document.createElement("div"); tmp.innerHTML=todayHTML(A()); if(tmp.firstElementChild) c.replaceWith(tmp.firstElementChild); }
};

/* ---------- Programação: o que cada aluno faz em cada semana ---------- */
let semFilter="todos"; const semOpen={};
const SEM_FRASE="Não seja o professor da IA. Use o seu senso crítico e coloque aqui tudo o que você sabe. Este sistema é um auxílio, não um treino de copiar e colar: seus alunos merecem a sua identidade. Use cada programação como ponto de partida e ajuste ao seu aluno.";
const PH_MSG={0:"Semana de teste: menos séries, achar a carga e observar.",1:"Aqui não é peso, é qualidade de movimento e consciência corporal.",2:"Aqui a gente se aventura nas cargas.",3:"Aqui as métodos avançados ganham mais espaço.",4:"Recuperar para voltar melhor."};
const CARGA_L={nova:"Nova",sobe:"↑ Sobe",mantem:"= Mantém",desce:"↓ Desce"};
const CARGA_LL={nova:"carga nova",sobe:"mais pesado",mantem:"mesmo peso",desce:"menos peso"};
const TEC_NAMES=["Pirâmide crescente","Pirâmide decrescente","Dropset","Rest-pause","Bi-set agonista","Bi-set antagonista","MMSS + MMII","Tri-set","Isometria","Cadência controlada"];
const TEC_OLD={ultimo:"Método no último exercício","2series":"Método em até 2 séries",livre:"Método livre"};
/* Exemplo do Tio Má: [séries, repetições, carga, técnica 1, técnica 2, objetivo da semana] */
const PH_WK={
 0:[["1–2","12–15","nova","","","Testar os exercícios com menos séries e achar a carga"]],
 1:[["3","12","nova","","","Achar a carga para 12 com técnica limpa"],["3","12","sobe","","","Mesmas 12 repetições, mais pesado"],["3","15","mantem","","","15 repetições com o mesmo peso"],["3","15","sobe","","","15 repetições, mais pesado"],["3","15","sobe","","","Mais peso, sem passar de 15"],["3","15","sobe","","","Mais peso, sem passar de 15"]],
 2:[["3","8","nova","","","Carga nova da fase para 8 repetições"],["3","8","sobe","Dropset","","Mais pesado. Método de preferência no último exercício"],["3","10","mantem","Dropset","","10 repetições com o mesmo peso. Método no último exercício"],["3","10","sobe","Rest-pause","","Mais pesado. Método no último exercício"],["3","12","mantem","Rest-pause","","12 repetições com o mesmo peso"],["3","12","sobe","Dropset","","Mais peso, sem passar de 12"]],
 3:[["4","8","nova","Rest-pause","","Carga nova para 8 repetições"],["4","8","sobe","Bi-set agonista","Dropset","Mais pesado"],["4","10","mantem","Rest-pause","Bi-set agonista","10 repetições com o mesmo peso"],["4","10","sobe","Dropset","","Mais peso, sem passar de 10"],["4","10","sobe","Rest-pause","","Se quiser: mais peso, sem passar de 10"],["4","10","sobe","Dropset","","Se quiser: mais peso, sem passar de 10"]],
 4:[["2","12","desce","","","Menos peso e menos séries, descanso de 90\" a 2'"]]
};
/* Programação para quem tem medo de peso: Semana 0 + ciclos de 3 semanas (8 → 10 → 12 com a mesma carga; no ciclo seguinte a carga sobe e volta para 8) */
const CONF_NAME="Medo de peso";
function confRow(i){ if(i===0) return ["3","8","nova","","","Semana 0: exercícios novos. Descobrir a carga e ver se o exercício faz sentido para o aluno"];
  const pos=(i-1)%3, cy=Math.floor((i-1)/3);
  const r=["8","10","12"][pos]; const c= pos===0? (cy===0?"mantem":"sobe") : "mantem";
  const t= pos===2? "Pirâmide crescente" : (pos===1&&cy>=1? "Pirâmide decrescente" : "");
  const note= pos===0? (cy===0?"Mesma carga da Semana 0, 8 repetições":"Carga um pouco mais pesada e volta para 8 repetições")
    : pos===1? `Mesma carga, 10 repetições${cy>=1?". Pirâmide decrescente: interessante no último exercício, se o aluno estiver confiante":""}`
    : "Mesma carga, 12 repetições. Pirâmide crescente em 2 exercícios: o aluno experimenta o peso maior antes de ele subir";
  return ["3",r,c,t,"",note]; }
const MP_DEF={name:"Minha linha",rows:[0,1,2,3,4,5].map(()=>({s:"",r:"",c:"",t:"",t2:"",note:""}))};
const myProg=()=> S.myProg||MP_DEF;
const lineOf=p=> p.line!=null? p.line : (p.fases? "tio" : "");
const usesPh=st=> !!st && lineOf(progOf(st))==="tio";

const TEC_INFO="Método avançado não é melhor que série comum. Os estudos mais recentes mostram hipertrofia e força parecidas quando o esforço é parecido. O que ela traz é outro tipo de estímulo, economia de tempo e um treino mais dinâmico. O custo é mais fadiga e desconforto, e nenhum estudo testou quantos métodos cabem num treino. Por isso a recomendação prática é 1 a 2 métodos por treino, de preferência no fim e em exercícios monoarticulares.";
const TECS=[
 {t:"Cadência controlada",how:"Controlar o tempo de cada fase da repetição. Exemplo: 3\" na excêntrica (descida) e 1\" na concêntrica (subida). Você escolhe o tempo que fizer sentido para o seu aluno.",ex:"Agachamento: 3\" descendo, 1\" subindo.",when:"Fase 1, aprendizado, aluno com pouca consciência corporal.",whenG:"Aprendizado e aluno com pouca consciência corporal.",sci:"Repetições mais lentas não geram mais hipertrofia: de meio segundo a cerca de 8 segundos por repetição, os resultados são parecidos. O ganho é controle, técnica e segurança."},
 {t:"Isometria",how:"Segurar parado no ponto mais difícil, de 3 a 30\", antes, durante ou depois das repetições.",ex:"Cadeira extensora segurando 5\" no topo da última repetição.",when:"Fase 1, tendão, aluno com dor ou insegurança na amplitude completa.",whenG:"Adaptação do tendão, aluno com dor ou insegurança na amplitude completa.",sci:"Também gera força e hipertrofia, mais concentradas no ângulo treinado, e ajuda na adaptação do tendão."},
 {t:"Progressão dupla",how:"Repete as repetições e sobe a carga; depois sobe as repetições com o mesmo peso. É a lógica das fases.",howG:"Repete as repetições e sobe a carga; depois sobe as repetições com o mesmo peso.",whenG:"Em qualquer programação, com o aluno que já domina o movimento.",ex:"3×12 com 40 kg → 3×12 com 42 kg → 3×15 com 42 kg.",when:"Todas as fases.",sci:"Progredir subindo a carga ou subindo as repetições traz resultados parecidos. O importante é progredir com técnica."},
 {t:"Bi-set agonista (mesmo músculo)",how:"Dois exercícios do mesmo músculo, sem descanso entre eles.",ex:"Supino + crucifixo.",when:"Para densidade e \"pump\". Não usar como base do treino.",sci:"Aumenta a fadiga local e economiza tempo, mas o 2º exercício rende menos carga e repetições. Rende menos do que as mesmas séries feitas separadas, com descanso."},
 {t:"Bi-set antagonista",how:"Dois exercícios de músculos opostos, sem descanso entre eles.",ex:"Rosca direta + tríceps na corda; supino + remada.",when:"Aula curta, manter o número de séries em menos tempo.",sci:"Mantém o desempenho dos dois exercícios e reduz bastante o tempo da sessão."},
 {t:"MMSS + MMII",how:"Um exercício de membro superior e um de inferior em sequência.",ex:"Agachamento + puxada frente.",when:"Excelente para emagrecimento e para alunos com obesidade, em circuito.",sci:"Mais densidade de treino e frequência cardíaca alta, com pouca perda de desempenho entre os membros."},
 {t:"Tri-set / circuito",how:"Três ou mais exercícios em sequência.",ex:"Leg press + cadeira extensora + afundo.",when:"Condicionamento e gasto energético.",sci:"Alto gasto e muita densidade. A fadiga derruba primeiro a técnica: observe a execução."},
 {t:"Pirâmide crescente",how:"A carga sobe a cada série e as repetições descem.",ex:"Supino: 12 com 10 kg, 10 com 12 kg, 8 com 15 kg.",when:"Para quem tem medo de peso: em 2 exercícios, na semana antes de a carga subir. O aluno experimenta o peso maior aos poucos.",sci:"Força e hipertrofia parecidas com as das séries tradicionais quando o número de séries é parecido. As primeiras séries funcionam quase como aquecimento para a última."},
 {t:"Pirâmide decrescente",how:"Começa com a carga mais alta e menos repetições. A carga desce e as repetições sobem.",ex:"Leg press: 6 com 15 kg, 8 com 12 kg, 10 com 10 kg.",when:"É interessante no último exercício, quando o aluno já está confiante com a carga. É mais tensional.",sci:"Há pouca pesquisa específica. Como os outros métodos, não é superior às séries tradicionais: serve para variar o estímulo e desafiar o aluno."},
 {t:"Dropset",how:"Na última série, ao chegar perto da falha, tira de 20 a 30% da carga e continua.",ex:"Cadeira extensora: 12 repetições com 40 kg, tira para 30 kg e vai até perto da falha.",when:"Fase 2 em diante, de preferência no último exercício e em monoarticular.",whenG:"Aluno com técnica estável, de preferência no último exercício e em monoarticular.",sci:"Hipertrofia parecida com a de séries tradicionais, em menos tempo. Fadiga e desconforto altos."},
 {t:"Cluster set",how:"Divide a série em blocos de poucas repetições, com pausa curta (15 a 30\") entre eles, sem tirar a carga.",ex:"Agachamento: 4 blocos de 3 repetições com 20\" de pausa = 12 repetições com uma carga mais alta.",when:"Força e potência, aluno que perde a técnica no fim da série ou que precisa de carga alta com menos fadiga.",sci:"Mantém a velocidade e a qualidade das repetições e diminui a fadiga. Ganhos de força e hipertrofia parecidos com os das séries tradicionais quando o total de repetições e a carga são iguais; vantagem na potência e na velocidade (meta-análises de Davies et al., 2021, e Jukic et al., 2020)."},
 {t:"Rest-pause",how:"Chega perto da falha, pausa de 10 a 20\" e faz mais repetições com a mesma carga.",ex:"Leg press: 10 repetições, 15\" de pausa, mais 3 a 4, 15\" de pausa, mais 2 a 3.",when:"Fase 2 em diante. Evite em multiarticular pesado com iniciante.",whenG:"Aluno com técnica estável. Evite em multiarticular pesado com iniciante.",sci:"Resultados parecidos com os de séries tradicionais, com muitas repetições em pouco tempo. Muito cansativo."}
];
const tecLbl=r=> r&&r.tec==="Cadência controlada"&&(num(r.cadE)||num(r.cadC))? [num(r.cadE)?r.cadE+'" Exc.':"",num(r.cadC)?r.cadC+'" Con.':""].filter(Boolean).join(" ") : (r&&r.tec)||"";
const tecByName=n=> TECS.find(x=>noAcc(x.t)===noAcc(n)) || TECS.find(x=>noAcc(x.t).startsWith(noAcc(n).replace(/[^a-z0-9 ]/g,"").split(" ")[0]));

function wkRows(st){ const p=progOf(st); const ln=lineOf(p); if(!ln) return null;
  const k=+st.phase; const L= wkN(st); const rows=[];
  for(let i=0;i<L;i++){
    let b; if(ln==="conf"){ const x=confRow(i); b={s:x[0],r:x[1],c:x[2],t:x[3],t2:x[4],note:x[5]}; }
    else if(ln==="tio"){ const base=PH_WK[k]||PH_WK[1]; const x=base[Math.min(i,base.length-1)]; b={s:x[0],r:x[1],c:x[2],t:x[3],t2:x[4],note:x[5]}; }
    else { const x=myProg().rows[Math.min(i,myProg().rows.length-1)]||{}; b={s:x.s||"",r:x.r||"",c:x.c||"",t:x.t||"",t2:x.t2||"",note:x.note||""}; }
    const key= ln==="tio"? k : ln==="conf"? "conf" : "minha"; const o=((p.wk||{})[key]||{})[i]||{};
    rows.push({s:o.s??b.s,r:o.r??b.r,c:o.c??b.c,t:o.t??b.t,t2:o.t2??b.t2,note:o.note??b.note}); }
  return rows; }
function wkN(st){ const p=progOf(st); const k=+st.phase; if(lineOf(p)==="tio"&&(k===0||k===4)) return 1; return Math.max(1,Math.min(52,+p.weeks||4)); }
function wkPlan(st){ const r=wkRows(st); return r? r.slice(0,wkN(st)) : null; }
function curWkPlan(st){ const rows=wkPlan(st); if(!rows) return null; const bi=blockInfo(st); const n=bi&&!bi.before? Math.min(Math.max(bi.n,1),rows.length) : 1; const r=rows[n-1]; if(!r.s&&!r.r) return null; return {...r,n,N:rows.length}; }
const AFTER_HTML=`<div class="after"><b>Depois das fases</b><ul><li><b>Suba a dificuldade:</b> volte para uma fase com exercícios mais livres e desafiadores, ou uma máquina que exija mais controle.</li><li><b>Escolha a fase</b> que fizer sentido para o momento do aluno.</li><li><b>Siga a sua linha:</b> use as séries e repetições como quiser. Aqui começa a sua linha, e as fases foram só referência.</li><li><b>Recomece tudo</b> do início, como explicado nas fases.</li></ul></div>`;
const tecTxt=w=> [w.t,w.t2].filter(Boolean).map(x=>TEC_OLD[x]||x).join(" + ");
const planTxt=w=> `${w.s||"?"} × ${w.r||"?"}${w.c?` · ${CARGA_LL[w.c]||w.c}`:""}${tecTxt(w)?` · ${tecTxt(w)}`:""}`;

/* Divisão sugerida: número de exercícios por músculo em cada treino */
const SPLITS={
 2:{A:{quad:1,isq:1,peit:1,cost:1,delt:1,core:1},B:{glut:1,quad:1,cost:1,peit:1,tri:1,bic:1}},
 3:{A:{quad:2,glut:1,peit:1,cost:1,core:1},B:{isq:1,glut:1,cost:2,delt:1,bic:1},C:{quad:1,isq:1,peit:2,delt:1,tri:1}},
 4:{A:{quad:2,glut:1,isq:1,pant:1},B:{peit:2,cost:2,delt:1,tri:1},C:{glut:2,isq:1,quad:1,adu:1,core:1},D:{cost:2,peit:1,delt:2,bic:1}},
 5:{A:{quad:2,glut:1,pant:1,core:1},B:{peit:2,cost:2,delt:1},C:{isq:2,glut:2,adu:1},D:{cost:2,delt:2,bic:1,tri:1},E:{quad:1,glut:1,peit:1,cost:1,core:1}}
};
/* Full body: corpo todo em cada treino */
const SPLITS_FB={FB:{quad:1,glut:1,isq:1,peit:1,cost:1,delt:1,core:1}};
/* Ênfase por sexo: mulheres costumam pedir mais MMII e glúteo; homens, mais MMSS. É só ponto de partida. */
const SPLITS_F={
 2:{A:{quad:1,glut:1,isq:1,cost:1,delt:1,core:1},B:{glut:2,quad:1,adu:1,peit:1,cost:1}},
 3:{A:{quad:2,glut:1,adu:1,cost:1,core:1},B:{glut:2,isq:1,peit:1,cost:1,delt:1},C:{quad:1,isq:1,glut:1,cost:1,tri:1,bic:1}},
 4:{A:{quad:2,glut:1,isq:1,pant:1},B:{cost:2,peit:1,delt:1,tri:1,bic:1},C:{glut:2,isq:1,adu:1,quad:1,core:1},D:{cost:1,delt:2,peit:1,glut:1}},
 5:{A:{quad:2,glut:1,pant:1,core:1},B:{cost:2,peit:1,delt:1,bic:1},C:{glut:2,isq:2,adu:1},D:{delt:2,cost:1,tri:1,core:1},E:{glut:1,quad:1,isq:1,cost:1,peit:1}}};
const SPLITS_M={
 2:{A:{quad:1,isq:1,peit:1,cost:1,delt:1,core:1},B:{quad:1,glut:1,peit:1,cost:1,tri:1,bic:1}},
 3:{A:{peit:2,delt:1,tri:1,core:1},B:{cost:2,bic:1,delt:1,core:1},C:{quad:2,isq:1,glut:1,pant:1}},
 4:{A:{peit:2,delt:1,tri:1},B:{quad:2,isq:1,glut:1,pant:1},C:{cost:2,delt:1,bic:1,core:1},D:{peit:1,cost:1,delt:1,quad:1,isq:1}},
 5:{A:{peit:2,tri:1,delt:1},B:{cost:2,bic:1,core:1},C:{quad:2,isq:1,glut:1,pant:1},D:{delt:2,peit:1,tri:1,bic:1},E:{cost:1,quad:1,isq:1,glut:1,core:1}}};
const SPLIT_DAYS={2:["Seg","Qui"],3:["Seg","Qua","Sex"],4:["Seg","Ter","Qui","Sex"],5:["Seg","Ter","Qua","Qui","Sex"],6:["Seg","Ter","Qua","Qui","Sex","Sáb"]};
function suggestSplit(st,n,mode){ const td=DAYS.filter(d=>trainDays(st).includes(d)); const days= td.length===n? td : SPLIT_DAYS[n];
  if(mode==="fb"){ const map={}; days.forEach(d=>map[d]="FB"); return {map,split:clean(SPLITS_FB)}; }
  const sp=(mode==="f"?SPLITS_F:mode==="m"?SPLITS_M:SPLITS)[Math.min(n,5)]; const Ls=Object.keys(sp);
  const map={}; days.forEach((d,i)=>map[d]=Ls[i%Ls.length]); return {map,split:clean(sp)}; }
function setsPerEx(st){ const w=curWkPlan(st); if(w){ const a=String(w.s).split(/[–-]/); return parseInt(a[a.length-1],10)||phaseOf(st).sets[1]; } return phaseOf(st).sets[1]; }
function splitWeekly(st){ const p=progOf(st); const sp=p.split||{}; const v={}, f={}, ex={}; const spe=setsPerEx(st);
  Object.values(p.map||{}).forEach(L=>Object.entries(sp[L]||{}).forEach(([k,n])=>{ v[k]=(v[k]||0)+n*spe; f[k]=(f[k]||0)+1; ex[k]=(ex[k]||0)+n; })); return {v,f,ex,spe}; }
const volCls=(k,x)=> MUSCLES[k]&&MUSCLES[k].c==="G"? (x>=10?"ok":x>=5?"mid":"lo") : (x>=6?"ok":x>=3?"mid":"lo");

function splitHTML(st){ const p=progOf(st); const sp=p.split||{}; const Ls=[...new Set(Object.values(p.map||{}))].sort();
  const daysOf=L=>PDAYS.filter(d=>p.map[d]===L).join(", ");
  const {v,f,ex,spe}=splitWeekly(st); const ks=Object.keys(MUSCLES).filter(k=>v[k]);
  const missing=Object.keys(MUSCLES).filter(k=>MUSCLES[k].c==="G"&&!v[k]);
  const nd=p.ndays||Math.max(2,Math.min(6,Object.keys(p.map||{}).length||3));
  return `<div class="spl">
    <div class="pg-row"><label>O aluno treina <select class="inp" data-pgndays id="pgn-${st.id}">${[2,3,4,5,6].map(n=>`<option ${nd===n?"selected":""}>${n}</option>`).join("")}</select> vezes por semana</label></div>
    <div class="pg-row spl-mode"><span>Sugestão para</span><div class="seg seg4b" role="group" aria-label="Tipo de divisão">${[["f","Mulher"],["m","Homem"],["","Geral"],["fb","Full body"]].map(([v,t])=>`<button data-pgmode="${v}" aria-pressed="${(p.smode||"")===v}">${t}</button>`).join("")}</div><button class="btn small primary" data-pgsug>Sugerir divisão</button></div>
    <p class="spl-tip">${(p.smode||"")==="fb"?"<b>Full body (FB)</b>: corpo todo em cada treino, um exercício por grupo grande. Bom para iniciante e para quem treina 2 ou 3 vezes por semana: cada músculo é treinado em todos os treinos.":(p.smode==="f"?"<b>Mulher</b>: mais séries para membros inferiores e glúteo, que costuma ser o pedido mais comum.":p.smode==="m"?"<b>Homem</b>: mais séries para membros superiores, que costuma ser o pedido mais comum.":"<b>Geral</b>: séries equilibradas entre membros superiores e inferiores.")} É só ponto de partida: a ênfase vem do objetivo de cada aluno, não do sexo.</p>
    <p class="spl-tip">💡 Quantas vezes treinar cada músculo: com o mesmo número de séries na semana, <b>2 vezes por semana</b> costuma ser o ponto prático. Divide as séries, a qualidade de cada série fica melhor e a recuperação também. Uma vez funciona se o número de séries for suficiente; mais de 3 vezes traz pouco ganho extra. Iniciante: corpo todo de 2 a 3 vezes por semana.</p>
    ${Ls.length? `<div class="spl-ro">${Ls.map(L=>`<div class="spl-rl"><b>Treino ${L}</b><span class="muted">${daysOf(L)}</span><span>${Object.entries(sp[L]||{}).map(([k,n])=>`${MUSCLES[k].n} ${n}`).join(" · ")||"–"}</span></div>`).join("")}</div>
      ${Object.keys(sp).length?`<div class="row spl-act"><button class="btn small" data-pgreorg>🔄 Reorganizar sugestão</button><button class="btn small danger" data-pgclr>🗑 Apagar sugestão</button></div>`:""}
      <p class="muted" style="font-size:12.5px">Uma sugestão de partida. Na Sessão ela aparece no controle do dia, e o 💡 sugerir usa esses músculos. Os exercícios você escolhe. <b>Reorganizar</b> troca qual grupo muscular cai em cada dia; <b>Apagar</b> tira a divisão e mantém as letras dos dias.</p>`
      : `<p class="muted" style="font-size:13px">Escolha quantas vezes o aluno treina e toque em Sugerir divisão.</p>`}
    ${ks.length?`<div class="spl-vol"><span class="label">Cada músculo na semana (${spe} séries por exercício)</span>
      <div class="spl-fq">${ks.map(k=>`<div class="fq-r ${volCls(k,v[k])}"><b>${MUSCLES[k].n}</b><span>${f[k]}x/semana</span><span>${ex[k]} ex.</span><span class="num">${v[k]} séries</span></div>`).join("")}</div>
      ${missing.length?`<p class="spl-miss">Sem estímulo direto: ${missing.map(k=>MUSCLES[k].n).join(", ")}.</p>`:""}
      <p class="muted" style="font-size:12px">Verde: 10 ou mais séries por semana em músculo grande (6 ou mais em pequeno). Amarelo: moderado. Vermelho: baixo. Não conta trabalho indireto. É sugestão: ajuste pelo seu aluno.</p></div>`:""}
  </div>`; }

function tecSel(val,attr,id){ const known=TEC_NAMES.includes(val)||!val; return `<select class="inp" ${attr} id="${id}">${`<option value="">—</option>`+TEC_NAMES.map(n=>`<option ${val===n?"selected":""}>${esc(n)}</option>`).join("")+(known?"":`<option selected value="${esc(val)}">${esc(TEC_OLD[val]||val)}</option>`)}</select>`; }
function wkRowsHTML(st,rows,cw,pref,N){ const pid=st?st.id:"mp"; const z= st&&lineOf(progOf(st))==="conf"? 0 : 1; return `<div class="fz-tab">${rows.map((r,i)=>`<div class="fz-r ${cw&&cw.n===i+1?"cur":""} ${N&&i>=N?"opt":""}">
    <span class="fz-w">Semana ${i+z}${cw&&cw.n===i+1?` <small class="fz-now">· semana atual</small>`:""}</span>
    <div class="fz-3"><label>Séries<input class="inp" ${pref}="${i}|s" id="${pid}-w${i}-s" value="${esc(r.s)}"></label>
    <label>Reps<input class="inp" ${pref}="${i}|r" id="${pid}-w${i}-r" value="${esc(r.r)}"></label>
    <label>Carga<select class="inp" ${pref}="${i}|c" id="${pid}-w${i}-c"><option value="">–</option>${Object.entries(CARGA_L).map(([k,l])=>`<option value="${k}" ${r.c===k?"selected":""}>${l}</option>`).join("")}</select></label></div>
    <div class="fz-2"><label>Método 1${tecSel(r.t,`${pref}="${i}|t"`,`${pid}-w${i}-t`)}</label><label>Método 2${tecSel(r.t2,`${pref}="${i}|t2"`,`${pid}-w${i}-t2`)}</label></div>
    <input class="inp fz-note" ${pref}="${i}|note" id="${pid}-w${i}-n" value="${esc(r.note)}" placeholder="Objetivo da semana"></div>`).join("")}</div>
    <p class="fz-rec">Métodos avançados: recomendamos de 1 a 2 por treino. Você escolhe quantas usar, ou nenhuma.</p>`; }

const pgInfo={};
const CONF_HELP=`<p class="tio-dir">É uma <b>sugestão</b> para o aluno que trava quando ouve "vamos aumentar o peso". Você decide se e quando usar.</p>
  <p><b>Esse medo é comum e tem motivo.</b> Medo de se machucar, de não dar conta, de "ficar grande", ou uma experiência ruim no passado. Discutir com o medo não resolve. O que resolve é o aluno perceber, semana a semana, que consegue mais do que achava.</p>
  <p><b>Como funciona.</b> A carga fica igual e quem sobe primeiro são as repetições: 8, depois 10, depois 12. Quando o aluno faz 12 com aquele peso, o que era pesado ficou leve, e subir a carga deixa de ser ameaça e vira consequência. Aí a carga sobe um pouco e as repetições voltam para 8. Começa um novo ciclo.</p>
  <p><b>Semana 0.</b> Quando entrarem exercícios novos: descobrir a carga e ver se o exercício faz sentido para o aluno.</p>
  <p><b>Como falar com o aluno.</b> Em vez de "vamos aumentar o peso", mostre o que ele já fez: "semana passada você fez 12 com esse peso, seu corpo já está pronto para o próximo". A linha <b>Sem. Pass.</b> da Sessão serve exatamente para isso.</p>
  <p><b>Pirâmide crescente</b> (12 → 10 → 8, a carga sobe a cada série). Ex.: supino 12 com 10 kg, 10 com 12 kg, 8 com 15 kg. Começa leve e só a última série é mais pesada, com poucas repetições. Entra na semana das 12 repetições, em 2 exercícios: o aluno experimenta o peso da semana seguinte numa série curta, antes de ele virar a carga do treino.</p>
  <p><b>Pirâmide decrescente</b> (6 → 8 → 10, a carga desce a cada série). Ex.: leg press 6 com 15 kg, 8 com 12 kg, 10 com 10 kg. Começa pelo mais pesado, ainda descansado. É mais tensional e pede mais confiança: é interessante no último exercício, a partir do 2º ciclo, quando o aluno estiver tranquilo com a carga.</p>
  <p class="muted">Nenhuma das pirâmides é superior às séries tradicionais. Aqui elas servem para dar dinamismo e fazer o aluno se desafiar. Quando o aluno aceitar a subida de carga sem travar, ele pode seguir para outra programação.</p>`;
const SUG_SRC="a experiência prática do Professor Maílson";
function sugNote(ln){ if(ln==="minha") return `<p class="fz-sug">Mesmo sendo a sua programação, ela é um ponto de partida: observe como o aluno responde e ajuste séries, repetições e carga sempre que for preciso.</p>`;
  return `<p class="fz-sug">Esta programação é uma <u>sugestão</u>, não uma regra. Não existe um número fixo de séries e repetições que sirva para todo mundo: a ciência oferece faixas de referência, e quem decide é a resposta de cada aluno. Este modelo reúne ${SUG_SRC}. Use o seu conhecimento técnico e científico para adaptá-lo à individualidade de cada cliente.</p>`; }
function pgInfoHTML(st){ const ln=lineOf(progOf(st)); const o=pgInfo[st.id]||"";
  const ent= ln==="conf"? CONF_HELP : ln==="tio"? tioHelpHTML() : ln==="minha"? `<p>As semanas são suas: preencha séries, repetições, carga e métodos aqui embaixo. Na Sessão elas viram a sugestão de cada semana, e você ajusta à vontade.</p>` : `<p>Sem programação: você lança tudo direto na Sessão. A letra do dia e a comparação com o último treino igual continuam funcionando.</p>`;
  const b=(k,t)=>`<button class="pgi-b ${o===k?"on":""}" data-pgi="${k}" aria-expanded="${o===k}">${t}</button>`;
  return `<div class="pgi">${b("ent","ⓘ Entenda")}${b("tec","Métodos")}${b("div","Divisão")}</div>
    ${o?`<div class="pgi-p">${o==="ent"?ent:o==="tec"?tecHelpHTML(ln):splitHTML(st)}</div>`:""}`; }
function lineHTML(st){ const p=progOf(st); const ln=lineOf(p); if(!ln) return "";
  const rows=wkRows(st); const N=wkN(st); const cw=curWkPlan(st);
  if(ln==="minha"){ const empty=!rows.some(r=>r.s||r.r);
    return `<div class="fz" style="--pc:var(--accent)"><div class="fz-h"><span class="fz-sq">✎</span><div class="fz-t"><b>${esc(myProg().name||"Minha linha")}</b><span>A sua programação, semana a semana.</span></div></div>${sugNote("minha")}${pgInfoHTML(st)}
      ${empty?`<p class="note" style="margin:0">Preencha as semanas de ${esc(first(st.name))} aqui embaixo, ou ajuste direto na Sessão.</p>`:""}
      ${wkRowsHTML(st,rows,cw,"data-fzw",N)}
      ${cw?`<p class="fz-m">Nesta semana a Sessão sugere <b>${planTxt(cw)}</b> (semana ${cw.n} de ${cw.N}).</p>`:""}</div>`; }
  if(ln==="conf") return `<div class="fz" style="--pc:#7A4FB5"><div class="fz-h"><span class="fz-sq">✦</span><div class="fz-t"><b>Programação para quem tem medo de peso</b><span>Primeiro sobem as repetições com a mesma carga. Só depois de 3 semanas a carga sobe.</span></div></div>${sugNote("conf")}${pgInfoHTML(st)}
      ${wkRowsHTML(st,rows,cw,"data-fzw",N)}
      ${cw?`<p class="fz-m">Nesta semana a Sessão sugere <b>${planTxt(cw)}</b> (Semana ${cw.n-1}).</p>`:""}</div>`;
  const k=+st.phase; const ph=PHASES[k]||PHASES[1];
  return `<div class="fz" style="--pc:var(--p${k})">
    <div class="fz-h"><span class="fz-sq">${ph.k}</span><div class="fz-t"><b>${ph.t} · ${ph.n}</b><span>Programação por fases · ${PH_MSG[k]||""}</span></div>
      <select class="inp" data-pgph id="pgph-${st.id}" aria-label="Fase de ${esc(st.name)}">${Object.keys(PHASES).map(x=>`<option value="${x}" ${+x===k?"selected":""}>${PHASES[x].t}</option>`).join("")}</select></div>
    ${sugNote("tio")}${pgInfoHTML(st)}
    ${(k===0||k===4)? wkRowsHTML(st,rows,cw,"data-fzw",N).replace(/<p class="fz-rec">[\s\S]*?<\/p>/,"") : wkRowsHTML(st,rows,cw,"data-fzw",N)}
    ${k===2?`<p class="fz-m">Método avançado a partir da 2ª semana, <b>de preferência no último exercício</b>. Dependendo do nível do aluno, use na <b>última série</b> desse exercício e veja o padrão que ele apresenta. Aluno mais avançado pode usar em mais exercícios: observe a prontidão dele, o tempo de execução e o controle. Se ele perder muito, volte para o último exercício.</p>`:""}
    ${k===3?`<p class="fz-m">De 8 a 10 repetições com mais peso: <b>excelente momento para 4 séries</b>. Aqui cabem mais métodos avançados, inclusive bi-set do mesmo músculo. Dependendo do nível do aluno, 4 semanas já são ótimas.</p>${AFTER_HTML}`:""}
    ${k===4?`<p class="fz-m"><b>Observação:</b> inclua quando o aluno apresentar muito cansaço (também em queda de desempenho, dor articular, doença ou viagem). Menos peso e menos séries, com descanso de 90" a 2'.</p>${AFTER_HTML}`:""}
    ${k===1?`<p class="fz-m">Serve para o aluno criar consciência corporal e, em alguns casos, reaprender a treinar, ativando bem a musculatura que o exercício exige. Evite subir repetição e carga na mesma semana: ou repete as repetições com mais peso, ou sobe as repetições com o mesmo peso.</p>`:""}
    ${cw?`<p class="fz-m">Nesta semana a Sessão sugere <b>${planTxt(cw)}</b> (semana ${cw.n} de ${cw.N}).</p>`:""}
  </div>`; }

function semStartOpts(sel){ const cur=wkStart(S.week)||mondayOf(new Date()); const set=new Set((S.weeks||[]).map(w=>w.start)); let x=(S.weeks.length?S.weeks[S.weeks.length-1].start:cur); for(let i=0;i<4;i++){ x=addDays(x,7); set.add(x); } if(sel) set.add(sel);
  return [...set].sort().map(k=>{ const w=S.weeks.find(z=>z.start===k); return `<option value="${k}" ${k===sel?"selected":""}>${w?`S${w.n} · `:""}${ddmm(k)}</option>`; }).join(""); }
function semCardHTML(st){
  const p=progOf(st); const bi=blockInfo(st); const ms=membersOf(st); const kp=+st.phase; const ln=lineOf(p); const fixedN= ln&&!(ln==="tio"&&(kp===0||kp===4));
  const pill= p.auto? `<span class="pill warn">Automático · confirme</span>` : bi&&bi.over? `<span class="pill bad">Bloco terminou</span>` : bi&&bi.before? `<span class="pill info">Começa ${ddmm(bi.start)}</span>` : bi? `<span class="pill ok">Semana ${bi.n} de ${bi.N}</span>` : `<span class="pill ok">Programado</span>`;
  const seq=PDAYS.filter(d=>p.map[d]).map(d=>`${d} ${p.map[d]}`).join(" · ")||"nenhum dia";
  const op=k=> semOpen[st.id+"|"+k]? "open" : "";
  const LN={tio:"Programação por fases",minha:"Minha programação",conf:"Medo de peso"};
  return `<details class="card pgcard" data-pg="${st.id}" data-det="card" ${op("card")}>
    <summary class="pg-h"><b>${esc(st.name)}</b><button type="button" class="btn small pghx" data-pgx>✕ Fechar</button><small class="pg-ln">${LN[ln]||"Sem programação"} · ${seq}</small></summary>
    <div class="pg-days">${PDAYS.map(d=>`<label class="${p.map[d]?"on":""}"><span>${d}</span><select data-pgday="${d}" id="pg-${st.id}-${d}" aria-label="${DAY_N[d]} de ${esc(st.name)}"><option value="">–</option>${LTR_ALL.map(x=>`<option ${p.map[d]===x?"selected":""} ${x==="FB"?'title="Full body"':""}>${x}</option>`).join("")}</select></label>`).join("")}</div>
    <p class="pg-fb">FB = Full body (corpo todo no mesmo treino).</p>
    <div class="pg-by"><span>Repetir o treino por ${qtip("pg_by")}</span><div class="seg"><button data-pgby="letra" aria-pressed="${(p.by||"letra")==="letra"}">Letra (A, B, C…)</button><button data-pgby="dia" aria-pressed="${p.by==="dia"}">Dia da semana</button></div>
      <small>${p.by==="dia"? "Cada dia repete o mesmo dia da semana passada. Trocar a letra só muda o nome." : "Cada dia traz o último treino da mesma letra, em qualquer dia em que tenha sido feito. Bom para quem falta e repõe em outro dia."}</small></div>
    <div class="pg-row"><label>Repetir por <input class="inp" type="number" inputmode="numeric" min="1" max="52" data-pgweeks id="pgw-${st.id}" value="${p.weeks||4}"> semanas</label>
      <label>a partir de <select class="inp" data-pgstart id="pgs-${st.id}">${semStartOpts(p.start||wkStart(S.week))}</select></label></div>
    <p class="pg-sum">${p.auto?`Hoje está: ${seq}. Ajuste os dias ou toque em Confirmar.`:`${seq}${bi&&bi.end&&!bi.over?` · até ${ddmm(bi.end)}`:""}`}</p>
    ${bi&&bi.over?`<p class="blk-over">⚠ As ${bi.N} semanas deste treino terminaram. Monte o treino novo e escolha em <b>a partir de</b> a semana em que ele começa.</p>`:""}
    <div class="pg-line"><span class="label">Programação das semanas ${qtip("pg_line")}</span>
      <div class="seg seg4" role="group" aria-label="Programação de ${esc(st.name)}"><button data-pgline="tio" aria-pressed="${ln==="tio"}">Programação por fases</button><button data-pgline="minha" aria-pressed="${ln==="minha"}">Minha programação</button><button data-pgline="conf" aria-pressed="${ln==="conf"}">Medo de peso</button><button data-pgline="" aria-pressed="${!ln}">Nenhuma programação</button></div></div>
    ${ln? lineHTML(st) : pgInfoHTML(st)}
    <div class="row">
      ${p.auto?`<button class="btn small primary" data-pgok>Confirmar</button>`:""}
      ${ms.length>1?`<button class="btn small" data-pgcopy>Igual para ${ms.filter(x=>x!==st).map(x=>esc(first(x.name))).join(" e ")}</button>`:""}
    </div></details>`;
}
function myProgHTML(){ const mp=myProg(); return `<p class="muted" style="font-size:13px">Escreva aqui a sua linha uma vez. Ela aparece em todos os alunos em que você escolher "Minha programação", e você ainda ajusta aluno por aluno.</p>
  <label class="label" style="display:grid;gap:4px">Nome da sua linha<input class="inp" data-mpname id="mp-name" value="${esc(mp.name||"")}" placeholder="ex.: Linha da Ana"></label>
  ${wkRowsHTML(null,mp.rows,null,"data-mp",0)}<button class="btn small" data-mpadd style="justify-self:start">+ Semana</button>`; }
function renderSemana(){
  const el=document.getElementById("view-semana"); if(!el) return;
  const all=S.students.slice().sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
  const pend=all.filter(x=>progOf(x).auto||(blockInfo(x)||{}).over);
  const list= semFilter==="pend"? pend : all;
  const op=k=> semOpen[k]? "open" : "";
  el.innerHTML=`${helpBtn("semana")}${slidesBox("semana")}${impBtn("prog","Importar ficha de "+esc(first(A().name))+" (foto, PDF, Excel ou Word)")}
    <div class="semfrase"><span class="rep-m">${LETRA()}</span><p>${SEM_FRASE}</p></div>

    ${(()=>{ const st=A(); if(semOpen[st.id+"|card"]==null) semOpen[st.id+"|card"]=true; return semCardHTML(st); })()}
    <button class="btn pgclose" data-pgclose>✕ Fechar a programação e voltar para a Sessão</button>`;
}
function pgMat(st){ const p=progOf(st);
  if(p.auto) st.prog={map:{...p.map},weeks:+p.weeks||4,start:wkStart(S.week)||mondayOf(new Date())};
  else if(!st.prog.start) st.prog.start=wkStart(S.week)||mondayOf(new Date());
  if(st.prog.line==null&&st.prog.fases) st.prog.line="tio";
  return st.prog; }
function fixWeeks(st,pr){ pr.weeks=Math.max(1,Math.min(52,+pr.weeks||4)); }
function semRefresh(st){ save(); const c=document.querySelector(`#view-semana [data-pg="${st.id}"]`); if(c&&semFilter==="todos"){ const t=document.createElement("div"); t.innerHTML=semCardHTML(st); c.replaceWith(t.firstElementChild); } else renderSemana(); renderSessao(); }
const semToggle=e=>{ const d=e.target; if(d.dataset&&d.dataset.det==="card"&&!d.open&&d.closest("#view-sessao")){ sesProgOpen=null; setTimeout(renderSessao,0); return; } if(!d.dataset||!d.dataset.det) return; const c=d.closest("[data-pg]"); semOpen[(c?c.dataset.pg+"|":"")+d.dataset.det]=d.open; };
["view-semana","view-sessao"].forEach(id=>document.getElementById(id).addEventListener("toggle",semToggle,true));
const semChange=e=>{
  const t=e.target;
  if(t.hasAttribute("data-mpname")||t.dataset.mp){ S.myProg=S.myProg||clean(MP_DEF);
    if(t.hasAttribute("data-mpname")) S.myProg.name=t.value.trim();
    else { const [i,f]=t.dataset.mp.split("|"); (S.myProg.rows[+i]=S.myProg.rows[+i]||{})[f]=t.value.trim(); }
    save(); document.querySelectorAll("#view-semana [data-pg]").forEach(c=>{ const st=stById(c.dataset.pg); if(st&&lineOf(progOf(st))==="minha"){ const x=document.createElement("div"); x.innerHTML=semCardHTML(st); c.replaceWith(x.firstElementChild); } }); renderSessao(); return; }
  const c=t.closest("[data-pg]"); if(!c) return; const st=stById(c.dataset.pg); if(!st) return;
  const pr=pgMat(st);
  if(t.dataset.pgday){ if(t.value) pr.map[t.dataset.pgday]=t.value; else delete pr.map[t.dataset.pgday];
    const wi=Math.max(0,S.weeks.findIndex(x=>x.id===S.week)); let ch=0, any=null; S.weeks.slice(wi).forEach((w,j)=>{ const r=fillByLtr(st.id,w.id,t.dataset.pgday,j===0,true); if(r!==null){ ch++; if(r) any=r; } });
    if(t.value&&ch) toast(any? `${DAY_N[t.dataset.pgday]}: exercícios do Treino ${t.value} (${ddmm(any.date)}) carregados` : `${DAY_N[t.dataset.pgday]}: Treino ${t.value} ainda não tem treino anterior, o dia ficou em branco`); }
  if(t.hasAttribute("data-pgweeks")) pr.weeks=Math.max(1,Math.min(16,parseInt(t.value,10)||4));
  if(t.hasAttribute("data-pgstart")) pr.start=t.value;
  if(t.hasAttribute("data-pgndays")){ pr.ndays=+t.value; save(); return; }
  if(t.hasAttribute("data-pgph")){ st.phase=+t.value; fixWeeks(st,pr); save(); renderAll(); toast(`${first(st.name)}: ${phT(st)} · ${phaseOf(st).n}`); return; }
  if(t.dataset.fzw){ const [i,f]=t.dataset.fzw.split("|"); const key= lineOf(pr)==="tio"? +st.phase : lineOf(pr)==="conf"? "conf" : "minha"; pr.wk=pr.wk||{}; pr.wk[key]=pr.wk[key]||{}; pr.wk[key][i]=pr.wk[key][i]||{}; pr.wk[key][i][f]=t.value.trim(); save(); renderSessao(); return; }
  if(t.dataset.spadd){ if(!t.value) return; pr.split=pr.split||{}; const L=t.dataset.spadd; pr.split[L]=pr.split[L]||{}; pr.split[L][t.value]=1; semOpen[st.id+"|split"]=true; }
  semRefresh(st);
};
["view-semana","view-sessao"].forEach(id=>document.getElementById(id).addEventListener("change",semChange));
const semClick=e=>{
  const b=e.target.closest("button"); if(!b) return;
  if(b.dataset.pgf){ semFilter=b.dataset.pgf; renderSemana(); return; }
  if(b.hasAttribute("data-mpadd")){ S.myProg=S.myProg||clean(MP_DEF); S.myProg.rows.push({s:"",r:"",c:"",t:"",t2:"",note:""}); semOpen["minha"]=true; save(); renderSemana(); return; }
  const c=b.closest("[data-pg]"); if(!c) return; const st=stById(c.dataset.pg); if(!st) return;
  if(b.dataset.pgby){ const pr=pgMat(st); pr.by=b.dataset.pgby; if(pr.by==="letra") delete pr.by; semRefresh(st); toast(b.dataset.pgby==="dia"? `${first(st.name)}: treino repetido por dia da semana` : `${first(st.name)}: treino repetido por letra`); return; }
  if(b.dataset.pgline!=null){ const pr=pgMat(st); pr.line=b.dataset.pgline; delete pr.fases; if(pr.line==="conf"&&(+pr.weeks||0)<7) pr.weeks=7; fixWeeks(st,pr); semRefresh(st); return; }
  if(b.hasAttribute("data-pgok")){ pgMat(st); semRefresh(st); toast(`Programação de ${first(st.name)} confirmada`); return; }
  if(b.hasAttribute("data-pgcopy")){ const pr=pgMat(st); membersOf(st).filter(x=>x!==st).forEach(o=>o.prog=clean(pr)); save(); renderSemana(); renderSessao(); toast("Mesma programação para o grupo"); return; }
  if(b.dataset.pgi){ pgInfo[st.id]= pgInfo[st.id]===b.dataset.pgi? "" : b.dataset.pgi; semRefresh(st); return; }
  if(b.dataset.pgmode!=null){ const pr=pgMat(st); pr.smode=b.dataset.pgmode; semRefresh(st); return; }
  if(b.hasAttribute("data-pgclr")){ const pr=pgMat(st); delete pr.split; semRefresh(st); toast("Sugestão de divisão apagada. As letras dos dias continuam."); return; }
  if(b.hasAttribute("data-pgreorg")){ const pr=pgMat(st); const sp=pr.split||{}; const Ls=Object.keys(sp).sort(); if(Ls.length<2){ toast("Full body: todos os treinos têm os mesmos músculos, não há o que reorganizar."); return; }
    const ns={}; Ls.forEach((L,i)=>ns[L]=sp[Ls[(i+1)%Ls.length]]); pr.split=ns; semRefresh(st); toast("Reorganizado: os grupos musculares trocaram de dia. Toque de novo para outra ordem."); return; }
  if(b.hasAttribute("data-pgsug")){ const pr=pgMat(st); const n=+(c.querySelector("[data-pgndays]")||{}).value||3; const sg=suggestSplit(st,n,pr.smode||""); pr.ndays=n; pr.map=sg.map; pr.split=sg.split; semOpen[st.id+"|split"]=true; semRefresh(st); toast(`Divisão para ${n} vezes por semana sugerida. Ajuste com − e +.`); return; }
  if(b.dataset.spm){ const [L,k,dv]=b.dataset.spm.split("|"); const pr=pgMat(st); pr.split=pr.split||{}; pr.split[L]=pr.split[L]||{}; const n=(pr.split[L][k]||0)+(+dv); if(n<=0) delete pr.split[L][k]; else pr.split[L][k]=Math.min(4,n); semOpen[st.id+"|split"]=true; semRefresh(st); return; }
};
["view-semana","view-sessao"].forEach(id=>document.getElementById(id).addEventListener("click",semClick));

/* ---------- Sugestão de método avançado na Sessão ---------- */
let tecPop=null;
function tecSugHTML(m){ const p=progOf(m); const ln=lineOf(p); const k=+m.phase; const w=curWkPlan(m);
  const tioAdv= ln==="tio"&&(k===2||k===3); const has= w&&tecTxt(w);
  if(ln==="conf"){ if(!has) return ""; const pc=/crescente/.test(tecTxt(w))&&!/decrescente/.test(tecTxt(w));
    return `<div class="tecsug"><p>💡 ${pc?"Semana das 12 repetições: que tal uma <b>pirâmide crescente em 2 exercícios</b>? O aluno experimenta o peso maior antes de ele subir.":"Se o aluno estiver confiante: <b>pirâmide decrescente, interessante no último exercício</b>."}</p><button class="btn small" data-tecpop aria-expanded="${tecPop===m.id}">☁ Ver técnicas</button>
    ${tecPop===m.id?`<div class="balloon" role="dialog" aria-label="Métodos"><div class="bl-h"><b>Pirâmides</b><button class="icon-btn" data-tecpop aria-label="Fechar">✕</button></div>
      ${TECS.filter(x=>/Pirâmide/.test(x.t)).map(x=>`<div class="bl-t"><b>${x.t}</b><span>${x.how}</span><span class="bl-ex">Ex.: ${x.ex}</span></div>`).join("")}</div>`:""}</div>`; }
  if(!tioAdv&&!has) return "";
  const first1= ln==="tio"&&k===2&&w&&w.n===1;
  const msg= first1? "Semana 1 da Fase 2: na próxima semana acredito que já dá para iniciarmos um método avançado." : "Acredito que já dá para iniciarmos um método avançado.";
  const sug= has? `Sugestão desta semana: <b>${esc(tecTxt(w))}</b>${ln==="tio"&&k===2?" · de preferência no último exercício":""}.` : "Pode usar dropset ou rest-pause no último exercício.";
  return `<div class="tecsug"><p>💡 ${msg} ${sug}</p><button class="btn small" data-tecpop aria-expanded="${tecPop===m.id}">☁ Ver técnicas</button>
    ${tecPop===m.id?`<div class="balloon" role="dialog" aria-label="Métodos avançados"><div class="bl-h"><b>Métodos avançados</b><button class="icon-btn" data-tecpop aria-label="Fechar">✕</button></div>
      <p class="bl-info">${TEC_INFO}</p>
      ${TECS.filter(x=>!/Cadência|Isometria|Progressão/.test(x.t)).map(x=>`<div class="bl-t"><b>${x.t}</b><span>${x.how}</span><span class="bl-ex">Ex.: ${x.ex}</span></div>`).join("")}
      <p class="bl-more">Explicação completa: aba <b>Programação</b> → <b>Entenda a Programação</b> → Métodos avançados.</p></div>`:""}</div>`; }

/* ---------- Explicações dentro de cada aba ---------- */
const SUP_WA="5531988260268"; /* WhatsApp do Tio Má para dúvidas, só números com DDI e DDD. Ex.: 5511999999999 */
const ABAS=[["sessao","🏋️","Sessão do dia","o treino do dia e a programação"],["presenca","✅","Controle de presença","chamada e reposições"],["agenda","📅","Agenda","horários livres e ocupados"],["financeiro","💰","Financeiro","pagamentos"],["corpo","🧍","Avaliação física","medidas e dobras"]];
function abasOn(){ const b=S.brand||{}, a=b.abas; if(!Array.isArray(a)) return ABAS.map(x=>x[0]); if(!b.agMig&&a.includes("presenca")&&!a.includes("agenda")) return ABAS.map(x=>x[0]).filter(k=>k==="agenda"||a.includes(k)); return a; }
const ABA_FIX=["perfil","perso","cadastro"];
function abaOk(t){ if(t==="envio") return !!window.RP_OWNER; if(ABA_FIX.includes(t)) return true; if(t==="relmes") return abaOk("presenca"); if(t==="semana"||t==="treino") return abaOk("sessao"); return abasOn().includes(t); }
let FORCE_TAB=null;
function applyAbas(){ document.querySelectorAll(".tabs [data-tab]").forEach(b=>b.hidden=b.dataset.tab==="perso"||!abaOk(b.dataset.tab)); if(typeof CUR_TAB!=="undefined"&&CUR_TAB&&!abaOk(CUR_TAB)&&CUR_TAB!==FORCE_TAB) show("cadastro"); }
const SITE_COR=[["","Colorido (padrão)",null],["verde","Verde",145],["azul","Azul",215],["dourado","Dourado",40],["roxo","Roxo",270],["vinho","Vinho",345],["cinza","Cinza",210],["vermelho","Vermelho",4],["coral","Coral",14],["laranja","Laranja",26],["amarelo","Amarelo",48],["oliva","Oliva",72],["menta","Menta",160],["turquesa","Turquesa",178],["ceu","Céu",198],["indigo","Índigo",235],["lilas","Lilás",285],["rosa","Rosa",330]];
function hexHsl(x){ x=String(x||"").replace("#",""); if(x.length!==6) return null; const r=parseInt(x.slice(0,2),16)/255,g=parseInt(x.slice(2,4),16)/255,b=parseInt(x.slice(4,6),16)/255; const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2; let h=0,s=0; if(mx!==mn){ const d=mx-mn; s=l>.5?d/(2-mx-mn):d/(mx+mn); h= mx===r?(g-b)/d+(g<b?6:0) : mx===g?(b-r)/d+2 : (r-g)/d+4; h*=60; } return [Math.round(h),Math.round(s*100),Math.round(l*100)]; }
/* Fundo no mesmo tom das caixas: a mesma cor, um pouco mais forte, para as caixas aparecerem */
function tomBg(hex){ const c=hexHsl(hex); if(!c||c[1]<12||c[2]>=99) return "#EEF1F0"; return `hsl(${c[0]},${Math.min(c[1],75)}%,${Math.max(c[2]-7,82)}%)`; }
const opq=v=>{ v=String(v||""); if(!/^#[0-9a-f]{8}$/i.test(v)) return v; const a=parseInt(v.slice(7,9),16)/255; return "#"+[1,3,5].map(i=>Math.round(parseInt(v.slice(i,i+2),16)*a+255*(1-a)).toString(16).padStart(2,"0")).join("").toUpperCase(); };
function siteBgVal(b){ b=b||S.brand||{}; const v=b.siteBg||""; if(v.charAt(0)==="#") return opq(v); const f=SITE_BG.find(x=>x[0]===v); if(f&&f[0]) return f[2]; const bx=BOX_COR.find(x=>x[0]===(b.boxCor||"")); return bx&&bx[2]? (tomBg(bx[2])==="#EEF1F0"? null : tomBg(bx[2])) : null; }
const SITE_BG=[["","Combinar com as caixas (padrão)","#EEF1F0"],["branco","Branco","#FFFFFF"],["cinza","Cinza","#D9DEDC"],["bege","Bege","#F3EEE4"],["preto","Preto","#101614"],["creme","Creme","#FFF8E7"],["areia","Areia","#EFE6D6"],["azulc","Azul claro","#E3EEF9"],["ceu","Céu","#DDF0FB"],["verdec","Verde claro","#E4F2E7"],["menta","Menta","#DFF3EE"],["rosac","Rosa claro","#F9E4EC"],["lilasc","Lilás claro","#ECE6F6"],["amareloc","Amarelo claro","#FBF4D9"],["pessego","Pêssego","#FBE7DA"],["salmao","Salmão claro","#FBE0DA"],["cinzam","Cinza médio","#B8BEC3"],["lavanda","Lavanda","#E6E0FF"]];
const ALERT_COR=[["","Vermelho (padrão)","#E53935"],["laranja","Laranja","#E8710A"],["roxo","Roxo","#7B3FC4"],["site","Na cor do site",null],["rosa","Rosa","#D81B60"],["vinho","Vinho","#8E1B3A"],["azul","Azul","#1B55B8"],["verde","Verde","#1E7A3E"],["preto","Preto","#14161B"],["marrom","Marrom","#6D4C41"],["turquesa","Turquesa","#00897B"],["mostarda","Mostarda","#B8860B"],["coral","Coral","#E8603C"],["grafite","Grafite","#455A64"],["indigo","Índigo","#3949AB"],["magenta","Magenta","#AD1457"],["oliva","Oliva","#6B7A1E"],["petroleo","Petróleo","#0E4D5C"]];
/* Tema: uma cor e o site todo nos tons dela (fundo, caixas, botões, letras e cabeçalhos) */
const TEMAS=[["","Padrão (original)",null],["vermelho","Vermelho",[2,68]],["azul","Azul",[208,60]],["verde","Verde",[140,45]],["amarelo","Amarelo",[46,85]],["rosa","Rosa",[335,68]],["preto","Preto","dark"],["branco","Branco","white"],
  ["roxo","Roxo",[268,45]],["laranja","Laranja",[24,85]],["turquesa","Turquesa",[180,55]],["lilas","Lilás",[282,42]],["vinho","Vinho",[345,55]],["marrom","Marrom",[25,35]],["dourado","Dourado",[40,60]],["cinza","Cinza",[210,8]]];
function temaTons(t){ if(!t||!t[2]) return null; if(t[2]==="dark") return {fg:"#0B0D10",ac:"#2A2F36",mid:"#5A616B",bg:"#101614",sf:"#1B2220",h:210,s:6};
  if(t[2]==="white") return {fg:"#111111",ac:"#3A3F44",mid:"#8A9099",bg:"#FFFFFF",sf:"#FFFFFF",ln:"#D9DCDF",sk:"#F3F4F5",mu:"#5F6670",h:210,s:6};
  const [h,sa]=t[2], q=(x,l)=>`hsl(${h},${Math.round(Math.min(100,x))}%,${l}%)`;
  return {fg:q(Math.min(sa,70)*.9,14),ac:q(sa,32),mid:q(sa*.8,55),bg:q(sa*.75,85),sf:q(sa*.8,96),sk:q(sa*.6,91),ln:q(sa*.4,75),mu:q(sa*.35,34),h,s:sa}; }
const COR_KEYS=["tema","siteCor","siteCorX","siteBg","boxCor","txtCor","sesTr","sesCd","payCor","alarmCor","restWinCor","restWinX","scCor","scX"];
const stuShow=()=>(S.brand||{}).stuShow!==false;
function stuHas(m){ return !!(m&&(m.corP||(m.cor&&TEMAS.some(t=>t[0]===m.cor)))); }
function stuM(){ try{ if(CUR_TAB!=="sessao"&&CUR_TAB!=="semana") return null; if(!stuShow()) return null; const m=A(); return m&&(m.corP||(m.cor&&TEMAS.some(t=>t[0]===m.cor)))? m : null; }catch(_){ return null; } }
function stuCor(){ const m=stuM(); return m? (m.corP? "p:"+m.id+":"+JSON.stringify(m.corP) : m.cor) : null; }
let STU_COR_K=null; function applyStuCor(){ const k=(stuCor()||"")+"|"+(abaOv()?abaKey():""); if(k===STU_COR_K) return; applySiteCor(); }
function abaKey(){ try{ return CUR_TAB==="semana"?"sessao":CUR_TAB; }catch(_){ return ""; } }
function abaOv(){ const A0=(S.brand||{}).abaCor||{}; return A0[abaKey()]||null; }
function applySiteCor(){ const sm=stuM(); STU_COR_K=stuCor()||""; STU_COR_K+="|"+(abaOv()?abaKey():""); const B0=Object.assign({},S.brand||{},abaOv()||{}); const base=Object.assign({},B0); COR_KEYS.forEach(k=>delete base[k]);
  const b= !sm? B0 : sm.corP? Object.assign(base,sm.corP) : Object.assign({},S.brand||{},{tema:sm.cor,siteCor:"",siteCorX:"",siteBg:"",boxCor:"",txtCor:"",sesTr:"",sesCd:""}); let c= b.siteCor==="x"&&b.siteCorX? (()=>{ const hh=hexHsl(String(b.siteCorX).slice(0,7)); return ["x","",hh?hh[0]:210]; })() : SITE_COR.find(x=>x[0]===(b.siteCor||"")); let el=document.getElementById("siteCorCss"); if(!el){ el=document.createElement("style"); el.id="siteCorCss"; document.head.appendChild(el); }
  const T=TEMAS.find(x=>x[0]===(b.tema||"")); const TT=temaTons(T); let tsat=null;
  if(TT&&!(c&&c[2]!=null)){ c=[T[0]==="cinza"||T[0]==="preto"||T[0]==="branco"?"cinza":T[0],T[1],TT.h]; tsat=Math.max(8,Math.min(TT.s,72)); }
  const dark=b.siteBg==="preto"||(!b.siteBg&&b.tema==="preto"); if(dark) document.documentElement.setAttribute("data-theme","dark"); else if(document.documentElement.getAttribute("data-theme")==="dark") document.documentElement.removeAttribute("data-theme");
  let css=""; const bgv= b.tema&&!b.siteBg&&!b.boxCor? null : siteBgVal(b);
  if(TT&&!dark) css+=`html:root:root{--bg:${TT.bg};--surface:${TT.sf};--sunk:${TT.sk};--line:${TT.ln};--fg:${TT.fg};--muted:${TT.mu}}body{background:${TT.bg};color:${TT.fg}}`;
  if(bgv&&!dark) css+=`html:root:root{--bg:${bgv}}body{background:${bgv}}`;
  const bxc=String(b.boxCor||"").charAt(0)==="#"? ["x","",opq(b.boxCor)] : BOX_COR.find(x=>x[0]===(b.boxCor||"")); if(bxc&&bxc[0]&&!dark){ const bgc=bgv||"#EEF1F0"; const sf=bxc[2]||`color-mix(in srgb,${bgc} 45%,#fff)`; css+=`html:root:root{--surface:${sf};--sunk:color-mix(in srgb,${sf} 82%,#000 7%);--line:color-mix(in srgb,${sf} 72%,#000 16%)}`; }
  const tx=String(b.txtCor||"").charAt(0)==="#"? ["x","",b.txtCor] : TXT_COR.find(x=>x[0]===(b.txtCor||"")); if(tx&&tx[0]){ css+=`html:root:root{--fgb:${dark?"#E9EEF0":TT?TT.fg:"#16201D"};--fg:${tx[2]};--muted:color-mix(in srgb,${tx[2]} 72%,${dark?"#000":"#fff"})}body{color:${tx[2]}}body *:not(#cpPop *):not(#abaCorPop *):not(.cpprev *):not(i){color:${tx[2]}!important}body input,body select,body textarea{color:${tx[2]}!important}`; }
  if(c&&c[2]!=null){ const h=c[2], sat=tsat!=null?tsat:(c[0]==="cinza"?8:55); const SS=Math.min(40,sat), SA=Math.min(45,sat); const H=(l,s2)=>`hsl(${h},${s2==null?sat:s2}%,${l}%)`; const L=(lt,dk)=>dark?dk:lt;
    css+=`html:root:root,html:root:root[data-theme]{--accent:${H(L(32,68))};--accent-soft:${H(L(92,20),SA)};--ok:${H(L(28,62))};--ok-soft:${H(L(90,18),SS)};--warn:${H(L(38,64))};--warn-soft:${H(L(92,18),SS)};--p0:${H(L(45,60),30)};--p1:${H(L(30,58))};--p2:${H(L(42,66))};--p3:${H(L(22,50))};--p4:${H(L(55,70),20)}}
  body.mono .qtip{background:${H(32)}!important}body.mono .wkrow button[aria-selected="true"]{background:${H(30)}!important;border-color:${H(30)}!important}body.mono .xcpn{color:${H(L(32,70))};border-color:${H(L(32,60))};background:${H(L(95,18),SS)}}
  body.mono .xrep{color:${H(L(25,70))};border-color:${H(30)};background:${H(L(92,18),SS)}}body.mono .ntfban{border-color:${H(40)};background:${H(L(94,16),SS)};color:${H(L(22,80))}}body.mono .slot.own{border-color:${H(30)}}
  body.mono .rb.r-MMII,body.mono .rb.r-MMSS{color:${H(L(32,68))}}body.mono .rb.on.r-MMII,body.mono .rb.on.r-MMSS{background:${H(32)};border-color:${H(32)};color:#fff}
  body.mono .rp-sug-top,body.mono .rp-sug-any{background:${H(L(85,22),SS)}!important;color:${H(L(18,85))}!important}body.mono #sidectl .sidehelp,body.mono #sidectl button{background-color:${H(32)}!important;color:#fff!important}
  body.mono .trest .tr-s{background:${H(L(92,20),SS)}!important;color:${H(L(25,75))}!important;border-color:${H(L(75,35),30)}!important}body.mono .xdelc{background:${H(L(92,20),30)}!important;color:${H(L(28,75))}!important}`;
    document.body.classList.add("mono");
    if(b.payCor==="site") css+=`.payal{background:${H(30)}!important;box-shadow:none!important}`;
  } else document.body.classList.remove("mono");
  const ac=String(b.payCor||"").charAt(0)==="#"? ["x","",b.payCor] : ALERT_COR.find(x=>x[0]===(b.payCor||"")); if(ac&&ac[2]&&ac[0]) css+=`.payal{background:${ac[2]}!important;box-shadow:none!important}`;
  if(b.alarmCor) css+=`.alarm,body.mono .alarm{background:${b.alarmCor}!important;animation:alarmblinkx 1s steps(2,jump-none) infinite!important}@keyframes alarmblinkx{0%{opacity:1}50%{opacity:.82}}`;
  const sesV=(k)=>{ const v=b[k]||""; if(v.charAt(0)==="#") return v; const o=SES_COR.find(x=>x[0]===v); return o&&o[2]; };
  if(!dark){ const tr0=sesV("sesTr"), cd0=sesV("sesCd"), trX=String(b.sesTr||"").charAt(0)==="#", cdX=String(b.sesCd||"").charAt(0)==="#"; const tr=tr0&&opq(tr0), cd=cd0&&opq(cd0);
    if(tr&&trX){ const ik=agInk(tr), dk=ik==="#fff"; css+=`html:root:root{--ses-alt:color-mix(in srgb,${tr} 90%,${dk?"#fff":"#000"});--ses-band:color-mix(in srgb,${tr} 85%,${dk?"#fff":"#000"})}.xrow,.xrow.odd{background:${tr}!important}.xrow:nth-of-type(even),.xrow.odd:nth-of-type(even){background:var(--ses-alt)!important}.xrow,.xband{color:${ik}}.xrow .xsp,.xrow .xsp b,.xrow .muted{color:${dk?"rgba(255,255,255,.8)":"rgba(0,0,0,.65)"}!important}`; }
    else if(tr) css+=`html:root:root{--ses-alt:${tr};--ses-band:color-mix(in srgb,${tr} 88%,#000)}.xrow{background:color-mix(in srgb,${tr} 35%,#fff)}`;
    if(cd) css+=`html:root:root{--ses-card:${cd}}`+(cdX&&agInk(cd)==="#fff"?`.xcard2{color:#fff}.xcard2 .muted{color:rgba(255,255,255,.8)}`:""); }
  { const T2=TEMAS.find(x=>x[0]===(b.tema||"")), Z=temaTons(T2); let nv= dark? "#1B2220" : "#FFFFFF"; if(Z&&!dark&&/^#/.test(Z.sf)) nv=Z.sf; else if(Z&&!dark){ nv=hsl2hex(Z.h,Math.round(Math.min(100,Z.s*.8)),96); }
    if(bxc&&bxc[0]&&!dark){ nv= bxc[2]&&/^#/.test(bxc[2])? bxc[2] : (bgv&&/^#/.test(bgv)? opq(bgv) : nv); }
    else if(bgv&&/^#/.test(bgv)&&!dark){ const k=bgv.replace("#",""); nv="#"+[0,2,4].map(i=>Math.round(parseInt(k.slice(i,i+2),16)*.45+255*.55).toString(16).padStart(2,"0")).join(""); }
    const ink=agInk(nv); css+=`.tabs{background:${nv}!important;border-top-color:${ink==="#fff"?"rgba(255,255,255,.25)":"rgba(0,0,0,.15)"}!important}.tabs button{color:${ink==="#fff"?"rgba(255,255,255,.82)":"#3A3F44"}!important}${ink==="#fff"?'.tabs button[aria-selected="true"]{color:#fff!important;background:rgba(255,255,255,.2)!important}':'.tabs button[aria-selected="true"]{color:#111!important}'}.turnbar{background:${nv}!important}`; }
  el.textContent=css; }
let STU_COR_SEL=null;
let STU_SAVE=null;
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-stutog]"); if(!b) return; S.brand=Object.assign({},S.brand||{},{stuShow:!stuShow()}); save(); applySiteCor(); renderSessao(); toast(stuShow()? "Cor do aluno na tela" : "Sua cor na tela. As cores do aluno continuam salvas."); });
function stuCorHTML(){ const L=(S.students||[]).filter(m=>!m.own).slice().sort((a,b)=>a.name.localeCompare(b.name)); if(!L.length) return ""; const sel=L.find(m=>m.id===STU_COR_SEL)||L[0]; STU_COR_SEL=sel.id; const com=L.filter(m=>m.cor||m.corP);
  const tn=m=> m.corP? "personalizado" : (TEMAS.find(t=>t[0]===m.cor)||[,""])[1];
  return `<div class="card stucor"><h3 class="corfh">👤 Cor de um aluno específico</h3><p class="muted cord">Quando a Sessão abre no treino dele, o site e o relatório ficam na cor dele. Ex.: uma aluna toda roxa, outra rosa.</p>
  <button class="btn primary stusave" data-stusave>💾 Salvar esta personalização para um aluno</button>
  ${STU_SAVE?`<div class="stulist"><b>Toque nos alunos que vão ficar com as cores que estão agora no site:</b><div class="stuchips">${L.map(m=>`<button class="chip" data-stupick="${m.id}" aria-pressed="${STU_SAVE.includes(m.id)}">${esc(m.name)}${m.corP||m.cor?" ★":""}</button>`).join("")}</div>
    <div class="row"><button class="btn primary" data-stuok ${STU_SAVE.length?"":"disabled"}>Salvar para ${STU_SAVE.length||""} ${STU_SAVE.length===1?"aluno":"alunos"}</button><button class="btn ghost" data-stusave>Cancelar</button></div></div>`:""}
  <details class="stuqk"><summary>Ou escolha só uma cor pronta</summary>
  <label class="label" style="display:grid;gap:4px">Aluno<select class="inp" data-stucorsel>${L.map(m=>`<option value="${m.id}" ${m===sel?"selected":""}>${esc(m.name)}${m.cor||m.corP?" · "+esc(tn(m)):""}</option>`).join("")}</select></label>
  <div class="corg">${TEMAS.filter(t=>t[2]).map(t=>{ const z=temaTons(t); return `<button class="pdot ${sel.cor===t[0]&&!sel.corP?"on":""}" data-stucor="${t[0]}" style="background:${z?z.ac:"#888"}" title="${t[1]}" aria-label="${t[1]}"></button>`; }).join("")}</div></details>
  ${com.length?`<div class="stucom"><b>Com cor própria:</b>${com.map(m=>`<span class="stuc"><span>${esc(m.name)} <small>(${esc(tn(m))})</small></span><button class="btn small ghost" data-sturm="${m.id}">Voltar à cor do site</button></span>`).join("")}</div>`:""}</div>`; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-stusave],[data-stupick],[data-stuok],[data-sturm]"); if(!b) return; const d=b.dataset;
  if(d.stusave!=null) STU_SAVE= STU_SAVE? null : [];
  else if(d.stupick){ STU_SAVE= STU_SAVE.includes(d.stupick)? STU_SAVE.filter(x=>x!==d.stupick) : STU_SAVE.concat([d.stupick]); }
  else if(d.stuok!=null){ const snap={}; COR_KEYS.forEach(k=>{ const v=(S.brand||{})[k]; if(v!=null&&v!=="") snap[k]=v; }); const L=STU_SAVE.map(id=>S.students.find(x=>x.id===id)).filter(Boolean); L.forEach(m=>{ m.corP=snap; delete m.cor; }); STU_SAVE=null; save(); toast(`Cores salvas para ${L.map(m=>first(m.name)).join(", ")}. A Sessão dela${L.length>1?"s":""} abre assim.`); }
  else if(d.sturm){ const m=S.students.find(x=>x.id===d.sturm); if(m){ delete m.corP; delete m.cor; save(); toast(`${first(m.name)}: cor igual ao site`); } }
  COR_OPEN=true; renderCadastro(); });
document.addEventListener("change",e=>{ if(!e.target.matches||!e.target.matches("[data-stucorsel]")) return; STU_COR_SEL=e.target.value; renderCadastro(); });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-stucor]"); if(!b) return; const m=S.students.find(x=>x.id===STU_COR_SEL); if(!m) return; delete m.corP; if(b.dataset.stucor) m.cor=b.dataset.stucor; else delete m.cor; save(); renderCadastro(); toast(m.cor? `${first(m.name)}: Sessão e relatório na cor ${(TEMAS.find(t=>t[0]===m.cor)||[,""])[1]}` : `${first(m.name)}: cor igual ao site`); });
/* Cores originais de cada parte, em bolinhas sem nome, do escuro ao claro */
const lumHex=h=>{ const x=String(h||"").replace("#",""); if(x.length<6) return 128; return 0.299*parseInt(x.slice(0,2),16)+0.587*parseInt(x.slice(2,4),16)+0.114*parseInt(x.slice(4,6),16); };
const BASIC=[["Branco","#FFFFFF"],["Amarelo","#FFEB3B"],["Ciano","#00BCD4"],["Verde","#43A047"],["Magenta","#E91E63"],["Vermelho","#E53935"],["Azul","#1E63D6"],["Preto","#111418"]];
function odots(items,cpKey,cust){ const F=CP_FIELD[cpKey]; const onC=(items.find(i=>i.on&&!i.pad)||{}).c; const cu=String(cust||onC||"").toUpperCase();
  const setOf=h=> cpKey==="siteBg"&&h==="#FFFFFF"? {siteBg:"branco"} : cpKey==="siteBg"&&h==="#111418"? {siteBg:"preto"} : F? F(h) : {};
  return `<div class="corg pdots">${pcustBtn(cpKey,!!cust)}${BASIC.map(([n,h])=>`<button class="pdot ${cu===h?"on":""}" data-pv="${cpKey}" data-pvh="${h}" data-pset='${esc(JSON.stringify(setOf(h)))}' style="background:${h}" title="${n}" aria-label="${n}"></button>`).join("")}</div>`; }
const pcustBtn=(key,on,cls)=>`<button class="pcust2 ${cls||""} ${on?"on":""}" data-cp="${key}" aria-label="Personalizar"><i>＋</i><small>Personalizar</small></button>`;
const hsl2hexS=(h,sa,l)=>hsl2hex(h,sa,l);
/* Linha de cores igual à da janelinha do descanso: do preto ao branco, sem nomes */
function pdots(key,cur,pad){ const C=Object.values(RW_COR).map(x=>x[0]); const cu=String(cur||"").toUpperCase(); const inL=C.includes(cu);
  return `<div class="corg pdots"><button class="pdot pdpad ${pad?"on":""}" data-pdot="${key}|" title="Padrão" aria-label="Padrão"></button>${C.map(c=>`<button class="pdot ${cu===c?"on":""}" data-pdot="${key}|${c}" style="background:${c}" aria-label="${c}"></button>`).join("")}<button class="pdot pdplus ${cur&&!inL?"on":""}" data-cp="${key}" title="Outra cor e opacidade" aria-label="Outra cor e opacidade" ${cur&&!inL?`style="background:${cur}"`:""}>＋</button></div>`; }
const PD_RESET={siteCor:{siteCor:"",siteCorX:""},siteBg:{siteBg:""},txtCor:{txtCor:""},payCor:{payCor:""},boxCor:{boxCor:""},sesTr:{sesTr:""},sesCd:{sesCd:""},alarmCor:{alarmCor:""}};
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-pdot]"); if(!b) return; const [k,v]=b.dataset.pdot.split("|");
  if(v){ const f=CP_SET[k]; if(f) f(v); } else { if(k==="alarmCor"){ S.brand=Object.assign({},S.brand||{}); delete S.brand.alarmCor; save(); applySiteCor(); try{ renderCadastro(); }catch(_){} try{ ntfRender(); }catch(_){} } else persoSet(PD_RESET[k]||{}); }
  if(k==="alarmCor"){ try{ if(CUR_TAB==="perso"){ COR_OPEN=true; COR_FINO=true; renderCadastro(); } }catch(_){} try{ ntfRender(); }catch(_){} const a=document.getElementById("alarm"); if(a){ a.hidden=false; setTimeout(()=>{ a.hidden=true; },900); } } });
/* Lupa e botão CORES: dá para arrastar e deixar onde quiser */
function posGet(k){ try{ return JSON.parse(localStorage.getItem(k)||"null"); }catch(_){ return null; } }
function posApply(el,p){ if(!el||!p) return; const z=parseFloat(document.body.style.zoom)||1, ez=parseFloat(el.style.zoom)||1; const k=z*ez; const w=el.offsetWidth||40, h=el.offsetHeight||40; el.style.left=Math.max(0,Math.min(innerWidth/k-w,p.x*z/k))+"px"; el.style.top=Math.max(0,Math.min(innerHeight/k-h,p.y*z/k))+"px"; el.style.right="auto"; el.classList.add("moved"); }
function posRescue(){ ["sidectl","sideopen","corBtn","tmFab"].forEach(id=>{ const el=document.getElementById(id); if(!el||el.hidden) return; const r=el.getBoundingClientRect(); if(r.width&&(r.right<20||r.bottom<20||r.left>innerWidth-20||r.top>innerHeight-20)){ el.style.left=""; el.style.top=""; el.style.right=""; el.classList.remove("moved"); try{ localStorage.removeItem(id==="corBtn"?"rp_pos_cor":"rp_pos_side"); }catch(_){} } }); }
let MV=null, MV_EAT=false;
document.addEventListener("pointerdown",e=>{ const el=e.target.closest&&e.target.closest("#sidectl,#sideopen,#corBtn,#tmFab"); if(!el) return; if(el.id==="sidectl"&&e.target.closest("button")&&!e.target.closest(".sdl")) { /* deixa os botões funcionarem; arrasta pelo nome */ }
  const r=el.getBoundingClientRect(); MV={el,sx:e.clientX,sy:e.clientY,dx:e.clientX-r.left,dy:e.clientY-r.top,go:false,btn:!!e.target.closest("button")&&el.id==="sidectl"}; },true);
document.addEventListener("pointermove",e=>{ if(!MV) return; if(MV.btn) return; const m=Math.abs(e.clientX-MV.sx)+Math.abs(e.clientY-MV.sy); if(!MV.go&&m<8) return; MV.go=true; e.preventDefault(); const z=parseFloat(document.body.style.zoom)||1; const p={x:(e.clientX-MV.dx)/z,y:(e.clientY-MV.dy)/z};
  if(MV.el.id==="corBtn"||MV.el.id==="tmFab") posApply(MV.el,p); else { posApply(document.getElementById("sidectl"),p); posApply(document.getElementById("sideopen"),p); } MV.p=p; },{passive:false});
document.addEventListener("pointerup",()=>{ if(!MV) return; if(MV.go&&MV.p){ MV_EAT=true; setTimeout(()=>MV_EAT=false,350); try{ localStorage.setItem(MV.el.id==="corBtn"?"rp_pos_cor":MV.el.id==="tmFab"?"rp_pos_tm":"rp_pos_side",JSON.stringify(MV.p)); }catch(_){} if(MV.el.id!=="corBtn"&&MV.el.id!=="tmFab") corBtnPlace(); } MV=null; });
document.addEventListener("click",e=>{ if(MV_EAT&&e.target.closest&&e.target.closest("#sidectl,#sideopen,#corBtn,#tmFab")){ e.stopPropagation(); e.preventDefault(); MV_EAT=false; } },true);
setTimeout(()=>{ const p=posGet("rp_pos_side"); if(p){ posApply(document.getElementById("sidectl"),p); posApply(document.getElementById("sideopen"),p); } },300);
/* Botão de cores embaixo da lupa: muda só a aba aberta */
function tmFabPlace(){ let f=document.getElementById("tmFab"); const on=!!window.RP_LIMPO&&CUR_TAB==="sessao";
  if(!f){ if(!on) return; f=document.createElement("button"); f.id="tmFab"; f.type="button"; f.setAttribute("aria-label","Timers"); f.innerHTML='<i>⏱</i><span>Timers</span>'; document.body.appendChild(f);
    f.addEventListener("click",()=>{ TM_PAN=!TM_PAN; renderSessao(); if(TM_PAN) setTimeout(()=>{ const x=document.querySelector(".tmpanw"); if(x) x.scrollIntoView({behavior:"smooth",block:"start"}); },60); f.classList.toggle("on",TM_PAN); }); fltInit(); }
  f.hidden=!on; f.classList.toggle("on",TM_PAN); if(!on) return; const pt=posGet("rp_pos_tm"); if(pt){ posApply(f,pt); return; } const c=document.getElementById("corBtn"); const z=parseFloat(document.body.style.zoom)||1;
  const v=[c,document.getElementById("sidectl"),document.getElementById("sideopen")].find(x=>x&&!x.hidden&&!x.classList.contains("flthid")&&getComputedStyle(x).display!=="none"&&x.getBoundingClientRect().height);
  f.style.top= v? ((v.getBoundingClientRect().bottom/z)+6)+"px" : "70px"; }
/* Zoom, Cores e Timers: segurar o botão mostra o ✕ para fechar; a aba ‹ na borda traz de volta */
const FLT_IDS=["sideopen","corBtn","tmFab"]; let FLT_T=null, FLT_LP=false, FLT_P=null;
const fltHid=()=>{ try{ return JSON.parse(localStorage.getItem("rp_flt_hid")||"[]"); }catch(_){ return []; } };
function fltApply(){ const H=fltHid(); FLT_IDS.forEach(id=>{ const el=document.getElementById(id); if(el) el.classList.toggle("flthid",H.includes(id)); });
  let bk=document.getElementById("fltBack"); if(!bk){ bk=document.createElement("button"); bk.id="fltBack"; bk.type="button"; bk.setAttribute("aria-label","Mostrar os botões fechados"); bk.textContent="‹"; document.body.appendChild(bk);
    bk.addEventListener("click",()=>{ try{ localStorage.setItem("rp_flt_hid","[]"); }catch(_){} fltApply(); try{ tmFabPlace(); }catch(_){} toast("Botões de volta"); }); }
  bk.hidden=!H.some(id=>document.getElementById(id)); }
function fltInit(){ if(window.__fltOn) return; window.__fltOn=true; const sel=FLT_IDS.map(i=>"#"+i).join(",");
  document.addEventListener("pointerdown",e=>{ const el=e.target.closest&&e.target.closest(sel); if(!el||e.target.closest(".fltx")) return; FLT_LP=false; FLT_P={x:e.clientX,y:e.clientY}; clearTimeout(FLT_T);
    FLT_T=setTimeout(()=>{ FLT_LP=true; document.querySelectorAll(".fltarm").forEach(x=>{ x.classList.remove("fltarm"); const q=x.querySelector(".fltx"); if(q) q.remove(); }); el.classList.add("fltarm"); const x=document.createElement("span"); x.className="fltx"; x.textContent="✕"; { const rc=el.getBoundingClientRect(); if(rc.left+rc.width/2<innerWidth/2){ x.style.left="auto"; x.style.right="-10px"; } } x.setAttribute("aria-label","Fechar este botão"); el.appendChild(x); try{ navigator.vibrate&&navigator.vibrate(30); }catch(_){} },600); },true);
  document.addEventListener("pointermove",e=>{ if(FLT_P&&Math.abs(e.clientX-FLT_P.x)+Math.abs(e.clientY-FLT_P.y)>10) clearTimeout(FLT_T); },true);
  ["pointerup","pointercancel"].forEach(t=>document.addEventListener(t,()=>{ clearTimeout(FLT_T); FLT_P=null; },true));
  document.addEventListener("click",e=>{ const x=e.target.closest&&e.target.closest(".fltx"); if(x){ e.stopPropagation(); e.preventDefault(); const el=x.closest(sel); if(el){ const H=fltHid(); if(!H.includes(el.id)) H.push(el.id); try{ localStorage.setItem("rp_flt_hid",JSON.stringify(H)); }catch(_){} el.classList.remove("fltarm"); x.remove(); fltApply(); try{ tmFabPlace(); }catch(_){} toast("Fechado. Toque na ‹ na borda direita para trazer de volta."); } return; }
    const el=e.target.closest&&e.target.closest(sel); if(el&&FLT_LP){ e.stopPropagation(); e.preventDefault(); FLT_LP=false; return; }
    document.querySelectorAll(".fltarm").forEach(a=>{ if(a!==el){ a.classList.remove("fltarm"); const q=a.querySelector(".fltx"); if(q) q.remove(); } }); },true);
  document.addEventListener("contextmenu",e=>{ if(e.target.closest&&e.target.closest(sel)) e.preventDefault(); },true);
  fltApply(); }
function corBtnPlace(){ if(window.RP_LIMPO) setTimeout(()=>{ try{ fltInit(); fltApply(); tmFabPlace(); }catch(_){} },0); let b=document.getElementById("corBtn"); if(!b){ b=document.createElement("button"); b.id="corBtn"; b.type="button"; b.setAttribute("aria-label","Cores desta aba"); b.innerHTML='<i class="cbg"></i><span>Editar<br>cores<br>da aba</span>'; document.body.appendChild(b); b.addEventListener("click",()=>{ ABA_COR=abaKey(); abaCorRender(); }); }
  const pc=posGet("rp_pos_cor"); if(pc){ posApply(b,pc); return; }
  const d=document.getElementById("sidectl"), r=document.getElementById("sideopen"); const v= d&&!d.hidden? d : r&&!r.hidden? r : null; if(!v){ b.style.top="70px"; return; } if(v.classList.contains("moved")){ const rc0=v.getBoundingClientRect(), z0=parseFloat(document.body.style.zoom)||1; b.style.left=(rc0.left/z0)+"px"; b.style.right="auto"; } const rc=v.getBoundingClientRect(); const z=parseFloat(document.body.style.zoom)||1; b.style.top=((rc.bottom/z)+6)+"px"; }
function abaCorHTML(){ const t=ABA_COR, o=((S.brand||{}).abaCor||{})[t]||{}, nm=(CP_ABAS.find(x=>x[0]===t)||[,t])[1];
  const temaOn=o.tema!=null? o.tema : null;
  const bgc="#EEF1F0";
  return `<div class="sheet acsheet" role="dialog" aria-label="Cores desta aba"><div class="sheet-head"><h3>🎨 Cores da aba ${esc(nm)}</h3><button class="btn small ghost" data-acx>✕</button></div>
  <p class="muted" style="margin:0;font-size:13px">Muda só esta aba. As outras continuam com as cores do site.</p>
  <b class="corl">Escolha uma cor</b><p class="muted cord">Um toque e a aba fica nos tons dela.</p>
  <div class="temag">${TEMAS.map(tm=>{ const z=temaTons(tm); const st=z? [z.fg,z.ac,z.mid,z.bg,z.sf] : ["#16201D","#1E8E3E","#2A5BD7","#C9962B","#EEF1F0"]; return `<button class="temab ${temaOn===tm[0]?"on":""}" data-actema="${tm[0]}" title="${tm[1]}" aria-label="${tm[1]}"><span class="temap">${st.map(x=>`<i style="background:${x}"></i>`).join("")}</span></button>`; }).join("")}</div>
  <b class="corl">Cor de fundo</b>${odots(SITE_BG.map(([k,n,c])=>({pad:!k,set:{siteBg:k},c,t:n,on:o.siteBg===k})),"siteBg",String(o.siteBg||"").charAt(0)==="#"?o.siteBg:"")}
  <b class="corl">Cor das caixas</b><div class="temag boxtiles">${pcustBtn("boxCor",String(o.boxCor||"").charAt(0)==="#","pcbox")}${BOX_COR.slice().sort((x,y)=>(!x[0]?-1:!y[0]?1:lumHex(x[2]||bgc)-lumHex(y[2]||bgc))).map(([k,n,c])=>{ const bg=c?tomBg(c):bgc; const bx=c||`color-mix(in srgb,${bg} 45%,#fff)`; return `<button class="temab bxt ${o.boxCor===k?"on":""}" data-pv="boxCor" data-pvh="${c||bgc}" data-pset='${esc(JSON.stringify({boxCor:k}))}' title="${n}"><span class="bxpic" style="background:${bg}"><i style="background:${bx}"></i><i style="background:${bx}"></i><i class="s" style="background:${bx}"></i></span></button>`; }).join("")}</div>
  <b class="corl">Cor das letras</b>${odots(TXT_COR.map(([k,n,c])=>({pad:!k,set:{txtCor:k},c,t:n,on:o.txtCor===k})),"txtCor",String(o.txtCor||"").charAt(0)==="#"?o.txtCor:"")}
  ${(t==="sessao")&&A()&&!A().own?`<button class="btn primary acstu" data-acstu>💾 Salvar layout para ${esc(first(A().name))}</button><small class="muted" style="text-align:center">Salva estas cores só para ${esc(first(A().name))}: a Sessão dela abre assim.</small>`:""}
  <div class="row" style="justify-content:space-between;margin-top:8px"><button class="btn small ghost" data-acreset ${Object.keys(o).length?"":"disabled"}>Voltar às cores do site</button><button class="btn primary small" data-acx>Pronto</button></div></div>`; }
function abaCorRender(){ let p=document.getElementById("abaCorPop"); if(!p){ p=document.createElement("div"); p.id="abaCorPop"; p.className="scrim"; document.body.appendChild(p);
    p.addEventListener("click",e=>{ if(e.target===p||e.target.closest("[data-acx]")){ ABA_COR=null; abaCorRender(); return; }
      const tb=e.target.closest("[data-actema]"); if(tb){ S.brand=Object.assign({},S.brand||{}); const AC=S.brand.abaCor=Object.assign({},S.brand.abaCor||{}); AC[ABA_COR]={tema:tb.dataset.actema,siteCor:"",siteCorX:"",siteBg:"",boxCor:"",txtCor:"",sesTr:"",sesCd:""}; if(!tb.dataset.actema&&!(S.brand.tema)) delete AC[ABA_COR]; save(); applySiteCor(); abaCorRender(); try{ if(CUR_TAB==="perso"||CUR_TAB==="perfil"||CUR_TAB==="cadastro") renderCadastro(); }catch(_){} toast("Pronto! Esta aba ficou nos tons dessa cor."); return; }
      if(e.target.closest("[data-acstu]")){ const m=A(); if(m&&!m.own){ const eff=Object.assign({},S.brand||{},((S.brand||{}).abaCor||{})[ABA_COR]||{}); const snap={}; COR_KEYS.forEach(k=>{ const v=eff[k]; if(v!=null&&v!=="") snap[k]=v; }); m.corP=snap; delete m.cor; S.brand=Object.assign({},S.brand||{},{stuShow:true}); save(); applySiteCor(); try{ renderSessao(); }catch(_){} toast(`Layout salvo para ${first(m.name)}.`); } return; }
      if(e.target.closest("[data-acreset]")){ S.brand=Object.assign({},S.brand||{}); const AC=Object.assign({},S.brand.abaCor||{}); delete AC[ABA_COR]; S.brand.abaCor=AC; save(); applySiteCor(); abaCorRender(); toast("Esta aba voltou às cores do site."); } }); }
  if(!ABA_COR){ p.hidden=true; return; } p.innerHTML=abaCorHTML(); p.hidden=false; }
setInterval(()=>{ try{ posRescue(); corBtnPlace(); const p=posGet("rp_pos_side"); if(p){ ["sidectl","sideopen"].forEach(id=>{ const el=document.getElementById(id); if(el&&!el.hidden&&!el.classList.contains("moved")) posApply(el,p); }); } }catch(_){} },800);
let COR_OPEN=false;
/* Seletor de cor padrão do site: grade de tons, outra cor e opacidade */
const hsl2hex=(h,s2,l)=>{ s2/=100; l/=100; const k=n=>(n+h/30)%12, a=s2*Math.min(l,1-l), f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); return "#"+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,"0")).join("").toUpperCase(); };
const CP_H=[355,30,50,122,168,187,220,258,290,335];
const CP_ROWS=[["#FFFFFF","#DADADA","#B5B5B5","#9A9A9A","#808080","#666666","#444444","#1B1B1B","#0A0A0A","#000000"],CP_H.map(h=>hsl2hex(h,85,55)),...[92,82,72,62,40,28].map(l=>CP_H.map(h=>hsl2hex(h,l>50?85:75,l)))];
const cpInk=v=>agInk(String(v||"#fff").slice(0,7));
const cpParse=v=>{ v=String(v||""); if(/^#[0-9a-f]{8}$/i.test(v)) return {h:v.slice(0,7).toUpperCase(),a:Math.round(parseInt(v.slice(7,9),16)/2.55)}; if(/^#[0-9a-f]{6}$/i.test(v)) return {h:v.toUpperCase(),a:100}; return {h:"#E53935",a:100}; };
const cpVal=(h,a)=> a>=100? h : h+Math.round(a*2.55).toString(16).padStart(2,"0").toUpperCase();
let CP=null; const CP_SET={}, CP_GET={};
const CP_BASE=["#FFFFFF","#FFF3A6","#FFD8A8","#F8BBD0","#BFE3FF","#C8F0D2","#E2D4F7","#FFC845","#F57C00","#EC407A","#E53935","#2BB3A6","#1E8E3E","#1E63D6","#7B3FC4","#6D4C41","#6B7280","#111418"];
const cpTone=(base,t)=>{ const c=hexHsl(base); if(!c) return base; const L=c[2]; let l= t<=50? 97-(97-L)*(t/50) : L-(L-8)*((t-50)/50); const sat= c[1]<6? 0 : c[1]; return hsl2hex(c[0],sat,Math.round(Math.max(4,Math.min(99,l)))); };
const CP_PART={siteBg:"bg",boxCor:"box",sesTr:"box",sesCd:"box",txtCor:"txt",siteCor:"btn",payCor:"alert",alarmCor:"alarm",rw:"timer",sc:"timer",ag_cab:"btn",ag_livre:"box",ag_ocup:"box"};
const CP_NOME={siteBg:"Fundo da tela",boxCor:"Caixas",sesTr:"Tabela do treino",sesCd:"Cardio e timers",txtCor:"Letras",siteCor:"Botões e destaques",payCor:"Aviso de pagamento",alarmCor:"Tela do fim do descanso",rw:"Janelinha do descanso",sc:"Contador de séries",ag_cab:"Cabeçalho da agenda",ag_livre:"Horário livre",ag_ocup:"Horário ocupado"};
function cpPrev(key,v){ const p=CP_PART[key]||"box", ink=cpInk(v), K=x=>p===x;
  if(p==="alarm") return `<div class="cpprev" style="background:${v};color:${ink}"><b style="font-size:20px">⏰ Acabou o descanso!</b></div>`;
  if(p==="timer") return `<div class="cpprev" style="background:var(--bg)"><span class="cppt" style="background:${v};color:${ink}"><small>DESCANSO</small><b>0:30</b></span></div>`;
  return `<div class="cpprev" style="background:${K("bg")?v:"var(--bg)"}">${K("alert")?`<span class="cppa" style="background:${v};color:${ink}">⚠ Pagamento vencido</span>`:""}<span class="cppb" style="background:${K("box")?v:"var(--surface)"};color:${K("txt")?v:K("box")?ink:"var(--fg)"}"><b>Carla</b> <small>Treino A · 4×12</small></span><span class="cppbt" style="background:${K("btn")?v:"var(--accent)"};color:${K("btn")?ink:"#fff"}">Botão</span></div>`; }
const CP_FIELD={siteBg:v=>({siteBg:v}),boxCor:v=>({boxCor:v}),txtCor:v=>({txtCor:v}),payCor:v=>({payCor:v}),sesTr:v=>({sesTr:v}),sesCd:v=>({sesCd:v}),alarmCor:v=>({alarmCor:v}),siteCor:v=>({siteCor:"x",siteCorX:v})};
const CP_ABAS=[["perfil","👤 Meu perfil"],["cadastro","📝 Cadastro"],["sessao","🏋️ Sessão"],["presenca","✅ Presença"],["agenda","📅 Agenda"],["financeiro","💰 Financeiro"],["corpo","🧍 Avaliação"]];
let ABA_COR=null;
function cpOpen(key,pre){ const g= ABA_COR&&CP_FIELD[key]? ()=>{ const o=((S.brand||{}).abaCor||{})[ABA_COR]||{}; return key==="siteCor"? o.siteCorX : o[key]; } : CP_GET[key]; const cur=cpParse(pre&&pre.h? pre.h : (g?g():"")); CP={key,h:cur.h,a:cur.a,base:cur.h,t:50,pset:pre&&pre.pset||null,scope:ABA_COR?[ABA_COR]:["*"],stu:(()=>{ try{ const m=A(); return m&&!m.own? m.id : ((S.students||[]).find(x=>!x.own)||{}).id; }catch(_){ return null; } })()}; cpRender(); }
function cpRender(){ let o=document.getElementById("cpPop"); if(!o){ o=document.createElement("div"); o.id="cpPop"; o.className="scrim"; document.body.appendChild(o);
    o.addEventListener("click",e=>{ if(e.target===o||e.target.closest("[data-cpx]")){ o.hidden=true; CP=null; return; }
      if(e.target.closest("[data-cpok]")){ cpCommit(false); return; } if(e.target.closest("[data-cppad]")){ cpCommit(true); return; }
      const sc=e.target.closest("[data-cpsc]"); if(sc&&CP){ const v=sc.dataset.cpsc; if(v==="*"||v==="stu") CP.scope=[v]; else { let L=CP.scope.filter(x=>x!=="*"); L= L.includes(v)? L.filter(x=>x!==v) : L.concat([v]); CP.scope= L.length? L : ["*"]; } cpRender(); return; }
      const sw=e.target.closest("[data-cpsw]"); if(sw&&CP){ CP.base=sw.dataset.cpsw; CP.t=50; CP.h=CP.base; CP.pset=null; cpRender(); } });
      o.addEventListener("change",e=>{ if(CP&&e.target.matches("[data-cpstu]")) CP.stu=e.target.value; });
    o.addEventListener("input",e=>{ if(!CP) return; const id=e.target.id;
      if(id==="cpA"||id==="cpAn"){ CP.a=Math.max(0,Math.min(100,+e.target.value||0)); const a=document.getElementById(id==="cpA"?"cpAn":"cpA"); if(a) a.value=CP.a; }
      else if(id==="cpT"){ CP.t=+e.target.value; CP.h=cpTone(CP.base,CP.t); }
      else if(id==="cpX"){ CP.h=e.target.value.toUpperCase(); CP.base=CP.h; CP.t=50; }
      else return;
      CP.pset=null; cpSoft(); }); }
  if(!CP){ o.hidden=true; return; }
  const mid=CP.base, scopable=!!CP_FIELD[CP.key];
  o.innerHTML=`<div class="sheet cpsheet" role="dialog" aria-label="Escolher cor"><div class="sheet-head"><h3>🎨 ${esc(CP_NOME[CP.key]||"Escolher cor")}</h3><button class="btn small ghost" data-cpx>✕</button></div>
    <span class="cpsml">Assim vai ficar (ainda não mudou nada):</span>
    <div id="cpPv">${cpPrev(CP.key,cpVal(CP.h,CP.a))}</div>
    <div class="cprow1">${CP_BASE.map(x=>`<button class="cpsw ${x===CP.base?"on":""}" data-cpsw="${x}" style="background:${x}" aria-label="${x}"></button>`).join("")}<label class="cpsw cpx" title="Outra cor" aria-label="Outra cor">＋<input type="color" id="cpX" value="${CP.h}"></label></div>
    <div class="cpsl"><span class="label">Tom</span><span class="cpsml">claro</span><div class="cptrack cptone" style="background:linear-gradient(90deg,${cpTone(mid,0)},${mid},${cpTone(mid,100)})"><input type="range" id="cpT" min="0" max="100" value="${CP.t}" aria-label="Tom"></div><span class="cpsml">escuro</span></div>
    <div class="cpsl"><span class="label">Opacidade</span><div class="cptrack cpa" style="--cph:${CP.h}"><input type="range" id="cpA" min="0" max="100" value="${CP.a}" aria-label="Opacidade"></div><label class="cpnum"><input type="number" id="cpAn" min="0" max="100" value="${CP.a}">%</label></div>
    ${scopable&&ABA_COR?`<p class="cpwarn">Vale só para a aba <b>${esc((CP_ABAS.find(x=>x[0]===ABA_COR)||[,ABA_COR])[1])}</b>.</p>`:""}${scopable&&!ABA_COR?`<span class="label" style="margin:0">Onde mudar</span>${(()=>{ const m=(CUR_TAB==="sessao"||CUR_TAB==="semana")&&A()&&!A().own? A() : null; return m&&stuM()? `<p class="cpwarn">A tela está na cor de <b>${esc(first(m.name))}</b>. Para mudar a cor dela, escolha “Só para ${esc(first(m.name))}”.</p>` : ""; })()}<div class="cpscope"><button class="chip" data-cpsc="stu" aria-pressed="${CP.scope.includes("stu")}">👤 Só para um aluno</button><button class="chip" data-cpsc="*" aria-pressed="${CP.scope.includes("*")}">🌐 Site todo</button>${CP.scope.includes("stu")?`<select class="inp cpstu" data-cpstu>${(S.students||[]).filter(m=>!m.own).slice().sort((a,b)=>a.name.localeCompare(b.name)).map(m=>`<option value="${m.id}" ${m.id===CP.stu?"selected":""}>${esc(m.name)}</option>`).join("")}</select>`:""}</div>`:""}
    <div class="cpbtns"><button class="btn small ghost" data-cppad>Voltar ao padrão</button><button class="btn small" data-cpx>Cancelar</button><button class="btn primary" data-cpok>✓ Aplicar</button></div></div>`;
  o.hidden=false; }
function cpSoft(){ const o=document.getElementById("cpPop"); if(!o||!CP) return; const pv=o.querySelector("#cpPv"); if(pv) pv.innerHTML=cpPrev(CP.key,cpVal(CP.h,CP.a)); const tr=o.querySelector(".cpa"); if(tr) tr.style.setProperty("--cph",CP.h); }
function cpCommit(pad){ if(!CP) return; const key=CP.key, F=CP_FIELD[key];
  if(F){ const obj= pad? (PD_RESET[key]||{}) : (CP.pset||F(cpVal(CP.h,CP.a)));
    if(CP.scope.includes("stu")){ const m=S.students.find(x=>x.id===CP.stu); if(m){ const snap=m.corP? Object.assign({},m.corP) : (()=>{ const o={}; COR_KEYS.forEach(k=>{ const v=(S.brand||{})[k]; if(v!=null&&v!=="") o[k]=v; }); if(m.cor) o.tema=m.cor; return o; })(); Object.assign(snap,obj); if(pad) Object.keys(obj).forEach(k=>delete snap[k]); m.corP=snap; delete m.cor; S.brand=Object.assign({},S.brand||{},{stuShow:true}); save(); applySiteCor(); try{ renderSessao(); }catch(_){} } }
    else if(CP.scope.includes("*")) { persoSet(obj); if(pad&&key==="alarmCor"){ delete S.brand.alarmCor; save(); applySiteCor(); } }
    else { S.brand=Object.assign({},S.brand||{}); const AC=S.brand.abaCor=Object.assign({},S.brand.abaCor||{}); CP.scope.forEach(t=>{ AC[t]=Object.assign({},AC[t]||{},obj); if(pad) Object.keys(obj).forEach(k=>delete AC[t][k]); if(!Object.keys(AC[t]).length) delete AC[t]; }); COR_OPEN=true; COR_FINO=true; save(); applySiteCor(); try{ renderCadastro(); }catch(_){} }
    if(key==="alarmCor"){ try{ ntfRender(); }catch(_){} const a=document.getElementById("alarm"); if(a){ a.hidden=false; setTimeout(()=>{ a.hidden=true; },900); } } }
  else { const f=CP_SET[key]; if(f) f(pad? "" : cpVal(CP.h,CP.a)); }
  const sc=CP.scope; CP=null; cpRender(); try{ if(ABA_COR) abaCorRender(); }catch(_){} toast(pad? "Voltou ao padrão." : sc.includes("stu")? "Cor salva só para esse aluno. Aparece na Sessão dele." : sc.includes("*")? "Cor aplicada no site todo." : "Cor aplicada em: "+sc.map(k=>(CP_ABAS.find(x=>x[0]===k)||[,k])[1]).join(", ")); }
function cpApply(){}
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-alarmcor]"); if(!b) return; S.brand=Object.assign({},S.brand||{},{alarmCor:b.dataset.alarmcor||undefined}); if(!b.dataset.alarmcor) delete S.brand.alarmCor; save(); applySiteCor(); try{ if(CUR_TAB==="perso"){ COR_OPEN=true; COR_FINO=true; renderCadastro(); } }catch(_){} try{ ntfRender(); }catch(_){} const a=document.getElementById("alarm"); if(a){ a.hidden=false; setTimeout(()=>{ a.hidden=true; },900); } });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cp]"); if(!b) return; e.preventDefault(); e.stopPropagation(); cpOpen(b.dataset.cp); },true);
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-pv]"); if(!b) return; e.preventDefault(); e.stopPropagation(); let ps=null; try{ ps=JSON.parse(b.dataset.pset); }catch(_){} if(!ps){ cpOpen(b.dataset.pv,{h:b.dataset.pvh}); return; } const key=b.dataset.pv;
  if(ABA_COR){ S.brand=Object.assign({},S.brand||{}); const AC=S.brand.abaCor=Object.assign({},S.brand.abaCor||{}); AC[ABA_COR]=Object.assign({},AC[ABA_COR]||{},ps); save(); applySiteCor(); abaCorRender(); try{ if(["perso","perfil","cadastro"].includes(CUR_TAB)) renderCadastro(); }catch(_){} }
  else { persoSet(ps); try{ ntfRender(); }catch(_){} }
  if(key==="alarmCor"){ const a=document.getElementById("alarm"); if(a){ a.hidden=false; setTimeout(()=>{ a.hidden=true; },900); } } },true);
const cpBtn=(key,cur,lab)=>`<button class="corb corcust ${cur?"on":""}" data-cp="${key}" style="--cc:${cur||"conic-gradient(#F8C8D8,#C8DCF8,#D8F0C8,#F8ECC0,#F8C8D8)"}"><i style="border:1px solid #999;display:grid;place-items:center;font-style:normal;font-size:16px;font-weight:900;color:#111">＋</i>${lab||"Outra cor"}</button>`;
const persoSet=o=>{ COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},o); save(); applySiteCor(); try{ renderCadastro(); }catch(_){} };
CP_GET.siteBg=()=>(S.brand||{}).siteBg; CP_SET.siteBg=v=>persoSet({siteBg:v});
CP_GET.boxCor=()=>(S.brand||{}).boxCor; CP_SET.boxCor=v=>persoSet({boxCor:v});
CP_GET.txtCor=()=>(S.brand||{}).txtCor; CP_SET.txtCor=v=>persoSet({txtCor:v});
CP_GET.siteCor=()=>(S.brand||{}).siteCorX; CP_SET.siteCor=v=>persoSet({siteCor:"x",siteCorX:v});
CP_GET.payCor=()=>(S.brand||{}).payCor; CP_SET.payCor=v=>persoSet({payCor:v});
CP_GET.sesTr=()=>(S.brand||{}).sesTr; CP_SET.sesTr=v=>persoSet({sesTr:v});
CP_GET.sesCd=()=>(S.brand||{}).sesCd; CP_SET.sesCd=v=>persoSet({sesCd:v});
CP_GET.alarmCor=()=>(S.brand||{}).alarmCor; CP_SET.alarmCor=v=>{ S.brand=Object.assign({},S.brand||{},{alarmCor:v}); save(); applySiteCor(); try{ ntfRender(); }catch(_){} };
["cab","livre","ocup"].forEach(k=>{ CP_GET["ag_"+k]=()=>agCores()[k]; CP_SET["ag_"+k]=v=>{ agCores()[k]=v; save(); try{ agRender(); }catch(_){} }; });
CP_GET.rw=()=>(S.brand||{}).restWinX; CP_SET.rw=v=>{ S.brand=Object.assign({},S.brand||{},{restWinCor:"x",restWinX:v}); save(); try{ rwEl().dataset.k=""; rwRender(); }catch(_){} };
CP_GET.sc=()=>(S.brand||{}).scX; CP_SET.sc=v=>{ S.brand=Object.assign({},S.brand||{},{scCor:"x",scX:v}); save(); try{ scRender(); }catch(_){} };
const SES_COR=[["","Tom da cor escolhida (padrão)",null],["cinza","Cinza","#E9ECEE"],["grafite","Cinza escuro","#D3D7DB"],["azul","Azul claro","#DCEFFA"],["ceu","Céu","#CFEAFF"],["verde","Verde claro","#E1F3E6"],["menta","Menta","#DDF5EE"],["creme","Creme","#FFF4DA"],["amarelo","Amarelo claro","#FFF6C8"],["pessego","Pêssego","#FFE5D6"],["rosa","Rosa claro","#FBE4EC"],["lilas","Lilás","#EAE3F8"],["branco","Branco","#FFFFFF"],["coral","Coral claro","#FFE0D6"],["oliva","Oliva claro","#EEF2DC"],["lavanda","Lavanda","#E6E0FF"],["areia","Areia","#F3EAD8"],["turquesa","Turquesa claro","#D6F3F1"]];
function sesCorHTML(k,tit){ const b=S.brand||{}, v=b[k]||""; return `<b class="corl">${tit}</b>${odots(SES_COR.map(([c,n,h])=>({pad:!c,set:{[k]:c},c:h,t:n,on:v===c})),k,v.charAt(0)==="#"?v:"")}`; }
const BOX_COR=[["","Branco","#FFFFFF"],["tom","Mesmo tom do fundo",null],["creme","Creme","#FFF8E7"],["areia","Areia","#F3EAD8"],["cinza","Cinza claro","#EEF0F2"],["azul","Azul claro","#E7F0FC"],["verde","Verde claro","#E6F4EA"],["menta","Menta","#E3F6F1"],["rosa","Rosa claro","#FCE8EE"],["lilas","Lilás","#EFE8FA"],["amarelo","Amarelo claro","#FFF7D6"],["pessego","Pêssego","#FFEADB"],["ceu","Céu","#DDF3FF"],["lavanda","Lavanda","#E6E0FF"],["salmao","Salmão claro","#FFE2DC"],["oliva","Oliva claro","#EEF2DC"],["turquesa","Turquesa claro","#DDF4F2"],["coral","Coral claro","#FFE6DE"]];
const TXT_COR=[["","Padrão","#16201D"],["preto","Preto","#000000"],["grafite","Grafite","#3A3F44"],["cinzae","Cinza","#5F6670"],["marinho","Azul-marinho","#16325C"],["azule","Azul","#1B55B8"],["petroleo","Petróleo","#0E4D5C"],["verdee","Verde escuro","#1F4D2E"],["verdeb","Verde","#1E7A3E"],["oliva","Oliva","#4D5A1E"],["marrom","Marrom","#4A2E1E"],["caramelo","Caramelo","#7A4A12"],["laranjae","Laranja escuro","#A34A06"],["vermelhoe","Vermelho escuro","#8E1B1B"],["vinho","Vinho","#6A1B30"],["rosae","Rosa escuro","#9C1F5C"],["roxoe","Roxo escuro","#3B1F5E"],["roxo","Roxo","#5E2CA5"]];
function corHTML(){ const b=S.brand||{}; const fixo=b.siteBg&&b.siteBg!=="preto"? siteBgVal(b) : null; const cust=String(b.siteBg||"").charAt(0)==="#"? b.siteBg : "";
  const TM=TEMAS.find(x=>x[0]===(b.tema||""))||TEMAS[0];
  return `<details class="card abasbox" ${COR_OPEN?"open":""}><summary><b>🎨 Cores do site</b> <span class="muted">· ${esc(TM[1])}</span></summary>
  <b class="corl">Escolha uma cor</b><p class="muted cord">O site todo fica nos tons dela: fundo, caixas, botões e letras.</p>
  <div class="temag">${TEMAS.map(t=>{ const z=temaTons(t); const st=z? [z.fg,z.ac,z.mid,z.bg,z.sf] : ["#16201D","#1E8E3E","#2A5BD7","#C9962B","#EEF1F0"]; return `<button class="temab ${(b.tema||"")===t[0]?"on":""}" data-tema="${t[0]}" title="${t[1]}" aria-label="${t[1]}"><span class="temap">${st.map(x=>`<i style="background:${x}"></i>`).join("")}</span></button>`; }).join("")}</div>
  <b class="corl">Cor das caixas</b>
  <div class="temag boxtiles">${pcustBtn("boxCor",String(b.boxCor||"").charAt(0)==="#","pcbox")}${BOX_COR.slice().sort((x,y)=>(!x[0]?-1:!y[0]?1:lumHex(x[2]||"#EEF1F0")-lumHex(y[2]||"#EEF1F0"))).map(([k,n,c])=>{ const bgc=fixo||(c?tomBg(c):"#EEF1F0"); const bx=c||`color-mix(in srgb,${bgc} 45%,#fff)`; return `<button class="temab bxt ${(b.boxCor||"")===k?"on":""}" data-pv="boxCor" data-pvh="${c||"#EEF1F0"}" data-pset='${esc(JSON.stringify({boxCor:k}))}' title="${n}" aria-label="Caixas: ${n}"><span class="bxpic" style="background:${bgc}"><i style="background:${bx}"></i><i style="background:${bx}"></i><i class="s" style="background:${bx}"></i></span></button>`; }).join("")}</div>
  ${(CUR_TAB==="perso"||CUR_TAB==="perfil")?`<div class="corfino corfix"><h3 class="corfh">🎚 Ajustar cada parte</h3>`:`<details class="corfino" ${COR_FINO?"open":""}><summary>🎚 Ajustar cada parte (opcional)</summary>`}
  ${sesCorHTML("sesTr","🏋️ Sessão: tabela do treino")}${sesCorHTML("sesCd","🏃 Sessão: cardio e timers")}
  <b class="corl">Cor dos botões e destaques</b>
  ${odots(SITE_COR.map(([k,n,h])=>({pad:!k,set:{siteCor:k},c:h==null?"":hsl2hex(h,k==="cinza"?8:55,42),t:n,on:(b.siteCor||"")===k})),"siteCor",b.siteCor==="x"?b.siteCorX:"")}
  <b class="corl">Cor de fundo da tela</b>
  ${odots(SITE_BG.map(([k,n,c])=>({pad:!k,set:{siteBg:k},c,t:n,on:(b.siteBg||"")===k})),"siteBg",cust)}
  <b class="corl">Cor das letras</b>
  ${odots(TXT_COR.map(([k,n,c])=>({pad:!k,set:{txtCor:k},c,t:n,on:(b.txtCor||"")===k})),"txtCor",String(b.txtCor||"").charAt(0)==="#"?b.txtCor:"")}
  <b class="corl">Cor do alerta importante (pagamento vencido)</b>
  ${odots(ALERT_COR.map(([k,n,c])=>({pad:!k,set:{payCor:k},c:c||"var(--accent)",lum:c||"#555555",t:n,on:(b.payCor||"")===k})),"payCor",String(b.payCor||"").charAt(0)==="#"?b.payCor:"")}
  <b class="corl">⏰ Cor da tela quando o descanso acaba</b>
  ${odots([{pad:1,attr:'data-alarmcor=""',t:"Cor do site (padrão)",on:!(S.brand||{}).alarmCor}].concat(["#D3271B","#1E8E3E","#1B55B8","#7B3FC4","#EC407A","#F57C00","#111418","#8E1B3A","#00897B","#3949AB","#6D4C41","#455A64","#FFB300","#00ACC1","#AD1457","#6B7A1E","#E8603C"].map(c=>({set:{alarmCor:c},c,t:c,on:(S.brand||{}).alarmCor===c}))),"alarmCor",(S.brand||{}).alarmCor&&!["#D3271B","#1E8E3E","#1B55B8","#7B3FC4","#EC407A","#F57C00","#111418","#8E1B3A","#00897B","#3949AB","#6D4C41","#455A64","#FFB300","#00ACC1","#AD1457","#6B7A1E","#E8603C"].includes((S.brand||{}).alarmCor)?(S.brand||{}).alarmCor:"")}
  ${(CUR_TAB==="perso"||CUR_TAB==="perfil")?"</div>":"</details>"}</details>`; }
let COR_FINO=false;
/* Posição das abas: embaixo (padrão), em cima, laterais. Segurar 1s: arrastar e esconder abas */
function abPos(){ try{ const v=localStorage.getItem("rp_abpos"); return ["top","left","right"].includes(v)?v:"bottom"; }catch(_){ return "bottom"; } }
function abSave(v){ try{ if(v==="bottom") localStorage.removeItem("rp_abpos"); else localStorage.setItem("rp_abpos",v); }catch(_){} }
var AB_RO=null, AB_DRAG=null, AB_EDIT=false;
function abZ(){ return parseFloat(document.body&&document.body.style.zoom)||1; }
function rpAbLay(){ const R=document.documentElement, p=abPos(); if(R.dataset.rpab!==p) R.dataset.rpab=p; abDragInit();
  if(!document.getElementById("abposcss")){ const s=document.createElement("style"); s.id="abposcss"; const T='html[data-rpab="top"] body', L='html[data-rpab="left"] body', D='html[data-rpab="right"] body', LD=(x)=>x.split(",").map(y=>L+' '+y+','+D+' '+y).join(",");
    const TOP='calc(var(--abH,60px) + var(--tnH,0px) + var(--wkH,0px))';
    s.textContent=[
      /* em cima: abas, descanso e alarme grudados */
      T+' .tabs{top:0!important;bottom:auto!important;border-top:0!important;border-bottom:1px solid var(--line)!important;padding:calc(4px + env(safe-area-inset-top,0px)) 8px 4px!important}',
      T+' .turnbar{top:var(--abH,60px)!important;bottom:auto!important;border-top:0!important;border-bottom:1px solid var(--line)!important}',
      T+' .weektabs{top:calc(var(--abH,60px) + var(--tnH,0px))!important;bottom:auto!important;border-top:0!important;border-bottom:1px solid var(--line)!important}',
      T+'.kb .tabs,'+T+'.kb #weektabs{display:flex!important}',T+'.kb #turnbar{display:flex!important}',
      T+'{padding-top:'+TOP+'!important}',
      T+' .wrap,'+T+' .wrap.withturn,'+T+' .wrap.withweeks,'+T+' .wrap.withweeks.withturn{padding-bottom:48px!important}',
      T+' :is(.top,.hhead,.rep-actions,#payAlert),'+T+' #pres :is(.phead,.phead2){top:'+TOP+'!important}',
      T+' .cbusca{top:calc(var(--abH,60px) + var(--tnH,0px) + var(--wkH,0px) + 6px)!important}',
      T+' .durpop{bottom:auto!important;top:calc(100% + 6px)!important}',
      /* laterais: uma coluna fina com abas em cima e descanso + alarme no pé */
      LD('.tabs')+'{top:0!important;bottom:calc(var(--tnH,0px) + var(--wkH,0px))!important;width:58px!important;flex-direction:column!important;justify-content:space-evenly!important;gap:2px!important;overflow-y:auto;border-top:0!important;padding:calc(4px + env(safe-area-inset-top,0px)) 2px 4px!important}',
      L+' :is(.tabs,.turnbar,.weektabs){left:0!important;right:auto!important;border-right:1px solid var(--line)!important}',
      D+' :is(.tabs,.turnbar,.weektabs){right:0!important;left:auto!important;border-left:1px solid var(--line)!important}',
      LD('.tabs button')+'{flex:1 1 auto!important;min-height:0!important;max-height:76px;width:100%;padding:4px 0!important;gap:3px!important;border-radius:12px!important}',
      LD('.tabs .tb-tx')+'{font-size:9.5px!important;line-height:1.1!important}',LD('.tabs .tb-ic')+'{font-size:21px!important}',
      L+'.kb .tabs,'+D+'.kb .tabs{display:flex!important}',
      L+'{padding-left:58px!important}', D+'{padding-right:58px!important}',
      LD('.turnbar,.weektabs')+'{width:58px!important;border-top:1px solid var(--line)!important;padding:4px 2px!important;flex-direction:column!important;gap:4px!important;overflow:visible!important;background:var(--surface)!important;backdrop-filter:none!important}',
      LD('.weektabs')+'{bottom:0!important;padding-bottom:calc(4px + env(safe-area-inset-bottom,0px))!important}',
      LD('.turnbar')+'{bottom:var(--wkH,0px)!important}',
      LD('.tcell')+'{display:flex!important;flex-direction:column!important;align-items:center!important;gap:1px!important;padding:3px 1px!important;width:100%;min-width:0!important}',
      LD('.trest')+'{display:contents!important}',
      LD('.tr-s')+'{order:1;font-size:8.5px!important;line-height:1.1;text-align:center;text-transform:none!important;letter-spacing:0!important;white-space:nowrap;overflow:hidden;max-width:100%}',
      LD('.tname')+'{order:2;font-size:11px!important;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:1px 2px!important;min-width:0}',
      LD('.tname .ud')+'{display:none!important}',
      LD('.tr-t')+'{order:3;font-size:14px!important;font-weight:800}',
      LD('.tdur')+'{order:4;font-size:11px!important;padding:2px 4px!important}',
      LD('.durpop')+'{position:fixed!important;bottom:8px!important;width:min(260px,80vw)!important;right:auto!important;z-index:20}',
      L+' .durpop{left:62px!important}', D+' .durpop{left:auto!important;right:62px!important}',
      LD('.wbell')+'{width:100%;font-size:9px!important;line-height:1.15;padding:6px 1px!important;white-space:normal!important;text-align:center;overflow:hidden;letter-spacing:0!important;overflow-wrap:anywhere}',
      LD('.wbell small')+'{display:none!important}',LD('.wbell .wbt')+'{display:none!important}',LD('.wbell')+'{display:flex!important;flex-direction:column!important;align-items:center!important;gap:4px!important;padding:8px 2px!important}',LD('.wbell .wbi')+'{display:block!important;font-size:20px!important;line-height:1}',LD('.wbell .wbg')+'{display:block!important;font-size:16px!important;line-height:1}',
      LD('.wrap')+','+LD('.wrap.withturn')+','+LD('.wrap.withweeks')+','+LD('.wrap.withweeks.withturn')+'{padding-bottom:48px!important}',
      /* arrastar e editar */
      '.abposbox{display:grid;gap:4px;margin:8px 0}',
      '.tabs{touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}',
      'html.abedit .tabs{outline:3px dashed var(--accent);outline-offset:-3px}',
      'html.abdrag .tabs{transition:none;box-shadow:0 10px 30px rgba(0,0,0,.35);opacity:.92;z-index:9600!important}',
      '.tabs .abx{position:absolute;top:0;right:2px;width:20px;height:20px;border-radius:50%;background:#C62828;color:#fff;font:700 12px/20px sans-serif;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.35);z-index:2}',
      'html.abedit .tabs button:not([hidden]){animation:abwig .25s ease-in-out infinite alternate}@keyframes abwig{from{transform:rotate(-1.5deg)}to{transform:rotate(1.5deg)}}',
      '#abdrop{position:fixed;z-index:9590;background:color-mix(in srgb,var(--accent) 35%,transparent);border:2px dashed var(--accent);pointer-events:none;transition:all .12s}',
      '.abasbox>summary{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.abasbox>summary .abv{height:auto!important;padding:3px 4px}.abasbox>summary .abv i{font-size:14px;width:18px;line-height:18px}'
    ].join("\n"); document.head.appendChild(s); }
  const els=[document.querySelector(".tabs"),document.getElementById("turnbar"),document.getElementById("weektabs")];
  const mz=()=>{ const z=abZ(); const g=el=>{ if(!el) return {h:0,w:0}; const cs=getComputedStyle(el); if(cs.display==="none"||cs.visibility==="hidden"||el.hidden) return {h:0,w:0}; const r=el.getBoundingClientRect(); return {h:r.height/z,w:r.width/z}; };
    const a=g(els[0]), b=g(els[1]), c=g(els[2]); const S2=(k,v)=>{ const s=Math.round(v)+"px"; if(R.style.getPropertyValue(k)!==s) R.style.setProperty(k,s); };
    if(!AB_DRAG){ const pp=abPos(); S2("--abH",pp==="top"||pp==="bottom"?a.h:0); S2("--abW",a.w); S2("--tnH",b.h); S2("--wkH",c.h); }
    abFlt(); };
  window.__abMz=mz; mz();
  if(!AB_RO&&window.ResizeObserver){ AB_RO=new ResizeObserver(()=>{ try{ mz(); }catch(_){} }); els.forEach(el=>{ if(el) AB_RO.observe(el); }); window.addEventListener("resize",()=>{ try{ mz(); }catch(_){} }); }
}
/* Zoom e Cores fogem das abas: descem quando estão em cima; vão para o lado oposto nas laterais */
function abFlt(){ const p=abPos(), z=abZ(); ["sidectl","sideopen","corBtn"].forEach(id=>{ const el=document.getElementById(id); if(!el) return; el.style.translate=""; if(el.hidden||getComputedStyle(el).display==="none") return;
  const r=el.getBoundingClientRect(); if(!r.width) return; let dx=0,dy=0; const zk=z*(parseFloat(el.style.zoom)||1);
  if(p==="top"){ const lim=(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--abH"))||0)+(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tnH"))||0)+(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--wkH"))||0); const lp=lim*z+6; if(r.top<lp) dy=(lp-r.top)/zk; }
  else if(p==="left"){ const lw=58*z; if(r.left<lw+2) dx=(innerWidth-r.right)/zk; }
  else if(p==="right"){ const lw=58*z; if(r.right>innerWidth-lw-2) dx=-r.left/zk; }
  if(dx||dy) el.style.translate=dx+"px "+dy+"px"; }); }
function abTabName(k){ const b=document.querySelector('.tabs [data-tab="'+k+'"]'); return b? (b.getAttribute("aria-label")||b.textContent||k).trim() : k; }
function abEdit(on){ const R=document.documentElement; AB_EDIT=!!on; R.classList.toggle("abedit",AB_EDIT);
  document.querySelectorAll(".tabs .abx").forEach(x=>x.remove());
  if(AB_EDIT) document.querySelectorAll(".tabs [data-tab]").forEach(b=>{ if(ABAS.some(x=>x[0]===b.dataset.tab)){ const x=document.createElement("span"); x.className="abx"; x.textContent="✕"; x.setAttribute("aria-label","Esconder a aba "+abTabName(b.dataset.tab)); b.appendChild(x); } }); }
function abHide(k){ const old=abasOn().slice(); const on=old.filter(x=>x!==k); S.brand=Object.assign({},S.brand||{},{abas:on,agMig:true,abasOk:true}); save(); applyAbas(); abEdit(true); try{ window.__abMz&&window.__abMz(); }catch(_){}
  let o=document.getElementById("abhid"); if(!o){ o=document.createElement("div"); o.id="abhid"; o.className="scrim"; o.style.zIndex="9700"; document.body.appendChild(o); o.addEventListener("click",e=>{ if(e.target===o||e.target.closest("[data-abhx]")){ o.hidden=true; } }); }
  o.innerHTML=`<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-head"><h3>Aba escondida</h3><button class="btn small" data-abhx>Entendi</button></div>
    <p style="margin:0">A aba <b>${esc(abTabName(k))}</b> saiu da barra. Nada foi apagado.</p>
    <p style="margin:0">Para mostrar de novo: <b>👤 Meu perfil → 🧩 Abas que aparecem</b> e toque nela.</p>
    <button class="btn primary" data-abundo>↩ Desfazer</button></div>`;
  o.hidden=false; const u=o.querySelector("[data-abundo]"); u.onclick=()=>{ S.brand=Object.assign({},S.brand||{},{abas:old}); save(); applyAbas(); abEdit(AB_EDIT); o.hidden=true; try{ window.__abMz&&window.__abMz(); }catch(_){} toast("Aba de volta"); }; }
function abDragInit(){ const t=document.querySelector(".tabs"); if(!t||t.__abd) return; t.__abd=1; const R=document.documentElement; let lp=null,sx=0,sy=0,arm=null,pid=null;
  const drop=()=>{ let d=document.getElementById("abdrop"); if(!d){ d=document.createElement("div"); d.id="abdrop"; document.body.appendChild(d); } return d; };
  const zone=p=>{ const d=drop(), s=d.style; s.display="block"; s.left=s.right=s.top=s.bottom=""; s.width=s.height="";
    if(p==="top"){ s.left="0";s.right="0";s.top="0";s.height="64px"; } else if(p==="bottom"){ s.left="0";s.right="0";s.bottom="0";s.height="64px"; } else if(p==="left"){ s.left="0";s.top="0";s.bottom="0";s.width="58px"; } else { s.right="0";s.top="0";s.bottom="0";s.width="58px"; } };
  t.addEventListener("contextmenu",e=>e.preventDefault());
  t.addEventListener("pointerdown",e=>{ if(e.target.closest(".abx")) return; sx=e.clientX; sy=e.clientY; pid=e.pointerId; clearTimeout(lp);
    if(AB_EDIT){ arm={x:sx,y:sy}; return; }
    lp=setTimeout(()=>{ abEdit(true); arm={x:sx,y:sy}; t.__noclk=Date.now()+60000; try{ navigator.vibrate&&navigator.vibrate(30); }catch(_){} toast("Arraste para mudar de lugar · ✕ esconde a aba · toque fora para sair"); },1000); });
  t.addEventListener("pointermove",e=>{ if(!arm){ if(Math.hypot(e.clientX-sx,e.clientY-sy)>12) clearTimeout(lp); return; }
    if(!AB_DRAG){ if(Math.hypot(e.clientX-arm.x,e.clientY-arm.y)<10) return; AB_DRAG={pos:abPos(),x:arm.x,y:arm.y}; try{ t.setPointerCapture(pid); }catch(_){} R.classList.add("abdrag"); }
    e.preventDefault(); const z=abZ(), x=e.clientX, y=e.clientY; t.style.translate=((x-AB_DRAG.x)/z)+"px "+((y-AB_DRAG.y)/z)+"px";
    const d={top:y,bottom:innerHeight-y,left:x,right:innerWidth-x}; const p=Object.keys(d).sort((a,b)=>d[a]-d[b])[0]; AB_DRAG.pos=p; zone(p); });
  const end=()=>{ clearTimeout(lp); arm=null; if(t.__noclk>Date.now()) t.__noclk=Date.now();
    if(!AB_DRAG) return; const p=AB_DRAG.pos; AB_DRAG=null; t.style.translate=""; R.classList.remove("abdrag"); const d=document.getElementById("abdrop"); if(d) d.style.display="none";
    abSave(p); R.dataset.rpab=p; t.__noclk=Date.now(); try{ renderAll(); }catch(_){} setTimeout(()=>{ try{ window.__abMz&&window.__abMz(); }catch(_){} },60);
    toast(p==="top"?"Abas em cima":p==="left"?"Abas na lateral esquerda":p==="right"?"Abas na lateral direita":"Abas embaixo"); };
  t.addEventListener("pointerup",end); t.addEventListener("pointercancel",end);
  t.addEventListener("click",e=>{ const x=e.target.closest(".abx"); if(x){ e.stopPropagation(); e.preventDefault(); const b=x.closest("[data-tab]"); if(b) abHide(b.dataset.tab); return; }
    if(AB_EDIT||(t.__noclk&&Date.now()-t.__noclk<700)){ e.stopPropagation(); e.preventDefault(); if(AB_EDIT&&!(t.__noclk&&Date.now()-t.__noclk<700)) abEdit(false); } },true);
  document.addEventListener("click",e=>{ if(!AB_EDIT) return; if(e.target.closest&&(e.target.closest(".tabs")||e.target.closest("#abhid"))) return; e.stopPropagation(); e.preventDefault(); abEdit(false); },true); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-abset]"); if(!b) return; const v=b.dataset.abset;
  abSave(v); try{ renderAll(); }catch(_){ rpAbLay(); } setTimeout(()=>{ try{ rpAbLay(); }catch(_){} },80);
  toast(v==="top"?"Abas em cima":v==="left"?"Abas na lateral esquerda":v==="right"?"Abas na lateral direita":"Abas embaixo"); });
function abasHTML(){ const b=S.brand||{}, on=abasOn(), first=!b.abasOk;
  return `<details class="card abasbox" ${first||ABAS_OPEN?"open":""}><summary><span class="abv" aria-hidden="true">${["👤","👥","🏋️","✅","📅","💰"].map((x,i)=>`<i class="${i===4?"go":i===5?"go go2":""}">${x}</i>`).join("")}</span><b>🧩 Abas que aparecem</b> <span class="muted">· ${on.filter(k=>ABAS.some(x=>x[0]===k)).length+2} de ${ABAS.length+2}</span></summary>
    <p style="margin:6px 0 2px;font-size:15px">${first?"<b>O que você mais quer usar no sistema?</b> ":""}Marque as abas que quer ver na barra. As outras ficam escondidas, sem perder nada. Dá para mudar quando quiser.</p>
    <div class="abasg"><span class="abch on fix">👤 Meu perfil · 📝 Cadastro<small>sempre aparecem</small></span>${ABAS.map(([k,i,n,d])=>`<button class="abch ${on.includes(k)?"on":""}" data-aba="${k}" aria-pressed="${on.includes(k)}">${i} ${n}<small>${d}</small></button>`).join("")}</div>
    <div class="abposbox"><b>📐 Posição das abas</b> <small class="muted">(teste · vale só neste aparelho). Ou segure a barra de abas por 1 segundo: ela fica tracejada, dá para arrastar até qualquer borda e o ✕ esconde a aba.</small><div class="abasg">${[["bottom","⬇️ Embaixo"],["top","⬆️ Em cima"],["left","⬅️ Lateral esquerda"],["right","➡️ Lateral direita"]].map(([v,l])=>`<button class="abch ${abPos()===v?"on":""}" data-abset="${v}" aria-pressed="${abPos()===v}">${l}</button>`).join("")}</div></div>
    <div class="row" style="gap:8px"><button class="btn primary small" data-abaok>Pronto</button><button class="btn small ghost" data-abaall>Mostrar todas</button></div></details>`; }
let ABAS_OPEN=false;
const TAB_N={relmes:"o Relatório e planejamento",perfil:"o Meu perfil",perso:"o Personalizar",agenda:"a Agenda",cadastro:"os Alunos",semana:"a Programação",treino:"o Treino",sessao:"a Sessão",corpo:"a Avaliação física",presenca:"o Controle de presença",financeiro:"o Financeiro"};
const helpBtn=k=> `<button class="helpbtn" data-help="${k}">ⓘ Entenda ${TAB_N[k]}</button>`;
const cadTopHTML=(semAjuda)=> `<div class="phtop cadtop">${semAjuda?"":helpBtn("cadastro")}<div class="fzb fzbig" role="group" aria-label="Tamanho da letra"><button class="fzMinus" aria-label="Diminuir letra">A−</button><button class="fzPlus" aria-label="Aumentar letra">A+</button></div></div>`;
function tioHelpHTML(){ return `<p class="tio-dir">É a programação usada pelo <b>Professor Maílson</b>. Ajuda quem precisa de uma direção para programar os treinos: as séries e as repetições já vêm definidas, com sugestões de métodos avançados (ou sem elas). Depois de concluir as fases, ou mesmo no meio delas, <b>crie a sua linha</b> e siga conforme a sua vivência e o seu conhecimento prático e científico.</p><p class="tio-dir">Uma direção, não uma regra. <b>Você não precisa seguir.</b> Ela está aqui para quem ainda não tem a própria linha ou quer um ponto de partida. Mude qualquer número no cartão do aluno.</p>
  <div class="tio-ph" style="--pc:var(--p0)"><b>Semana 0 · Teste</b><p>Testar os exercícios com menos séries: execução, mobilidade, consciência corporal e a carga para 15 repetições sobrando 3 a 4.</p></div>
  <div class="tio-ph" style="--pc:var(--p1)"><b>Fase 1 · Adaptação · qualidade de movimento</b><p>Serve para o aluno criar consciência corporal e, em alguns casos, reaprender a treinar, ativando bem a musculatura que o exercício exige.</p><ol><li>Semana 1: 3×12</li><li>Semana 2: 3×12, mais pesado</li><li>Semana 3: 3×15, com o mesmo peso</li><li>Semana 4: 3×15, mais pesado</li><li>Semana 5 a 6 (se quiser): mais peso, sem passar de 15 repetições</li></ol><p>A lógica: ou repete as repetições com mais peso, ou sobe as repetições com o mesmo peso. Evite os dois na mesma semana.</p></div>
  <div class="tio-ph" style="--pc:var(--p2)"><b>Fase 2 · Construção · se aventurar nas cargas</b><p>Começa nas repetições da fase (8) e sobe até 12 com a mesma lógica. Método avançado a partir da 2ª semana, <b>de preferência no último exercício</b>. Dependendo do nível do aluno, use na <b>última série</b> desse exercício e veja o padrão que ele apresenta. Aluno mais avançado pode usar em mais exercícios, mas observe a prontidão dele, o tempo de execução e o controle. Se ele perder muito, volte para o último exercício.</p></div>
  <div class="tio-ph" style="--pc:var(--p3)"><b>Fase 3 · Intensificação</b><p>De 8 a 10 repetições com mais peso, mesma lógica: <b>excelente momento para 4 séries</b>. Aqui cabem mais métodos avançados, inclusive bi-set do mesmo músculo. Recomendamos de 1 a 2 por treino, e você decide quantas. Dependendo do nível do aluno, 4 semanas já são ótimas.</p></div>
  <div class="tio-ph" style="--pc:var(--p4)"><b>Fase 4 · Recuperação</b><p><b>Observação:</b> inclua quando o aluno apresentar muito cansaço. Também vale em queda de desempenho em 2 treinos seguidos, dor articular, doença ou viagem. Menos peso e menos séries, com descanso de 90" a 2'.</p></div>
  ${AFTER_HTML}
  <div class="tio-viv"><b>Da vivência do Professor Maílson</b><p>Método avançado também serve para o aluno que não tem intimidade com carga alta e se sente inseguro. Com dropset ou rest-pause ele chega perto da falha com uma carga em que confia, e o estímulo acontece. Em alguns alunos, isso também contorna a dor que aparece com peso elevado.</p>
    <p class="muted" style="font-size:12.5px">O que a ciência diz: carga leve levada perto da falha gera hipertrofia parecida com a de carga alta; a força máxima, porém, cresce mais com carga alta (meta-análise de Lopez et al., 2021).</p>
    <p class="muted" style="font-size:12.5px">Observação da prática, sem estudo direto: com carga menor, a articulação parece receber menos sobrecarga enquanto o músculo ainda chega perto da falha, e em alguns alunos a dor que aparecia com peso elevado some.</p>
    <p style="font-size:13px"><b>Atenção à diferença:</b> queimação e cansaço no músculo são esperados. <b>Dor articular</b> (pontada, dor na articulação, dor que continua depois do treino) é sinal para investigar: revise técnica, amplitude e carga e encaminhe para um fisioterapeuta e, dependendo do caso, para um ortopedista.</p></div>`; }
function tecHelpHTML(ln){ const F=ln==="tio"; return `<p class="tio-dir">${TEC_INFO}</p>${TECS.map(x=>`<div class="tec"><b>${x.t}</b><p><span>Como:</span> ${F?x.how:(x.howG||x.how)}</p><p><span>Exemplo:</span> ${x.ex}</p><p><span>Quando:</span> ${F?x.when:(x.whenG||x.when)}</p><p><span>Ciência:</span> ${x.sci}</p></div>`).join("")}`; }
const HELP={
 cadastro:()=>`<p>Cadastre o aluno uma vez: nome, WhatsApp, dias e horários, valor da aula e forma de pagamento.</p>
  <ul class="oblist"><li>Tudo vai sozinho para a <b>Presença</b>, o <b>Financeiro</b> e a <b>Sessão</b>.</li>
  <li>Mudou o aluno na Presença (aba Alunos)? Muda aqui também, e o contrário.</li>
  <li>O total mostra o valor da aula vezes quantas vezes o aluno treina, na semana e no mês.</li>
  <li><b>Forma de pagamento</b>: mensal, 2 parcelas, semanal, trimestral, semestral, anual ou <b>Outra</b>, em que você escreve como aquele aluno paga.</li>
  <li><b>Dupla ou trio</b>: alunos no mesmo dia e horário aparecem juntos na Sessão.</li>
  <li><b>Inativar aluno</b>: o aluno sai da Chamada e dos Pagamentos, e o histórico fica guardado. Dá para reativar depois.</li>
  <li>Fase, peso e altura ficam na Programação, no Corpo e no botão Alunos, no topo.</li>
  <li>Embaixo ficam a sua marca nos relatórios e o backup dos seus dados.</li></ul>`,
 semana:()=>`<details class="hsec" open><summary>Passo a passo</summary><ol class="oblist"><li>Escolha a letra de cada dia (Seg A, Ter B…) e por quantas semanas o treino se repete (você escolhe o número), a partir de qual semana.</li><li>Escolha a programação das semanas: <b>Programação por fases</b>, <b>Minha programação</b>, <b>Medo de peso</b> ou <b>Nenhuma programação</b>.</li><li>Monte a <b>Divisão muscular</b>: quantas vezes o aluno treina e quantos exercícios de cada músculo em cada treino.</li><li>Na Sessão, a letra, as séries e as repetições da semana já vêm prontas.</li><li>Quando as semanas terminarem, monte o treino novo e escolha em "a partir de" a semana em que ele começa.</li></ol></details>
  ${sugNote("tio")}<details class="hsec"><summary>Programação por fases</summary>${tioHelpHTML()}</details>
  <details class="hsec"><summary>Medo de peso</summary><p>Para o aluno que trava quando o assunto é aumentar a carga. Primeiro sobem as repetições com o mesmo peso; só depois a carga sobe.</p><ul class="oblist"><li><b>Semana 0</b> quando entrarem exercícios novos: descobrir a carga e ver se o exercício faz sentido para o aluno.</li><li><b>Ciclos de 3 semanas</b>: 3×8, 3×10 e 3×12 com a mesma carga. No ciclo seguinte a carga sobe um pouco e volta para 8.</li><li><b>Pirâmide crescente</b> na semana das 12, em 2 exercícios: o aluno experimenta o peso maior antes de ele subir.</li><li><b>Pirâmide decrescente</b>, mais tensional, interessante no último exercício, a partir do 2º ciclo e se o aluno estiver confiante.</li></ul><p class="muted">Nenhum método é superior às séries tradicionais. As pirâmides aqui servem para dar dinamismo e para o aluno se desafiar.</p></details>
  <details class="hsec"><summary>Métodos avançados</summary>${tecHelpHTML("tio")}</details>
  <details class="hsec"><summary>Quantas vezes treinar cada músculo</summary><p>Com o mesmo número de séries na semana, treinar o músculo 2 vezes costuma ser o ponto prático: divide as séries, cada série sai com mais qualidade e a recuperação fica melhor. Uma vez por semana funciona se o número de séries for suficiente. Mais de 3 vezes traz pouco ganho extra para hipertrofia. Iniciante: corpo todo de 2 a 3 vezes por semana.</p><p>Séries por semana: a partir de cerca de 10 para músculo grande costuma ser a faixa para hipertrofiar. Músculo pequeno já recebe trabalho indireto (tríceps no supino, bíceps na remada).</p></details>
  <details class="hsec"><summary>Relatório semanal: confira toda semana</summary><p>Abra o <b>Rel. semanal</b> de cada aluno na Sessão. Acima do relatório aparece, só para você, quantas séries cada músculo recebeu. Músculo abaixo do estímulo para hipertrofiar também atrapalha o emagrecimento, porque é o músculo que protege a massa magra. E confira o aeróbio: ele sempre entra.</p></details>
  <details class="hsec"><summary>Controle por membro e descanso</summary><p>Por sessão, de 2 a 4 exercícios para músculo grande e de 1 a 3 para músculo pequeno. A região que trabalhou precisa de descanso antes de levar carga de novo.</p><dl class="rule"><dt>2–3'</dt><dd>Multiarticular pesado</dd><dt>60–90"</dt><dd>Demais exercícios</dd><dt>30–60"</dt><dd>Só alternando músculos diferentes (bi-set, circuito)</dd></dl></details>
  <details class="hsec"><summary>Linha para obesos</summary><ul class="oblist">${OB_ADJ.map(x=>`<li>${x}</li>`).join("")}</ul><p class="muted" style="font-size:13px">Marque o aluno no botão Alunos (topo) → Linha obesos. Quem entra: IMC a partir de 30, confirmado pela cintura (mulheres a partir de 88 cm, homens a partir de 102 cm).</p></details>`,
 treino:()=>`<p>Montagem do treino planejado, com biblioteca de exercícios. É opcional: o dia a dia acontece na Sessão.</p><ul class="oblist"><li>Em dupla ou trio, escolha se a mudança vale só para um aluno ou para o grupo.</li><li>Se passar das séries ou repetições da fase, o sistema pede o motivo e guarda no histórico do aluno.</li><li>A ordem sugerida é multiarticular antes de monoarticular, e core no fim.</li></ul>`,
 sessao:()=>`<ul class="oblist">
  <li><b>Dia e horário</b>: escolha o dia e toque no horário. A dupla ou trio abre junta. Os horários vêm do Cadastro.</li>
  <li><b>Lançar</b>: exercício, séries, reps e carga, como na planilha. O sistema reconhece 🦵 inferiores e 💪 superiores pelo nome. Se errar, toque no emoji.</li>
  <li><b>💡 sugerir</b> (no topo da planilha, ao lado de "Exercícios"): abre a lista da biblioteca separada em membros superiores (músculos grandes e pequenos), membros inferiores (grandes e pequenos) e core. Toque no exercício para incluir na próxima linha vazia. Escrever à mão continua valendo.</li>
  <li><b>+ Linha</b>: fica logo abaixo do último exercício, antes dos totais.</li>
  <li><b>Treino A–E</b>: a letra do dia vem da Programação. O controle e o relatório comparam com o último treino da mesma letra. Para trocar só naquele dia, toque em outra letra.</li>
  <li><b>Método avançado</b>: a partir da Fase 2 aparece uma sugestão com o botão ☁ Ver técnicas.</li>
  <li><b>Sugestão (roxa, em cima das células)</b>: mostra séries, repetições e carga da semana, pela programação do aluno e pelo que ele fez no último treino da mesma letra. Toque para usar. Se o aluno não completou as repetições da última vez, a sugestão é repetir. Na Semana 0 não há sugestão: é a semana de descobrir a carga. A sugestão é só um ponto de partida: quem decide é você.</li>
  <li><b>Alertas</b>: aviso quando as séries ou repetições passam da fase, quando a carga de um exercício sobe mais de 10% e mais de 2 kg (assim halter leve, como 2 → 3 kg, não dispara), ou quando a tonelagem de uma região (MMSS, MMII ou Core) sobe mais de 20% em relação ao último treino igual. Esses números não são limite de lesão: são um sinal de "deu um salto grande, confira".</li>
  <li><b>Uma linha por exercício.</b> Em cima de cada linha, pequeno, aparece o que foi feito no último treino igual (<b>Sem. Pass.</b>): exercício, séries, repetições, carga e tonelagem. É só para consultar e não entra no controle.</li>
  <li><b>Isometria.</b> Toque em <b>Iso</b> na linha do exercício. Abre uma caixa embaixo do nome para escolher onde ela entra (<b>Início</b>, <b>Meio</b>, <b>Final</b>, <b>Toda rep</b> ou <b>Só isometria</b>) e, ao lado, quantas séries têm isometria e os segundos (de 5 em 5"). Ex.: Goblet Squat 3×12 com isometria Final, 1 série, 10". Dá para conjugar com outra linha (ex.: Hollow Hold em Só isometria + Sit Up 3×10). Os segundos não entram em nenhuma soma.</li>
  <li><b>Conj</b>: liga a linha com a de baixo (bi-set, tri-set). Toque de novo para soltar.</li>
  <li><b>Uni</b>: exercício unilateral. Lance séries e repetições de um lado só (3×8 = 8 em cada lado). As séries contam uma vez nas séries da semana; repetições e tonelagem somam os dois lados. Nomes com "unilateral" ou "alternado" já vêm marcados.</li>
  <li><b>🦵 💪 core</b>: o sistema reconhece pelo nome. Se errar, toque no ícone para trocar.</li>
  <li><b>Qual treino é hoje?</b> Toque em A, B, C, D ou E, ou escreva outro nome (ex.: Superior). Funciona mesmo sem usar a Programação: na semana seguinte o treino se repete e você vê o que fez.</li>
  <li><b>Fases</b>: só aparecem se você escolher "Programação por fases" na Programação.</li>
  <li><b>Séries da semana</b>: de MMSS, MMII e Core, separando músculos grandes (MG) e pequenos (MP).</li>
  <li><b>Cardio</b>: tipo (esteira, bike, elíptico, escada, remo, natação…), método (contínuo, intervalado, Tabata, EMOM, AMRAP, volta à calma…), tempo, zona, velocidade e PSE. Use "+ outro cardio" quando forem dois no mesmo dia, como um AMRAP e depois a volta à calma em Z2.</li>
  <li><b>Controle da sessão</b>: exercícios, séries, reps e tonelagem de cada membro contra a faixa da fase. Em Metas dá para ajustar por aluno.</li>
  <li><b>📋 Copiar treino todo</b>: passa todos os exercícios e as cargas para a dupla ou o trio. <b>📋 Só um exercício</b>: aparece um botão "copiar" em cada exercício; toque só nos que quiser passar. Se o outro aluno já tem esse exercício, ele é atualizado; se não, entra na próxima linha vazia.</li>
  <li><b>Descanso</b>: barra embaixo, um cronômetro por aluno. Toque no tempo para mudar.</li>
  <li><b>Semanas</b>: abas no rodapé (S1, S2…). Semana nova copia a anterior com as cargas.</li>
  <li><b>Relatórios</b>: Rel. do dia e Rel. semanal, para mandar em texto e imagem pelo WhatsApp.</li></ul>`,
 corpo:()=>`<p>Peso e composição corporal por data. A última avaliação aparece nos relatórios do aluno.</p><ul class="oblist"><li>Use sempre a mesma balança.</li><li>Peso da gordura e massa magra em branco são calculados pela gordura (%).</li><li>Toque numa data do histórico para gerar o relatório de evolução até aquela avaliação.</li></ul>`,
 presenca:()=>`<ul class="oblist"><li><b>Chamada</b>: alunos do dia, presente ou falta, horário trocado só naquele dia, reposição ou aula extra, dia sem aula.</li><li><b>Mês</b>: aulas contratadas, dadas, faltas e reposições de cada aluno.</li><li><b>Alunos</b>: o mesmo cadastro da aba Cadastro. Mudou aqui, muda lá.</li><li>Ao lançar o treino na Sessão ou iniciar o descanso, a presença do aluno é marcada sozinha.</li></ul>`,
 financeiro:()=>`<p>Mensalidade de cada aluno no mês, parcelas pagas, valor avulso, pagamento adiantado e recibos em PDF (um aluno ou todos).</p><p class="muted" style="font-size:13px">O valor da aula e a forma de pagamento vêm do Cadastro.</p>`
};
function openHelp(k){ const f=HELP[k]; if(!f) return; document.getElementById("hTitle").textContent="Entenda "+TAB_N[k];
  document.getElementById("hBody").innerHTML=f()+`<div class="hsup"><b>Ainda com dúvida?</b><p>Mande para o Professor Maílson por texto ou áudio no WhatsApp.</p><button class="btn primary" data-sup="${k}">💬 Falar com o Professor Maílson</button></div>`;
  document.getElementById("help").hidden=false; }
function waSup(k){ const txt=`Olá, Professor Maílson! Tenho uma dúvida no Sistema de Treino (aba ${TAB_N[k].replace(/^(o|a) /,"")}): `;
  const url="https://wa.me/"+SUP_WA+"?text="+encodeURIComponent(txt); let w=null; try{ w=window.open(url,"_blank"); }catch(e){}
  if(!w){ const a=document.createElement("a"); a.href=url; a.target="_blank"; a.rel="noopener"; document.body.appendChild(a); a.click(); a.remove(); } }
document.addEventListener("click",e=>{ const b=e.target.closest("[data-help]"); if(b){ openHelp(b.dataset.help); return; }
  const s=e.target.closest("[data-sup]"); if(s){ waSup(s.dataset.sup); return; }
  if(e.target.id==="help"||e.target.id==="hClose") document.getElementById("help").hidden=true; });

/* ---------- Cadastro do aluno ---------- */
function pvqDate(ini,n){ const [y,mo,dd]=(ini||isoD(new Date())).split("-").map(Number); const x=new Date(y,mo-1+n,dd); x.setDate(x.getDate()-1); return isoD(x); }
function pacTagHTML(u){ if(!u) return "";
  if(u.rest>0&&u.vencido) return `<span class="pk bad">Pacote vencido em ${ddmm(u.validade)} · sobraram ${u.rest}</span>`;
  const c=u.rest<=0?"bad":(u.rest<=3||(u.dias!=null&&u.dias<=14))?"warn":"ok";
  return `<span class="pk ${c}">${u.rest<=0?`Pacote encerrado${u.perdidas?` · ${u.perdidas} perdida${u.perdidas>1?"s":""}`:""}${u.rest<0?` · ${-u.rest} a mais`:""}`:`Pacote · faltam ${u.rest} de ${u.total}${u.validade?` · até ${ddmm(u.validade)}`:""}`}</span>`; }
function stTipo(m){ const a=presOn()&&m.pid&&PRES.aluno(m.pid); return a? (a.tipo||"aula") : (m.avulsa?"avulsa":"aula"); }
function stPend(m){ return stTipo(m)==="aula" && !getSlots(m).length; }
function setAvulsa(m){ m.avulsa=true; m.slotsL=[]; m.days=[];
  if(presOn()){ let a=m.pid&&PRES.aluno(m.pid); const n= a? Object.assign({},a,{tipo:"avulsa",slots:[]}) : {id:null,nome:m.name,tipo:"avulsa",forma:"mensal",ativo:true,valorAula:0,contratadas:0,slots:[]}; m.pid=PRES.upsert(n); delete m.noLink; }
  save(); renderAll(); if(!document.getElementById("people").hidden) renderPeople(); }
function delStudentFull(st){ if(!st) return; const pl=planOf(st); if(pl) pl.sessions.forEach(se=>se.items=se.items.filter(it=>it.only!==st.id));
  S.students=S.students.filter(s=>s!==st); dropEmptyPlans();
  if(!S.students.length){ const p2={id:nid(),sessions:[]}; S.plans.push(p2); S.students.push({id:nid(),name:"Primeiro aluno",phase:1,novo:true,coreExtra:false,planId:p2.id,ov:{},log:[]}); }
  if(!S.students.some(s=>s.id===S.active)) S.active=S.students[0].id; }
let cadDraft=null;
function rpEditAluno(id){ try{ const a=PRES.aluno(id); if(!a){ toast("Aluno não encontrado."); return; } show("cadastro"); cadOpen(a,byPid(id)); }catch(e){ toast("Não consegui abrir o cadastro. Tente pela aba Alunos."); } }
const CAD_DN={0:"Dom",1:"Seg",2:"Ter",3:"Qua",4:"Qui",5:"Sex",6:"Sáb"};
function parcDefDias(n){ return ({2:[10,25],3:[5,15,25],4:[5,12,19,26],5:[5,10,15,20,25],6:[5,9,13,17,21,25]})[n]||[10,25]; }
function parcList(a){ const n=Math.min(6,Math.max(2,parseInt(a.nParc,10)||2)), P=Array.isArray(a.parc)?a.parc:[], D=parcDefDias(n);
  return Array.from({length:n},(_,i)=>{ const x=P[i]||{}; return {dia:Math.min(31,Math.max(1,parseInt(x.dia,10)||(i===0&&+a.diaVenc?+a.diaVenc:D[i]))), v:+x.v>0? +x.v : 0}; }); }
function parcSplit(L,valor){ const fix=L.reduce((t,p)=>t+(p.v||0),0), nA=L.filter(p=>!p.v).length;
  if(fix>valor+0.005||(!nA&&Math.abs(fix-valor)>0.005&&fix<=0)){ L=L.map(p=>({...p,v:0})); return parcSplit(L,valor); }
  const autos=L.map((p,i)=>p.v?-1:i).filter(i=>i>=0); const resto=Math.max(0,valor-fix), base=nA? Math.floor(resto/nA*100)/100 : 0;
  const out=L.map(p=>({...p,v:p.v||base}));
  if(nA){ const li=autos[autos.length-1]; out[li].v=Math.round((resto-base*(nA-1))*100)/100; }
  else { const s=out.reduce((t,p)=>t+p.v,0); out[out.length-1].v=Math.round((out[out.length-1].v+valor-s)*100)/100; }
  return out; }
const CAD_FORMAS={mensal:"Mensal",poraula:"Por aula feita (cobra só o que fez)",parcelas:"Parcelado",semanal:"Semanal",trimestral:"Trimestral",semestral:"Semestral",anual:"Anual",outra:"Outra"};
function cadList(){ const out=[]; const seen=new Set();
  if(presOn()) PRES.alunos().forEach(a=>{ const st=byPid(a.id); if(st) seen.add(st.id); out.push({a,st}); });
  S.students.filter(s=>!seen.has(s.id)&&!s.own).forEach(st=>out.push({a:null,st}));
  const nm=x=>(x.a&&x.a.nome)||(x.st&&x.st.name)||"";
  return out.sort((x,y)=>((x.a&&x.a.ativo===false?1:0)-(y.a&&y.a.ativo===false?1:0))||nm(x).localeCompare(nm(y),"pt-BR")); }
function cadOpen(a,st){ const ph=st?st.phase:1;
  cadDraft={pid:a?a.id:(st&&st.pid)||null, sid:st?st.id:null, nome:(a&&a.nome)||(st&&st.name)||"", tel:(a&&a.tel)||"", tipo:(a&&a.tipo)||"aula",
    valorAula:a? (a.valorAula||((a.mensalidade&&a.contratadas)? a.mensalidade/a.contratadas : "")||"") : "", valorFicha:(a&&a.valorFicha)||"", contratadas:(a&&a.contratadas)||"", forma:(a&&a.forma)||"mensal",
    ativo:a? a.ativo!==false : true, permuta:!!(a&&a.permuta), formaObs:(a&&a.formaObs)||"", slots:a? clean(a.slots||[]) : st? getSlots(st) : [{d:1,h:"07:00"}],
    phase:ph, peso:(st&&st.peso)||"", alt:(st&&st.alt)||"", ob:!!(st&&st.ob), novo: st? !!st.novo : true, junto:"",
    pacTotal:(a&&a.pacote&&a.pacote.total)||"", pacValor:(a&&a.pacote&&a.pacote.valor)||"", pacIni:(a&&a.pacote&&a.pacote.inicio)||isoD(new Date()), pacVal:(a&&a.pacote&&a.pacote.validade)||"", pacParc:String((a&&a.pacote&&a.pacote.parc)||2), pacForma:(a&&a.pacote&&(a.pacote.forma||((+a.pacote.parc||1)>1?"parcelas":"")))||"avista", renArm:false, delArm:false,
    ciclo:(a&&a.ciclo)||"quinzenal", cdia0:String((a&&a.cicloDias&&a.cicloDias[0])||""), cdia1:String((a&&a.cicloDias&&a.cicloDias[1])||""), cdia2:String((a&&a.cicloDias&&a.cicloDias[2])||""), cdia3:String((a&&a.cicloDias&&a.cicloDias[3])||""),
    nasc:(a&&a.nasc)||(st&&st.nasc)||"", inicio:(a&&a.inicio)||"", cobraMes:(a&&a.cobraMes)||"", valorMes:"", diaVenc:String((a&&+a.diaVenc)||10), nParc:String(a&&a.forma==="parcelas"? (parseInt(a.nParc,10)||2) : 1) };
  { const P=(a&&a.forma==="parcelas"&&Array.isArray(a.parc))? a.parc : []; for(let i=0;i<6;i++){ const x=P[i]; cadDraft["pd"+i]=x&&+x.dia? String(x.dia) : ""; cadDraft["pv"+i]=x&&+x.v>0? String(x.v) : ""; } }
  renderCadastro(); window.scrollTo(0,0); }
function cadTotal(){ const v=document.getElementById("view-cadastro"); const d=cadDraft||{};
  const va=+String((v&&v.querySelector("#cd-va")||{}).value??d.valorAula??"").replace(",",".")||0;
  const nS=(v&&v.querySelector("[data-cslot]"))? v.querySelectorAll("[data-cslot]").length : (d.slots||[]).length;
  const ctv=(v&&v.querySelector("#cd-ct"))? +v.querySelector("#cd-ct").value||0 : +d.contratadas||0; const nM=ctv||nS*4;
  const R=x=>x.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  const fpE=v&&v.querySelector("#cd-fp"); if((fpE?fpE.value:d.forma)==="poraula") return va? `Cobra <b>${R(va)} por aula feita</b>. Ex.: 8 aulas no mês = ${R(va*8)}, mas só entra o que ela fizer e pagar.` : `Coloque o valor da aula.`;
  if(!va||!nS) return `Coloque o valor da aula e os dias para ver o total.`;
  return `${R(va)} × ${nS}x por semana = <b>${R(va*nS)} por semana</b><br>${R(va)} × ${nM} aulas no mês = <b>${R(va*nM)} por mês</b>${ctv?"":` <span class="muted">(${nS}x por semana × 4 semanas)</span>`}`; }
function cadPull(){ const v=document.getElementById("view-cadastro"); if(!cadDraft||!v) return;
  v.querySelectorAll("[data-cd]").forEach(i=>{ const k=i.dataset.cd; cadDraft[k]= i.type==="checkbox"? i.checked : i.value; });
  cadDraft.slots=[...v.querySelectorAll("[data-cslot]")].map(r=>({d:+r.querySelector("[data-csd]").value,h:r.querySelector("[data-csh]").value||"07:00"})); }
function cadFormHTML(){ const d=cadDraft; const isNew=!d.pid&&!d.sid; const ficha=d.tipo==="ficha"||d.tipo==="consultoria";
  const others=S.students.filter(o=>o.id!==d.sid&&membersOf(o).length<3);
  const auto=(d.slots.length||0)*4;
  return `<div class="card cadf">
    <div class="phase-head"><h3>${isNew?"Novo aluno":"Editar aluno"}</h3><button class="btn small ghost" data-cadx>Cancelar</button></div>
    <div class="avform"><label>Nome<input class="inp" data-cd="nome" id="cd-nome" value="${esc(d.nome)}" autocomplete="off"></label>
      <label>WhatsApp<input class="inp" type="tel" inputmode="tel" data-cd="tel" id="cd-tel" value="${esc(d.tel)}" placeholder="(DDD) 9 9999-9999"></label>
      <label>🎂 Aniversário<input class="inp" type="date" data-cd="nasc" id="cd-nasc" value="${esc(d.nasc||"")}"><small class="muted">O sistema avisa no dia e na semana do aniversário.</small></label></div>
    <label class="label" style="display:grid;gap:4px">Tipo<select class="inp" data-cd="tipo" id="cd-tipo" data-cre><option value="aula" ${d.tipo==="aula"?"selected":""}>Aulas (personal) · mensal</option><option value="pacote" ${d.tipo==="pacote"?"selected":""}>Pacote de aulas</option><option value="avulsa" ${d.tipo==="avulsa"?"selected":""}>Aula avulsa</option><option value="ficha" ${d.tipo==="ficha"?"selected":""}>Ficha de treino (valor mensal)</option><option value="consultoria" ${d.tipo==="consultoria"?"selected":""}>Consultoria online (valor mensal)</option></select></label>
    <p class="muted" style="font-size:12px;margin:-4px 0 0">${{aula:"Paga por mês, com dias e horários fixos.",pacote:"Compra uma quantidade de aulas (ex.: 40) e treina até acabar. O app conta as aulas dadas e avisa quando estiver acabando.",avulsa:"Sem dias fixos: paga por aula dada. Lance cada aula na Presença em “+ Reposição ou aula extra”.",ficha:"Só a ficha de treino, com valor mensal.",consultoria:"Aluno online: treino a distância, com valor mensal. Não entra na chamada nem na agenda."}[d.tipo]||""}</p>
    ${d.tipo==="pacote"?(()=>{ const u=d.pid&&presOn()&&PRES.pacUso(d.pid); return `<span class="label">Pacote</span>
    <div class="avform"><label>Aulas no pacote<input class="inp" type="number" inputmode="numeric" data-cd="pacTotal" id="cd-pt" value="${esc(d.pacTotal)}" placeholder="ex.: 40"></label>
      <label>Valor do pacote (R$)<input class="inp" type="number" inputmode="decimal" data-cd="pacValor" id="cd-pv" value="${esc(d.pacValor)}"></label>
      <label>Início do pacote<input class="inp" type="date" data-cd="pacIni" id="cd-pi" value="${esc(d.pacIni)}"></label>
      <label>Usar até (opcional)<input class="inp" type="date" data-cd="pacVal" id="cd-pval" value="${esc(d.pacVal)}"></label>
      <label>Forma de pagamento<select class="inp" data-cd="pacForma" id="cd-pforma" data-cre>${[["avista","À vista / adiantado"],["mensal","Mensal"],["bimestral","Bimestral"],["trimestral","Trimestral"],["semestral","Semestral"],["parcelas","Parcelado"]].map(([v,l])=>`<option value="${v}" ${d.pacForma===v?"selected":""}>${l}</option>`).join("")}</select></label>
      ${d.pacForma==="parcelas"?`<label>Parcelas<select class="inp" data-cd="pacParc" id="cd-pparc" data-cre>${[2,3,4,5,6,8,10,12].map(n=>`<option value="${n}" ${String(d.pacParc)===String(n)?"selected":""}>${n}x</option>`).join("")}</select></label>`:""}</div>
    ${(()=>{ const n=PRES.pacSched({forma:d.pacForma,parc:d.pacParc,inicio:d.pacIni,validade:d.pacVal}).length, v=+String(d.pacValor).replace(",",".")||0; return ["mensal","bimestral","trimestral","semestral"].includes(d.pacForma)&&!d.pacVal? `<p class="pend" style="margin:0">Para ${d.pacForma}, coloque o "Usar até": é ele que define quantas parcelas.</p>` : v&&n>1? `<p class="muted" style="font-size:12.5px;margin:0">${n} parcelas de <b>${(Math.floor(v/n*100)/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</b> no Financeiro.</p>` : ""; })()}
    <div class="pvq"><span>Prazo rápido:</span>${[2,3,4,6].map(n=>{ const on=d.pacVal&&d.pacVal===pvqDate(d.pacIni,n); return `<button class="btn small ${on?"primary":""}" data-pvq="${n}" aria-pressed="${!!on}">${on?"✓ ":""}${n} meses</button>`; }).join("")}${d.pacVal?`<button class="btn small ghost" data-pvq="0">Sem prazo</button>`:""}</div>
    <p class="muted" style="font-size:12px;margin:0">Com prazo, o app avisa 2 semanas antes de vencer e mostra quantas aulas sobraram se o prazo passar. Combine com o aluno o que acontece com as aulas que sobrarem.</p>
    ${u?`<div class="pacbox">${pacTagHTML(u)}<span><b>${u.used}</b> aula${u.used===1?"":"s"} dada${u.used===1?"":"s"} desde ${ddmm(u.inicio)}${u.validade?` · ${u.vencido?`venceu em ${ddmm(u.validade)}`:`vence em ${u.dias} dia${u.dias===1?"":"s"}`}`:""}${u.pend?` · ${u.pend} sem marcar na Chamada (não contam até marcar)`:""}</span>
      ${u.vencido&&u.rest>0?`<div class="pkdec"><b>O prazo venceu com ${u.rest} aula${u.rest>1?"s":""} sobrando. O que fazer?</b>
        <div class="row"><button class="btn small primary" data-pkext="15">Reagendar: +15 dias</button><button class="btn small primary" data-pkext="30">Reagendar: +1 mês</button></div>
        <button class="btn small danger" data-pklost>Considerar as ${u.rest} perdidas e encerrar</button>
        <small class="muted">Ou escolha outra data em "Usar até" e salve.</small></div>`:""}
      ${u.perdidas?`<div class="row" style="align-items:center"><small class="muted">${u.perdidas} aula${u.perdidas>1?"s":""} considerada${u.perdidas>1?"s":""} perdida${u.perdidas>1?"s":""}.</small><button class="btn small ghost" data-pklostundo>Desfazer</button></div>`:""}
      ${d.renArm?`<div class="pkdec"><b>Renovar começa um pacote NOVO hoje:</b> a contagem volta a zero e o Financeiro cobra de novo. Use só quando o aluno comprou outro pacote. Para mudar só o prazo, altere "Usar até" e toque em Salvar.<div class="row"><button class="btn small primary" data-cadrenewok>Sim, comprou outro pacote</button><button class="btn small ghost" data-cadrenewno>Não</button></div></div>`:`<button class="btn small" data-cadrenew>Renovar pacote (comprou outro)</button>`}</div>`:""}
    <p class="muted" style="font-size:12px;margin:0">Na Chamada, falta de aluno de pacote tem duas opções, decididas na hora: <b>Reagendar</b> (avisou a tempo, não gasta aula) ou <b>Perdeu</b> (não avisou, conta como aula dada). Contam como aula do pacote: presença, falta perdida, reposição e aula extra dada. Os dias fixos abaixo são opcionais: aulas a mais você lança na Chamada como aula extra.</p>`; })():""}
    ${ficha||d.tipo==="avulsa"?"":`<span class="label">Dias e horários fixos${d.tipo==="pacote"?" (opcional)":""}</span>
    <div class="cslots">${d.slots.map((s,i)=>`<div class="cslot" data-cslot="${i}"><select class="inp" data-csd id="cs-d${i}" aria-label="Dia">${[1,2,3,4,5,6,0].map(n=>[String(n),CAD_DN[n]]).map(([n,l])=>`<option value="${n}" ${s.d===+n?"selected":""}>${DAY_N[l]}</option>`).join("")}</select><input class="inp" type="time" step="300" data-csh id="cs-h${i}" value="${esc(s.h)}" aria-label="Horário"><button class="icon-btn" data-csrm="${i}" aria-label="Remover horário">×</button></div>`).join("")}</div>
    <button class="btn small" data-csadd style="justify-self:start">+ Horário</button>`}
    ${d.tipo==="pacote"?"":`<span class="label">Valores</span>`}
    <div class="avform ${ficha||d.tipo==="pacote"||d.tipo==="avulsa"?"":"av3"}">${ficha?`<label>Valor mensal ${d.tipo==="consultoria"?"da consultoria":"da ficha"} (R$)<input class="inp" type="number" inputmode="decimal" data-cd="valorFicha" id="cd-vf" value="${esc(d.valorFicha)}"></label>`
      :d.tipo==="pacote"?"":d.tipo==="avulsa"?`<label>Valor por aula (R$)<input class="inp" type="number" inputmode="decimal" data-cd="valorAula" id="cd-va" value="${esc(d.valorAula)}"></label>`
      :`<label>Valor do mês (R$)<input class="inp" type="number" inputmode="decimal" data-cd="valorMes" id="cd-vm" value="${esc(d.valorMes||"")}" placeholder="calcula a aula"></label>
      <label>Valor/aula (R$)<input class="inp" type="number" inputmode="decimal" data-cd="valorAula" id="cd-va" value="${esc(d.valorAula)}"></label>
      <label>Aulas/mês<input class="inp" type="number" data-cd="contratadas" id="cd-ct" value="${esc(d.contratadas)}" placeholder="${auto} auto"></label>`}
      ${d.tipo==="pacote"||d.tipo==="avulsa"?"":`<label>${ficha?"Forma de pagamento":"Pagamento"}<select class="inp" data-cd="forma" id="cd-fp" data-cre>${Object.entries(CAD_FORMAS).map(([k,l])=>`<option value="${k}" ${d.forma===k?"selected":""}>${l}</option>`).join("")}</select></label>`}</div>
    ${d.forma==="outra"&&d.tipo!=="pacote"&&d.tipo!=="avulsa"?`<label class="label" style="display:grid;gap:4px">Como ${esc(first(d.nome)||"o aluno")} paga<input class="inp" data-cd="formaObs" id="cd-fo" value="${esc(d.formaObs)}" placeholder="ex.: paga dia 10, metade no PIX e metade no cartão"></label>`:""}
    ${cadVencHTML()}
    ${ficha?"":`<div class="avform"><label>📅 Começa a treinar em<input class="inp" type="date" data-cd="inicio" id="cd-ini" value="${esc(d.inicio||"")}"><small class="muted">Antes dessa data não aparece na chamada.</small></label>
      <label>💰 Começa a pagar em<input class="inp" type="month" data-cd="cobraMes" id="cd-cm" value="${esc(d.cobraMes||"")}"><small class="muted">Meses antes não entram no Financeiro (ex.: fechou hoje, paga a partir do mês que vem).</small></label></div>`}
    ${ficha||d.tipo==="pacote"||d.tipo==="avulsa"?(d.tipo==="pacote"&&+d.pacTotal&&+d.pacValor?`<div class="note" style="margin:0">${(+d.pacValor).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})} ÷ ${d.pacTotal} aulas = <b>${(d.pacValor/d.pacTotal).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})} por aula</b></div>`:""):`<div class="note" id="cd-mens" style="margin:0">${cadTotal()}</div>`}
<div class="cchk"><label><input type="checkbox" data-cd="ativo" id="cd-at" ${d.ativo?"checked":""}> Aluno ativo</label><label><input type="checkbox" data-cd="permuta" id="cd-pm" ${d.permuta?"checked":""}> Permuta</label></div>
    <div class="row"><button class="btn primary" data-cadsave>Salvar</button><button class="btn" data-cadx>Cancelar</button>${isNew?"":`<button class="btn ${d.ativo?"danger":""}" data-cadativo>${d.ativo?"Inativar aluno":"Reativar aluno"}</button>`}</div>
    ${isNew?"":`<div class="cdel">${d.delArm?`<p>Excluir apaga <b>${esc(first(d.nome))}</b> de vez: cadastro, treino e histórico de presença. Se a ideia é só parar de cobrar, use <b>Inativar</b>, que guarda o histórico.</p><div class="row"><button class="btn danger" data-caddelok>Sim, excluir de vez</button><button class="btn" data-caddelno>Não</button></div>`:`<button class="btn small ghost danger" data-caddel>Excluir aluno</button>`}</div>`}
    <p class="muted" style="font-size:12px">Mudar o horário fixo vale daqui pra frente. Para mudar só um dia, ajuste direto na Chamada da Presença.</p></div>`; }
function cadMensal(){ const d=cadDraft||{}; if(d.tipo==="ficha"||d.tipo==="consultoria") return +String(d.valorFicha).replace(",",".")||0;
  const va=+String(d.valorAula).replace(",",".")||0, ct=parseInt(d.contratadas,10)||((d.slots||[]).length*4); return va*ct; }
function cadVencHTML(){ const d=cadDraft; if(d.tipo==="pacote") return "";
  if(d.forma==="poraula"||d.tipo==="avulsa") return `<span class="label">Quando cobra</span><div class="vencbox"><select class="inp" data-cd="ciclo" id="cd-ci" data-cre>${Object.entries(PRES.CICLOS).map(([v,l])=>`<option value="${v}" ${(d.ciclo||"quinzenal")===v?"selected":""}>${l}</option>`).join("")}</select>
    ${d.ciclo==="datas"?`<div class="avform av3">${[0,1,2,3].map(i=>`<label style="display:grid;gap:2px;font-size:11px">${i+1}ª data (dia)<input class="inp" type="number" inputmode="numeric" min="1" max="31" data-cd="cdia${i}" id="cd-cdia${i}" value="${esc(d["cdia"+i]||"")}" placeholder="${["10","20","",""][i]}"></label>`).join("")}</div>`:""}
    <small class="muted">Cobra só as aulas que a pessoa fez em cada período. Não entra no previsto do mês: o que ela pagar entra como extra. Período fechado sem pagar acusa vencido.</small></div>`;
  const n=d.forma==="parcelas"? Math.min(6,Math.max(2,+d.nParc||2)) : 1; d._np=n; const R=x=>x.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  const opts=`<label style="display:grid;gap:3px;font-size:11.5px;font-weight:700">Paga em<select class="inp" data-cd="nParc" id="cd-np" data-cre>${[1,2,3,4,5,6].map(k=>`<option value="${k}" ${k===n?"selected":""}>${k===1?"1 vez (mês inteiro)":k+" vezes"}</option>`).join("")}</select></label>`;
  if(d.forma==="semanal") return `<span class="label">Vencimento</span><div class="vencbox"><small class="muted">Semanal: cada semana é marcada no Financeiro.</small></div>`;
  if(n===1) return `<span class="label">Vencimento</span><div class="vencbox"><div class="avform av3">${opts}<label style="display:grid;gap:3px;font-size:11.5px;font-weight:700">Vence todo dia<input class="inp" type="number" inputmode="numeric" min="1" max="31" data-cd="diaVenc" id="cd-dv" value="${esc(d.diaVenc)}"></label></div></div>`;
  const DF=parcDefDias(n); for(let i=0;i<n;i++) if(!+d["pd"+i]) d["pd"+i]=String(DF[i]); const tot=cadMensal(), L=parcSplit(Array.from({length:n},(_,i)=>({dia:+d["pd"+i]||DF[i],v:+String(d["pv"+i]||"").replace(",",".")||0})),tot);
  return `<span class="label">Vencimento</span><div class="vencbox"><div class="avform av3">${opts}</div>
    ${L.map((p,i)=>`<div class="vrow"><b>${i+1}ª</b><label style="display:grid;gap:2px;font-size:11px">dia<input class="inp" type="number" inputmode="numeric" min="1" max="31" data-cd="pd${i}" id="cd-pd${i}" value="${esc(d["pd"+i])}"></label><label style="display:grid;gap:2px;font-size:11px">valor (R$)<input class="inp" type="number" inputmode="decimal" data-cd="pv${i}" id="cd-pv${i}" data-cre value="${esc(d["pv"+i])}" placeholder="${tot?R(p.v)+" auto":"auto"}"></label></div>`).join("")}
    <small class="muted">${tot?`Total do mês ${R(tot)}: ${L.map(p=>R(p.v)).join(" + ")}. `:""}Deixe o valor vazio para dividir o restante igual entre as parcelas.</small></div>`; }
function cadSave(){ cadPull(); const d=cadDraft; const nome=d.nome.trim(); if(!nome){ toast("Coloque o nome do aluno"); return; }
  if(d.tipo==="pacote"&&d.pacVal&&d.pacIni&&d.pacVal<d.pacIni){ toast(`"Usar até" (${ddmm(d.pacVal)}/${d.pacVal.slice(0,4)}) está antes do início (${ddmm(d.pacIni)}/${d.pacIni.slice(0,4)}). Confira as datas.`); return; }
  let pid=d.pid;
  if(presOn()){ const base=(pid&&PRES.aluno(pid))||{}; const a=Object.assign({},base,{id:pid||null,nome,tipo:d.tipo,forma:d.forma,ativo:!!d.ativo,permuta:!!d.permuta});
    if(d.tipo==="pacote"){ a.pacote=Object.assign({},base.pacote||{},{total:parseInt(d.pacTotal,10)||0,valor:parseFloat(String(d.pacValor).replace(",","."))||0,inicio:d.pacIni||isoD(new Date()),validade:d.pacVal||"",forma:d.pacForma||"avista",mesCob:(base.pacote&&base.pacote.inicio===d.pacIni&&base.pacote.mesCob)||undefined,parc:Math.max(1,parseInt(d.pacParc,10)||1)}); if(!a.pacote.validade) delete a.pacote.validade; if(a.pacote.forma!=="parcelas") delete a.pacote.parc; if(!a.pacote.mesCob) delete a.pacote.mesCob; a.slots=d.slots; a.contratadas=0; }
    else if(d.tipo==="avulsa"){ a.valorAula=parseFloat(String(d.valorAula).replace(",","."))||0; a.slots=[]; a.contratadas=0; }
    else if(d.tipo==="ficha"||d.tipo==="consultoria"){ a.valorFicha=parseFloat(d.valorFicha)||0; a.slots=[]; } else { a.valorAula=parseFloat(String(d.valorAula).replace(",","."))||0; a.contratadas=parseInt(d.contratadas,10)||0; a.slots=d.slots; delete a.mensalidade; }
    if(d.tel.trim()) a.tel=d.tel.trim(); else delete a.tel;
    if(d.nasc) a.nasc=d.nasc; else delete a.nasc;
    if(d.inicio) a.inicio=d.inicio; else delete a.inicio; if(d.cobraMes) a.cobraMes=d.cobraMes; else delete a.cobraMes;
    if(d.forma==="outra"&&String(d.formaObs||"").trim()) a.formaObs=String(d.formaObs).trim(); else delete a.formaObs;
    if(d.forma==="poraula"||d.tipo==="avulsa"){ a.ciclo=d.ciclo||"quinzenal"; const ds=[0,1,2,3].map(i=>parseInt(d["cdia"+i],10)).filter(x=>x>=1&&x<=31); if(a.ciclo==="datas"&&ds.length) a.cicloDias=ds; else delete a.cicloDias; } else { delete a.ciclo; delete a.cicloDias; }
    if(d.tipo!=="pacote"&&d.tipo!=="avulsa"){ if(d.forma==="parcelas"){ const n=Math.min(6,Math.max(2,+d.nParc||2)); a.nParc=n; a.parc=Array.from({length:n},(_,i)=>{ const dia=Math.min(31,Math.max(1,parseInt(d["pd"+i],10)||parcDefDias(n)[i])), v=+String(d["pv"+i]||"").replace(",",".")||0; return v>0?{dia,v}:{dia}; }); a.diaVenc=a.parc[0].dia; }
      else { delete a.nParc; delete a.parc; a.diaVenc=Math.min(31,Math.max(1,parseInt(d.diaVenc,10)||10)); } }
    if(a.ativo===false&&base.ativo!==false) a.inativoDesde=isoD(new Date()).slice(0,7); if(a.ativo) delete a.inativoDesde;
    pid=PRES.upsert(a); }
  let st=(d.sid&&stById(d.sid))||(pid&&byPid(pid));
  if(!st){ const pl={id:nid(),sessions:[]}; S.plans.push(pl); st={id:nid(),name:nome,phase:1,novo:true,coreExtra:false,planId:pl.id,ov:{},log:[]}; S.students.push(st); }
  st.name=nome; if(pid){ st.pid=pid; delete st.noLink; } if(d.nasc) st.nasc=d.nasc; else delete st.nasc;
  st.days= d.tipo==="ficha"||d.tipo==="consultoria"||d.tipo==="avulsa"? [] : [...new Set(d.slots.map(s=>CAD_DN[s.d]))]; st.slotsL= st.days.length? d.slots : []; if(d.tipo==="avulsa") st.avulsa=true; else delete st.avulsa;
  S.active=st.id; save(); cadDraft=null; renderAll();
  if(d.tipo==="pacote"&&pid){ const fd=x=>x?`${ddmm(x)}/${x.slice(0,4)}`:"sem prazo"; toast(`${first(nome)} salvo · pacote de ${d.pacTotal} aulas, de ${fd(d.pacIni)} até ${fd(d.pacVal)}`);
    const want=d.pacVal||""; setTimeout(()=>{ const a=PRES.aluno(pid); if(a&&a.pacote&&(a.pacote.validade||"")!==want) toast("⚠ O prazo do pacote não ficou salvo. Abra o aluno e toque em Salvar de novo."); },2500); }
  else toast(`${first(nome)} salvo`); }
/* Apresentação do sistema: fica fixada no topo do Cadastro para quem está começando */
const APR_N=52; let APR_I=0;
function aprSrc(i){ return "apresentacao/"+String(i+1).padStart(2,"0")+".jpg"; }
function aprHTML(){ return `<div class="aprbox"><div class="aprimg" id="aprImg"><img src="${aprSrc(APR_I)}" alt="Slide ${APR_I+1} da apresentação" draggable="false"><button class="aprnav l" data-apr="-1" aria-label="Anterior">‹</button><button class="aprnav r" data-apr="1" aria-label="Próximo">›</button></div>
  <div class="aprbar"><button class="btn small" data-apr="-1">◀</button><b id="aprNum">${APR_I+1} de ${APR_N}</b><button class="btn small" data-apr="1">▶</button><button class="btn small" data-aprfull>⛶ Tela cheia</button></div></div>`; }
function aprGo(d){ if(SLF) return; APR_I=Math.max(0,Math.min(APR_N-1,APR_I+d)); document.querySelectorAll("#aprImg img,#aprFull img").forEach(im=>{ im.src=aprSrc(APR_I); }); document.querySelectorAll("#aprNum,#aprFullNum").forEach(n=>n.textContent=(APR_I+1)+" de "+APR_N); if(APR_I+1<APR_N){ const pre=new Image(); pre.src=aprSrc(APR_I+1); } }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-appinst]"); if(!b||!APP_EVT) return; window.__BIP=null; APP_EVT.prompt(); APP_EVT.userChoice.finally(()=>{ APP_EVT=null; try{ renderCadastro(); }catch(_){} }); });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-apr],[data-aprfull],[data-aprx]"); if(!b) return;
  if(b.dataset.apr){ aprGo(+b.dataset.apr); return; }
  if(b.hasAttribute("data-aprx")){ const f=document.getElementById("aprFull"); if(f) f.remove(); return; }
  const f=document.createElement("div"); f.id="aprFull"; f.innerHTML=`<img src="${aprSrc(APR_I)}" alt="Slide"><button class="aprnav l" data-apr="-1">‹</button><button class="aprnav r" data-apr="1">›</button><div class="aprfb"><b id="aprFullNum">${APR_I+1} de ${APR_N}</b><button class="btn small" data-aprx>✕ Fechar</button></div>`; document.body.appendChild(f); });
let APR_X=null; document.addEventListener("touchstart",e=>{ if(SLF){ APR_X=null; return; } if(e.target.closest&&e.target.closest("#aprImg,#aprFull")) APR_X=e.touches[0].clientX; },{passive:true});
document.addEventListener("touchend",e=>{ if(APR_X===null) return; const dx=e.changedTouches[0].clientX-APR_X; APR_X=null; if(Math.abs(dx)>40) aprGo(dx<0?1:-1); },{passive:true});
document.addEventListener("keydown",e=>{ if(SLF||!document.getElementById("aprFull")) return; if(e.key==="ArrowRight") aprGo(1); else if(e.key==="ArrowLeft") aprGo(-1); else if(e.key==="Escape") document.getElementById("aprFull").remove(); });
/* Aviso para os colegas: o envio automático ainda vai chegar (o administrador não vê, porque está testando) */
function soonHTML(){ return `<div class="rp-soon">🔜 <b>Em breve:</b> o próprio sistema vai mandar as mensagens no WhatsApp dos seus alunos, sozinho: <b>confirmação e lembrete da aula</b>, planejamento e relatório do mês.</div>`; }
/* Slides de explicação: cada aba mostra só os dela */
const SL_G={geral:["capa","tela-inicial","offline","abas8","login","fz","convite","sugestao","ajuda-site","fim"],
  cadastro:["cadastro","importar","extras"],
  sessao:["sessao","ses-lancar","importar","ses-repetir","letra","setas","conj","semanas","ses-dia","ses-lado","ses-novo","tela","visualizar","descanso","timers","cardio","ses-graf","ses-rel","historico","programacao","fases","medo","ajuda","minha","nenhuma"],
  semana:["programacao","fases","medo","ajuda","minha","nenhuma","letra","semanas"],
  presenca:["presenca","pres-auto","pres-mes"],
  relmes:["rel-aluno","frases","quinta"],
  agenda:["agenda","agenda2"],
  financeiro:["financeiro","fin-avulsas","importar","fin-cmp","quinta"],
  corpo:["avaliacao","aval-det","fotos","importar"],
  perso:["abas","cores"]};
const SL_I={}, SL_OPEN={}; Object.keys(SL_G).forEach(g=>{ let v=null; try{ v=localStorage.getItem("rp_sl_"+g); }catch(_){} SL_OPEN[g]= v!=="0"; }); let SLF=null, SL_X=null;
const slSrc=id=>"apresentacao/"+id+".jpg?v="+(typeof APP_VER!=="undefined"?APP_VER:"1");
function slNav(g){ const L=SL_G[g], i=SL_I[g]||0; return `<button class="aprnav l" data-sl="-1" data-slg="${g}" aria-label="Anterior">‹</button><button class="aprnav r" data-sl="1" data-slg="${g}" aria-label="Próximo">›</button>`; }
/* Vídeos explicativos por aba (link do YouTube, gravados pelo Professor Maílson) */
const VIDEOS={};
function ytId(u){ const m=String(u||"").match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([A-Za-z0-9_-]{6,})/); return m? m[1] : ""; }
function vidBtn(g){ return VIDEOS[g]&&ytId(VIDEOS[g])? `<button class="slbtn vidbtn" data-vid="${g}">▶ Vídeo explicando esta aba</button>` : ""; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-vid],[data-vidx]"); if(!b) return; let o=document.getElementById("vidPop"); if(b.hasAttribute("data-vidx")){ if(o){ o.hidden=true; o.innerHTML=""; } return; }
  if(!o){ o=document.createElement("div"); o.id="vidPop"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",ev=>{ if(ev.target===o){ o.hidden=true; o.innerHTML=""; } }); }
  o.innerHTML=`<div class="sheet vidbox"><div class="vidh"><b>▶ Vídeo explicativo</b><button class="btn small" data-vidx>✕ Fechar</button></div><div class="vidf"><iframe src="https://www.youtube-nocookie.com/embed/${ytId(VIDEOS[b.dataset.vid])}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Vídeo explicativo"></iframe></div></div>`; o.hidden=false; });
/* Músicas para Tabata (playlist do YouTube) */
const TABATA_MUSICAS="PLEmcpl-1-EbIXvaKna59ad2Nx2Clysqig";
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-tbmus]"); if(!b) return; let o=document.getElementById("vidPop");
  if(!o){ o=document.createElement("div"); o.id="vidPop"; o.className="scrim"; document.body.appendChild(o); o.addEventListener("click",ev=>{ if(ev.target===o){ o.hidden=true; o.innerHTML=""; } }); }
  o.innerHTML=`<div class="sheet vidbox"><div class="vidh"><b>🎵 Músicas para Tabata</b><button class="btn small" data-vidx>✕ Fechar</button></div><div class="vidf"><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=${TABATA_MUSICAS}&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Músicas para Tabata"></iframe></div><p class="muted" style="font-size:12px;margin:6px 0 0;text-align:center">As músicas já têm o cronômetro delas. Se usar o ⏱ do site junto, abaixe o volume de mídia de um dos dois.</p></div>`; o.hidden=false; });
function slidesBox(g){ const L=SL_G[g]; if(!L) return ""; const i=SL_I[g]||0, open=!!SL_OPEN[g];
  return `${vidBtn(g)}<div class="slbox" data-slbox="${g}"><button class="slbtn ${open?"on":""}" data-slopen="${g}">📽 ${open?"✕ Fechar os slides":"Ver a explicação desta aba em slides"} <small>${L.length} slides</small></button>${open?`<div class="aprbox"><div class="aprimg slimg" data-slg="${g}"><img src="${slSrc(L[i])}" alt="Slide ${i+1} de ${L.length}" draggable="false">${slNav(g)}</div>
    <div class="aprbar"><button class="btn small" data-sl="-1" data-slg="${g}">◀</button><b>${i+1} de ${L.length}</b><button class="btn small" data-sl="1" data-slg="${g}">▶</button><button class="btn small" data-slfull="${g}">⛶ Tela cheia</button><button class="btn small slzbtn" data-slfull="${g}" data-slz0="2">🔍 Aumentar o slide</button></div></div>`:""}</div>`; }
function slRefresh(g){ document.querySelectorAll(`[data-slbox="${g}"]`).forEach(el=>{ el.outerHTML=slidesBox(g); }); const f=document.getElementById("aprFull"); if(f&&SLF===g){ const L=SL_G[g], i=SL_I[g]||0; f.innerHTML=slFullHTML(g); const n=f.querySelector("#aprFullNum"); if(n) n.textContent=(i+1)+" de "+L.length; }
  const L=SL_G[g], i=SL_I[g]||0; if(L[i+1]){ const pre=new Image(); pre.src=slSrc(L[i+1]); } }
let SL_Z=1;
function slFullHTML(g){ const L=SL_G[g], i=SL_I[g]||0; const z=SL_Z>1;
  return `<div class="slzw ${z?"zoomed":""}"><img src="${slSrc(L[i])}" alt="Slide" draggable="false" style="${z?`width:${SL_Z*100}%;max-width:none;max-height:none`:""}"></div>${z?"":slNav(g)}<div class="aprfb"><button class="btn small slzb" data-slz="-1" ${SL_Z<=1?"disabled":""} aria-label="Diminuir">🔍 −</button><b id="aprFullNum">${i+1} de ${L.length}</b><button class="btn small slzb" data-slz="1" ${SL_Z>=4?"disabled":""} aria-label="Aumentar">🔍 +</button>${z?`<button class="btn small slzb" data-sl="-1" data-slg="${g}" aria-label="Anterior">◀</button><button class="btn small slzb" data-sl="1" data-slg="${g}" aria-label="Próximo">▶</button>`:""}<button class="btn small slzb" data-slrot>📱 Deitar a tela</button><button class="btn small slx" data-slx>✕ Fechar</button></div>`; }
function slFullClose(){ const f=document.getElementById("aprFull"); if(f) f.remove(); SLF=null; SL_Z=1; try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(_){} try{ screen.orientation.unlock(); }catch(_){} }
function slGo(g,d){ const L=SL_G[g]; if(!L) return; SL_I[g]=Math.max(0,Math.min(L.length-1,(SL_I[g]||0)+d)); slRefresh(g); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-slopen],[data-sl],[data-slfull],[data-slx],[data-slz],[data-slrot]"); if(!b) return; e.stopPropagation();
  if(b.dataset.slz){ SL_Z=Math.max(1,Math.min(4,SL_Z+(+b.dataset.slz)*0.5)); const f=document.getElementById("aprFull"); if(f&&SLF) f.innerHTML=slFullHTML(SLF); return; }
  if(b.hasAttribute("data-slrot")){ (async()=>{ try{ if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); await screen.orientation.lock("landscape"); }catch(_){ toast("Vire o celular deitado: o slide fica maior."); } })(); return; }
  if(b.dataset.slopen){ const g=b.dataset.slopen; SL_OPEN[g]=!SL_OPEN[g]; try{ localStorage.setItem("rp_sl_"+g,SL_OPEN[g]?"1":"0"); }catch(_){} slRefresh(g); return; }
  if(b.dataset.sl){ slGo(b.dataset.slg||SLF,+b.dataset.sl); return; }
  if(b.hasAttribute("data-slx")){ slFullClose(); return; }
  const g=b.dataset.slfull; SLF=g; SL_Z=+b.dataset.slz0||1; const old=document.getElementById("aprFull"); if(old) old.remove();
  const f=document.createElement("div"); f.id="aprFull"; f.innerHTML=slFullHTML(g); document.body.appendChild(f); },true);
document.addEventListener("touchstart",e=>{ const t=e.target.closest&&e.target.closest(".slimg,#aprFull"); if(t&&(t.classList.contains("slimg")||(SLF&&SL_Z<=1))) SL_X={x:e.touches[0].clientX,g:t.dataset.slg||SLF}; else SL_X=null; },{passive:true});
document.addEventListener("touchend",e=>{ if(!SL_X) return; const dx=e.changedTouches[0].clientX-SL_X.x; if(Math.abs(dx)>40) slGo(SL_X.g,dx<0?1:-1); SL_X=null; },{passive:true});
document.addEventListener("keydown",e=>{ if(!SLF||!document.getElementById("aprFull")) return; if(e.key==="ArrowRight") slGo(SLF,1); else if(e.key==="ArrowLeft") slGo(SLF,-1); else if(e.key==="Escape"){ slFullClose(); } });
function aprBlock(){ return `<div class="boxw apresw" data-box="apres"><div class="boxh"><span>📽 Conheça o sistema · passe para o lado</span></div>${aprHTML()}</div>`; }
/* Instalar como aplicativo: some quando o site já está aberto pelo ícone */
let APP_EVT=window.__BIP||null; window.addEventListener("rp-bip",()=>{ APP_EVT=window.__BIP||null; try{ if(CUR_TAB==="cadastro"||CUR_TAB==="perfil") renderCadastro(); }catch(_){} });
function isApp(){ try{ return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true; }catch(_){ return false; } }
function appHTML(){ if(isApp()) return ""; const ios=/iPhone|iPad|iPod/.test(navigator.userAgent);
  return `<div class="card appbox"><b class="appt">📲 Coloque o site na tela do celular</b><p>Abre como aplicativo, em tela cheia e já logado.</p>
  <img class="appilu" src="instalar_${ios?"ios":"android"}.jpg" alt="Passo a passo: ${ios?"Compartilhar, Adicionar à Tela de Início":"3 pontinhos, Adicionar à tela inicial"} e o ícone Rotina do Personal na tela do celular" onerror="this.remove()">
  ${APP_EVT?`<button class="btn primary" data-appinst>📲 Instalar agora</button>`:""}
  ${ios?`<ol><li>No <b>Safari</b>, toque em <b>Compartilhar</b> (quadrado com a seta ⬆).</li><li>Toque em <b>Adicionar à Tela de Início</b>.</li><li>Toque em <b>Adicionar</b>.</li></ol>`:`<ol><li>No <b>Chrome</b>, toque nos <b>3 pontinhos ⋮</b> lá em cima.</li><li>Toque em <b>Adicionar à tela inicial</b> (ou <b>Instalar app</b>).</li><li>Toque em <b>Adicionar</b> (ou <b>Instalar</b>).</li></ol>`}
  <p class="muted" style="margin:0;font-size:13px">Abriu pelo link do WhatsApp? Abra primeiro no ${ios?"Safari":"Chrome"}.</p></div>`; }
let PERSO_OPEN=false;
function persoDetHTML(){ if(PERSO_OPEN) COR_OPEN=true; return `<div class="abaswrap" id="abasWrap">${abasHTML()}</div><details class="persodet" id="persoDet" ${PERSO_OPEN?"open":""}><summary><span class="pdi">🎨</span><span><b>Personalizar site</b><small>Cores do site e abas que aparecem</small></span><span class="pda">›</span></summary>${PERSO_OPEN?`<div class="persobody">${slidesBox("perso")}${corHTML()}${stuCorHTML()}</div>`:""}</details>`; }
document.addEventListener("click",e=>{ const sm=e.target.closest&&e.target.closest("#persoDet>summary"); if(!sm) return; e.preventDefault(); PERSO_OPEN=!PERSO_OPEN; renderCadastro(); });
function renderCadastro(){ const v=document.getElementById("view-cadastro"); if(!v) return;
  if(cadDraft&&CUR_TAB==="cadastro"){ v.innerHTML=cadTopHTML()+cadFormHTML(); return; }
  const L=cadList();
  if(CUR_TAB==="perfil"){ v.innerHTML=`${cadTopHTML(1)}<h2 class="perso">👤 Meu perfil e conta</h2>${persoDetHTML()}${appHTML()}${slidesBox("geral")}${soonHTML()}<div id="cad-extra" style="display:grid;gap:16px"></div>`; renderAjuda(); return; }
  if(CUR_TAB==="perso"){ COR_OPEN=true; v.innerHTML=`${cadTopHTML(1)}${abasHTML()}<h2 class="perso persog">Personalize a página do seu jeito!</h2>${slidesBox("perso")}${corHTML()}${stuCorHTML()}`; return; }
  v.innerHTML=`${cadTopHTML(1)}<div class="cadhelp">${helpBtn("cadastro")}</div>${slidesBox("cadastro")}
    <div class="card"><span class="label">Cadastro</span><h2>Seus alunos</h2>
      <p class="muted" style="font-size:14px">Dias, horários, valores e dados do treino num lugar só. Vai direto para a Presença, o Financeiro e a Sessão.</p>
      <button class="btn primary" data-cadnew style="justify-self:start">+ Novo aluno</button>
      ${impBtn("cad","Importar alunos (foto, PDF, Excel ou Word)")}
      ${window.RP_LIMPO?"":`<button class="btn small ghost" data-gobrand style="justify-self:start">✎ Seu nome, logo, cores e frases dos relatórios (em Relatório e planejamento)</button>
      ${BR().nome==="Seu nome"?`<p class="pend" style="margin:0">⚠ Coloque o seu nome: ele aparece nos relatórios e no planejamento que o aluno recebe.</p>`:""}`}
      ${presOn()?"":`<p class="note" style="margin:0">Carregando a Presença… Se demorar, os dias e horários ficam só no treino até ela abrir.</p>`}</div>
    <label class="cbusca">🔍<input class="inp" id="cadBusca" type="search" placeholder="Procurar aluno pelo nome" autocomplete="off"></label>
    <div class="clist">${L.map(({a,st})=>{ const nm=(a&&a.nome)||(st&&st.name)||""; const sl=a? (a.tipo==="ficha"?"Ficha de treino":a.tipo==="consultoria"?"💻 Consultoria online":a.tipo==="avulsa"?"Aula avulsa":(a.slots||[]).map(s=>CAD_DN[s.d]+" "+s.h).join(" · ")||(a.tipo==="pacote"?"Pacote, sem dias fixos":"")) : ((st&&st.days)||[]).join(" · ");
      const pend= !sl && !(st&&st.avulsa); const pk=a&&a.tipo==="pacote"&&presOn()? pacTagHTML(PRES.pacUso(a.id)) : "";
      return `<button class="crow ${a&&a.ativo===false?"inativo":""}" data-cadopen="${a?"p:"+a.id:"s:"+st.id}">${st?`<span class="ud" style="--pc:var(--p${st.phase})">${phK(st)}</span>`:`<span class="ud" style="--pc:var(--muted)">–</span>`}<span class="cr-m"><b>${esc(nm)}</b><span>${pend?`<em class="pendtx">⚠ dias e horários pendentes</em>`:esc(sl||"Aula avulsa")}</span>${pk}</span>${a&&a.ativo===false?`<span class="pill">inativo</span>`:""}</button>`; }).join("")}</div>
`; }
document.getElementById("view-cadastro").addEventListener("change",e=>{ const t=e.target; if(t.matches&&t.matches("[data-sesc]")){ COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{[t.dataset.sesc]:t.value}); save(); applySiteCor(); renderCadastro(); return; } if(!t.matches||!t.matches("[data-sitebgc]")) return; COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{siteBg:t.value}); save(); applySiteCor(); renderCadastro(); });
document.getElementById("view-cadastro").addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return;
  if(b.dataset.txtcor!=null){ COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{txtCor:b.dataset.txtcor}); save(); applySiteCor(); renderCadastro(); return; }
  if(b.dataset.tema!=null){ COR_OPEN=true; S.brand=Object.assign({},S.brand||{},{tema:b.dataset.tema,siteCor:"",siteCorX:"",siteBg:"",boxCor:"",txtCor:"",sesTr:"",sesCd:""}); delete S.brand.abaCor; save(); applySiteCor(); renderCadastro(); toast(b.dataset.tema?"Pronto! O site ficou nos tons dessa cor.":"Cores padrão de volta."); return; }
  if(b.dataset.sescor!=null){ const [k,c]=b.dataset.sescor.split(":"); COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{[k]:c}); save(); applySiteCor(); renderCadastro(); return; }
  if(b.dataset.boxcor!=null){ COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{boxCor:b.dataset.boxcor}); save(); applySiteCor(); renderCadastro(); return; }
  if(b.dataset.sitebg!=null){ COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{siteBg:b.dataset.sitebg}); save(); applySiteCor(); renderCadastro(); return; }
  if(b.dataset.paycor2!=null){ COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{payCor:b.dataset.paycor2}); save(); applySiteCor(); renderCadastro(); return; }
  if(b.dataset.sitecor!=null){ COR_OPEN=true; COR_FINO=true; S.brand=Object.assign({},S.brand||{},{siteCor:b.dataset.sitecor}); save(); applySiteCor(); renderCadastro(); return; }
  if(b.dataset.aba||b.hasAttribute("data-abaok")||b.hasAttribute("data-abaall")){ let on=abasOn().slice();
    if(b.dataset.aba){ const k=b.dataset.aba; on=on.includes(k)? on.filter(x=>x!==k) : ABAS.map(x=>x[0]).filter(x=>x===k||on.includes(x)); ABAS_OPEN=true; }
    if(b.hasAttribute("data-abaall")){ on=ABAS.map(x=>x[0]); ABAS_OPEN=true; }
    if(b.hasAttribute("data-abaok")) ABAS_OPEN=false;
    S.brand=Object.assign({},S.brand||{},{abas:on,agMig:true},b.hasAttribute("data-abaok")?{abasOk:true}:{}); save(); applyAbas(); renderCadastro(); if(b.hasAttribute("data-abaok")) toast("Pronto! Só as abas escolhidas aparecem."); return; }
  if(b.hasAttribute("data-cadnew")){ cadOpen(null,null); return; }
  if(b.dataset.cadopen){ const [t,id]=b.dataset.cadopen.split(":"); if(t==="p"){ const a=PRES.aluno(id); cadOpen(a,byPid(id)); } else cadOpen(null,stById(id)); return; }
  if(b.hasAttribute("data-cadx")){ cadDraft=null; renderCadastro(); return; }
  if(b.hasAttribute("data-cadsave")){ try{ cadSave(); }catch(err){ toast("Não salvou: "+erroPT(err)+". Mande um print."); } return; }
  if(b.dataset.pkext||b.hasAttribute("data-pklost")||b.hasAttribute("data-pklostundo")){ cadPull(); const a=PRES.aluno(cadDraft.pid); if(!a||!a.pacote) return; const u=PRES.pacUso(a.id);
    if(b.dataset.pkext){ const x=new Date(); x.setDate(x.getDate()+(+b.dataset.pkext)); a.pacote.validade=isoD(x); delete a.pacote.perdidas; cadDraft.pacVal=a.pacote.validade; toast(`Prazo estendido até ${ddmm(a.pacote.validade)}: as ${u.rest} aulas podem ser reagendadas`); }
    else if(b.hasAttribute("data-pklost")){ a.pacote.perdidas=(+a.pacote.perdidas||0)+u.rest; toast(`${u.rest} aula${u.rest>1?"s":""} considerada${u.rest>1?"s":""} perdida${u.rest>1?"s":""}. Pacote encerrado.`); }
    else { delete a.pacote.perdidas; toast("Desfeito"); }
    PRES.upsert(a); renderCadastro(); return; }
  if(b.dataset.pvq!=null){ cadPull(); const n=+b.dataset.pvq; cadDraft.pacVal= n? pvqDate(cadDraft.pacIni,n) : ""; renderCadastro(); if(n) toast(`Usar até ${ddmm(cadDraft.pacVal)}/${cadDraft.pacVal.slice(0,4)}`); return; }
  if(b.hasAttribute("data-caddel")){ cadPull(); cadDraft.delArm=true; renderCadastro(); return; }
  if(b.hasAttribute("data-caddelno")){ cadPull(); cadDraft.delArm=false; renderCadastro(); return; }
  if(b.hasAttribute("data-caddelok")){ const d=cadDraft; const st=(d.sid&&stById(d.sid))||(d.pid&&byPid(d.pid)); const nm=d.nome; if(d.pid&&presOn()) PRES.remove(d.pid); delStudentFull(st); cadDraft=null; save(); renderAll(); toast(`${first(nm)||"Aluno"} excluído`); return; }
  if(b.hasAttribute("data-cadrenew")){ cadPull(); cadDraft.renArm=true; renderCadastro(); return; }
  if(b.hasAttribute("data-cadrenewno")){ cadPull(); cadDraft.renArm=false; renderCadastro(); return; }
  if(b.hasAttribute("data-cadrenewok")){ cadPull(); cadDraft.renArm=false; const a=PRES.aluno(cadDraft.pid); if(!a||!a.pacote) return; const hoje=isoD(new Date());
    a.pacHist=[...(a.pacHist||[]),a.pacote]; const old=a.pacote; a.pacote=Object.assign({},old,{inicio:hoje});
    if(old.validade&&old.inicio){ const dur=Math.round((new Date(old.validade)-new Date(old.inicio))/864e5); const nv=new Date(); nv.setDate(nv.getDate()+dur); a.pacote.validade=isoD(nv); }
    PRES.upsert(a); cadDraft.pacIni=hoje; cadDraft.pacVal=a.pacote.validade||""; renderCadastro(); toast("Pacote renovado: a contagem recomeça hoje. Marque o pagamento no Financeiro."); return; }
  if(b.hasAttribute("data-cadativo")){ const cb=document.getElementById("cd-at"); cb.checked=!cb.checked; const at=cb.checked; cadSave(); toast(at?"Aluno reativado":"Aluno inativado: sai da Chamada e dos Pagamentos, o histórico fica guardado"); return; }
  if(b.hasAttribute("data-csadd")){ cadPull(); cadDraft.slots.push({d:1,h:"07:00"}); renderCadastro(); return; }
  if(b.dataset.csrm!=null){ cadPull(); cadDraft.slots.splice(+b.dataset.csrm,1); renderCadastro(); return; }
});
document.getElementById("view-cadastro").addEventListener("change",e=>{ if(!cadDraft) return; if(e.target.hasAttribute("data-cre")){ cadPull();
    if(e.target.id==="cd-np"||e.target.id==="cd-fp"){ const o=Math.max(2,+cadDraft._np||2), DO=parcDefDias(o); for(let i=0;i<6;i++) if(cadDraft["pd"+i]===String(DO[i])) cadDraft["pd"+i]=""; }
    if(e.target.id==="cd-np"){ if(+cadDraft.nParc>1) cadDraft.forma="parcelas"; else if(cadDraft.forma==="parcelas") cadDraft.forma="mensal"; }
    if(e.target.id==="cd-fp"){ if(cadDraft.forma==="parcelas"&&+cadDraft.nParc<2) cadDraft.nParc="2"; if(cadDraft.forma!=="parcelas") cadDraft.nParc="1"; }
    renderCadastro(); } });
document.getElementById("view-cadastro").addEventListener("input",e=>{ if(e.target.id==="cadBusca"){ const q=noAcc(e.target.value).toLowerCase().trim(); let n=0; document.querySelectorAll("#view-cadastro .crow").forEach(r=>{ const ok=!q||noAcc(r.querySelector("b").textContent).toLowerCase().includes(q); r.hidden=!ok; if(ok) n++; }); let m=document.getElementById("cadBuscaN"); if(!m){ m=document.createElement("p"); m.id="cadBuscaN"; m.className="muted"; e.target.closest(".cbusca").after(m); } m.textContent= q? (n? `${n} encontrado${n>1?"s":""}` : "Nenhum aluno com esse nome") : ""; return; }
 if(cadDraft&&(e.target.id==="cd-vm"||(e.target.id==="cd-ct"&&document.getElementById("cd-vm")&&document.getElementById("cd-vm").value))){ const vm=+String(document.getElementById("cd-vm").value).replace(",",".")||0; const v=document.getElementById("view-cadastro"); const nS=v.querySelectorAll("[data-cslot]").length; const ct=+document.getElementById("cd-ct").value||nS*4; if(vm>0&&ct>0){ const va=Math.round(vm/ct*100)/100; document.getElementById("cd-va").value=va; cadDraft.valorAula=String(va); } }
 if(!cadDraft||!/^cd-(va|ct|vm)$|^cs-/.test(e.target.id||"")) return; const el=document.getElementById("cd-mens"); if(!el) return;
  el.innerHTML=cadTotal(); });

/* ---------- Músculos pelo nome do exercício ---------- */
const KW_MUS=[["crucifixo inverso","delt"],["voador inverso","delt"],["face pull","delt"],["elevacao lateral","delt"],["elevacao frontal","delt"],["desenvolvimento","delt"],["arnold","delt"],["militar","delt"],
 ["supino","peit"],["crucifixo","peit"],["peck","peit"],["voador","peit"],["cross","peit"],["flexao de braco","peit"],
 ["remada","cost"],["puxada","cost"],["pulley","cost"],["pulldown","cost"],["barra fixa","cost"],["pullover","cost"],
 ["rosca","bic"],["biceps","bic"],["triceps","tri"],["frances","tri"],["testa","tri"],["mergulho","tri"],["paralela","tri"],
 ["panturrilha sentad","soleo"],["soleo","soleo"],["panturrilha","pant"],["gemeo","pant"],["gastrocnemio","pant"],["adutora","adu"],["aducao","adu"],
 ["encolhimento","trap"],["trapezio","trap"],["rosca inversa","antb"],["punho","antb"],["antebraco","antb"],["braquiorradial","antb"],
 ["flexora","isq"],["stiff","isq"],["rdl","isq"],["terra","isq"],["good morning","isq"],["nordic","isq"],
 ["pelvica","glut"],["hip thrust","glut"],["gluteo","glut"],["abdutora","glut"],["abducao","glut"],["coice","glut"],["kickback","glut"],
 ["agach","quad"],["leg","quad"],["hack","quad"],["extensora","quad"],["bulgar","quad"],["afundo","quad"],["passada","quad"],["avanco","quad"],["sissy","quad"],["step","quad"]];
const KW_EXTRA={agach:{glut:.5},bulgar:{glut:1},afundo:{glut:1},passada:{glut:1},stiff:{glut:.5},terra:{glut:.5},supino:{tri:.5,delt:.5},remada:{bic:.5},puxada:{bic:.5}};
function musclesOfName(n){ const t=noAcc(n).trim(); if(!t) return null;
  const lib=[...LIB,...(S.custom||[])].find(e=>noAcc(e.n)===t); if(lib) return lib.m;
  if(["obliquo","russian twist","pallof","prancha lateral","rotacao de tronco","lenhador"].some(k=>t.includes(k))) return {obliq:1};
  if(["lombar","banco romano","hiperextensao","superman","perdigueiro","bird dog","good morning"].some(k=>t.includes(k))&&!t.includes("stiff")) return {lomb:1};
  if(KW_CORE.some(k=>t.includes(k))) return {core:1};
  const hit=KW_MUS.find(([k])=>t.includes(k)); if(!hit) return null; return {[hit[1]]:1,...(KW_EXTRA[hit[0]]||{})}; }
const mainMuscle=n=>{ const m=musclesOfName(n); if(!m) return null; return Object.entries(m).sort((a,b)=>b[1]-a[1])[0][0]; };
function weekMuscles(m,wid){ const v={}; Object.keys(MUSCLES).forEach(k=>v[k]=0); const unk=new Set();
  DAYS.forEach(dy=>{ const d=dayOf(wid,m.id,dy); if(!d) return; d.rows.forEach(r=>rowLines(r).forEach(l=>{ const s=num(l.x.s); if(!s||!l.n.trim()) return; const mm=musclesOfName(l.n); if(!mm){ unk.add(l.n.trim()); return; } Object.entries(mm).forEach(([k,w])=>{ if(k in v) v[k]+=s*w; }); })); });
  return {v,unk:[...unk]}; }
function profWeekHTML(m){ const w=S.weeks.find(x=>x.id===S.week); const {v,unk}=weekMuscles(m,w.id); const W=totWeek(w.id,m.id); const g=tg(m);
  const ks=Object.keys(MUSCLES).filter(k=>MUSCLES[k].r!=="Core"||v[k]);
  if(!ks.some(k=>v[k])&&!W.eq) return "";
  return `<div class="profbox"><b>Só para você · não sai na imagem nem no texto</b>
    <p>Séries por músculo nesta semana. Trabalho indireto conta meia série (ex.: tríceps no supino).</p>
    <div class="pw">${ks.map(k=>{ const x=Math.round(v[k]*10)/10; const c=volCls(k,x); const ref=MUSCLES[k].c==="G"?10:6; return `<div class="pw-r ${c}"><span>${MUSCLES[k].n}</span><span class="pw-t"><i style="width:${Math.min(x/ref,1)*100}%"></i></span><b class="num">${fmt(x)}</b></div>`; }).join("")}</div>
    <p class="muted" style="font-size:12px">Referência: a partir de ~10 séries/semana para músculo grande (~6 para pequeno, que já recebe trabalho indireto). Abaixo de 5, o estímulo é baixo para hipertrofiar e para proteger a massa magra no emagrecimento.</p>
    <p>❤️ Aeróbio: <b>${nf(W.eq)} de ${g.cardio} min</b> na semana ${W.eq>=g.cardio?"✓":"· abaixo da meta"}</p>
    ${unk.length?`<p class="muted" style="font-size:12px">Não reconheci: ${unk.map(esc).join(", ")}. Esses ficam fora da conta.</p>`:""}</div>`; }

/* ---------- Sugestão de exercício na Sessão ---------- */
let sugOpen=null, SUG_ROW=null, CPY_ROW=null;
/* Copiar um exercício para outro aluno (quando não tem dupla no horário) */
function cpyPickHTML(m){ const ativo=x=>{ try{ const a=x.pid&&PRES.aluno(x.pid); return !a||a.ativo!==false; }catch(_){ return true; } };
  const hoje=[]; try{ slotsMerged(S.day).forEach(sl=>sl.ids.forEach(id=>{ if(id!==m.id&&!hoje.includes(id)) hoje.push(id); })); }catch(_){}
  const H=hoje.map(id=>S.students.find(x=>x.id===id)).filter(x=>x&&!x.own);
  const O=S.students.filter(x=>x.id!==m.id&&!x.own&&!hoje.includes(x.id)&&ativo(x)).sort((a,b)=>a.name.localeCompare(b.name));
  const ch=L=>L.map(x=>`<button class="chip" data-cpyto="${x.id}">${esc(x.name)}</button>`).join("");
  return `<div class="cvcpy"><b>Copiar este exercício para:</b>${H.length?`<small>Alunos de ${esc(S.day)}</small><div>${ch(H)}</div>`:""}${O.length?`<small>Outros alunos</small><div>${ch(O)}</div>`:""}${H.length||O.length?"":`<span class="muted">Nenhum outro aluno cadastrado.</span>`}<small class="muted">Entra no treino de ${esc(S.day)} desta semana.</small></div>`; }

document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-mirstop]"); if(!b) return; const c=b.closest("[data-col]"); const d=c&&dayOf(S.week,c.dataset.col,S.day); if(!d) return; delete d.mir; d.rows.forEach(r=>delete r.mh); save(); renderSessao(); toast("Parou de repetir para o colega. O que já foi repetido continua lá."); });
/* Confirmação antes de criar ou repetir qualquer coisa na Sessão */
let CONF_OK=false, CONF_T=0;
const CONF_SEL="[data-ltrnew],[data-setltr],[data-rowrep],[data-copyrow],[data-copyto],[data-copyfrom],[data-cpyto],[data-wkok],[data-repcardio],[data-copycardio],[data-mvto],[data-nw],[data-repask]";
function confMsg(b){ const t=x=>esc(String(x||"").replace(/\s+/g," ").trim()); const lc=x=>x.charAt(0).toLowerCase()+x.slice(1); const D=b.dataset;
  const ex=()=>{ try{ const re=b.closest("[data-row]"), c=b.closest("[data-col]"); const d=dayOf(S.week,c.dataset.col,S.day); const r=d.rows.find(x=>x.id===re.dataset.row); return r&&r.n1.trim()? `<b>${t(r.n1)}</b>` : "este exercício"; }catch(_){ return "este exercício"; } };
  if(D.ltrnew!=null) return `Confirma começar um <b>Treino ${t(D.ltrnew)}</b> novo? O antigo fica no Histórico.`;
  if(D.setltr!=null) return b.getAttribute("aria-pressed")==="true"? null : `Confirma usar o <b>Treino ${t(D.setltr)}</b> neste dia?`;
  if(b.hasAttribute("data-rowrep")){ let mate=""; try{ const re=b.closest("[data-row]"), c=b.closest("[data-col]"); const d=dayOf(S.week,c.dataset.col,S.day); const i=d.rows.findIndex(x=>x.id===re.dataset.row); const r=d.rows[i]; let v={}; try{ v=JSON.parse(b.dataset.rowrep||"{}"); }catch(_){}
    const L=[]; let j=i; while(j>0&&d.rows[j-1].cj) j--; let k=i; while(k<d.rows.length-1&&(k===i? (r.cj||v.cj) : d.rows[k].cj)) k++; for(let x=j;x<=k;x++) if(x!==i){ const rf=prevRef(c.dataset.col), pp=rf&&rf.d? rf.d.rows : []; const n=String(d.rows[x].n1||"").trim()||String((pp[x]&&pp[x].n1)||"").trim(); L.push(n||"o exercício "+(x<i?"de cima":"de baixo")); }
    if(j<k) mate=L.map(n=>`<b>${t(n)}</b>`).join(" e "); }catch(_){}
  let vn=""; try{ vn=String(JSON.parse(b.dataset.rowrep||"{}").n||"").trim(); }catch(_){} const exn= vn? `<b>${t(vn)}</b>` : ex();
  return mate? `Confirma repetir ${exn}? Ele <b>continua conjugado</b> com ${mate}.` : `Confirma repetir ${exn} igual à semana passada?`; }
  if(D.copyrow!=null) return {who:t(b.textContent.replace(/^(Repetir p\/|📋 copiar p\/|📋 copiar)\s*/,"")), ex:ex()};
  if(D.cpyto!=null) return `Confirma copiar ${ex()} para <b>${t(b.textContent)}</b>?`;
  if(b.hasAttribute("data-copyto")||D.copyfrom!=null){ const x=t(b.textContent.replace(/^📋\s*/,"")); return /toque de novo/i.test(x)? null : `Confirma ${lc(x)}?`; }
  if(b.hasAttribute("data-wkok")){ const i=b.parentNode&&b.parentNode.querySelector("[data-wkalert]"); const v=parseInt(i&&i.value,10)||0; return v? `Confirma repetir esta programação por <b>${v} semanas</b>?` : `Confirma tirar o lembrete de semanas?`; }
  if(b.hasAttribute("data-repcardio")) return `Confirma repetir o <b>cardio da semana passada</b>?`;
  if(b.hasAttribute("data-copycardio")) return `Confirma ${lc(t(b.textContent.replace(/^📋\s*/,"")))}?`;
  if(D.mvto!=null) return `Confirma mover o treino para <b>${t(b.innerText)}</b>?`;
  if(D.nw==="copy") return `Confirma criar a semana nova usando a anterior como referência?`;
  if(D.nw==="blank") return `Confirma criar a semana nova em branco?`;
  if(D.repask==="rep") return `Confirma repetir o <b>treino anterior</b>?`;
  return null; }
function confAsk(msg,b){ const attrs=[...b.attributes].filter(a=>a.name.startsWith("data-")).map(a=>a.value===""?`[${a.name}]`:`[${a.name}="${CSS.escape(a.value)}"]`).join("");
  let o=document.getElementById("cfPop"); if(!o){ o=document.createElement("div"); o.id="cfPop"; o.className="scrim"; document.body.appendChild(o);
    o.addEventListener("click",ev=>{ if(Date.now()-CONF_T<400) return; if(ev.target===o||ev.target.closest("[data-cfno]")){ o.hidden=true; o._b=null; return; }
      if(ev.target.closest("[data-cfmir]")){ o.hidden=true; const b0=o._b; o._b=null; const c=b0&&b0.closest("[data-col]"); const sid=c&&c.dataset.col; const d=sid&&dayOf(S.week,sid,S.day,true); if(!d) return; d.mir=1; mirSync(); save(); renderSessao(); toast(`Pronto: o treino de ${first(stById(sid).name)} repete sempre para ${sesMembers().filter(x=>x.id!==sid).map(x=>first(x.name)).join(" e ")}`); return; }
      if(!ev.target.closest("[data-cfok]")) return; o.hidden=true;
      let el=o._b; o._b=null; if(el&&!el.isConnected) el=o._sel? document.querySelector(o._sel) : null; if(!el){ toast("A tela mudou. Toque de novo."); return; }
      CONF_OK=true; try{ el.click(); } finally{ CONF_OK=false; } }); }
  o._b=b; o._sel=attrs||null; CONF_T=Date.now();
  o.innerHTML= typeof msg==="object"? `<div class="sheet rdbox" role="dialog" aria-modal="true"><p class="rdq">Repetir ${msg.ex} para <b>${msg.who}</b>?</p><div class="rdbt rdbt3"><button class="btn primary" data-cfok>Só este exercício</button><button class="btn primary" data-cfmir>Sempre repetir os exercícios para ${msg.who}?<small>Tudo o que você lançar neste treino vai também para ${msg.who}</small></button><button class="btn" data-cfno>Cancelar</button></div></div>`
    : `<div class="sheet rdbox" role="dialog" aria-modal="true"><p class="rdq">${msg}</p><div class="rdbt"><button class="btn" data-cfno>Cancelar</button><button class="btn primary" data-cfok>Confirmar</button></div></div>`; o.hidden=false; }
window.addEventListener("click",e=>{ if(CONF_OK) return; const b=e.target.closest&&e.target.closest(CONF_SEL); if(!b||b.closest("#cfPop")) return; if(b.dataset.repask!=null&&b.dataset.repask!=="rep") return; if(b.dataset.copyrow!=null){ const c=b.closest("[data-col]"); const d=c&&dayOf(S.week,c.dataset.col,S.day); if(d&&d.mir) return; } const msg=confMsg(b); if(!msg) return; e.preventDefault(); e.stopImmediatePropagation(); confAsk(msg,b); },true);
/* Presença: confirmar antes de mudar ou apagar uma marcação */
window.addEventListener("click",e=>{ if(CONF_OK) return; const b=e.target.closest&&e.target.closest("#pres [data-st],#pres [data-act=todos],#pres [data-act=rmx],#pres [data-act=on],#pres [data-dest]"); if(!b||b.disabled) return;
  const card=b.closest(".p"), nm=card? esc(String((card.querySelector(".p-name")||{}).textContent||"").replace("✎","").trim()) : "", cur=card? card.dataset.s||"" : "", L={p:"Presente",f:"Faltou"};
  let msg=null; const a=b.dataset.act;
  if(a==="todos") msg=`Confirma ${esc(b.textContent.trim().toLowerCase())}?`;
  else if(a==="rmx") msg=`Confirma remover a aula de <b>${nm}</b> deste dia?`;
  else if(a==="on") msg=`Confirma que <b>atendeu neste dia</b>? O dia deixa de ser "sem aula".`;
  else if(b.dataset.dest!=null){ if(b.classList.contains("on-d")) return; msg=`Confirma mudar essa falta de <b>${nm}</b> para <b>${esc(b.textContent.trim())}</b>?`; }
  else if(b.dataset.st!=null){ const to=b.dataset.st; if(to===""){ msg=`Confirma limpar a marcação de <b>${nm}</b>?`; } else if(cur&&cur!==to&&L[cur]){ msg=`Confirma mudar <b>${nm}</b> de <b>${L[cur]}</b> para <b>${L[to]}</b>?`; } }
  if(!msg) return; e.preventDefault(); e.stopImmediatePropagation(); confAsk(msg,b); },true);
/* Apagar exercício: pergunta numa janela antes de apagar */
function rowDelAsk(sid,wid,rid){ const d=dayOf(wid,sid,S.day); const r=d&&d.rows.find(x=>x.id===rid); if(!r) return; const nm=r.n1.trim()||"exercício sem nome";
  let o=document.getElementById("rdPop"); if(!o){ o=document.createElement("div"); o.id="rdPop"; o.className="scrim"; document.body.appendChild(o);
    o.addEventListener("click",ev=>{ if(ev.target===o&&Date.now()-RD_T<800) return; if(ev.target===o||ev.target.closest("[data-rdno]")){ o.hidden=true; return; } const ok=ev.target.closest("[data-rdok]"); if(!ok) return; o.hidden=true;
      const [s2,w2,r2]=ok.dataset.rdok.split("|"); const dd=dayOf(w2,s2,S.day); if(!dd) return; const i=dd.rows.findIndex(x=>x.id===r2); if(i<0) return; const rr=dd.rows[i], pr=dd.rows[i-1]; if(pr&&pr.cj) pr.cj=!!rr.cj; dd.rows.splice(i,1); if(!dd.rows.length) dd.rows.push(newRow()); save(); renderSessao(); toast((rr.n1.trim()||"Exercício")+" apagado"); }); }
  o.innerHTML=`<div class="sheet rdbox" role="dialog" aria-modal="true"><p class="rdq">${/^exerc[ií]cio sem nome$/i.test(String(nm).trim())? "Confirma apagar este <b>exercício sem nome</b>?" : `Confirma apagar exercício <b>${esc(nm)}</b>?`}</p><div class="rdbt"><button class="btn" data-rdno>Cancelar</button><button class="btn rdok" data-rdok="${sid}|${wid}|${rid}">Apagar</button></div></div>`; o.hidden=false; }
function sugHTML(m,d){ const L=ltrOf(m.id,S.week,S.day,d); const sp=((progOf(m).split||{})[L])||null;
  const have={}; (d?d.rows:[]).forEach(r=>rowLines(r).filter(l=>!l.sub).forEach(l=>{ const k=mainMuscle(l.n); if(k) have[k]=(have[k]||0)+1; }));
  const byM={}; [...LIB,...(S.custom||[])].forEach(e=>{ const k=Object.entries(e.m||{}).sort((a,b)=>b[1]-a[1])[0]; if(k) (byM[k[0]]=byM[k[0]]||[]).push(e.n); });
  const ks= sp? Object.keys(sp) : Object.keys(MUSCLES);
  const GR=[["MMSS","G","Membros superiores · músculos grandes"],["MMSS","P","Membros superiores · músculos pequenos"],["MMII","G","Membros inferiores · músculos grandes"],["MMII","P","Membros inferiores · músculos pequenos"],["Core",null,"Core"]];
  const musc=k=>{ const n=have[k]||0, goal=sp?sp[k]:0; return `<div class="sug-m"><div class="sug-h"><b>${MUSCLES[k].n}</b>${sp?`<span class="pill ${n>=goal?"ok":"warn"}">${n} de ${goal}</span>`:n?`<span class="pill">${n} no treino</span>`:""}</div>
      <div class="sug-x">${(byM[k]||[]).map(x=>`<button data-sugex="${esc(x)}">${esc(x)}</button>`).join("")||`<span class="muted">Sem exercício na biblioteca.</span>`}</div></div>`; };
  return `<div class="card sugbox"><div class="phase-head"><span class="label">💡 Sugestões de exercícios${sp?` · Treino ${L}`:""}</span><button class="btn small sugx" data-sug>✕ Fechar</button></div>
    ${GR.map(([R,c,t])=>{ const mk=ks.filter(k=>MUSCLES[k]&&MUSCLES[k].r===R&&(!c||MUSCLES[k].c===c)); if(!mk.length) return ""; return `<details class="sug-g" style="--rc:${REG_COL[R]}" ${sp?"open":""}><summary>${t} <span class="muted">· ${mk.map(k=>MUSCLES[k].n).join(", ")}</span></summary>${mk.map(musc).join("")}</details>`; }).join("")}
    <p class="muted" style="font-size:12px">Toque para incluir na próxima linha vazia. Pode continuar escrevendo o exercício à mão na planilha.</p></div>`; }

/* ---------- Fotos e medidas por foto (estimativa) ----------
   Lê a pessoa na foto (no próprio aparelho, nada sai daqui), acha ombros, quadril e joelhos,
   e mede a largura do corpo em altura fixa. Compara datas em % da altura do corpo. */
const FT={sid:null,list:null,busy:"",cmpA:"",cmpB:"",pos:"frente",slide:50,err:""};
const MPV="0.10.14", MPB="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@"+MPV;
const MP_MODEL="https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
const FT_POS=[["frente","Frente"],["lado","Lado"],["costas","Costas"]];
const FT_REG=[["peito","Peito"],["cintura","Cintura"],["quadril","Quadril"],["coxa","Coxa"]];
let MP=null;
async function mpPose(){ if(MP) return MP; const v=await import(MPB+"/vision_bundle.mjs"); const fs=await v.FilesetResolver.forVisionTasks(MPB+"/wasm");
  MP=await v.PoseLandmarker.createFromOptions(fs,{baseOptions:{modelAssetPath:MP_MODEL,delegate:"CPU"},runningMode:"IMAGE",numPoses:1,outputSegmentationMasks:true}); return MP; }
function ftLocal(){ try{ return JSON.parse(localStorage.getItem("rp_fotos")||"{}")||{}; }catch(e){ return {}; } }
async function ftCol(sid){ const w=await DBW; return w? w.db.collection(`data/users/${w.uid}/fotos/${sid}/it`) : null; }
async function ftLoad(sid){ try{ const c=await ftCol(sid); let L;
    if(c){ const qs=await c.get(); L=qs.docs.map(d=>d.data()).filter(Boolean); } else L=Object.values(ftLocal()).filter(x=>x.sid===sid);
    return L.sort((a,b)=>(a.data+a.pos).localeCompare(b.data+b.pos)); }catch(e){ return []; } }
async function ftSave(f){ const c=await ftCol(f.sid); if(c){ await c.doc(f.id).set(f); return; } const o=ftLocal(); o[f.id]=f; try{ localStorage.setItem("rp_fotos",JSON.stringify(o)); }catch(e){ throw new Error("Sem espaço no aparelho para guardar a foto"); } }
async function ftDel(f){ const c=await ftCol(f.sid); if(c){ await c.doc(f.id).delete(); return; } const o=ftLocal(); delete o[f.id]; try{ localStorage.setItem("rp_fotos",JSON.stringify(o)); }catch(e){} }
function ftImg(file){ return new Promise((ok,no)=>{ const rd=new FileReader(); rd.onload=()=>{ const im=new Image(); im.onload=()=>ok(im); im.onerror=()=>no(new Error("Não consegui abrir a foto")); im.src=rd.result; }; rd.onerror=()=>no(new Error("Não consegui ler a foto")); rd.readAsDataURL(file); }); }
function ftCanvas(im,mx){ mx=mx||1024; const sc=Math.min(1,mx/Math.max(im.naturalWidth,im.naturalHeight)); const c=document.createElement("canvas"); c.width=Math.round(im.naturalWidth*sc); c.height=Math.round(im.naturalHeight*sc); c.getContext("2d").drawImage(im,0,0,c.width,c.height); return c; }
/* largura do pedaço contínuo do corpo que passa por x, na linha y */
function ftSpan(M,W,H,y,x){ y=Math.max(0,Math.min(H-1,Math.round(y))); x=Math.max(0,Math.min(W-1,Math.round(x))); const row=y*W;
  if(M[row+x]<0.5){ let best=-1,d=1e9; for(let i=0;i<W;i++) if(M[row+i]>=0.5&&Math.abs(i-x)<d){ d=Math.abs(i-x); best=i; } if(best<0||d>W*0.08) return null; x=best; }
  let a=x,b=x; while(a>0&&M[row+a-1]>=0.5) a--; while(b<W-1&&M[row+b+1]>=0.5) b++; return [a,b]; }
function ftMeasure(res,W,H,pos){ const lm=res.landmarks&&res.landmarks[0]; if(!lm) throw new Error("Não achei a pessoa na foto. Corpo inteiro, de pé, com boa luz.");
  const mk=res.segmentationMasks&&res.segmentationMasks[0]; if(!mk) throw new Error("Não consegui separar o corpo do fundo.");
  const M=mk.getAsFloat32Array(); const P=i=>({x:lm[i].x*W,y:lm[i].y*H,v:lm[i].visibility==null?1:lm[i].visibility});
  const sh=[P(11),P(12)], hp=[P(23),P(24)], kn=[P(25),P(26)], an=[P(27),P(28)];
  if(Math.min(an[0].v,an[1].v)<0.3&&Math.min(kn[0].v,kn[1].v)<0.3) throw new Error("A foto precisa pegar o corpo inteiro, da cabeça aos pés.");
  let top=-1,bot=-1; for(let y=0;y<H&&top<0;y++){ for(let x=0;x<W;x+=2) if(M[y*W+x]>=0.5){ top=y; break; } } for(let y=H-1;y>=0&&bot<0;y--){ for(let x=0;x<W;x+=2) if(M[y*W+x]>=0.5){ bot=y; break; } }
  const alt=bot-top; if(alt<H*0.35) throw new Error("A pessoa ficou pequena na foto. Chegue mais perto, mas com o corpo inteiro.");
  const sy=(sh[0].y+sh[1].y)/2, hy=(hp[0].y+hp[1].y)/2, ky=(kn[0].y+kn[1].y)/2, cx=(hp[0].x+hp[1].x+sh[0].x+sh[1].x)/4;
  const rows={peito:sy+0.25*(hy-sy),cintura:sy+0.62*(hy-sy),quadril:hy+0.10*(ky-hy),coxa:hy+0.35*(ky-hy)};
  const w={}, lines=[];
  Object.entries(rows).forEach(([k,y])=>{ let sp;
    if(k==="coxa"&&pos!=="lado"){ const L=[0,1].map(i=>ftSpan(M,W,H,y,hp[i].x+0.35*(kn[i].x-hp[i].x))).filter(Boolean); if(!L.length) return; const avg=L.reduce((t,s)=>t+(s[1]-s[0]+1),0)/L.length; w[k]=avg; L.forEach(s=>lines.push({k,y:y/H,x1:s[0]/W,x2:s[1]/W})); return; }
    sp=ftSpan(M,W,H,y,cx); if(!sp) return; w[k]=sp[1]-sp[0]+1; lines.push({k,y:y/H,x1:sp[0]/W,x2:sp[1]/W}); });
  const r={}; Object.keys(w).forEach(k=>r[k]=Math.round(w[k]/alt*10000)/100);
  const ang=(a,b)=>Math.round(Math.atan2(b.y-a.y,b.x-a.x)*1800/Math.PI)/10;
  const tilt= pos==="lado"? null : {ombro:ang(sh[1],sh[0]),quadril:ang(hp[1],hp[0])};
  if(mk.close) mk.close();
  return {r,lines,tilt,alt:alt/H,ar:Math.round(W/H*1000)/1000}; }
async function ftAdd(file,pos,dt){ const m=A(); FT.busy=`Lendo a foto de ${pos}…`; FT.err=""; fotoRender();
  try{ const im=await ftImg(file);
    const run=async mx=>{ const c=ftCanvas(im,mx); const pose=await mpPose(); return {c,res:pose.detect(c)}; };
    let c,res; try{ ({c,res}=await run(1024)); } catch(e1){ if(!/abort|memory|wasm|runtime|assert/i.test(String((e1&&e1.message)||e1))) throw e1; MP=null; FT.busy="Tentando de novo com a foto menor…"; fotoRender(); ({c,res}=await run(720)); }
    let meas; try{ meas=ftMeasure(res,c.width,c.height,pos); } finally{ try{ (res.segmentationMasks||[]).forEach(k=>{ try{ k.close&&k.close(); }catch(_){} }); }catch(_){} }
    const img=c.toDataURL("image/jpeg",0.72);
    const data=dt||isoD(new Date()); const old=(FT.list||[]).find(x=>x.data===data&&x.pos===pos);
    const f={id:old?old.id:nid(),sid:m.id,data,pos,img,meas}; await ftSave(f);
    FT.list=(FT.list||[]).filter(x=>x.id!==f.id).concat(f).sort((a,b)=>(a.data+a.pos).localeCompare(b.data+b.pos)); FT.busy=""; FT.cmpB=data; FT.pos=pos; fotoRender(); toast("Foto lida e guardada ✓"); }
  catch(e){ FT.busy=""; FT.err="Não consegui ler a foto: "+erroPT(e); fotoRender(); } }
/* circunferência aproximada pela elipse: largura (frente) × profundidade (lado) */
function ftCirc(fr,ld,altCm,k){ if(!fr||!ld||!altCm||!fr.meas.r[k]||!ld.meas.r[k]) return null; const a=fr.meas.r[k]*altCm/200, b=ld.meas.r[k]*altCm/200; return Math.round(Math.PI*(3*(a+b)-Math.sqrt((3*a+b)*(a+3*b)))); }
function ftDates(){ return [...new Set((FT.list||[]).map(x=>x.data))].sort(); }
function ftGet(d,pos){ return (FT.list||[]).find(x=>x.data===d&&x.pos===pos); }
function ftPic(f,cls){ if(!f) return `<div class="ftph ${cls||""}"><span>sem foto</span></div>`;
  const C={peito:"#2A5BD7",cintura:"#E8710A",quadril:"#7B3FC4",coxa:"#1E8E3E"};
  return `<div class="ftph ${cls||""} ${f.meas.ar?"ftar":""}" ${f.meas.ar?`style="aspect-ratio:${f.meas.ar}"`:""}><img src="${f.img}" alt="Foto de ${f.pos} em ${ddmm(f.data)}"><svg viewBox="0 0 100 100" preserveAspectRatio="none">${(f.meas.lines||[]).map(l=>`<line x1="${l.x1*100}" x2="${l.x2*100}" y1="${l.y*100}" y2="${l.y*100}" stroke="${C[l.k]}" stroke-width="0.9" vector-effect="non-scaling-stroke" style="stroke-width:3px"/>`).join("")}</svg></div>`; }
function ftTiltTxt(t){ if(!t) return ""; const s=(v,a,b)=> Math.abs(v)<1? `${a} alinhados` : `${v>0?b+" direito":b+" esquerdo"} mais baixo ${String(Math.abs(v)).replace(".",",")}°`; return `${s(t.ombro,"Ombros","Ombro")} · ${s(t.quadril,"Quadris","Quadril")}`; }
function fotoHTML(){ const m=A(); if(FT.sid!==m.id) return `<div class="card"><p class="muted">Carregando fotos…</p></div>`;
  const D=ftDates(); const A0=FT.cmpA||D[0]||"", B0=FT.cmpB||D[D.length-1]||""; const altCm=num(m.alt);
  const fa=ftGet(A0,FT.pos), fb=ftGet(B0,FT.pos);
  const rowsCmp= fa&&fb&&A0!==B0? FT_REG.map(([k,n])=>{ const a=fa.meas.r[k], b=fb.meas.r[k]; if(!a||!b) return ""; const d=Math.round((b-a)/a*1000)/10;
      const ca=ftCirc(ftGet(A0,"frente"),ftGet(A0,"lado"),altCm,k), cb=ftCirc(ftGet(B0,"frente"),ftGet(B0,"lado"),altCm,k);
      return `<tr><td>${n}</td><td class="${d<0?"dn":d>0?"up":""}">${d<0?"▼":d>0?"▲":"="} ${d>0?"+":""}${String(d).replace(".",",")}%</td><td>${ca&&cb?`${ca} → <b>${cb} cm</b>`:"–"}</td></tr>`; }).join("") : "";
  return `<div class="card ftcard">
    <p class="ftaviso">⚠ <b>Estimativa por foto.</b> Use só se não tiver equipamento (fita, adipômetro, bioimpedância) ou se não quiser usar. Serve para ver <b>tendência</b>, não é medida exata.</p>
    <details class="ftdicas"><summary><b>📋 Como tirar a foto para comparar sem erro</b></summary><ol>
      <li><b>Mesmo lugar</b> e mesmo fundo, liso e de cor diferente da roupa.</li>
      <li><b>Celular parado</b> (apoiado ou num tripé) na <b>altura do umbigo</b>, a uns <b>2,5 m</b>. Sempre a mesma distância: marque o chão.</li>
      <li><b>Corpo inteiro</b> na foto, da cabeça aos pés, sem cortar.</li>
      <li><b>Mesma roupa</b>, justa (top/short ou sunga), e cabelo preso.</li>
      <li><b>Braços afastados</b> do corpo (uns 30°) e pés na largura do quadril.</li>
      <li><b>Relaxado</b>: sem encolher a barriga e sem contrair.</li>
      <li><b>Mesmo horário</b>, de preferência de manhã, antes de comer.</li>
      <li>Boa luz, de frente para a pessoa, sem sombra forte.</li>
      <li>Para os cm: tire <b>frente e lado no mesmo dia</b> e preencha a altura lá em cima.</li></ol></details>
    <div class="ftadd">${FT_POS.map(([k,n])=>`<label class="btn ftbtn">📷 ${n}<input type="file" accept="image/*" capture="environment" data-ftadd="${k}" hidden></label>`).join("")}</div>
    <div class="ftgal"><b>🖼 Anexar foto que já está no celular</b><label class="ftgd">Data da foto <input class="inp" type="date" data-ftgdt value="${esc(FT.gdate||isoD(new Date()))}"></label>
      <div class="ftadd">${FT_POS.map(([k,n])=>`<label class="btn ftbtn ftbtng">🖼 ${n}<input type="file" accept="image/*" data-ftadd="${k}" data-ftgal hidden></label>`).join("")}</div></div>
    ${FT.busy?`<p class="ftbusy">⏳ ${FT.busy} <small>(a primeira vez demora mais)</small></p>`:""}${FT.err?`<p class="fterr">⚠ ${esc(FT.err)}</p>`:""}
    ${D.length?`<div class="ftcmp">
      <div class="ftpos" role="group" aria-label="Posição">${FT_POS.map(([k,n])=>`<button data-ftpos="${k}" aria-pressed="${FT.pos===k}">${n}</button>`).join("")}</div>
      <div class="ftsel"><label>Antes<select class="inp" data-ftsel="A">${D.map(d=>`<option value="${d}" ${d===A0?"selected":""}>${ddmm(d)}/${d.slice(2,4)}</option>`).join("")}</select></label>
        <label>Depois<select class="inp" data-ftsel="B">${D.map(d=>`<option value="${d}" ${d===B0?"selected":""}>${ddmm(d)}/${d.slice(2,4)}</option>`).join("")}</select></label></div>
      <div class="ftlado">${ftPic(fa)}${ftPic(fb)}</div>
      <div class="ftcap"><span>${A0?ddmm(A0):""}</span><span>${B0?ddmm(B0):""}</span></div>
      ${fa&&fb?`<div class="ftslide" style="--p:${FT.slide}%">${ftPic(fb,"ftb")}<div class="fttop">${ftPic(fa,"fta")}</div><input type="range" min="0" max="100" value="${FT.slide}" data-ftslide aria-label="Arraste para comparar antes e depois"></div><small class="muted">Arraste: esquerda = antes, direita = depois.</small>`:""}
      ${rowsCmp?`<table class="fttab"><thead><tr><th>Região</th><th>Mudou</th><th>Circunferência*</th></tr></thead><tbody>${rowsCmp}</tbody></table>
        <small class="muted">% = largura em relação à altura do corpo na foto. *cm só com frente e lado no mesmo dia e a altura preenchida. Linhas na foto: <b style="color:#2A5BD7">peito</b>, <b style="color:#E8710A">cintura</b>, <b style="color:#7B3FC4">quadril</b>, <b style="color:#1E8E3E">coxa</b>.</small>`:`<small class="muted">Escolha duas datas diferentes para comparar.</small>`}
      ${fb&&fb.meas.tilt?`<p class="fttilt">⚖️ <b>Simetria (${ddmm(B0)}):</b> ${ftTiltTxt(fb.meas.tilt)}</p>`:""}
      ${fb?`<button class="btn small ghost" data-ftdel="${fb.id}">🗑 Apagar a foto de ${FT_POS.find(x=>x[0]===fb.pos)[1].toLowerCase()} de ${ddmm(fb.data)}</button>`:""}
    </div>`:`<p class="muted">Ainda sem fotos de ${esc(first(m.name))}.</p>`}</div>`; }
function fotoRender(){ const el=document.getElementById("fotoBox"); if(!el) return; el.innerHTML=boxW("fotos","📸 Fotos e medidas (estimativa)",fotoHTML()); }
async function fotoMount(){ const v=document.getElementById("view-corpo"); if(!v) return; let el=document.getElementById("fotoBox"); if(!el){ el=document.createElement("div"); el.id="fotoBox"; v.appendChild(el); }
  const m=A(); if(FT.sid!==m.id){ FT.sid=m.id; FT.list=null; FT.cmpA=""; FT.cmpB=""; fotoRender(); FT.list=await ftLoad(m.id); FT.sid=m.id; }
  fotoRender(); }
document.addEventListener("change",e=>{ const t=e.target; if(!t.closest||!t.closest("#fotoBox")) return;
  if(t.hasAttribute("data-ftgdt")){ FT.gdate=t.value; return; }
  if(t.dataset.ftadd&&t.files&&t.files[0]){ ftAdd(t.files[0],t.dataset.ftadd, t.hasAttribute("data-ftgal")? (FT.gdate||"") : ""); t.value=""; return; }
  if(t.dataset.ftsel){ if(t.dataset.ftsel==="A") FT.cmpA=t.value; else FT.cmpB=t.value; fotoRender(); } });
document.addEventListener("input",e=>{ const t=e.target; if(!t.matches||!t.matches("[data-ftslide]")) return; FT.slide=+t.value; const w=t.closest(".ftslide"); if(w) w.style.setProperty("--p",FT.slide+"%"); });
document.addEventListener("click",async e=>{ const b=e.target.closest&&e.target.closest("#fotoBox [data-ftpos],#fotoBox [data-ftdel]"); if(!b) return;
  if(b.dataset.ftpos){ FT.pos=b.dataset.ftpos; fotoRender(); return; }
  if(b.dataset.ftdel){ if(b.dataset.arm!=="1"){ b.dataset.arm="1"; b.textContent="Toque de novo para apagar"; return; } const f=(FT.list||[]).find(x=>x.id===b.dataset.ftdel); if(!f) return; await ftDel(f); FT.list=FT.list.filter(x=>x.id!==f.id); fotoRender(); toast("Foto apagada"); } });
const _renderCorpo0=renderCorpo; renderCorpo=function(){ _renderCorpo0(); fotoMount(); };


/* ---------- Aba Relatório e planejamento do mês ---------- */
let RM_AL="", RM_YM="", RM_VER=null;
const CARD_OWNER={cFor:"Bacharel em Educação Física.\nPós-graduando em Biomecânica e Periodização.\nPós-graduando em Reabilitação de Lesões e Correção Postural.",cCur:"Levantamento de Peso Olímpico (LPO): Lift Like a Russian e Ogre Education.\nGinástica: Ogre Education.\nIRC e CWB L1.\nAvaliação e Prescrição de Treinos para CrossFit: BSB Strong.\nThe Lab Performance (2 vezes) e Elite Cross Performance.\nXmobility: mobilidade e ativação muscular.\nDiversas mentorias e workshops ligados à atividade física.",cExp:"Atuo com CrossFit desde 2014 e com musculação desde 2017.\nFui Head Coach em dois boxes de CrossFit: montei e conduzi treinos para mais de 100 alunos e coordenei equipes.",cref:"CREF 055013-G/MG"};
const brv=k=>{ const b=S.brand||{}; return b[k]!=null? b[k] : (window.RP_OWNER&&CARD_OWNER[k]!=null? CARD_OWNER[k] : ""); };
function rmYms(){ const t=new Date(); const f=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0"); const L=[-1,0,1].map(i=>f(new Date(t.getFullYear(),t.getMonth()+i,1))); return L; }
const MESL=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const ymTxt=ym=>{ const [y,m]=ym.split("-").map(Number); return MESL[m-1]+" de "+y; };
function cardApresHTML(){ const br=BR(); const L=t=>String(t||"").split(/\n+/).map(x=>x.trim()).filter(Boolean);
  const sec=(t,k)=>{ const l=L(brv(k)); return l.length? `<p class="pc-k" style="margin-top:8px">${t}</p><ul class="pc-fl" style="font-size:13.5px">${l.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>` : ""; };
  const b2=Object.assign({},br,{cref:brv("cref")});
  return `<div class="pcard" style="${thVars()}"><div class="pc-logo">${logoHTML()}<span class="pc-n">${esc(br.nome).toUpperCase()}</span><span class="pc-s">${esc(br.sub).toUpperCase()}</span></div>
    ${brv("cFoto")?`<img class="pc-foto" src="${brv("cFoto")}" alt="">`:""}<p class="pc-k">APRESENTAÇÃO PROFISSIONAL</p>${sec("FORMAÇÃO","cFor")}${sec("EXPERIÊNCIA","cExp")}${sec("CURSOS E CERTIFICAÇÕES","cCur")}
    ${br.lema?`<p class="pc-gold">“${esc(br.lema)}”</p>`:""}<p class="pc-sig">— ${esc(br.ass)}</p>${pcSocMain(b2)}<div class="pc-bar"></div></div>`; }
function pcSocMain(br){ const L=[]; if(br.insta) L.push("📷 "+esc(br.insta)); if(br.whats) L.push("📱 "+esc(br.whats)); if(br.site) L.push("🌐 "+esc(br.site)); if(br.rede2) L.push(esc(br.rede2)); return (L.length||br.cref)? `<div class="pc-soc">${L.length?`<span>${L.join(" · ")}</span>`:""}${br.cref?`<span>Registro profissional: <b>${esc(br.cref)}</b></span>`:""}</div>` : ""; }
let RM_CFG=null;
function rmField(lab,k,ph,rows){ const v=brv(k); return rows? `<label class="label msgl">${lab}<textarea class="inp" rows="${rows}" data-brv="${k}" placeholder="${esc(ph||"")}">${esc(v)}</textarea></label>` : `<label class="label msgl">${lab}<input class="inp" data-brv="${k}" value="${esc(v)}" placeholder="${esc(ph||"")}"></label>`; }
function rmCfgHTML(k){ const br=BR();
  if(k==="plan") return `<div class="rmcfg"><h3>Ajustar o planejamento</h3>
    <div class="rmsub"><b>Aviso de falta</b><label class="rmchk"><input type="checkbox" data-brk="avOn" ${br.avOn==="sim"?"checked":""}> Peço aviso de falta com antecedência</label>${rmField("Com quanto tempo?","avTempo","ex.: 1 hora, 3 horas, 1 dia")}<small class="muted">Sai assim: “Avise com pelo menos <b>${esc(br.avTempo||"X")}</b> de antecedência. Sem esse aviso, a aula é considerada dada.”</small></div>
    <div class="rmsub"><b>Aulas a mais da 5ª semana</b><label class="label msgl">O que você faz com elas<select class="inp" data-brv="q5"><option value="cobra" ${br.q5==="cobra"?"selected":""}>Cobro pelo valor da aula</option><option value="cortesia" ${br.q5==="cortesia"?"selected":""}>Dou sem cobrar, de cortesia</option><option value="gratis" ${br.q5!=="cobra"&&br.q5!=="cortesia"?"selected":""}>Dou sem cobrar, como contrapartida (compensam feriados e viagens)</option></select></label>${rmField("Texto das aulas a mais (opcional)","q5Txt","ex.: Este mês você tem {aulas} a mais, sem custo.",3)}</div>
    <div class="rmsub"><b>Frases do planejamento</b><label class="label msgl">Frases<select class="inp" data-brv="frases"><option value="sim" ${br.frases!=="nao"?"selected":""}>Com as minhas frases</option><option value="nao" ${br.frases==="nao"?"selected":""}>Sem frases: só as informações</option></select></label>${rmField("Mensagem principal","pMsg","Use {nome} e {n} (treinos do mês)",4)}${rmField("Frase em destaque","pGold","ex.: Seu eu do futuro vai se orgulhar.")}${rmField("Frase final (também sai no relatório)","pFim","ex.: Constância é o que traz resultado.")}</div>
    <button class="btn" data-rmcfg="plan">✓ Pronto</button></div>`;
  if(k==="fech") return `<div class="rmcfg"><h3>Ajustar o relatório</h3>
    <div class="rmsub"><b>Mensagens do relatório</b>${rmField("Quando fez todas as aulas","fOk","ex.: Parabéns, {nome}! Você completou todos os treinos do mês.",3)}${rmField("Quando faltou aulas","fNo","ex.: O importante é não desistir!",3)}${rmField("Frase final (também sai no planejamento)","pFim","")}</div>
    <div class="rmsub"><b>Regra de reposição</b> <small class="muted">(sai em vermelho quando tem falta)</small>${rmField("Regra","regra","ex.: Para a aula ser reposta, avise com pelo menos 1 hora de antecedência.",3)}</div>
    <p class="muted" style="font-size:13px;margin:0">Reposição, desconto ou aula dada de cada falta: marque no ✅ Controle de presença → Alunos → aluno → Repor aulas.</p>
    <button class="btn" data-rmcfg="fech">✓ Pronto</button></div>`;
  if(k==="card") return `<div class="rmcfg"><h3>Ajustar o cartão de apresentação</h3><p class="muted" style="font-size:13px;margin:0">Uma linha para cada item.</p>
    <div class="rmsub"><b>Sua foto (opcional)</b><div class="row" style="align-items:center">${brv("cFoto")?`<img class="rmfoto" src="${brv("cFoto")}" alt="Sua foto"><button class="btn small ghost" data-rmfotorm>Tirar a foto</button>`:""}<label class="btn small" for="rmFotoF" style="margin:0">${brv("cFoto")?"Trocar a foto":"Adicionar foto"}</label><input type="file" id="rmFotoF" accept="image/*" hidden></div></div>
    ${rmField("Formação","cFor","",3)}${rmField("Experiência","cExp","",3)}${rmField("Cursos e certificações","cCur","",6)}
    <div class="avform">${rmField("Site (opcional)","site","seusite.com.br")}${rmField("Outra rede (opcional)","rede2","ex.: TikTok @seuperfil")}</div>
    <button class="btn" data-rmcfg="card">✓ Pronto</button></div>`;
  if(k==="marca") return `<div class="rmcfg"><h3>Ajustar a sua marca</h3>${brandCardsHTML()}<button class="btn" data-rmcfg="marca">✓ Pronto</button></div>`;
  return ""; }
function ownerFix(){ if(!window.RP_OWNER||!S.brand) return; const b=S.brand; let ch=false; const F=(k,a,z)=>{ if(typeof b[k]==="string"&&b[k].includes(a)){ b[k]=b[k].split(a).join(z); ch=true; } };
  F("cref","CREF MG-055013","CREF 055013-G/MG"); F("cCur","X-Mobility","Xmobility");
  F("fNo","Parabéns por ter dado o seu máximo, {nome}! Lembre: é insistir e se esforçar, e o seu eu do futuro vai agradecer. O importante é não desistir e se reajustar para o próximo mês!","Parabéns pelo seu esforço, {nome}! Lembre-se: insistir e se esforçar é o que o seu eu do futuro vai agradecer. O importante é não desistir e se organizar para o próximo mês!");
  F("q5Txt","Em contrapartida, isso compensa os dias","Em contrapartida, elas compensam os dias"); if(ch) save(); }
function rmWaHTML(k){ let a=null; try{ a=PRES.listaAt().find(x=>x.id===RM_AL); }catch(_){} if(!a) return ""; let t=String(a.tel||"").replace(/\D/g,""); if(t&&t.length<=11) t="55"+t.replace(/^0+/,""); const nm=esc(String(a.nome).split(" ")[0]);
  if(!t) return `<p class="rmwa-no">Sem WhatsApp no cadastro de ${nm}: coloque o número em 👥 Alunos para abrir a conversa direto.</p>`;
  const msg=`Olá, ${String(a.nome).split(" ")[0]}! Segue o seu ${k==="plan"?"planejamento":"relatório"} de ${ymTxt(RM_YM)}.`;
  return `<a class="btn rmwa" href="https://wa.me/${t}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">📲 Enviar para ${nm}</a><small class="rmwa-tip">Abre a conversa de ${nm} com a mensagem pronta. Para ir a imagem junto: 1. toque em <b>Enviar</b> e salve a imagem; 2. toque em <b>Enviar para ${nm}</b>; 3. 📎 → Galeria → a imagem.</small>`; }
function renderRelMes(){ try{ ownerFix(); }catch(_){} const v=document.getElementById("view-relmes"); if(!v) return; const br=BR();
  let L=[]; try{ L=PRES.listaAt(); }catch(_){} const Y=rmYms(); if(!RM_YM||!Y.includes(RM_YM)) RM_YM=Y[1]; if(!L.some(a=>a.id===RM_AL)) RM_AL=(L[0]||{}).id||"";
  const prev= RM_VER? (RM_VER==="card"? cardApresHTML() : !RM_AL? "" : RM_VER==="plan"? PRES.planCard(RM_AL,RM_YM) : PRES.fechCard(RM_AL,RM_YM)) : "";
  const prevH= prev? `<div class="rmprev"><div class="rmph"><b>Como vai ficar</b><button class="btn small" data-rmver="x">✕ Fechar</button></div><div class="rmpw"><div class="rmps">${prev}</div></div><button class="rmsend" data-rmsend="${RM_VER}">${RM_VER==="card"?"🪪 Enviar cartão de apresentação":RM_VER==="plan"?"📅 Enviar planejamento":"📊 Enviar relatório"}</button></div>` : "";
  const blk=(k,cls,title,send,desc)=>`<div class="card rmb ${cls}"><h3 class="rmt">${title} ${qtip(k==="plan"?"rm_plan":k==="fech"?"rm_fech":"rm_card")}</h3><button class="rmsend" data-rmsend="${k}" ${k!=="card"&&!RM_AL?"disabled":""}>${send}</button>
    <div class="rmrow"><button class="btn rmver ${RM_VER===k?"on":""}" data-rmver="${k}">Ver antes de enviar</button><button class="btn rmadj ${RM_CFG===k?"on":""}" data-rmcfg="${k}">⚙ Ajustar ${k==="plan"?"planejamento":k==="fech"?"relatório":"cartão"}</button></div>
    ${k!=="card"?rmWaHTML(k):""}<p class="rmdesc">${desc}</p>${RM_VER===k?prevH:""}${RM_CFG===k?rmCfgHTML(k):""}</div>`;
  v.innerHTML=`${cadTopHTML(1)}<div class="rmhd"><h2 class="perso">📤 Relatório e planejamento do mês</h2><button class="privbtn privstk" data-priv aria-label="Ocultar ou mostrar os valores">${privInner()}</button></div>${slidesBox("relmes")}
  <div class="card rmpick"><label>Aluno<select class="inp" id="rmAl">${L.map(a=>`<option value="${esc(a.id)}" ${a.id===RM_AL?"selected":""}>${esc(a.nome)}</option>`).join("")||`<option value="">Nenhum aluno cadastrado</option>`}</select></label>
    <label>Mês<select class="inp" id="rmYm">${Y.map(y=>`<option value="${y}" ${y===RM_YM?"selected":""}>${ymTxt(y)}</option>`).join("")}</select></label></div>
  ${br.nome==="Seu nome"?`<p class="rmwarn">Coloque o seu nome em <b>⚙ Ajustar a sua marca</b>, lá embaixo, antes de enviar.</p>`:""}
  <div class="rmgrid">
  ${blk("plan","rmplan","📅 Planejamento do mês","Enviar planejamento do mês","Os <b>dias de treino</b>, os <b>feriados</b> (com ou sem treino), as <b>aulas a mais da 5ª semana</b> e o seu <b>aviso de falta</b>.")}
  ${blk("fech","rmfech","📊 Relatório do mês","Enviar relatório do mês","Os dias <b>desde o início do mês</b> (ou desde que o aluno começou), os <b>treinos feitos</b> e as <b>faltas</b>, cada uma com <b>reposição</b>, <b>desconto</b> ou <b>aula dada</b> e o motivo.")}
  </div>
  <div class="row" style="justify-content:center"><button class="btn small" data-rmall="plan">Planejamentos de todos os alunos (.zip)</button><button class="btn small" data-rmall="fech">Relatórios de todos os alunos (.zip)</button></div>
  <div class="card" id="socCard"><span class="label">📱 Suas redes e registro profissional (saem no fim da página)</span>
    <div class="avform">${rmField("Instagram","insta","@seuperfil")}${rmField("WhatsApp","whats","(31) 99999-9999")}${rmField("Site","site","seusite.com.br")}${rmField("Outra rede","rede2","ex.: TikTok @seuperfil")}${rmField("Registro profissional","cref","ex.: CREF 000000-G/MG")}</div></div>
  ${blk("card","rmcard","🪪 Cartão de apresentação","Enviar cartão de apresentação","A sua carreira numa imagem: <b>formação</b>, <b>experiência</b> e <b>cursos</b>, com a sua foto, se quiser. Bom para quem quer começar a treinar com você.")}
  <button class="btn rmmarca ${RM_CFG==="marca"?"on":""}" data-rmcfg="marca">⚙ Ajustar a sua marca (nome, logo e cores)</button>${RM_CFG==="marca"?rmCfgHTML("marca"):""}`;
  if(RM_CFG==="marca") wireBrand(v,()=>renderRelMes());
  v.querySelectorAll(".rmps").forEach(sc=>{ const w=sc.parentNode.clientWidth||340; sc.style.zoom=Math.min(1,w/600); });
  v.querySelectorAll("[data-brv]").forEach(i=>{ const f=()=>{ S.brand=Object.assign({},S.brand||{},{[i.dataset.brv]:i.tagName==="TEXTAREA"?i.value:i.value.trim()}); save(); }; i.oninput=f; i.onchange=()=>{ f(); if(RM_VER||i.tagName==="SELECT") renderRelMes(); }; });
  v.querySelectorAll("[data-brk]").forEach(i=>i.onchange=()=>{ S.brand=Object.assign({},S.brand||{},{[i.dataset.brk]:i.checked?"sim":"nao"}); save(); renderRelMes(); });
  const ff=v.querySelector("#rmFotoF"); if(ff) ff.onchange=()=>{ const f=ff.files&&ff.files[0]; if(!f) return; const rd=new FileReader(); rd.onload=()=>{ const im=new Image(); im.onload=()=>{ const M=360,k=Math.min(1,M/Math.max(im.width,im.height)); const c=document.createElement("canvas"); c.width=Math.round(im.width*k); c.height=Math.round(im.height*k); c.getContext("2d").drawImage(im,0,0,c.width,c.height); S.brand=Object.assign({},S.brand||{},{cFoto:c.toDataURL("image/jpeg",0.85)}); save(); renderRelMes(); toast("Foto salva"); }; im.onerror=()=>toast("Não consegui abrir essa foto"); im.src=rd.result; }; rd.readAsDataURL(f); };
  const fr=v.querySelector("[data-rmfotorm]"); if(fr) fr.onclick=()=>{ S.brand=Object.assign({},S.brand||{},{cFoto:""}); save(); renderRelMes(); };
  const al=v.querySelector("#rmAl"); if(al) al.onchange=()=>{ RM_AL=al.value; renderRelMes(); };
  const ym=v.querySelector("#rmYm"); if(ym) ym.onchange=()=>{ RM_YM=ym.value; renderRelMes(); }; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-rmver],[data-rmsend],[data-rmall],[data-goto-relmes],[data-rmcfg]"); if(!b) return;
  if(b.dataset.rmcfg){ RM_CFG= RM_CFG===b.dataset.rmcfg? null : b.dataset.rmcfg; if(RM_CFG) RM_VER=null; renderRelMes(); if(RM_CFG) setTimeout(()=>{ const c=document.querySelector("#view-relmes .rmcfg"); if(c) c.scrollIntoView({behavior:"smooth",block:"start"}); },60); return; }
  if(b.hasAttribute("data-goto-relmes")){ show("relmes"); return; }
  if(b.dataset.rmver){ RM_VER= b.dataset.rmver==="x"||RM_VER===b.dataset.rmver? null : b.dataset.rmver; if(RM_VER) RM_CFG=null; renderRelMes(); if(RM_VER) setTimeout(()=>{ const p=document.querySelector("#view-relmes .rmprev"); if(p) p.scrollIntoView({behavior:"smooth",block:"start"}); },60); return; }
  if(b.dataset.rmall){ PRES.gerarTodos(b.dataset.rmall,RM_YM); return; }
  const t=b.dataset.rmsend; if(t==="card"){ PRES.sendHTML(cardApresHTML(),"Apresentacao-"+noAcc(BR().nome).replace(/[^A-Za-z0-9]+/g,"-")); return; }
  if(!RM_AL){ toast("Escolha o aluno"); return; } PRES.gerar(RM_AL,t,RM_YM); });


/* Financeiro: ocultar os valores (para mostrar o sistema sem expor quanto ganha) */
try{ window.RP_PRIV=localStorage.getItem("rp_priv")==="1"; }catch(_){}
function privInner(){ const eye='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>'+(window.RP_PRIV?'<path d="M4 20L20 4"/>':'')+'</svg>';
  return eye+(window.RP_PRIV?"<span>mostrar<br>valores</span>":"<span>ocultar<br>valores</span>"); }
function privPaint(){ document.querySelectorAll("[data-priv]").forEach(b=>{ b.innerHTML=privInner(); b.setAttribute("aria-label",window.RP_PRIV?"Mostrar os valores":"Ocultar os valores"); }); }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-priv]"); if(!b) return; window.RP_PRIV=!window.RP_PRIV; try{ localStorage.setItem("rp_priv",window.RP_PRIV?"1":"0"); }catch(_){} privPaint(); try{ show(CUR_TAB); }catch(_){} });
setTimeout(privPaint,0);

/* ---------- Enviar treinos para alunos (só para o dono, por enquanto) ----------
   Cartões só com o treino, importados do que foi lançado na Sessão/Programação.
   Cada exercício tem um espaço para a animação (entra quando os vídeos forem comprados). */
let ENV_SID=null, ENV_ASK=false, ENV_OPEN={};
function envOn(){ return !!window.RP_OWNER; }
function envStore(){ if(!S.envio||typeof S.envio!=="object") S.envio={}; return S.envio; }
function envOf(sid){ const E=envStore(); if(!E[sid]) E[sid]={cards:[]}; return E[sid]; }
/* mídia do exercício: quando houver biblioteca, S.exMedia["nome sem acento"]=url do vídeo/gif */
function envMedia(n){ const M=S.exMedia||{}; return M[noAcc(String(n||"")).toLowerCase().trim()]||""; }
function envDate(w,dy){ const i=DAYS.indexOf(dy); return w&&w.start&&i>=0? addDays(w.start,i) : ""; }
function envImport(sid){
  const st=stById(sid); if(!st) return 0; const desc=S.weeks.slice().sort((a,b)=>a.start<b.start?1:-1); const seen={}, cards=[];
  desc.forEach(w=>DAYS.forEach(dy=>{ const d=dayOf(w.id,sid,dy); if(!dayHasData(d)) return; const L= byDia(sid)? "" : (ltrOf(sid,w.id,dy,d)||""); const key= L? "L"+L : "D"+dy; if(seen[key]) return; seen[key]=1;
    const ex=(d.rows||[]).filter(r=>String(r.n1||"").trim()).map(r=>{ const Ls=rowLines(r); const k=mainMuscle(String(r.n1).split("+")[0]);
      return {id:nid(),n:String(r.n1).trim(),lines:Ls.map(l=>(r.conj&&Ls.length>1&&!l.sub? l.n+": " : l.sub? "↳ " : "")+setTxt(l.x,1,l.u)),tec:tecLbl(r)||"",iso:!!r.iso,cj:!!r.cj,mus:k&&MUSCLES[k]? MUSCLES[k].n : ""}; });
    const c=d.cardio||{}, wd=d.wod||{};
    const cardio= num(c.t)? `${c.tipo||"Cardio"} · ${c.t} min${c.z?` · zona ${c.z}`:""}` : "";
    const wod= (num(wd.t)||String(wd.desc||"").trim())? `${wd.tipo||"Método"}${num(wd.t)?` · ${wd.t} min`:""}${String(wd.desc||"").trim()?` · ${String(wd.desc).trim()}`:""}` : "";
    if(!ex.length&&!cardio&&!wod) return;
    cards.push({id:nid(),ltr:L,dy,dt:envDate(w,dy),t: L? "Treino "+L : DAY_N[dy]||dy,ex,cardio,wod,obs:""}); }));
  const ord=c=> c.ltr? "0"+c.ltr : "1"+DAYS.indexOf(c.dy); cards.sort((a,b)=>ord(a)<ord(b)?-1:1);
  const E=envOf(sid); E.cards=cards; E.imp=isoD(new Date()); save(); return cards.length; }
function envText(st,cards){ const nm=first(st.name);
  return cards.map(c=>{ let t=`🏋️ *${c.t}*${c.ltr&&c.dy?` (${DAY_N[c.dy]||c.dy})`:""} · ${nm}\n`;
    c.ex.forEach((e,i)=>{ t+=`\n*${i+1}. ${e.n}*${e.tec?` · _${e.tec}_`:""}${e.cj?" 🔗":""}\n`+e.lines.map(l=>"   "+l).join("\n"); const u=envMedia(e.n); if(u) t+=`\n   ▶ Ver a execução: ${u}`; });
    if(c.cardio) t+=`\n\n❤️ ${c.cardio}`; if(c.wod) t+=`\n🔥 ${c.wod}`; if(String(c.obs||"").trim()) t+=`\n\n📝 ${String(c.obs).trim()}`; return t; }).join("\n\n— — —\n\n")+"\n\nBom treino! 💪"; }
function envCardHTML(c,i){ const open=ENV_OPEN[c.id]!==false;
  return `<article class="envc${open?"":" shut"}" data-envc="${c.id}">
    <header class="envch"><button class="envtg" data-envtg="${c.id}" aria-expanded="${open}"><span class="envltr">${esc(c.ltr||DAY_N[c.dy]&&c.dy||"•")}</span><span class="envtt"><b>${esc(c.t)}</b><small>${c.ex.length} exercício${c.ex.length===1?"":"s"}${c.ltr&&c.dy?` · ${DAY_N[c.dy]}`:""}${c.dt?` · lançado ${ddmm(c.dt)}`:""}${c.sent?` · <i class="envok">✓ enviado ${ddmm(c.sent)}</i>`:""}</small></span><span class="envchev" aria-hidden="true">${open?"▾":"▸"}</span></button></header>
    ${open?`<ol class="envex">${c.ex.map(e=>{ const u=envMedia(e.n);
      const y=envYt(u); return `<li class="envx${e.cj?" cj":""}"><button type="button" class="envmd" data-envpl="${c.id}|${e.id}" aria-label="Ver a animação de ${esc(e.n)}">${u? (y? `<img src="https://i.ytimg.com/vi/${y}/mqdefault.jpg" alt=""><span class="envplay">▶</span>` : /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u)? `<video src="${esc(u)}" autoplay loop muted playsinline></video>` : `<img src="${esc(u)}" alt="">`) : `<div class="envph" title="A animação do exercício entra aqui"><span class="envphi">▶</span><span>${esc(e.mus||"animação")}</span></div>`}</button>
        <div class="envxb"><b>${esc(e.n)}</b>${e.tec?`<span class="envtec">${esc(e.tec)}</span>`:""}${e.lines.map(l=>`<span class="envln">${esc(l)}</span>`).join("")}${e.cj?`<span class="envcj">🔗 junto com o próximo</span>`:""}</div>
        <button class="envdel" data-envxdel="${c.id}|${e.id}" aria-label="Tirar ${esc(e.n)} deste cartão" title="Tirar do cartão">✕</button></li>`; }).join("")}</ol>
    ${c.cardio||c.wod?`<div class="envcar">${c.cardio?`<span>❤️ ${esc(c.cardio)}</span>`:""}${c.wod?`<span>🔥 ${esc(c.wod)}</span>`:""}</div>`:""}
    <label class="envobs"><span class="label">Recado para o aluno (opcional)</span><textarea class="inp" rows="2" data-envobs="${c.id}" placeholder="Ex.: descanso de 60&quot; entre as séries">${esc(c.obs||"")}</textarea></label>
    <div class="envca"><button class="btn primary" data-envsend="${c.id}">📲 Enviar este treino</button><button class="btn small" data-envcp="${c.id}">📋 Copiar</button><button class="btn small danger" data-envcdel="${c.id}">🗑 Tirar cartão</button></div>`:""}
  </article>`; }
function renderEnvio(){ const v=document.getElementById("view-envio"); if(!v) return; if(!envOn()){ v.innerHTML=""; return; }
  if(!ENV_SID||!stById(ENV_SID)) ENV_SID= (stById(S.active)||S.students[0]||{}).id; const st=stById(ENV_SID); if(!st){ v.innerHTML=`<p class="muted">Cadastre um aluno primeiro.</p>`; return; }
  const E=envOf(st.id), cards=E.cards||[], tel=telOf(st);
  v.innerHTML=`<div class="envw">
    <div class="envhd"><h2>📲 Enviar treinos</h2><p class="muted">Só você vê esta aba. Importe os treinos que já passou para o aluno, confira os cartões e envie.</p></div>
    <div class="envst" role="group" aria-label="Escolher aluno">${S.students.map(x=>`<button class="envsb${x.id===st.id?" on":""}" data-envst="${x.id}" aria-pressed="${x.id===st.id}">${esc(first(x.name))}${(envStore()[x.id]||{}).cards&&envStore()[x.id].cards.length?` <small>${envStore()[x.id].cards.length}</small>`:""}</button>`).join("")}</div>
    <div class="card envimp">
      <div><b>${esc(st.name)}</b><small class="muted">${E.imp?`Importado em ${ddmm(E.imp)} · ${cards.length} cartão${cards.length===1?"":"ões"}`:"Nenhum treino importado ainda"}${tel?"":" · sem WhatsApp no cadastro (vai abrir para escolher o contato)"}</small></div>
      ${ENV_ASK?`<div class="envask"><span>Importar de novo troca os cartões atuais (recados e exclusões feitos aqui se perdem).</span><div><button class="btn primary small" data-envimp="1">Sim, importar</button><button class="btn small" data-envno>Cancelar</button></div></div>`
        :`<button class="btn ${cards.length?"":"primary"}" data-envimp="${cards.length?"ask":"1"}">📥 ${cards.length?"Importar de novo":"Importar treinos que passei"}</button>`}
    </div>
    ${cards.length? `<div class="envall"><button class="btn primary" data-envsend="all">📲 Enviar todos (${cards.length}) pelo WhatsApp</button><button class="btn small" data-envcp="all">📋 Copiar todos</button></div>
      <div class="envlist">${cards.map(envCardHTML).join("")}</div>
      <p class="envnote muted">▶ Toque no quadro escuro do exercício para abrir a animação. Sem animação ainda? Cole ali o link do vídeo (YouTube, MP4 ou GIF): ele vale para esse exercício em todos os alunos e vai junto no WhatsApp.</p>`
    : E.imp? `<p class="muted envempty">Não achei treino lançado para ${esc(first(st.name))}. Lance o treino na <b>Sessão do dia</b> e importe de novo.</p>` : ""}
  </div>`; }
function envKey(n){ return noAcc(String(n||"")).toLowerCase().trim(); }
function envYt(u){ const m=String(u||"").match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/); return m? m[1] : ""; }
function envMediaHTML(u,big){ const y=envYt(u);
  if(y) return `<iframe src="https://www.youtube-nocookie.com/embed/${y}?autoplay=1&mute=1&loop=1&playlist=${y}&playsinline=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Animação do exercício"></iframe>`;
  if(/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u)) return `<video src="${esc(u)}" autoplay loop muted playsinline ${big?"controls":""}></video>`;
  if(/^https?:\/\//i.test(u)) return `<img src="${esc(u)}" alt="Animação do exercício">`;
  return ""; }
let ENV_PL=null;
function envPlRender(){ let o=document.getElementById("envPop"); if(!ENV_PL){ if(o){ o.hidden=true; o.innerHTML=""; } return; }
  const c=envCard(ENV_PL.cid), e=c&&c.ex.find(x=>x.id===ENV_PL.xid); if(!e){ ENV_PL=null; if(o){ o.hidden=true; o.innerHTML=""; } return; }
  if(!o){ o=document.createElement("div"); o.id="envPop"; o.className="envpop"; document.body.appendChild(o); }
  const u=envMedia(e.n), m=u? envMediaHTML(u,true) : "", ed=ENV_PL.edit||!u;
  o.innerHTML=`<div class="envpb" role="dialog" aria-modal="true" aria-label="Animação de ${esc(e.n)}">
    <div class="envph2"><div><b>${esc(e.n)}</b><small>${esc(c.t)}${e.mus?` · ${esc(e.mus)}`:""}</small></div><button class="btn small" data-envplx>✕ Fechar</button></div>
    <div class="envstage">${m||`<div class="envph envph-big"><span class="envphi">▶</span><span>Este exercício ainda não tem animação</span></div>`}</div>
    <div class="envpres">${e.tec?`<span class="envtec">${esc(e.tec)}</span>`:""}${e.lines.map(l=>`<span class="envln">${esc(l)}</span>`).join("")}</div>
    ${ed?`<div class="envlk"><label class="label" for="envLk">Link do vídeo deste exercício</label><input id="envLk" class="inp" type="url" inputmode="url" placeholder="https://youtu.be/... ou link .mp4 / .gif" value="${esc(u)}"><div class="envyt"><a class="btn" href="https://www.youtube.com/results?search_query=${encodeURIComponent(e.n+" execução correta")}" target="_blank" rel="noopener">🔎 Buscar no YouTube</a><button class="btn" data-envpaste>📋 Colar link copiado</button></div>
      <small class="muted">No YouTube: abra o vídeo → <b>Compartilhar</b> → <b>Copiar link</b> → volte aqui e toque em <b>Colar link copiado</b>. Vale para "${esc(e.n)}" em todos os alunos e vai junto no WhatsApp.</small><div class="envca0"><button class="btn primary" data-envlks>Salvar</button>${u?`<button class="btn small" data-envlkc>Cancelar</button><button class="btn small danger" data-envlkd>Tirar o vídeo</button>`:""}</div></div>`
      :`<div class="envca0"><button class="btn small" data-envlke>✏️ Trocar o vídeo</button></div>`}
  </div>`; o.hidden=false; }
document.addEventListener("click",e=>{ const t=e.target; if(!t.closest) return; const pop=t.closest("#envPop"); if(!pop) return;
  if(t===pop||t.closest("[data-envplx]")){ ENV_PL=null; envPlRender(); return; }
  if(t.closest("[data-envlke]")){ ENV_PL.edit=true; envPlRender(); setTimeout(()=>{ const i=document.getElementById("envLk"); if(i) i.focus(); },50); return; }
  if(t.closest("[data-envlkc]")){ ENV_PL.edit=false; envPlRender(); return; }
  const c=envCard(ENV_PL&&ENV_PL.cid), x=c&&c.ex.find(y=>y.id===ENV_PL.xid); if(!x) return;
  if(t.closest("[data-envpaste]")){ const save1=v=>{ v=String(v||"").trim(); const m=v.match(/https?:\/\/\S+/i); if(!m){ toast("Não achei um link copiado. Copie o link do vídeo e tente de novo."); return; } const i=document.getElementById("envLk"); if(i) i.value=m[0]; S.exMedia=Object.assign({},S.exMedia||{}); S.exMedia[envKey(x.n)]=m[0]; save(); ENV_PL.edit=false; envPlRender(); renderEnvio(); toast("Vídeo salvo para "+x.n); };
    try{ navigator.clipboard.readText().then(save1,()=>toast("O celular não deixou ler o copiado. Segure no campo do link e escolha Colar.")); }catch(_){ toast("Segure no campo do link e escolha Colar."); } return; }
  if(t.closest("[data-envlks]")){ const v=String((document.getElementById("envLk")||{}).value||"").trim(); if(!/^https?:\/\/\S+$/i.test(v)){ toast("Cole um link que comece com https://"); return; }
    S.exMedia=Object.assign({},S.exMedia||{}); S.exMedia[envKey(x.n)]=v; save(); ENV_PL.edit=false; envPlRender(); renderEnvio(); toast("Vídeo salvo para "+x.n); return; }
  if(t.closest("[data-envlkd]")){ if(S.exMedia){ delete S.exMedia[envKey(x.n)]; save(); } ENV_PL.edit=false; envPlRender(); renderEnvio(); toast("Vídeo tirado"); return; }
});
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&ENV_PL){ ENV_PL=null; envPlRender(); } });
function envCard(id){ const E=envOf(ENV_SID); return (E.cards||[]).find(c=>c.id===id); }
function envCopy(t){ try{ navigator.clipboard.writeText(t).then(()=>toast("Treino copiado. Cole no WhatsApp do aluno."),()=>toast("Não consegui copiar. Use o botão Enviar.")); }catch(_){ toast("Não consegui copiar. Use o botão Enviar."); } }
document.addEventListener("click",e=>{ const t=e.target; if(!t.closest||!t.closest("#view-envio")||!envOn()) return; let b;
  if(b=t.closest("[data-envpl]")){ const [cid,xid]=b.dataset.envpl.split("|"); ENV_PL={cid,xid}; envPlRender(); return; }
  if(b=t.closest("[data-envst]")){ ENV_SID=b.dataset.envst; ENV_ASK=false; renderEnvio(); return; }
  if(b=t.closest("[data-envimp]")){ if(b.dataset.envimp==="ask"){ ENV_ASK=true; renderEnvio(); return; } ENV_ASK=false; const n=envImport(ENV_SID); renderEnvio(); toast(n? `${n} treino${n===1?"":"s"} importado${n===1?"":"s"}` : "Nenhum treino lançado para este aluno"); return; }
  if(t.closest("[data-envno]")){ ENV_ASK=false; renderEnvio(); return; }
  if(b=t.closest("[data-envtg]")){ const id=b.dataset.envtg; ENV_OPEN[id]= ENV_OPEN[id]===false; renderEnvio(); return; }
  if(b=t.closest("[data-envxdel]")){ const [cid,xid]=b.dataset.envxdel.split("|"); const c=envCard(cid); if(c){ c.ex=c.ex.filter(x=>x.id!==xid); save(); renderEnvio(); toast("Exercício tirado deste cartão (o treino original não muda)"); } return; }
  if(b=t.closest("[data-envcdel]")){ const E=envOf(ENV_SID); E.cards=E.cards.filter(c=>c.id!==b.dataset.envcdel); save(); renderEnvio(); toast("Cartão tirado"); return; }
  const st=stById(ENV_SID); if(!st) return;
  if(b=t.closest("[data-envcp]")){ const E=envOf(ENV_SID); const L= b.dataset.envcp==="all"? E.cards : [envCard(b.dataset.envcp)].filter(Boolean); if(L.length) envCopy(envText(st,L)); return; }
  if(b=t.closest("[data-envsend]")){ const E=envOf(ENV_SID); const L= b.dataset.envsend==="all"? E.cards : [envCard(b.dataset.envsend)].filter(Boolean); if(!L.length) return;
    waOpen(st,envText(st,L)); const td=isoD(new Date()); L.forEach(c=>c.sent=td); save(); setTimeout(renderEnvio,300); return; }
});
document.addEventListener("input",e=>{ const t=e.target; if(!t.matches||!t.matches("[data-envobs]")) return; const c=envCard(t.dataset.envobs); if(c){ c.obs=t.value.slice(0,600); save(); } });

/* ---------- Navegação ---------- */
function show(tab,force){
  if(tab==="fases"||tab==="guia"||tab==="ajuda") tab="semana";
  if(tab==="volume"||tab==="treino") tab="semana";
  if(!abaOk(tab)&&!force) tab="cadastro"; FORCE_TAB= force? tab : null;
  if(tab==="perso"){ tab="perfil"; PERSO_OPEN=true; }
  CUR_TAB=tab; try{ document.body.dataset.tab=tab; }catch(_){} const view= (tab==="presenca"||tab==="financeiro"||tab==="agenda")? "pres" : (tab==="perfil"||tab==="perso")? "cadastro" : tab;
  document.getElementById("wrap").classList.toggle("wide", tab==="sessao"); document.body.classList.toggle("tab-sessao", tab==="sessao");
  document.getElementById("phaseStrip").hidden = true;
  document.getElementById("top").hidden = view==="pres" || view==="cadastro" || view==="relmes" || view==="envio";
  document.querySelectorAll("section.view").forEach(s=>s.hidden = s.dataset.view!==view);
  agSet(tab==="agenda"); document.getElementById("agOpen").hidden=true;
  if(view==="pres"){ PRES.setMode(tab==="financeiro"?"fin":"pres"); const hb=document.getElementById("presHelp"); hb.dataset.help=tab==="agenda"?"presenca":tab; hb.textContent="ⓘ Entenda "+TAB_N[tab]; hb.hidden=tab==="agenda"; let sb=document.getElementById("presSl"); if(!sb){ sb=document.createElement("div"); sb.id="presSl"; const top=document.querySelector("#pres .phead2"); if(top) top.insertAdjacentElement("afterend",sb); } if(sb) sb.innerHTML=slidesBox(tab==="financeiro"?"financeiro":tab==="agenda"?"agenda":"presenca"); }
  if(view==="cadastro") renderCadastro();
  if(view==="relmes") renderRelMes();
  if(view==="envio") renderEnvio();
  document.querySelectorAll(".tabs button").forEach(b=>b.setAttribute("aria-selected", b.dataset.tab===(tab==="semana"?"sessao":tab)));
  try{ progTop(); }catch(_){} try{ applyStuCor(); }catch(_){} setTimeout(()=>{ try{ scRender(); }catch(_){} },0);
  try{ localStorage.setItem("sf_tab",tab); }catch(e){}
  renderTurnbar(); setTimeout(alrBadge,0);
  window.scrollTo(0,0);
}
document.querySelector(".tabs").addEventListener("click",e=>{ const b=e.target.closest("[data-tab]"); if(b) show(b.dataset.tab); });
let toastT; function toast(msg){ const t=document.getElementById("toast"); t.textContent=msg; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2200); }

let AUTO_KEY=null;
let FROZEN=false;
function renderAll(){ try{ rpAbLay(); }catch(e){} try{ sideCtl(); }catch(e){} try{ applyAbas(); }catch(e){} try{ applySiteCor(); }catch(e){} if(S.seed){ delete S.seed; } ensureWeeks(); setTimeout(()=>{ try{ renderPayAlert(); }catch(e){} },0); if(!FROZEN){ FROZEN=true; try{ if(freezeAll()) save(); }catch(e){} }
  const imp=importGrade(); const key=cloud.ready?"c":"l"; if(AUTO_KEY!==key){ AUTO_KEY=key; autoToday(); }
  if(imp) save(); renderTop(); renderGuia(); if(cadDraft&&document.querySelector("#view-cadastro .cadf")) cadPull(); renderCadastro(); renderSemana(); renderTreino(); renderSessao(); renderCorpo(); try{ if(CUR_TAB==="envio") renderEnvio(); }catch(e){} }
renderAll();
setCloud("connecting");
startCloud();
let startTab="cadastro"; try{ startTab=localStorage.getItem("sf_tab")||"cadastro"; }catch(e){}
if(["envio","perfil","perso","relmes","cadastro","guia","fases","semana","treino","sessao","corpo","volume","presenca","agenda","financeiro","ajuda"].includes(startTab)) show(startTab);
