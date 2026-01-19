import{_ as E,r as u,c as R,a as P,o as a,w as V,b as s,i as q,j as H,k as B,v as F,d as i,e as v,F as k,f as w,n as O,t as d,l as A}from"./index-CHE1v2wp.js";import{B as D}from"./BaseSimulator-DT3Xhfq3.js";const $={class:"stata-interface"},j={class:"command-window"},z={class:"command-body"},K=["placeholder","onKeydown"],N=["disabled"],Y={class:"results-window"},G={class:"window-header"},L={key:0,class:"command-echo"},I={key:1},U={key:2,class:"error-output"},J={key:0,class:"results-placeholder"},Q={class:"variables-panel"},X={class:"variables-list"},Z={class:"var-name"},tt={class:"var-type"},et={__name:"StataCodeEditor",props:{task:{type:Object,required:!0}},emits:["correct","incorrect"],setup(p,{expose:x,emit:_}){const c=p,y=_,o=u(c.task.starterCode||""),l=u([]),h=u(!1),m=u(null),f=u(null),C=R(()=>c.task.variables||[{name:"age",type:"int"},{name:"score",type:"float"},{name:"group",type:"str"},{name:"pretest",type:"float"},{name:"posttest",type:"float"}]);function b(){const r=o.value.split(`
`).filter(e=>e.trim());for(const e of r){l.value.push({type:"command",text:e.trim()});const t=S(e.trim());l.value.push(...t)}A(()=>{f.value&&(f.value.scrollTop=f.value.scrollHeight)})}function S(r){const e=[],t=r.toLowerCase();if(t.startsWith("summarize")||t.startsWith("sum "))e.push({type:"output",text:`    Variable |        Obs        Mean    Std. dev.       Min        Max
-------------+---------------------------------------------------------
       score |         50       72.34       12.45         45         98
         age |         50       28.64        5.23         21         42`});else if(t.startsWith("tabulate")||t.startsWith("tab "))e.push({type:"output",text:`      group |      Freq.     Percent        Cum.
------------+-----------------------------------
    Control |         25       50.00       50.00
  Treatment |         25       50.00      100.00
------------+-----------------------------------
      Total |         50      100.00`});else if(t.startsWith("ttest"))e.push({type:"output",text:`Two-sample t test with equal variances
------------------------------------------------------------------------------
   Group |     Obs        Mean    Std. err.   Std. dev.   [95% conf. interval]
---------+--------------------------------------------------------------------
 Control |      25       68.24       2.345      11.725       63.41       73.07
Treatmnt |      25       76.44       2.156      10.780       71.99       80.89
---------+--------------------------------------------------------------------
Combined |      50       72.34       1.761      12.451       68.80       75.88
---------+--------------------------------------------------------------------
    diff |              -8.200       3.185                  -14.60       -1.80
------------------------------------------------------------------------------
    diff = mean(Control) - mean(Treatmnt)                         t =  -2.5745
H0: diff = 0                                     Degrees of freedom =       48

    Ha: diff < 0                 Ha: diff != 0                 Ha: diff > 0
 Pr(T < t) = 0.0066         Pr(|T| > |t|) = 0.0132          Pr(T > t) = 0.9934`});else if(t.startsWith("correlate")||t.startsWith("corr ")||t.startsWith("pwcorr"))e.push({type:"output",text:`             |    score      age  pretest
-------------+---------------------------
       score |   1.0000
         age |   0.2341   1.0000
     pretest |   0.7823   0.1245   1.0000`});else if(t.startsWith("regress")||t.startsWith("reg "))e.push({type:"output",text:`      Source |       SS           df       MS      Number of obs   =        50
-------------+----------------------------------   F(1, 48)        =     45.23
       Model |  2345.67890         1  2345.67890   Prob > F        =    0.0000
    Residual |  2489.12345        48    51.85674   R-squared       =    0.4852
-------------+----------------------------------   Adj R-squared   =    0.4745
       Total |  4834.80235        49    98.66943   Root MSE        =    7.2012

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
     pretest |   .7823456   .1163456     6.73   0.000     .5483456    1.016346
       _cons |   23.45678   8.234567     2.85   0.006     6.897654    40.01591
------------------------------------------------------------------------------`});else if(t.startsWith("describe")||t.startsWith("desc"))e.push({type:"output",text:`Contains data
  Observations:            50
    Variables:             5

Variable      Storage   Display    Value
    name         type    format    label
-------------------------------------------------------------------------------
age             int     %8.0g
score           float   %9.0g
group           str10   %10s
pretest         float   %9.0g
posttest        float   %9.0g`});else if(t.startsWith("anova")||t.startsWith("oneway"))e.push({type:"output",text:`                           Analysis of variance
    Source              SS         df      MS            F     Prob > F
------------------------------------------------------------------------
Between groups      1234.5678      2     617.2839      8.45     0.0007
 Within groups      3432.1098     47      73.0236
------------------------------------------------------------------------
    Total           4666.6776     49      95.2383`});else if(t.startsWith("histogram")||t.startsWith("hist "))e.push({type:"output",text:`(bin=7, start=45, width=7.5714286)

[Histogram displayed in Graph window]`});else if(t&&!t.startsWith("*")&&!t.startsWith("//")){const n=t.split(/\s+/);n.length>1?e.push({type:"output",text:"(output omitted for brevity)"}):e.push({type:"error",text:`unrecognized command: ${n[0]}
r(199);`})}return e}function W(){l.value=[]}function M(){const r=c.task.expectedCode||{};let e=!0,t="";if(r.patterns){for(const n of r.patterns)if(!new RegExp(n,"i").test(o.value)){e=!1,t="Your command is missing some required elements.";break}}if(r.requiredCommands&&e){for(const n of r.requiredCommands)if(!new RegExp(`^\\s*${n}\\b`,"im").test(o.value)){e=!1,t=`Your code should include the "${n}" command.`;break}}e?(m.value={type:"correct",message:c.task.successMessage||"Your Stata command is correct!"},y("correct")):(m.value={type:"incorrect",message:t||c.task.failureMessage||"Check your Stata syntax and try again."},y("incorrect"))}function g(){o.value=c.task.starterCode||"",l.value=[],m.value=null,h.value=!1}return x({reset:g}),(r,e)=>(a(),P(D,{software:"stata",task:p.task,"can-check":o.value.trim().length>0,"show-hint":h.value,"show-reset":o.value!==p.task.starterCode,feedback:m.value,onCheckAnswer:M,onReset:g,onShowHint:e[1]||(e[1]=t=>h.value=!0)},{default:V(()=>[s("div",$,[s("div",j,[e[2]||(e[2]=s("div",{class:"window-header"},[s("span",null,"Command")],-1)),s("div",z,[q(s("textarea",{"onUpdate:modelValue":e[0]||(e[0]=t=>o.value=t),class:"command-input",spellcheck:"false",placeholder:p.task.placeholder||"Enter Stata commands here...",onKeydown:H(B(b,["ctrl"]),["enter"])},null,40,K),[[F,o.value]]),s("button",{class:"execute-btn",onClick:b,disabled:!o.value.trim()}," Execute (do) ",8,N)])]),s("div",Y,[s("div",G,[e[3]||(e[3]=s("span",null,"Results",-1)),l.value.length>0?(a(),i("button",{key:0,class:"clear-btn",onClick:W}," Clear ")):v("",!0)]),s("div",{class:"results-body",ref_key:"resultsEl",ref:f},[(a(!0),i(k,null,w(l.value,(t,n)=>(a(),i("div",{key:n,class:O(["result-block",t.type])},[t.type==="command"?(a(),i("div",L," . "+d(t.text),1)):t.type==="output"?(a(),i("pre",I,d(t.text),1)):t.type==="error"?(a(),i("div",U,d(t.text),1)):v("",!0)],2))),128)),l.value.length===0?(a(),i("div",J," Results will appear here after executing commands ")):v("",!0)],512)]),s("div",Q,[e[4]||(e[4]=s("div",{class:"window-header"},[s("span",null,"Variables")],-1)),s("div",X,[(a(!0),i(k,null,w(C.value,t=>(a(),i("div",{key:t.name,class:"variable-item"},[s("span",Z,d(t.name),1),s("span",tt,d(t.type),1)]))),128))])])])]),_:1},8,["task","can-check","show-hint","show-reset","feedback"]))}},ot=E(et,[["__scopeId","data-v-2b06a95b"]]);export{ot as default};
