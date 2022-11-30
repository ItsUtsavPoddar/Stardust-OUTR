import React from "react";
import siteConfig from "../site.config";
import cancer from "../assets/images/Breast cancer research-pana.png"
import diabetes from "../assets/images/Diabetes-amico.png"
import india from "../assets/images/India Republic Day-pana.png"
import heart from "../assets/images/Love is in the air-amico.png"
const About = () => {
  return (
    <section className="pb-12">
{/*<div className="flex items-center justify-center">
        <img src='https://i.postimg.cc/4yn8CCnb/20221130-143509.png' alt="us group members" />
  </div>*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row py-12 gap-3">
        <div className="lg:w-2/3">
          <h4 className="text-4xl tracking-tight font-extrabold text-black text-left sm:text-3xl md:text-4xl">
          NON-COMMUNICABLE DISEASES 
          </h4>
          <div className="space-y-8 text-lg leading-8 mt-8 text-black-200">
            <p>
            The term NCDs or we call it as chronic disease refers to a group of conditions that are not mainly caused by an acute infection, result in long-term health consequences and often create a need for long-term treatment and care. These conditions include cancers, cardiovascular disease, diabetes and chronic respiratory disease and diabetes they cover upto 80% of the NCD’s other include mental health disorder chronic disease musculoskeletal disease and sensory disorder(eye disease or hearing loss). 
            </p>
           
          </div>
        </div>
        <div className="lg:w-1/3">
          <img src={cancer}></img>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row py-12 gap-3">
      <div className="lg:w-1/5">
          <img src={diabetes}></img>
        </div>
        <div className="lg:w-2/3">
          <h4 className="text-4xl tracking-tight font-extrabold text-black text-left sm:text-3xl md:text-4xl">
        
          </h4>
          <div className="space-y-8 text-lg leading-8 mt-8 text-black-200">
            <p>
            NCDs kill approximately 41 million people (71% of global deaths) worldwide each year, including 14 million people who die too young between the ages of 30 and 70. The majority of premature NCD deaths are preventable. According to World Health Organization (WHO) projections, the total annual number of deaths from NCDs will increase to 55 million by 2030.
            </p>
           
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row py-12 gap-3">
        <div className="lg:w-2/3">
          <h4 className="text-4xl tracking-tight font-extrabold text-black text-left sm:text-3xl md:text-4xl">
          </h4>
          <div className="space-y-8 text-lg leading-8 mt-8 text-black-200">
            <p>
            In India, nearly 5.8 million people (WHO report, 2015) die from NCDs (heart and lung diseases, stroke, cancer and diabetes) every year or in other words 1 in 4 Indians has a risk of dying from an NCD before they reach the age of 70. 
            </p>
           
          </div>
        </div>
        <div className="lg:w-1/5">
          <img src={india}></img>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row py-12 gap-3">
      <div className="lg:w-1/4">
          <img src={heart}></img>
        </div>
        
        <div className="lg:w-2/3">
          
          <h4 className="text-4xl tracking-tight font-extrabold text-black text-left sm:text-3xl md:text-4xl">
          Major NCDs and their risk factors
          </h4>
          <div className="space-y-8 text-lg leading-8 mt-8 text-black-200">
            <p>
            The major NCDs are cardiovascular diseases, cancers, chronic respiratory diseases and diabetes. Physical inactivity, unhealthy diets (diets low in fruit, vegetables, and whole grains, but high in salt and fat), tobacco use (smoking, secondhand smoke, and smokeless tobacco), and the harmful use of alcohol are the main behavioural risk factors for NCDs.

They contribute to raised blood pressure (hypertension); raised blood sugar (diabetes); raised and abnormal blood lipids (dyslipidaemia); and obesity. Air pollution is also leading risk factor for NCDs in terms of both outdoor air pollution and household air pollution that mainly results from burning solid fuels in the home for cooking and heat.
            </p>
           
          </div>
        </div>
        
      </div>



    </section>
  );
};

export default About;
