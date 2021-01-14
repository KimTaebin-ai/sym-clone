export class WeightUtil {

    /**
     * 체지방율 계산
     * @param gender 성별
     * @param weight 체중
     * @param height 키
     */
    public static getBodyFat(gender, weight, height) {
        // 제지방량 계산
        let leanBodyMass;
        if (gender === '1') {
            leanBodyMass = (1.10 * weight) - (128 * ((weight * weight) / (height * height)));
        } else {
            leanBodyMass = (1.07 * weight) - (128 * ((weight * weight) / (height * height)));
        }
        // 체지방 계산
        // let bodyFat = weight - leanBodyMass;
        const bodyFat = 100 - ((leanBodyMass * 100) / weight);
        return bodyFat.toFixed(1);
    }

    /**
     * 체수분량 계산
     * @param bodyFat 체지방량
     */
    public static getWater(bodyFat) {
        const water = ((100.0 - bodyFat) * 0.726 * 100.0 + 0.5) / 100.0;
        return water.toFixed(1);
    }

    /**
     * 근육량 계산
     * @param bodyFat 체지방량
     * @param gender 성별 (남자:1, 여자:2)
     */
    public static getBodyMuscle(bodyFat, gender) {
        let muscle;
        if (gender === '1') {
            muscle = (100.0 - bodyFat) * 0.7;
        } else {
            muscle = (100.0 - bodyFat) * 0.67;
        }
        muscle = ((muscle * 100.0) + 0.5) / 100.0;
        return muscle.toFixed(1);
    }

    /**
     * 골격량 계산
     * @param muscle 근육량
     * @param weight 체중
     * @param height 키
     * @param gender 성별
     */
    public static getBoneMass(muscle, gender, weight, height) {
        let boneMass;
        const h = height - 170.0;
        if (gender === '1') {
            boneMass = ((weight * (muscle / 100.0) * 4.0) / 7.0 * 0.22 * 0.6) + (h / 100.0);
        } else {
            boneMass = ((weight * (muscle / 100.0) * 4.0) / 7.0 * 0.34 * 0.45) + (h / 100.0);
        }
        boneMass = ((boneMass * 10.0) + 0.5) / 10.0;
        return boneMass.toFixed(1);
    }

    /**
     * 골격근량 계산
     * @param muscle
     */
    public static getSkeletonMuscleMass(muscle) {
        const skeleton = muscle * 0.577;
        return skeleton.toFixed(1);
    }

    /**
     * 체질량 지수 계산
     * @param weight 체중
     * @param height 키
     */
    public static getBmi(weight, height) {
        const bmi = weight / (((height * height) / 100) / 100);
        return bmi.toFixed(1);
    }

    /**
     * 기초대사량 계산
     * @param age 나이
     * @param weight 체중
     * @param height 키
     * @param gender 성별
     */
    public static getBmr(gender, weight, height, age) {
        let bmr;
        if (gender === '1') {
            // bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            bmr = (9.99 * weight) + (6.25 * height) - (4.92 * age) + 5;
        } else {
            // bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            bmr = (9.99 * weight) + (6.25 * height) - (4.92 * age) - 161;
        }
        return bmr.toFixed(1);
    }

    /**
     * 평균 키 조회
     * @param gender 성별
     */
    public static getAvgrageHeight(gender) {
        let height;
        if (gender === '1') {
            height = 174.9;
        } else {
            height = 162.3;
        }
        return height;
    }

    /**
     * 평균 몸무게 조회
     * @param gender 성별
     * @param height 키
     */
    public static getAvrageWeight(gender, height) {
        let weight;
        if (gender === '1') {
            weight = (height - 100) * 0.9;
        } else {
            weight = (height - 100) * 0.85;
        }
        return weight;
    }

    public static test() {
        console.log('-----------------------------------------------------------------------------------');
        const gender = 1;
        const weight = 87.4;
        const height = 181;
        const age = 34;

        // 체지방량
        const bodyFat = WeightUtil.getBodyFat(gender, weight, height);
        console.log('bodyFat => ', bodyFat);

        // 체수분량
        const water = WeightUtil.getWater(bodyFat);
        console.log('water => ', water);

        // 근육량
        const bodyMuscle = WeightUtil.getBodyMuscle(bodyFat, gender);
        console.log('bodyMuscle => ', bodyMuscle);

        // 골격량
        const boneMass = WeightUtil.getBoneMass(bodyMuscle, gender, weight, height);
        console.log('boneMass => ', boneMass);

        // 골격근량
        const skeletonMuscleMass = WeightUtil.getSkeletonMuscleMass(bodyMuscle);
        console.log('skeletonMuscleMass => ', skeletonMuscleMass);

        // 체질량지수
        const bmi = WeightUtil.getBmi(weight, height);
        console.log('bmi => ', bmi);

        // 기초대사량
        const bmr = WeightUtil.getBmr(gender, weight, height, age);
        console.log('bmr => ', bmr);

        console.log('-----------------------------------------------------------------------------------');
    }
}
