* Open start-here.sav before running this syntax.
* The results are also supplied in ready-to-analyse.sav.
RECODE smoking ('Never'=0) ('Previous'=1) ('Current'=2) INTO smoking_code.
RECODE sex ('M'=0) ('F'=1) INTO female.
RECODE diabetes ('No'=0) ('Yes'=1) INTO diabetes_yes.
RECODE asthma ('No'=0) ('Yes'=1) INTO asthma_yes.
COMPUTE chol_change=chol_after-chol_before.
VALUE LABELS smoking_code 0 'Never' 1 'Previous' 2 'Current' /female 0 'Male' 1 'Female' /diabetes_yes asthma_yes 0 'No' 1 'Yes'.
VARIABLE LEVEL smoking_code female diabetes_yes asthma_yes (NOMINAL) chol_change (SCALE).
FORMATS smoking_code female diabetes_yes asthma_yes (F1.0) chol_change (F8.2).
EXECUTE.
