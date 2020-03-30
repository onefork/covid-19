import React from 'react'
import MaterialTable from 'material-table'

export default class Table extends React.Component {
  render() {
    return (
      <MaterialTable
        title="I found these papers for you:"
        columns={[
          {
            title: 'Title',
            field: 'title',
            // customFilterAndSearch: (term, rowData) => term == rowData.name.length,
            cellStyle: {
              fontWeight: 'bold',
            },
          },
          { title: 'Score', field: 'score', type: 'numeric' },
          { title: 'Date', field: 'date', type: 'date' },
          {
            title: 'Language',
            field: 'language',
            lookup: { en: 'English', de: 'German', fr: 'French' },
          },
          // { title: 'Year', field: 'year', type: 'numeric' },
          // {
          //   title: 'Country',
          //   field: 'country',
          //   lookup: { 1: 'Switzerland', 2: 'China', 3: 'Italy', 4: 'USA' },
          // },
        ]}
        data={
          [
            {
              url: "https://www.medrxiv.org/content/10.1101/2020.03.09.20033357v1",
              title: "Estimates of the severity of COVID-19 disease",
              abstract: "A range of case fatality ratio (CFR) estimates for COVID 19 have been produced that differ substantially in magnitude. Methods: We used individual-case data from mainland China and cases detected outside mainland China to estimate the time between onset of symptoms and outcome (death or discharge from hospital). We next obtained age-stratified estimates of the CFR by relating the aggregate distribution of cases by dates of onset to the observed cumulative deaths in China, assuming a constant attack rate by age and adjusting for the demography of the population, and age and location-based under ascertainment. We additionally estimated the CFR from individual linelist data on 1,334 cases identified outside mainland China. We used data on the PCR prevalence in international residents repatriated from China at the end of January 2020 to obtain age-stratified estimates of the infection fatality ratio (IFR). Using data on age stratified severity in a subset of 3,665 cases from China, we estimated the proportion of infections that will likely require hospitalisation. Findings: We estimate the mean duration from onset-of-symptoms to death to be 17.8 days (95% credible interval, crI 16.9,19.2 days) and from onset-of-symptoms to hospital discharge to be 22.6 days (95% crI 21.1,24.4 days). We estimate a crude CFR of 3.67% (95% crI 3.56%,3.80%) in cases from mainland China. Adjusting for demography and under-ascertainment of milder cases in Wuhan relative to the rest of China, we obtain a best estimate of the CFR in China of 1.38% (95% crI 1.23%,1.53%) with substantially higher values in older ages. Our estimate of the CFR from international cases stratified by age (under 60 or 60 and above) are consistent with these estimates from China. We obtain an overall IFR estimate for China of 0.66% (0.39%,1.33%), again with an increasing profile with age. Interpretation: These early estimates give an indication of the fatality ratio across the spectrum of COVID-19 disease and demonstrate a strong age-gradient in risk.",
              score: 0.5943,
              date: "2020-03-13",
              language: "en"
            },
            {
              title: "Clinical determinants of the severity of Middle East respiratory syndrome (MERS): a systematic review and meta-analysis",
              abstract: "While the risk of severe complications of Middle East respiratory syndrome (MERS) and its determinants have been explored in previous studies, a systematic analysis of published articles with different designs and populations has yet to be conducted. The present study aimed to systematically review the risk of death associated with MERS as well as risk factors for associated complications. METHODS: PubMed and Web of Science databases were searched for clinical and epidemiological studies on confirmed cases of MERS. Eligible articles reported clinical outcomes, especially severe complications or death associated with MERS. Risks of admission to intensive care unit (ICU), mechanical ventilation and death were estimated. Subsequently, potential associations between MERS-associated death and age, sex, underlying medical conditions and study design were explored. RESULTS: A total of 25 eligible articles were identified. The case fatality risk ranged from 14.5 to 100%, with the pooled estimate at 39.1%. The risks of ICU admission and mechanical ventilation ranged from 44.4 to 100% and from 25.0 to 100%, with pooled estimates at 78.2 and 73.0%, respectively. These risks showed a substantial heterogeneity among the identified studies, and appeared to be the highest in case studies focusing on ICU cases. We identified older age, male sex and underlying medical conditions, including diabetes mellitus, renal disease, respiratory disease, heart disease and hypertension, as clinical predictors of death associated with MERS. In ICU case studies, the expected odds ratios (OR) of death among patients with underlying heart disease or renal disease to patients without such comorbidities were 0.6 (95% Confidence Interval (CI): 0.1, 4.3) and 0.6 (95% CI: 0.0, 2.1), respectively, while the ORs were 3.8 (95% CI: 3.4, 4.2) and 2.4 (95% CI: 2.0, 2.9), respectively, in studies with other types of designs. CONCLUSIONS: The heterogeneity for the risk of death and severe manifestations was substantially high among the studies, and varying study designs was one of the underlying reasons for this heterogeneity. A statistical estimation of the risk of MERS death and identification of risk factors must be conducted, particularly considering the study design and potential biases associated with case detection and diagnosis. ELECTRONIC SUPPLEMENTARY MATERIAL: The online version of this article (doi:10.1186/s12889-016-3881-4) contains supplementary material, which is available to authorized users.",
              score: 0.551,
              date: "2016-11-29",
              language: "en"
            },
            {
              title: "Middle East Respiratory Syndrome-Coronavirus (MERS-CoV) Infection",
              abstract: "MERS-CoV infection is an emerging infectious disease with a high mortality rate. The exact incidence and prevalence of the disease is not known as we do not have yet reliable serologic tests. The diagnosis of MERS-CoV infection relies on detection of the virus using real-time RT-PCR. Currently, the origin of the virus and the source is not known and future studies are needed to elucidate possible sources and the best therapeutic options.",
              score: 0.549,
              date: "2014-12-31",
              language: "en"
            },
            {
              url: "https://www.medrxiv.org/content/10.1101/2020.03.21.20040121v1",
              title: "Myocardial injury is associated with in-hospital mortality of confirmed or suspected COVID-19 in Wuhan, China: A single center retrospective cohort study",
              abstract: "[Background] Since December 2019, a cluster of coronavirus disease 2019 (COVID-19) occurred in Wuhan, Hubei Province, China and spread rapidly from China to other countries. In-hospital mortality are high in severe cases and cardiac injury characterized by elevated cardiac troponin are common among them. The mechanism of cardiac injury and the relationship between cardiac injury and in-hospital mortality remained unclear. Studies focused on cardiac injury in COVID-19 patients are scarce. [Objectives] To investigate the association between cardiac injury and in-hospital mortality of patients with confirmed or suspected COVID-19. [Methods] Demographic, clinical, treatment, and laboratory data of consecutive confirmed or suspected COVID-19 patients admitted in Wuhan No.1 Hospital from 25th December, 2019 to 15th February, 2020 were extracted from electronic medical records and were retrospectively reviewed and analyzed. Univariate and multivariate Cox regression analysis were used to explore the risk factors associated with in-hospital death. [Results] A total of 110 patients with confirmed (n=80) or suspected (n=30) COVID-19 were screened and 48 patients (female 31.3%, mean age 70.58±13.38 year old) among them with high-sensitivity cardiac troponin I (hs-cTnI) test within 48 hours after admission were included, of whom 17 (17/48, 35.4%) died in hospital while 31 (31/48, 64.6%) were discharged or transferred to other hospital. High-sensitivity cardiac troponin I was levated in 13 (13/48, 27.1%) patents. Multivariate Cox regression analysis showed pulse oximetry of oxygen saturation (SpO2) on admission (HR 0.704, 95% CI 0.546-0.909, per 1% decrease, p=0.007), elevated hs-cTnI (HR 10.902, 95% 1.279-92.927, p=0.029) and elevated d-dimer (HR 1.103, 95%CI 1.034-1.176, per 1mg/L increase, p=0.003) on admission were independently associated with in-hospital mortality. [Conclusions] Cardiac injury defined by hs-cTnI elevation and elevated d-dimer on admission were risk factors for in-hospital death, while higher SpO2 could be seen as a protective factor, which could help clinicians to identify patients with adverse outcome at the early stage of COVID-19.",
              score: 0.5489,
              date: "2020-03-24",
              language: "en"
            },
            {
              title: "Oligomerization of the carboxyl terminal domain of the human coronavirus 229E nucleocapsid protein.",
              abstract: "The coronavirus (CoV) N protein oligomerizes via its carboxyl terminus. However, the oligomerization mechanism of the C-terminal domains (CTD) of CoV N proteins remains unclear. Based on the protein disorder prediction system, a comprehensive series of HCoV-229E N protein mutants with truncated CTD was generated and systematically investigated by biophysical and biochemical analyses to clarify the role of the C-terminal tail of the HCoV-229E N protein in oligomerization. These results indicate that the last C-terminal tail plays an important role in dimer–dimer association. The C-terminal tail peptide is able to interfere with the oligomerization of the CTD of HCoV-229E N protein and performs the inhibitory effect on viral titre of HCoV-229E. This study may assist the development of anti-viral drugs against HCoV. Structured summary of protein interactions N and C-terminal tail peptide bind by cosedimentation in solution (View interaction) N and N bind by cosedimentation in solution (View Interaction: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12) C-terminal tail peptide and N bind by fluorescence technology (View interaction) N and N bind by cross-linking study (View interaction) N and N bind by cross-linking study (View Interaction: 1, 2, 3, 4)",
              score: 0.5474,
              date: "2013-01-16",
              language: "en"
            }
          ]
        }
        detailPanel={[
          {
            tooltip: 'Show Abstract',
            render: rowData => {
              return (
                <div style={{ padding: '8px 16px' }}>
                  {rowData.abstract}
                </div>
              )
            },
          },
        ]}
        actions={[
          {
            icon: 'favorite_border',
            tooltip: 'Add to collection',
            onClick: (event, rowData) => {
              // Do save operation
            }
          },
          rowData => ({
            icon: 'open_in_new',
            tooltip: 'Open',
            hidden: rowData.url === undefined,
            onClick: (event, rowData) => {
              window.open(rowData.url);
            }
          }),
        ]}

        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        options={{
          filtering: true,
          grouping: true,
          exportButton: true
        }}
      />
    )
  }
}
