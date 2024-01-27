import NavbarServiceTerms from '~/Components/molecules/nav-bar-service-terms'
import TermsOfUse from '~/pages/TermsOfUse'
import LandingLayout from '~/pages/_layouts/landing/landing'

const ServiceTerms = () => {
    return (
        <LandingLayout navBar={NavbarServiceTerms} title="Termos de Uso">
            <TermsOfUse />
        </LandingLayout>
    )
}

export default ServiceTerms